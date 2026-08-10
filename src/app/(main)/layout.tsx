import { Sidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { getCurrentUser } from "@/lib/data/user";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<React.ReactElement> {
  const user = await getCurrentUser();
  const displayName = user?.displayName ?? "";

  return (
    <>
      <Sidebar displayName={displayName} />
      <Navbar displayName={displayName} />
      <main className="min-h-screen pt-14 pb-20 lg:pl-64 lg:pb-0">
        <div className="p-4 md:p-6 lg:p-8">{children}</div>
      </main>
      <MobileNav />
    </>
  );
}
