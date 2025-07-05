import { useState } from "react";
import { useResearchOpportunities } from "@/hooks/useResearchOpportunities";
import { Search } from "lucide-react";
import ResearchOpportunityCard from "@/components/ResearchOpportunityCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const categories = [
  { id: "all", label: "All Research" },
  { id: "engineering", label: "Engineering & Technology" },
  { id: "health", label: "Health & Biomedical" },
  { id: "science", label: "Natural Sciences" },
  { id: "social", label: "Social & Behavioral" },
  { id: "arts", label: "Arts & Humanities" },
  { id: "business", label: "Business & Management" },
];

const ResearchOpportunityGridPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { data: researchOpportunities = [], isLoading } = useResearchOpportunities();

  const filteredOpportunities = researchOpportunities.filter((opportunity) => {
    const matchesSearch =
      opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.keywords?.some((keyword) =>
        keyword.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "all" || opportunity.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Research Opportunities</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore undergraduate research positions in various fields.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search research opportunities, labs, or keywords..."
              className="pl-12 pr-4 py-6 text-lg rounded-full border-2 border-gray-200 focus:border-blue-500 shadow-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={`rounded-full ${
                selectedCategory === category.id ? "bg-blue-600 hover:bg-blue-700" : ""
              }`}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="text-gray-600">Loading research opportunities...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOpportunities.map((opportunity) => (
              <ResearchOpportunityCard key={opportunity.id} opportunity={opportunity} />
            ))}
          </div>
        )}

        {!isLoading && filteredOpportunities.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No research opportunities found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search terms or category filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResearchOpportunityGridPage;
