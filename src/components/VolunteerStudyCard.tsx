import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, DollarSign, MapPin, Heart, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useSavedItems } from "@/hooks/useSavedItems";
import { useToast } from "@/components/ui/use-toast";

export interface VolunteerStudy {
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

interface VolunteerStudyCardProps {
  study: VolunteerStudy;
}

export default function VolunteerStudyCard({ study }: VolunteerStudyCardProps) {
  const { toggleSave, isSaved } = useSavedItems("volunteer");
  const saved = isSaved(study.id);
  const { toast } = useToast();

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = window.location.origin + `/volunteer/${study.id}`; // or `/volunteer/${study.id}`
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: "Link copied!",
        description: "The page link has been copied to your clipboard.",
        duration: 3000,
      });
    });
  };

  if (!study || !study.id) {
    return null;
  }
  return (
    <Link to={`/volunteer/${study.id}`}>
      <Card className="relative h-full flex flex-col justify-between hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white border-gray-200">
        <CardHeader className="pb-4">
          <Badge variant="outline" className="text-xs mb-2 w-fit">
            Volunteer Study
          </Badge>

          <Button
          onClick={(e) => {
            e.preventDefault();
            toggleSave(study.id);
          }}
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 text-red-500 hover:text-red-600"
        >
          {saved ? <Heart fill="currentColor" /> : <Heart />}
        </Button>

          <CardTitle className="text-xl text-gray-900 leading-tight">
            {study.title}
          </CardTitle>

          <CardDescription className="text-gray-600 mt-1">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{study.department}</span>
            </div>
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col flex-grow pt-0">
          {study.description && (
            <div className="text-gray-700 text-sm mb-4 line-clamp-3">
              {study.description}
            </div>
          )}

          <div className="flex flex-col gap-2 text-sm text-gray-600 mb-4">
            {study.duration && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{study.duration}</span>
              </div>
            )}
            {study.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{study.location}</span>
              </div>
            )}
            {study.compensation_details && (
              <div className="flex items-center gap-1 text-green-700 font-medium">
                <DollarSign className="h-4 w-4" />
                <span>{study.compensation_details}</span>
              </div>
            )}
          </div>

          {study.eligibility_criteria && (
            <div className="text-xs text-gray-500 italic mb-4">
              Eligibility: {study.eligibility_criteria}
            </div>
          )}

          <div className="mt-auto space-y-2">
            {study.study_link && (
              <a href={study.study_link} target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-blue-600 hover:bg-blue-700" size="sm">
                  Learn More
                </Button>
              </a>
            )}
            {study.contact_email && (
              <a href={`mailto:${study.contact_email}`}>
                <Button variant="outline" className="w-full mt-2" size="sm">
                  Contact Study Coordinator
                </Button>
              </a>
            )}

            <Button onClick={handleShare} variant="outline" size="icon" className="w-full text-gray-500 hover:text-blue-600">
              Share <Share2 className="w-2 h-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
