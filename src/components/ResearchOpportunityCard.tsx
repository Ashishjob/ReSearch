
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Users, Calendar, BookOpen } from "lucide-react";

interface ResearchOpportunity {
  id: string;
  title: string;
  lab: string;
  professor: string;
  email: string;
  description: string;
  keywords: string[];
  category: string;
  duration: string;
  funding?: string;
  requirements: string[];
  is_active: boolean;
  website?: string;
}

interface ResearchOpportunityCardProps {
  opportunity: ResearchOpportunity;
}

const ResearchOpportunityCard = ({ opportunity }: ResearchOpportunityCardProps) => {
  if (!opportunity || !opportunity.is_active) {
    return null;
  }
  return (
    <Card className="h-full flex flex-col justify-between hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white border-gray-200">
  <CardHeader className="pb-4">
    <div className="flex justify-between items-start mb-2">
      <Badge variant="outline" className="text-xs">
        {opportunity.category.toUpperCase()}
      </Badge>
    </div>

    <CardTitle className="text-xl text-gray-900 leading-tight">
      {opportunity.title}
    </CardTitle>

    <CardDescription className="text-gray-600">
      <div className="flex items-center gap-1 mb-1">
        <BookOpen className="h-4 w-4" />
        <span className="font-medium">{opportunity.lab}</span>
      </div>
      <div className="flex items-center gap-1">
        <Users className="h-4 w-4" />
        <span>{opportunity.professor}</span>
      </div>
    </CardDescription>
  </CardHeader>

  <CardContent className="flex flex-col flex-grow pt-0">
    <div className="text-gray-700 text-sm mb-4 line-clamp-3">
      {opportunity.description}
    </div>

    <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
      <Calendar className="h-4 w-4" />
      <span>{opportunity.duration}</span>
      {opportunity.funding && (
        <>
          <span>•</span>
          <span className="text-green-600 font-medium">{opportunity.funding}</span>
        </>
      )}
    </div>

    <div className="flex flex-wrap gap-1 mb-4">
      {opportunity.keywords.slice(0, 3).map((keyword, index) => (
        <Badge key={index} variant="secondary" className="text-xs bg-blue-50 text-blue-700">
          {keyword}
        </Badge>
      ))}
      {opportunity.keywords.length > 3 && (
        <Badge variant="secondary" className="text-xs">
          +{opportunity.keywords.length - 3} more
        </Badge>
      )}
    </div>

    <div className="mt-auto space-y-2">
      <a href={opportunity.website || "#"} target="_blank" rel="noopener noreferrer">
        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700" 
          size="sm"
          disabled={!opportunity.website}
        >
          Learn More
        </Button>
      </a>
      <a href={`mailto:${opportunity.email}`}>
        <Button 
          variant="outline" 
          className="w-full mt-2" 
          size="sm"
        >
          Contact {opportunity.professor.split(' ')[3] || opportunity.professor}
        </Button>
      </a>
    </div>
  </CardContent>
</Card>

  );
};

export default ResearchOpportunityCard;
