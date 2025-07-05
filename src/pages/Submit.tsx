import { useState } from "react";
import ResearchOpportunityForm from "@/components/forms/ResearchOpportunityForm";
import VolunteerStudyForm from "@/components/forms/VolunteerStudiesForm";
import { Button } from "@/components/ui/button";

export default function SubmitPage() {
  const [selectedForm, setSelectedForm] = useState<"research" | "volunteer" | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Submit an Opportunity</h1>
        <p className="text-gray-600 mb-8">
          Share a research opportunity or a volunteer study to be reviewed and added to our platform.
        </p>
        <div className="flex justify-center gap-4 mb-8">
          <Button
            variant={selectedForm === "research" ? "default" : "outline"}
            onClick={() => setSelectedForm("research")}
          >
            Research Opportunity
          </Button>
          <Button
            variant={selectedForm === "volunteer" ? "default" : "outline"}
            onClick={() => setSelectedForm("volunteer")}
          >
            Volunteer Study
          </Button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          {selectedForm === "research" && <ResearchOpportunityForm />}
          {selectedForm === "volunteer" && <VolunteerStudyForm />}
          {!selectedForm && (
            <p className="text-gray-500">Select an option above to begin your submission.</p>
          )}
        </div>
      </div>
    </div>
  );
}
