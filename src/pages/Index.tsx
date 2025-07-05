
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
import VolunteerStudyCard from "@/components/VolunteerStudyCard";
import useVolunteerStudies from "@/hooks/useVolunteerStudies";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { user, signOut } = useAuth();
  const { data: researchOpportunities = [], isLoading } = useResearchOpportunities();
  const navigate = useNavigate();
  const { data: volunteerStudies = [], isLoading: isVolunteerLoading } = useVolunteerStudies();

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
              Discover Your Newest <span className="text-blue-600 block">Research Opportunities</span>
            </h1>
            <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
              Whether you're looking to join a lab as a research assistant or volunteer for exciting studies, find opportunities that match your interests and grow your academic journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center my-6">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={() => navigate('/research')}>
                Explore Research Assistant Roles
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/volunteer')}>
                Browse Volunteer Studies
              </Button>
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
              <div className="text-gray-600">Student Researchers & Volunteers</div>
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
              Explore research assistant roles across labs and programs at the University of Houston.
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12 text-gray-600">Loading research opportunities...</div>
          ) : filteredOpportunities.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOpportunities.slice(0, 3).map((opportunity) => (
                  <ResearchOpportunityCard key={opportunity.id} opportunity={opportunity} />
                ))}
              </div>
              <div className="mt-10">
                <Button
                  onClick={() => navigate('/research')}
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 text-lg py-6 rounded-lg"
                >
                  View All Research Opportunities →
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No research opportunities found</h3>
              <p className="text-gray-600">Try adjusting your search terms or category filters.</p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Volunteer Studies */}
      <section className="py-16 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Volunteer Studies</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Not ready to join a lab yet? Participate in meaningful research as a study volunteer and help power discovery.
            </p>
          </div>

          {volunteerStudies.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {volunteerStudies.slice(0, 3).map((study) => (
                  <VolunteerStudyCard key={study.id} study={study} />
                ))}
              </div>
              <div className="mt-10">
                <Button
                  onClick={() => navigate('/volunteer')}
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 text-lg py-6 rounded-lg"
                >
                  View All Volunteer Studies →
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-600 py-12">No volunteer studies available at this time.</div>
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
    </div>
  );
};

export default Index;
