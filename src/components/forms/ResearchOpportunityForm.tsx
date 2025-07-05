import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface ResearchOpportunityFormData {
  title: string;
  lab: string;
  professor: string;
  email: string;
  description: string;
  keywords: string[];
  category: string;
  duration: string;
  funding: string;
  requirements: string[];
  website: string;
}

export default function ResearchOpportunityForm() {
  const [formData, setFormData] = useState({
    title: "",
    lab: "",
    professor: "",
    email: "",
    description: "",
    keywords: "",
    category: "",
    duration: "",
    funding: "",
    requirements: "",
    website: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { error } = await supabase.from("public_submissions").insert([
        {
          ...formData,
          type: "research",
          keywords: formData.keywords
            .split(",")
            .map((k) => k.trim())
            .filter(Boolean),
          requirements: formData.requirements
            .split(",")
            .map((r) => r.trim())
            .filter(Boolean),
        },
      ]);

      if (error) {
        console.error("Submission error:", error);
        alert("There was an error submitting your form.");
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("There was an unexpected error.");
    }
  };

  if (submitted) {
    return <p className="text-green-600 font-semibold">Thank you! Your submission has been received.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Title</Label>
        <Input name="title" value={formData.title} onChange={handleChange} required />
      </div>
      <div>
        <Label>Lab</Label>
        <Input name="lab" value={formData.lab} onChange={handleChange} required />
      </div>
      <div>
        <Label>Professor</Label>
        <Input name="professor" value={formData.professor} onChange={handleChange} required />
      </div>
      <div>
        <Label>Email</Label>
        <Input name="email" type="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea name="description" value={formData.description} onChange={handleChange} required />
      </div>
      <div>
        <Label>Keywords (comma separated)</Label>
        <Input name="keywords" value={formData.keywords} onChange={handleChange} />
      </div>
      <div>
        <Label>Category</Label>
        <Input name="category" value={formData.category} onChange={handleChange} />
      </div>
      <div>
        <Label>Duration</Label>
        <Input name="duration" value={formData.duration} onChange={handleChange} />
      </div>
      <div>
        <Label>Funding</Label>
        <Input name="funding" value={formData.funding} onChange={handleChange} />
      </div>
      <div>
        <Label>Requirements (comma separated)</Label>
        <Input name="requirements" value={formData.requirements} onChange={handleChange} />
      </div>
      <div>
        <Label>Website</Label>
        <Input name="website" value={formData.website} onChange={handleChange} />
      </div>
      <Button type="submit" className="mt-4 bg-blue-600 hover:bg-blue-700">
        Submit Research Opportunity
      </Button>
    </form>
  );
}
