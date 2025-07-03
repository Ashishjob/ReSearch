
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

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

export const useResearchOpportunities = () => {
  return useQuery({
    queryKey: ['research-opportunities'],
    queryFn: async (): Promise<ResearchOpportunity[]> => {
      const { data, error } = await supabase
        .from('research_opportunities')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching research opportunities:', error);
        throw error;
      }

      return data.map(opportunity => ({
        id: opportunity.id,
        title: opportunity.title,
        lab: opportunity.lab,
        professor: opportunity.professor,
        email: opportunity.email,
        description: opportunity.description,
        keywords: opportunity.keywords || [],
        category: opportunity.category,
        duration: opportunity.duration,
        funding: opportunity.funding,
        requirements: opportunity.requirements || [],
        is_active: opportunity.is_active,
        website: opportunity.website || null
      }));
    }
  });
};
