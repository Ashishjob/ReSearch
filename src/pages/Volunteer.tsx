import { useState } from "react";
import { Search } from "lucide-react";
import VolunteerStudyCard from "../components/VolunteerStudyCard";
import useVolunteerStudies from "../hooks/useVolunteerStudies";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface VolunteerStudy {
  id: string;
  title: string;
  department: string;
  description?: string;
  location?: string;
  compensation_type?: "paid" | "raffle" | "volunteer";
  compensation_details?: string;
  eligibility_criteria?: string;
  duration?: string;
  study_link?: string;
  contact_email?: string;
}

const compensationTypes = [
  { id: "all", label: "All Studies" },
  { id: "paid", label: "Paid" },
  { id: "raffle", label: "Raffle-Based" },
  { id: "volunteer", label: "Unpaid/Volunteer" },
];

export default function Volunteer() {
  const { data: studies = [], isLoading } = (useVolunteerStudies() as unknown) as { data: VolunteerStudy[]; isLoading: boolean };
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedComp, setSelectedComp] = useState("all");

  const filteredStudies = studies.filter((study) => {
    const matchesSearch =
      study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.department?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesComp =
      selectedComp === "all" || study.compensation_type === selectedComp;

    return matchesSearch && matchesComp;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Volunteer Studies</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse opportunities to participate in UH research studies.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search studies, departments, or topics..."
              className="pl-12 pr-4 py-6 text-lg rounded-full border-2 border-gray-200 focus:border-blue-500 shadow-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Compensation Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {compensationTypes.map((comp) => (
            <Button
              key={comp.id}
              variant={selectedComp === comp.id ? "default" : "outline"}
              onClick={() => setSelectedComp(comp.id)}
              className={`rounded-full ${
                selectedComp === comp.id ? "bg-blue-600 hover:bg-blue-700" : ""
              }`}
            >
              {comp.label}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="text-gray-600">Loading volunteer studies...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudies.map((study) => (
              <VolunteerStudyCard key={study.id} study={study} />
            ))}
          </div>
        )}

        {!isLoading && filteredStudies.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No studies found
            </h3>
            <p className="text-gray-600">
              Try different search terms or compensation filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
