import { SidebarProvider } from "../components/ui/sidebar";
import { ChartsSection } from "../components/ui/ChartsSection";
import { DonorTable } from "../components/ui/DonorTable";
import { AnalyticsCards } from "../components/ui/AnalyticsCards";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react"


export default function AdminDashboard() {

  const [donors, setDonors] = useState<any[]>([])

  const loadDonors = async () => {

    const { data, error } = await supabase
      .from("donors")
      .select("*")

    if (!error && data) {
      setDonors(data)
    }

  }

  useEffect(() => {

    loadDonors()

    const channel = supabase
      .channel("donors-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "donors" },
        (payload) => {
          console.log("DB changed", payload)
          loadDonors()
        }
      )
      .subscribe()
    console.log(donors)

    return () => {
      supabase.removeChannel(channel)
    }

  }, [])

  return (
    <SidebarProvider>
      <div className="w-4/5 max-w-none px-6 py-16 mx-auto">

        <div className="w-full px-6 py-6 mt-0">
          <AnalyticsCards donors={donors}/>
          <div className="mt-8">
            <ChartsSection donors={donors} />
          </div>

          <div className="mt-8">
            <DonorTable donors={donors} />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}