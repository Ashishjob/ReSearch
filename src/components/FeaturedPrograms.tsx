
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, DollarSign, Clock, Award } from "lucide-react";

const FeaturedPrograms = () => {
  const programs = [
    {
      id: 1,
      title: "Summer Undergraduate Research Fellowship (SURF)",
      description: "Provides funding for UH sophomores, juniors, and seniors to participate in a full-time, 10-week research experience.",
      duration: "10 weeks",
      funding: "Full funding",
      deadline: "March 15, 2024",
      status: "Open",
      type: "Fellowship"
    },
    {
      id: 2,
      title: "Houston Early Research Experience (HERE)",
      description: "A two-week workshop to introduce students to research fundamentals, with a $1K scholarship.",
      duration: "2 weeks",
      funding: "$1,000 scholarship",
      deadline: "April 1, 2024",
      status: "Open",
      type: "Workshop"
    },
    {
      id: 3,
      title: "George 'Trey' Pharis Memorial Fellowship",
      description: "A 10-week, full-time research experience focused on data science approaches and health modeling.",
      duration: "10 weeks",
      funding: "Full fellowship",
      deadline: "February 28, 2024",
      status: "Open",
      type: "Fellowship"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Programs</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Special research programs and fellowships designed to support undergraduate researchers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {programs.map((program) => (
            <Card key={program.id} className="h-full bg-white shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="bg-purple-50 text-purple-700">
                    {program.type}
                  </Badge>
                  <Badge 
                    variant={program.status === "Open" ? "default" : "secondary"}
                    className={program.status === "Open" ? "bg-green-100 text-green-800" : ""}
                  >
                    {program.status}
                  </Badge>
                </div>
                
                <CardTitle className="text-xl text-gray-900 leading-tight">
                  {program.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-gray-700 text-sm mb-6">
                  {program.description}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{program.duration}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <DollarSign className="h-4 w-4" />
                    <span>{program.funding}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Deadline: {program.deadline}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Apply Now
                  </Button>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" size="lg" className="border-2">
            View All Programs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPrograms;
