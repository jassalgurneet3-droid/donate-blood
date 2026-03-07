import { SidebarProvider } from "../components/ui/sidebar";
import { Sidebar } from "../components/ui/sidebar";
import { ChartsSection } from "../components/ui/ChartsSection";
import { DonorTable } from "../components/ui/DonorTable";
import { AnalyticsCards } from "../components/ui/AnalyticsCards";

export default function AdminDashboard() {
  return (
    <SidebarProvider>
      <div className="w-full max-w-none px-6 py-6">

        <div className="w-full px-6 py-6">
          <AnalyticsCards />
          <ChartsSection />
          <DonorTable />
        </div>
      </div>
    </SidebarProvider>
  );
}