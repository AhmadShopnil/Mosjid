import SidebarInner from "./SidebarInner";
import TopbarInner from "./TopbarInner";

export default function Layout({ sidebarItems, children }) {
  return (
    <div className="min-h-screen bg-green-50">
      <TopbarInner />
      <div className="container mx-auto py-6 px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
        <SidebarInner items={sidebarItems} />
        <main className="md:col-span-3">{children}</main>
      </div>
    </div>
  );
}
