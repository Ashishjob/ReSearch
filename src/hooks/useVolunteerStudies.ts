import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type VolunteerStudy = {
  // Replace these fields with the actual columns from your "volunteer_studies" table
  id: number;
  // name: string;
  // description: string;
  // Add other fields as needed
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
