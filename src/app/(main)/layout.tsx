import { Sidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";
import { MobileNav } from "@/components/layout/mobile-nav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <>
      <Sidebar />
      <Navbar />
      <main className="min-h-screen pt-14 pb-20 lg:pl-64 lg:pb-0">
        <div className="p-4 md:p-6 lg:p-8">{children}</div>
      </main>
      <MobileNav />
    </>
  );
}
