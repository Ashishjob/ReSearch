import { useSavedItems } from "@/hooks/useSavedItems";
import useVolunteerStudies from "@/hooks/useVolunteerStudies";
import { useResearchOpportunities } from "@/hooks/useResearchOpportunities";
import VolunteerStudyCard from "@/components/VolunteerStudyCard";
import ResearchCard from "@/components/ResearchOpportunityCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SavedItemsPage() {
  const { savedIds: savedVolunteerIds } = useSavedItems("volunteer");
  const { savedIds: savedResearchIds } = useSavedItems("research");

  const { data: allStudies } = useVolunteerStudies();
  const { data: allResearch } = useResearchOpportunities();

  const savedStudies = allStudies?.filter((s) => savedVolunteerIds.includes(s.id)) || [];
  const savedResearch = allResearch?.filter((r) => savedResearchIds.includes(r.id)) || [];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Saved Items</h1>

      <Tabs defaultValue="research">
        <TabsList className="mb-4">
          <TabsTrigger value="research">Research</TabsTrigger>
          <TabsTrigger value="volunteer">Volunteer</TabsTrigger>
        </TabsList>

        <TabsContent value="research">
          {savedResearch.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedResearch.map((op) => (
                <ResearchCard key={op.id} opportunity={op} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">You haven’t saved any research opportunities yet.</p>
          )}
        </TabsContent>

        <TabsContent value="volunteer">
          {savedStudies.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedStudies.map((study) => (
                <VolunteerStudyCard key={study.id} study={study} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">You haven’t saved any volunteer studies yet.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
