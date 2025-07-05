import { useParams } from "react-router-dom";
import { useResearchOpportunities } from "@/hooks/useResearchOpportunities";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Mail } from "lucide-react";
import { useState } from "react";
import { useSavedItems } from "@/hooks/useSavedItems";
import { Heart } from "lucide-react";

export default function ResearchDetail() {
  const { id } = useParams();
  const { data: opportunities } = useResearchOpportunities();
  const [showOGPreview, setShowOGPreview] = useState(true);
  const { toggleSave, isSaved } = useSavedItems("research");
  
  const opportunity = opportunities?.find((o) => o.id === id);
  const saved = isSaved(opportunity.id);

  if (!opportunity) return <p className="p-6 text-gray-500">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-3xl font-bold text-gray-900">{opportunity.title}</h1>
        <Button
          onClick={(e) => {
            e.preventDefault(); // Prevent Link navigation
            toggleSave(opportunity.id);
          }}
          variant="ghost"
          size="icon"
          className="text-red-500 hover:text-red-600"
        >
          {saved ? <Heart fill="currentColor" /> : <Heart />}
        </Button>
      </div>
      <p className="text-sm text-gray-600 mb-2">
        <span className="font-medium">{opportunity.professor}</span> | {opportunity.lab}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="outline">{opportunity.category}</Badge>
        {opportunity.is_active ? (
          <Badge className="bg-green-100 text-green-800">Open</Badge>
        ) : (
          <Badge className="bg-red-100 text-red-800">Closed</Badge>
        )}
      </div>

      <p className="mb-6 text-gray-700 whitespace-pre-wrap">{opportunity.description}</p>

      <div className="grid gap-4 mb-6 text-sm text-gray-700">
        {opportunity.duration && (
          <div>
            <span className="font-semibold">Duration:</span> {opportunity.duration}
          </div>
        )}
        {opportunity.funding && (
          <div>
            <span className="font-semibold">Funding:</span> {opportunity.funding}
          </div>
        )}
        {opportunity.requirements?.length > 0 && (
          <div>
            <span className="font-semibold">Requirements:</span>{" "}
            <ul className="list-disc list-inside mt-1">
              {opportunity.requirements.map((req, idx) => (
                <li key={idx}>{req}</li>
              ))}
            </ul>
          </div>
        )}
        {opportunity.keywords?.length > 0 && (
          <div>
            <span className="font-semibold">Keywords:</span>{" "}
            <div className="flex flex-wrap gap-2 mt-1">
              {opportunity.keywords.map((keyword, idx) => (
                <Badge key={idx} variant="secondary">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 border-t pt-6">
        <h2 className="text-xl font-semibold mb-2">Get Involved</h2>
        <p className="text-sm text-gray-500 mb-4">
          Click below to explore tips on how to email professors effectively.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            asChild
            variant="outline"
            className="text-sm hover:cursor-pointer"
            onClick={() => window.open("/email-tips", "_blank")}
          >
            <span>Read Email Tips</span>
          </Button>

          <a href={`mailto:${opportunity.email}`}>
            <Button variant="default" className="text-sm" size="sm">
              <Mail className="w-4 h-4 mr-1" />
              Contact Professor
            </Button>
          </a>

          {opportunity.website && (
            <a href={opportunity.website} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="text-sm" size="sm">
                <ExternalLink className="w-4 h-4 mr-1" />
                Visit Website
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
