import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-41px)]">
      <AdminSidebar />
      <div className="flex-1 bg-[#F5F3EF] overflow-auto">
        {children}
      </div>
    </div>
  );
}
