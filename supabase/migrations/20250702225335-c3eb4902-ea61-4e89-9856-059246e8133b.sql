
-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  university TEXT DEFAULT 'University of Houston',
  department TEXT,
  year_of_study TEXT,
  major TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create research opportunities table
CREATE TABLE public.research_opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  lab TEXT NOT NULL,
  professor TEXT NOT NULL,
  email TEXT NOT NULL,
  description TEXT NOT NULL,
  keywords TEXT[] DEFAULT '{}',
  category TEXT NOT NULL,
  duration TEXT NOT NULL,
  funding TEXT,
  requirements TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create applications table
CREATE TABLE public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  opportunity_id UUID REFERENCES public.research_opportunities(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'accepted', 'rejected')),
  cover_letter TEXT,
  additional_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, opportunity_id)
);

-- Create saved opportunities table (for bookmarking)
CREATE TABLE public.saved_opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  opportunity_id UUID REFERENCES public.research_opportunities(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, opportunity_id)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_opportunities ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- RLS Policies for research opportunities (public read, admin write)
CREATE POLICY "Anyone can view active research opportunities" 
  ON public.research_opportunities FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Authenticated users can create research opportunities" 
  ON public.research_opportunities FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

CREATE POLICY "Users can update their own research opportunities" 
  ON public.research_opportunities FOR UPDATE 
  USING (true);

-- RLS Policies for applications
CREATE POLICY "Users can view their own applications" 
  ON public.applications FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own applications" 
  ON public.applications FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own applications" 
  ON public.applications FOR UPDATE 
  USING (auth.uid() = user_id);

-- RLS Policies for saved opportunities
CREATE POLICY "Users can view their own saved opportunities" 
  ON public.saved_opportunities FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can save opportunities" 
  ON public.saved_opportunities FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved opportunities" 
  ON public.saved_opportunities FOR DELETE 
  USING (auth.uid() = user_id);

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY definer SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email)
  );
  RETURN new;
END;
$$;

-- Trigger to create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Insert sample research opportunities (using your provided data)
INSERT INTO public.research_opportunities (title, lab, professor, email, description, keywords, category, duration, funding, requirements) VALUES
('AI Applications in Structural Engineering', 'Structures and Artificial Intelligence Lab (SAIL)', 'Dr. Vedhus Hoskere', 'vhoskere@central.uh.edu', 'Research in the broad area of artificial intelligence applications in structural engineering.', ARRAY['AI', 'Structural Engineering', 'Machine Learning'], 'ai', '1 semester', 'Available', ARRAY['Strong programming background', 'Interest in AI applications']),

('Machine Learning and Computer Vision Research', 'Houston Learning Algorithms Lab (HULA)', 'Dr. Hien Van Nguyen', 'hvnguy35@central.uh.edu', 'Machine learning, artificial intelligence, and computer vision research questions well-grounded in high-impact applications in medicine and autonomy.', ARRAY['Machine Learning', 'Computer Vision', 'Python'], 'ai', '1-2 semesters', 'Stipend available', ARRAY['Strong Python programming', 'Web development experience preferred']),

('Assistive Technology Development', 'UH BRAIN Center', 'Dr. Jose Luis Contreras-Vidal', 'jlcontreras-vidal@uh.edu', 'Develop and validate innovative technologies that address the needs of the world''s physically and neurologically impaired and the growing aging population.', ARRAY['Assistive Technology', 'Neuroscience', 'Engineering'], 'health', '1-2 semesters', 'Available', ARRAY['Interest in neuroscience', 'Engineering background']),

('Computer Vision and Pattern Recognition', 'Quantitative Imaging Lab (QIL)', 'Dr. Shishir Shah', 'sshah@central.uh.edu', 'Research focused on computer vision, image understanding, pattern recognition, and quantitative microscopy.', ARRAY['Computer Vision', 'Pattern Recognition', 'Image Processing'], 'ai', '1 semester', 'Research credit', ARRAY['Computer vision experience', 'Strong mathematical background']),

('Advanced X-ray Imaging Research', 'Das Laboratory', 'Dr. Mini Das', 'mdas@uh.edu', 'Research focuses on advanced X-ray imaging techniques and perception/image science, with additional projects in multimodality platforms for cancer research.', ARRAY['Medical Imaging', 'X-ray', 'Cancer Research'], 'health', '1-2 semesters', 'Available', ARRAY['Physics or engineering background', 'Interest in medical imaging']),

('Data Mining and Machine Learning', 'UH_DAIS Research Lab', 'Prof. Christoph Eick', 'ceick@uh.edu', 'Research focuses on data mining, machine learning, data analysis, and optimization problems.', ARRAY['Data Mining', 'Machine Learning', 'Optimization'], 'data', '1 semester', 'Research credit', ARRAY['Programming experience', 'Statistics background']),

('Security and Deception Detection', 'Reasoning and Data Analytics for Security (ReDAS)', 'Prof. Rakesh Verma', 'rmverma@cs.uh.edu', 'Research on deception-based attacks like spearphishing and fake news, using ML and NLP techniques.', ARRAY['Cybersecurity', 'NLP', 'Machine Learning'], 'ai', '1-2 semesters', 'Available', ARRAY['Security interest', 'ML/NLP experience']),

('Scalable Machine Learning Systems', 'Big Data Systems (BDS) Group', 'Robin Varghese', 'rsvarghese99@gmail.com', 'Research focuses on scalable algorithms for machine learning, data analysis, and graph processing.', ARRAY['Big Data', 'Scalable Systems', 'Graph Processing'], 'data', '1 semester', 'Research credit', ARRAY['Distributed systems knowledge', 'Programming skills']),

('Human Behavior Computing', 'Affective & Data Computing Lab (ACDC)', 'Prof. Ioannis Pavlidis', 'ipavlidis@uh.edu', 'Conducts naturalistic studies on human behavior related to driving and computer interaction.', ARRAY['Human-Computer Interaction', 'Behavioral Analysis', 'Data Science'], 'data', '1-2 semesters', 'Stipend available', ARRAY['Data analysis skills', 'Interest in human behavior']),

('Medical Robotics Research', 'Medical Robotics Laboratory', 'Prof. Nikolaos Tsekos', 'ntsekos@uh.edu', 'Advances minimally invasive robot-assisted surgeries using cyber-physical systems and multimodality imaging.', ARRAY['Medical Robotics', 'Cyber-Physical Systems', 'Imaging'], 'robotics', '1-2 semesters', 'Available', ARRAY['Robotics background', 'Medical interest']),

('Natural Language Processing', 'Research in Text Understanding and Analysis of Language (RiTUAL)', 'Prof. Thamar Solorio', 'solorio@cs.uh.edu', 'Research areas include NLP, stylistic analysis of text, and multimodal NLP.', ARRAY['NLP', 'Text Analysis', 'Multimodal'], 'ai', '1 semester', 'Research credit', ARRAY['NLP experience', 'Programming skills']),

('Software Engineering Research', 'Software Engineering Research Group', 'Dr. Mohammad Amin Alipour', 'maalipou@central.uh.edu', 'Develops tools and techniques for building reliable software systems.', ARRAY['Software Engineering', 'System Reliability', 'Tools Development'], 'engineering', '1-2 semesters', 'Available', ARRAY['Software development experience', 'System design knowledge']),

('Wireless and Sensor Networks', 'Networked Systems Laboratory', 'Prof. Omprakash Gnawali', 'gnawali@cs.uh.edu', 'Research on wireless and sensor networks, social networks, and distributed systems.', ARRAY['Wireless Networks', 'Sensor Networks', 'Distributed Systems'], 'engineering', '1 semester', 'Research credit', ARRAY['Networking knowledge', 'Systems programming']),

('Computer Graphics and Animation', 'Computer Graphics and Interactive Media Lab', 'Prof. Zhigang Deng', 'zdeng4@central.uh.edu', 'Research areas include computer animation, virtual human modeling, and human-AI interaction.', ARRAY['Computer Graphics', 'Animation', 'Human-AI Interaction'], 'ai', '1-2 semesters', 'Available', ARRAY['Graphics programming', '3D modeling experience']),

('Augmented Reality Research', 'CougAR Lab', 'Dr. Tony Liao', 'tcliao@uh.edu', 'Studies augmented reality technologies from a social science perspective.', ARRAY['Augmented Reality', 'Social Science', 'HCI'], 'engineering', '1 semester', 'Research credit', ARRAY['AR/VR interest', 'Social science background']);
