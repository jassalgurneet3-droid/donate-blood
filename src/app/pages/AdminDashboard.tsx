import { useState } from "react";
// Keep your existing imports at the top exactly as they are in your screenshot!
import { SidebarProvider } from "../components/ui/sidebar"; // Assuming this is the path
import { ChartsSection } from "../components/ui/ChartsSection";
import { AnalyticsCards } from "../components/ui/AnalyticsCards";
import { DonorTable } from "../components/ui/DonorTable.tsx";

export default function AdminDashboard() {
  // 1. Create a "signal" state
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refreshData = () => {
    // 2. Every time a donor is deleted, change this number
    setRefreshTrigger((prev) => prev + 1);
    console.log("Signal sent to refresh cards and charts!");
  };

  return (
    <SidebarProvider>
      <div className="w-4/5 max-w-none px-6 py-6 mx-auto">
        <div className="w-full px-6 py-6 flex flex-col gap-6">
          {/* 3. Pass the signal to your components so they know when to update */}
          <AnalyticsCards refreshTrigger={refreshTrigger} />
          <ChartsSection refreshTrigger={refreshTrigger} />
          
          <DonorTable onDonorDeleted={refreshData} />
        </div>
      </div>
    </SidebarProvider>
  );
}