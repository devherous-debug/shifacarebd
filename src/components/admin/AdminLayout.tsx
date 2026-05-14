import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { DummyDataBanner } from "@/components/admin/DummyDataBanner";

export function AdminLayout() {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <span className="text-sm text-muted-foreground">Operations</span>
        </header>
        <div className="flex flex-1 flex-col gap-4 border-b border-transparent px-4 pb-4 pt-3 md:px-6 md:pb-6 md:pt-4">
          <DummyDataBanner />
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
