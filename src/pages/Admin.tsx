import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ResearchTab from "../components/admin/ResearchTab";
import VolunteerTab from "../components/admin/VolunteerTab";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("research");
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error || !user || user.email !== "ashishjob104@gmail.com") {
        alert("You are not authorized to view this page.");
        window.location.href = "/auth";
        return;
      }
      setAuthChecked(true);
    };

    checkAdmin();
  }, []);

  if (!authChecked) return null;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
      <Tabs defaultValue="research" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="research">Research Assistants</TabsTrigger>
          <TabsTrigger value="volunteers">Volunteer Studies</TabsTrigger>
        </TabsList>

        <TabsContent value="research">
          <ResearchTab />
        </TabsContent>

        <TabsContent value="volunteers">
          <VolunteerTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
