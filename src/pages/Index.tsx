
import { useState } from "react";
import { Search, MapPin, Users, Calendar, BookOpen, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ResearchOpportunityCard from "@/components/ResearchOpportunityCard";
import { useAuth } from "@/hooks/useAuth";
import { useResearchOpportunities } from "@/hooks/useResearchOpportunities";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { user, signOut } = useAuth();
  const { data: researchOpportunities = [], isLoading } = useResearchOpportunities();
  const navigate = useNavigate();

  const categories = [
    { id: "all", label: "All Research" },
    { id: "ai", label: "AI & Machine Learning" },
    { id: "health", label: "Health & Medicine" },
    { id: "engineering", label: "Engineering" },
    { id: "data", label: "Data Science" },
    { id: "robotics", label: "Robotics" },
  ];

  const filteredOpportunities = researchOpportunities.filter(opportunity => {
    const matchesSearch = opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opportunity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opportunity.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || opportunity.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Discover Your Next 
              <span className="text-blue-600 block">Research Opportunity</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Connect with cutting-edge research labs at the University of Houston. 
              Find undergraduate research positions, fellowships, and academic opportunities that match your interests.
            </p>
            
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
                  className={`rounded-full ${selectedCategory === category.id ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">20+</div>
              <div className="text-gray-600">Active Research Labs</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">{researchOpportunities.length}+</div>
              <div className="text-gray-600">Research Opportunities</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Student Researchers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">$2M+</div>
              <div className="text-gray-600">Research Funding</div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Opportunities */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Research Opportunities</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore undergraduate research positions in various fields at the University of Houston
            </p>
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">No research opportunities found</h3>
              <p className="text-gray-600">Try adjusting your search terms or category filters.</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Research Journey?</h2>
          <p className="text-lg text-white mb-8 w-1/2 justify-center mx-auto">
            Whether you&apos;re looking for a summer internship, a research assistant position, or just want to explore new fields, we have opportunities for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/research" className="inline-block">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                Browse All Opportunities
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <GraduationCap className="h-6 w-6" />
                <span className="text-lg font-bold">ResearchHub</span>
              </div>
              <p className="text-gray-400">
                Connecting students with research opportunities at the University of Houston.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Research</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Browse Opportunities</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Research Labs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Faculty Directory</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Programs</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Summer Programs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Fellowships</a></li>
                <li><a href="#" className="hover:text-white transition-colors">REU Programs</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="mailto:ashishjob104@gmail.com" className="hover:text-white transition-colors">ashishjob104@gmail.com</a></li>
              </ul>
            </div>
          </div>
          <Separator className="my-8 bg-gray-700" />
          <div className="text-center text-gray-400">
            <p>&copy; 2025 ReSearch. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
