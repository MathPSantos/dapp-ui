import { promises as fs } from "fs";
import { notFound } from "next/navigation";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { absoluteUrl, cn, removeFrontmatter } from "@/lib/utils";
import Balancer from "react-wrap-balancer";
import { NavItem, NavItemWithChildren, docsConfig } from "@/config/docs";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { mdxComponents } from "@/components/mdx-components";
import rehypePrettyCode from "rehype-pretty-code";
import theme from "@/lib/highlighter-theme.json";
import { codeImport } from "remark-code-import";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { getTableOfContents } from "@/lib/toc";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DashboardTableOfContents } from "@/components/toc";

type DocPageProps = {
  params: {
    slug: string[];
  };
};

async function getDocPage({ params }: DocPageProps) {
  try {
    const slug = (
      params.slug.length === 1 ? [...params.slug, "index"] : params.slug
    ).join("/");

    const doc = await fs.readFile(
      path.join(process.cwd(), "src/contents/docs", `${slug}.mdx`),
      "utf8"
    );

    const content = await compileMDX<Record<"description" | "title", string>>({
      source: doc,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkGfm, codeImport],
          rehypePlugins: [
            rehypeSlug,
            () => (tree: any) => {
              visit(tree, (node: any) => {
                if (node?.type === "element" && node?.tagName === "pre") {
                  const [codeEl] = node.children;
                  if (codeEl.tagName !== "code") {
                    return;
                  }

                  if (codeEl.data?.meta) {
                    // Extract event from meta and pass it down the tree.
                    const regex = /event="([^"]*)"/;
                    const match = codeEl.data?.meta.match(regex);
                    if (match) {
                      node.__event__ = match ? match[1] : null;
                      codeEl.data.meta = codeEl.data.meta.replace(regex, "");
                    }
                  }

                  node.__rawString__ = codeEl.children?.[0].value;
                  node.__src__ = node.properties?.__src__;
                  node.__style__ = node.properties?.__style__;
                }
              });
            },
            [
              rehypePrettyCode,
              {
                theme,
                keepBackground: false,
              },
            ],
            () => (tree: any) => {
              visit(tree, (node: any) => {
                if (node?.type === "element" && node?.tagName === "div") {
                  if (
                    !("data-rehype-pretty-code-fragment" in node.properties)
                  ) {
                    return;
                  }

                  const preElement = node.children.at(-1);
                  if (preElement.tagName !== "pre") {
                    return;
                  }

                  preElement.properties["__withMeta__"] =
                    node.children.at(0).tagName === "div";
                  preElement.properties["__rawString__"] = node.__rawString__;

                  if (node.__src__) {
                    preElement.properties["__src__"] = node.__src__;
                  }

                  if (node.__event__) {
                    preElement.properties["__event__"] = node.__event__;
                  }

                  if (node.__style__) {
                    preElement.properties["__style__"] = node.__style__;
                  }
                }
              });
            },
            [
              rehypeAutolinkHeadings,
              {
                properties: {
                  className: ["subheading-anchor"],
                  ariaLabel: "Link to section",
                },
              },
            ],
          ],
        },
      },
      components: mdxComponents,
    });

    return {
      ...content,
      slug: `/docs/${slug.replace("/index", "")}`,
      raw: removeFrontmatter(doc),
    };
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const doc = await getDocPage({ params });

  if (!doc) {
    return {};
  }

  return {
    title: doc.frontmatter.title,
    description: doc.frontmatter.description,
    openGraph: {
      title: doc.frontmatter.title,
      description: doc.frontmatter.description,
      type: "article",
      url: absoluteUrl(doc.slug),
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: doc.frontmatter.title,
      description: doc.frontmatter.description,
      images: [siteConfig.ogImage],
      creator: "@shadcn",
    },
  };
}

export default async function DocPage({ params }: DocPageProps) {
  const doc = await getDocPage({ params });

  if (!doc) {
    notFound();
  }

  const toc = await getTableOfContents(doc.raw);

  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <div className="mb-4 flex items-center space-x-1 text-sm leading-none text-muted-foreground">
          <div className="truncate">Docs</div>
          <ChevronRightIcon className="h-3.5 w-3.5" />
          <div className="text-foreground">{doc.frontmatter.title}</div>
        </div>
        <div className="space-y-2">
          <h1 className={cn("scroll-m-20 text-3xl font-bold tracking-tight")}>
            {doc.frontmatter.title}
          </h1>
          {doc.frontmatter.description && (
            <p className="text-base text-muted-foreground">
              <Balancer>{doc.frontmatter.description}</Balancer>
            </p>
          )}
        </div>
        <div className="pb-12 pt-8">{doc.content}</div>
        <DocsPager slug={doc.slug} />
      </div>
      <div className="hidden text-sm xl:block">
        <div className="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] pt-4">
          <ScrollArea className="h-full pb-10">
            {toc && <DashboardTableOfContents toc={toc} />}
          </ScrollArea>
        </div>
      </div>
    </main>
  );
}

function DocsPager({ slug }: { slug: string }) {
  const pager = getPagerForDoc(slug);

  if (!pager) return null;

  return (
    <div className="flex flex-row items-center justify-between">
      {pager?.prev?.href && (
        <Link
          href={pager.prev.href}
          className={buttonVariants({ variant: "outline" })}
        >
          <ChevronLeftIcon className="mr-2 h-4 w-4" />
          {pager.prev.title}
        </Link>
      )}
      {pager?.next?.href && (
        <Link
          href={pager.next.href}
          className={cn(buttonVariants({ variant: "outline" }), "ml-auto")}
        >
          {pager.next.title}
          <ChevronRightIcon className="ml-2 h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

function getPagerForDoc(slug: string) {
  const flattenedLinks = [null, ...flatten(docsConfig.sidebarNav), null];
  const activeIndex = flattenedLinks.findIndex((link) => slug === link?.href);
  const prev = activeIndex !== 0 ? flattenedLinks[activeIndex - 1] : null;
  const next =
    activeIndex !== flattenedLinks.length - 1
      ? flattenedLinks[activeIndex + 1]
      : null;
  return {
    prev,
    next,
  };
}

export function flatten(links: NavItemWithChildren[]): NavItem[] {
  return links
    .reduce<NavItem[]>((flat, link) => {
      return flat.concat(link.items?.length ? flatten(link.items) : link);
    }, [])
    .filter((link) => !link?.disabled);
}
