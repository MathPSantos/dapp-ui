"use client";

import { Index } from "@/__registry__";
import { cn } from "@/lib/utils";
import {
  Children,
  HTMLAttributes,
  ReactElement,
  Suspense,
  useMemo,
} from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { CopyButton } from "./copy-button";

type ComponentPreviewProps = HTMLAttributes<HTMLDivElement> & {
  name: string;
};

export function ComponentPreview({
  name,
  children,
  className,
  ...props
}: ComponentPreviewProps) {
  const Codes = Children.toArray(children) as ReactElement[];
  const Code = Codes[0];

  console.log(Codes);

  const Preview = useMemo(() => {
    const Component = Index[name]?.component;

    if (!Component)
      return (
        <p className="text-sm text-muted-foreground">
          Component{" "}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {name}
          </code>{" "}
          not found in registry.
        </p>
      );

    return <Component />;
  }, [name]);

  const codeString = useMemo(() => {
    if (typeof Code?.props["data-rehype-pretty-code-figure"] !== "undefined") {
      const [Button] = Children.toArray(Code.props.children) as ReactElement[];
      return Button?.props?.value || Button?.props?.__rawString__ || null;
    }
  }, [Code]);

  return (
    <div
      className={cn(
        "group relative my-4 flex flex-col gap-2 [&_input]:max-w-xs",
        className
      )}
      {...props}
    >
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        <div className="flex items-center justify-between pb-3">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
            <TabsTrigger
              value="preview"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Preview
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Code
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="preview" className="relative rounded-md border">
          <div className="flex items-center justify-end p-4">
            <div className="flex items-center gap-2">
              <CopyButton
                value={codeString}
                variant="outline"
                className="h-7 w-7 text-foreground opacity-100 hover:bg-muted hover:text-foreground [&_svg]:h-3.5 [&_svg]:w-3.5"
              />
            </div>
          </div>
          <div className="w-full">
            <div className="preview flex min-h-[350px] w-full justify-center p-10 items-center">
              <Suspense
                fallback={
                  <div className="flex w-full items-center justify-center text-sm text-muted-foreground">
                    Loading...
                  </div>
                }
              >
                {Preview}
              </Suspense>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="code">
          <div className="flex flex-col space-y-4">
            <div className="w-full rounded-md [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto">
              {Code}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
