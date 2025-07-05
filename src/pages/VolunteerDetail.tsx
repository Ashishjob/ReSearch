import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Mail, Calendar, MapPin, DollarSign } from "lucide-react";
import useVolunteerStudies from "@/hooks/useVolunteerStudies";
import { useSavedItems } from "@/hooks/useSavedItems";
import { Heart, Share2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface VolunteerStudy {
  id: string;
  title: string;
  department?: string;
  description?: string;
  location?: string;
  compensation_type?: "paid" | "raffle" | "volunteer";
  compensation_details?: string;
  eligibility_criteria?: string;
  duration?: string;
  study_link?: string;
  contact_email?: string;
}

export default function VolunteerStudyDetail() {
  const { id } = useParams();
  const { data: studies } = useVolunteerStudies();
  const { toggleSave, isSaved } = useSavedItems("volunteer");
  const {toast} = useToast();

  const study = studies?.find((s) => String(s.id) === id) as unknown as VolunteerStudy | undefined;

  const handleShare = () => {
    const url = `${window.location.origin}/volunteer/${study.id}`;
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: "Link copied!",
        description: "The study link has been copied to your clipboard.",
        duration: 3000,
      });
    });
  };

  if (!study) return <p className="p-6 text-gray-500">Loading...</p>;
  const saved = isSaved(study.id);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex justify-between items-start mb-4">
  <h1 className="text-3xl font-bold text-gray-900">{study.title}</h1>
  <Button
    onClick={(e) => {
      e.preventDefault(); // Prevent Link navigation
      toggleSave(study.id);
    }}
    variant="ghost"
    size="icon"
    className="text-red-500 hover:text-red-600"
  >
    {saved ? <Heart fill="currentColor" /> : <Heart />}
  </Button>
</div>


      {study.department && (
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-medium">Department:</span> {study.department}
        </p>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="outline">Volunteer Study</Badge>
        {study.compensation_type && (
          <Badge variant="secondary" className="capitalize">
            {study.compensation_type}
          </Badge>
        )}
      </div>

      {study.description && (
        <p className="mb-6 text-gray-700 whitespace-pre-wrap">{study.description}</p>
      )}

      <div className="grid gap-4 mb-6 text-sm text-gray-700">
        {study.duration && (
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span>
              <strong>Duration:</strong> {study.duration}
            </span>
          </div>
        )}

        {study.location && (
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span>
              <strong>Location:</strong> {study.location}
            </span>
          </div>
        )}

        {study.compensation_details && (
          <div className="flex items-center gap-2 text-green-700">
            <DollarSign className="w-4 h-4" />
            <span>
              <strong>Compensation:</strong> {study.compensation_details}
            </span>
          </div>
        )}

        {study.eligibility_criteria && (
          <div>
            <strong>Eligibility:</strong>
            <p className="mt-1 text-gray-600">{study.eligibility_criteria}</p>
          </div>
        )}
      </div>

      <div className="mt-8 border-t pt-6">
        <h2 className="text-xl font-semibold mb-2">How to Participate</h2>
        <p className="text-sm text-gray-500 mb-4">
          Use the options below to learn more or contact the coordinator.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          {study.study_link && (
            <a href={study.study_link} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="text-sm w-full" size="sm">
                <ExternalLink className="w-4 h-4 mr-1" />
                Study Website
              </Button>
            </a>
          )}

          {study.contact_email && (
            <a href={`mailto:${study.contact_email}`}>
              <Button variant="default" className="text-sm w-full" size="sm">
                <Mail className="w-4 h-4 mr-1" />
                Contact Coordinator
              </Button>
            </a>
          )}

          <Button
            onClick={handleShare}
            variant="outline"
            className="text-sm"
            size="sm"
          >
            <Share2 className="w-4 h-4 mr-1" />
            Share Study
          </Button>

        </div>
      </div>
    </div>
  );
}
