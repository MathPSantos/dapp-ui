import { SiteHeader } from "@/components/site-header";
import { ReactNode } from "react";

export default function AppLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
    </>
  );
}
