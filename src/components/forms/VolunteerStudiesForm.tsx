import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface VolunteerStudyFormData {
  title: string;
  department?: string;
  description: string;
  location?: string;
  compensation_type?: string; 
  compensation_details?: string;
  eligibility_criteria?: string;
  duration?: string; 
  study_link?: string; 
  contact_email: string;
}

export default function VolunteerStudyForm() {
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    description: "",
    location: "",
    compensation_type: "",
    compensation_details: "",
    eligibility_criteria: "",
    duration: "",
    study_link: "",
    contact_email: "",
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
          type: "volunteer",
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
        <Label>Department</Label>
        <Input name="department" value={formData.department} onChange={handleChange} />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea name="description" value={formData.description} onChange={handleChange} required />
      </div>
      <div>
        <Label>Location</Label>
        <Input name="location" value={formData.location} onChange={handleChange} />
      </div>
      <div>
        <Label>Compensation Type</Label>
        <Input
          name="compensation_type"
          value={formData.compensation_type}
          onChange={handleChange}
          placeholder="paid, raffle, or volunteer"
        />
      </div>
      <div>
        <Label>Compensation Details</Label>
        <Input name="compensation_details" value={formData.compensation_details} onChange={handleChange} />
      </div>
      <div>
        <Label>Eligibility Criteria</Label>
        <Textarea name="eligibility_criteria" value={formData.eligibility_criteria} onChange={handleChange} />
      </div>
      <div>
        <Label>Duration</Label>
        <Input name="duration" value={formData.duration} onChange={handleChange} />
      </div>
      <div>
        <Label>Study Link</Label>
        <Input name="study_link" value={formData.study_link} onChange={handleChange} />
      </div>
      <div>
        <Label>Contact Email</Label>
        <Input name="contact_email" value={formData.contact_email} onChange={handleChange} type="email" required />
      </div>

      <Button type="submit" className="mt-4 bg-blue-600 hover:bg-blue-700">
        Submit Volunteer Study
      </Button>
    </form>
  );
}
