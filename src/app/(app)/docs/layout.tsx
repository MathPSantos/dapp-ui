import "@/styles/mdx.css";
import { DocsSidebarNav } from "@/components/sidebar-nav";
import { ScrollArea } from "@/components/ui/scroll-area";
import { docsConfig } from "@/config/docs";
import { ReactNode } from "react";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="border-b">
      <div className="container max-w-[1400px] flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-56px)] w-full shrink-0 md:sticky md:block">
          <ScrollArea className="h-full py-6 pr-6 lg:py-8">
            <DocsSidebarNav config={docsConfig} />
          </ScrollArea>
        </aside>
        <div>{children}</div>
      </div>
    </div>
  );
}
