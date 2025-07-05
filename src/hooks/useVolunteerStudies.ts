import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type VolunteerStudy = {
  id: string;
  title: string;
  department: string;
  description?: string;
  location?: string;
  compensation_type?: string;
  compensation_details?: string;
  eligibility_criteria?: string;
  duration?: string;
  study_link?: string;
  contact_email?: string;
};

export default function useVolunteerStudies() {
  const [data, setData] = useState<VolunteerStudy[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("volunteer_studies")
      .select("*")
      .then(({ data, error }) => {
        if (error) console.error(error);
        else setData(data ?? []);
        setIsLoading(false);
      });
  }, []);

  return { data, isLoading };
}
