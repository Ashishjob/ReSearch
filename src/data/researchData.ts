
export interface ResearchOpportunity {
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
  isActive: boolean;
}

export const researchOpportunities: ResearchOpportunity[] = [
  {
    id: "sail-1",
    title: "AI Applications in Structural Engineering",
    lab: "Structures and Artificial Intelligence Lab (SAIL)",
    professor: "Dr. Vedhus Hoskere",
    email: "vhoskere@central.uh.edu",
    description: "Research opportunities in the broad area of artificial intelligence applications in structural engineering. Work on cutting-edge projects that combine structural analysis with machine learning techniques.",
    keywords: ["Artificial Intelligence", "Structural Engineering", "Machine Learning", "Civil Engineering"],
    category: "ai",
    duration: "Semester/Summer",
    requirements: ["Strong academic performance", "Interest in AI and structures"],
    isActive: true
  },
  {
    id: "hula-1",
    title: "Machine Learning for Medical Applications",
    lab: "Houston Learning Algorithms Lab (HULA)",
    professor: "Dr. Hien Van Nguyen",
    email: "hvnguy35@central.uh.edu",
    description: "Join our passionate team solving important machine learning, artificial intelligence, and computer vision research questions well-grounded in high-impact applications in medicine and autonomy.",
    keywords: ["Machine Learning", "Computer Vision", "Medical AI", "Python", "Deep Learning"],
    category: "ai",
    duration: "Flexible",
    requirements: ["Strong Python programming", "Web development background preferred"],
    isActive: true
  },
  {
    id: "brain-1",
    title: "Assistive Technology Development",
    lab: "UH BRAIN Center",
    professor: "Dr. Jose Luis Contreras-Vidal",
    email: "jlcontreras-vidal@uh.edu",
    description: "Partner with us to develop and validate innovative technologies that address the needs of the world's physically and neurologically impaired and the growing aging population.",
    keywords: ["Assistive Technology", "Neuroscience", "Rehabilitation", "Brain-Computer Interface"],
    category: "health",
    duration: "Semester/Year",
    funding: "Possible funding available",
    requirements: ["Interest in neuroscience", "Engineering background helpful"],
    isActive: true
  },
  {
    id: "qil-1",
    title: "Computer Vision and Pattern Recognition",
    lab: "The Quantitative Imaging Lab (QIL)",
    professor: "Dr. Shishir Shah",
    email: "sshah@central.uh.edu",
    description: "Focused on basic and applied research in computer vision, image understanding, pattern recognition, and quantitative microscopy. Work on projects that advance the field of visual computing.",
    keywords: ["Computer Vision", "Pattern Recognition", "Image Processing", "Microscopy"],
    category: "ai",
    duration: "Semester/Summer",
    requirements: ["Programming experience", "Math background"],
    isActive: true
  },
  {
    id: "das-1",
    title: "Advanced X-ray Imaging Research",
    lab: "Das Laboratory",
    professor: "Dr. Mini Das",
    email: "mdas@uh.edu",
    description: "Research focuses on advanced X-ray imaging techniques and perception/image science, with additional projects in multimodality platforms for cancer research.",
    keywords: ["Medical Imaging", "X-ray", "Cancer Research", "Image Science"],
    category: "health",
    duration: "Semester/Summer",
    requirements: ["Physics or engineering background", "Interest in medical imaging"],
    isActive: true
  },
  {
    id: "dais-1",
    title: "Data Mining and Optimization",
    lab: "UH_DAIS Research Lab",
    professor: "Prof. Christoph Eick",
    email: "ceick@uh.edu",
    description: "Focuses on data mining, machine learning, data analysis, and optimization problems. Work on real-world applications of data science techniques.",
    keywords: ["Data Mining", "Machine Learning", "Optimization", "Data Analysis"],
    category: "data",
    duration: "Semester/Summer",
    requirements: ["Programming skills", "Statistics background helpful"],
    isActive: true
  },
  {
    id: "redas-1",
    title: "Security and Deception Detection",
    lab: "Reasoning and Data Analytics for Security (ReDAS)",
    professor: "Prof. Rakesh Verma",
    email: "rmverma@cs.uh.edu",
    description: "Research on deception-based attacks like spearphishing and fake news, using ML and NLP techniques to detect and prevent security threats.",
    keywords: ["Cybersecurity", "Machine Learning", "NLP", "Phishing Detection", "Fake News"],
    category: "ai",
    duration: "Semester/Summer",
    requirements: ["Programming experience", "Interest in security"],
    isActive: true
  },
  {
    id: "bds-1",
    title: "Big Data Systems and Analytics",
    lab: "Big Data Systems (BDS) Group",
    professor: "Dr. Robin Varghese / Dr. Xiantian Zhou",
    email: "rsvarghese99@gmail.com",
    description: "Focuses on scalable algorithms for machine learning, data analysis, and graph processing. Work on systems that can handle massive datasets efficiently.",
    keywords: ["Big Data", "Scalable Systems", "Graph Processing", "Distributed Computing"],
    category: "data",
    duration: "Semester/Summer",
    requirements: ["Strong programming skills", "Systems knowledge helpful"],
    isActive: true
  },
  {
    id: "acdc-1",
    title: "Human Behavior Computing",
    lab: "Affective & Data Computing Lab (ACDC)",
    professor: "Prof. Ioannis Pavlidis",
    email: "ipavlidis@uh.edu",
    description: "Conducts naturalistic studies on human behavior related to driving and computer interaction. Research at the intersection of psychology and computing.",
    keywords: ["Human Behavior", "Affective Computing", "Driver Behavior", "HCI"],
    category: "ai",
    duration: "Semester/Summer",
    requirements: ["Interest in psychology", "Programming skills"],
    isActive: true
  },
  {
    id: "ics-1",
    title: "Interactive Educational Video Systems",
    lab: "Indexed Captioned Searchable (ICS) Videos",
    professor: "Prof. Jaspal Subhlok",
    email: "jaspal@uh.edu",
    description: "Converts classroom lecture videos into interactive resources with automatic indexing and captioning. Improve educational technology through video analysis.",
    keywords: ["Educational Technology", "Video Processing", "Automatic Captioning", "E-Learning"],
    category: "ai",
    duration: "Semester/Summer",
    requirements: ["Programming skills", "Interest in education"],
    isActive: true
  },
  {
    id: "medrobot-1",
    title: "Medical Robotics and Imaging",
    lab: "Medical Robotics Laboratory",
    professor: "Prof. Nikolaos Tsekos",
    email: "ntsekos@uh.edu",
    description: "Advances minimally invasive robot-assisted surgeries using cyber-physical systems and multimodality imaging. Work on the future of surgical robotics.",
    keywords: ["Medical Robotics", "Surgical Systems", "Medical Imaging", "Cyber-Physical Systems"],
    category: "robotics",
    duration: "Semester/Summer",
    funding: "Possible research assistantship",
    requirements: ["Engineering background", "Interest in robotics"],
    isActive: true
  },
  {
    id: "ritual-1",
    title: "Natural Language Processing Research",
    lab: "Research in Text Understanding and Analysis of Language (RiTUAL)",
    professor: "Prof. Thamar Solorio",
    email: "solorio@cs.uh.edu",
    description: "Research areas include NLP, stylistic analysis of text, and multimodal NLP. Work on cutting-edge language understanding technologies.",
    keywords: ["Natural Language Processing", "Text Analysis", "Multimodal NLP", "Language Understanding"],
    category: "ai",
    duration: "Semester/Summer",
    requirements: ["Programming skills", "Interest in linguistics"],
    isActive: true
  },
  {
    id: "serg-1",
    title: "Software Engineering and Reliability",
    lab: "Software Engineering Research Group at UH",
    professor: "Dr. Mohammad Amin Alipour",
    email: "maalipou@central.uh.edu",
    description: "Develops tools and techniques for building reliable software systems. Research focuses on software testing, debugging, and program analysis.",
    keywords: ["Software Engineering", "Software Testing", "Program Analysis", "Software Reliability"],
    category: "engineering",
    duration: "Semester/Summer",
    requirements: ["Strong programming skills", "Software development experience"],
    isActive: true
  },
  {
    id: "nsl-1",
    title: "Networked Systems and IoT",
    lab: "Networked Systems Laboratory",
    professor: "Prof. Omprakash Gnawali",
    email: "gnawali@cs.uh.edu",
    description: "Researches wireless and sensor networks, social networks, and distributed systems. Work on the next generation of connected systems.",
    keywords: ["Wireless Networks", "IoT", "Sensor Networks", "Distributed Systems"],
    category: "engineering",
    duration: "Semester/Summer",
    requirements: ["Networking knowledge", "Programming skills"],
    isActive: true
  },
  {
    id: "wireless-1",
    title: "Wireless Communication and Security",
    lab: "Wireless Networking, Signal Processing and Security",
    professor: "Prof. Zhu Han",
    email: "zhan2@uh.edu",
    description: "Focuses on wireless networking, signal processing, and security. Research on 5G/6G networks, edge computing, and wireless security.",
    keywords: ["Wireless Communication", "Signal Processing", "Network Security", "5G/6G"],
    category: "engineering",
    duration: "Semester/Summer",
    requirements: ["Signal processing background", "Mathematics skills"],
    isActive: true
  },
  {
    id: "cgim-1",
    title: "Computer Graphics and Human-AI Interaction",
    lab: "Computer Graphics and Interactive Media Lab",
    professor: "Prof. Zhigang Deng",
    email: "zdeng4@central.uh.edu",
    description: "Research areas include computer animation, virtual human modeling, and human-AI interaction. Create the next generation of interactive media.",
    keywords: ["Computer Graphics", "Animation", "Virtual Reality", "Human-AI Interaction"],
    category: "ai",
    duration: "Semester/Summer",
    requirements: ["Programming skills", "Interest in graphics"],
    isActive: true
  },
  {
    id: "cougar-1",
    title: "Augmented Reality Social Research",
    lab: "CougAR Lab",
    professor: "Dr. Tony Liao",
    email: "tcliao@uh.edu",
    description: "Studies augmented reality technologies from a social science perspective. Examine how AR impacts society and human behavior.",
    keywords: ["Augmented Reality", "Social Science", "Human Behavior", "Technology Impact"],
    category: "ai",
    duration: "Semester/Summer",
    requirements: ["Interest in social science", "Research experience helpful"],
    isActive: true
  }
];
