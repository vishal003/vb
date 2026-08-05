// ══════════════════════════════════════════════════════════════
// Dr. Vishal S. Badgujar — Portfolio Data Layer
// ══════════════════════════════════════════════════════════════

export const DEFAULT_DATA = {
  personal: {
    name: "Dr. Vishal S. Badgujar",
    firstName: "Dr. Vishal S. Badgujar",
    lastName: "Badgujar",
    title: "Assistant Professor (PhD)",
    department: "Information Technology",
    institution: "A.P. Shah Institute of Technology, Thane",
    university: "Mumbai University, India",
    photo: "/images/gallery/vishal.png",
    email: "vishalbadgujar4@gmail.com",
    phone: "+91 7709933639",
    address: "D-204, Mahaveer Nagari-1 CHS, Khadakpada, Kalyan West, Maharashtra, India",
    institutionAddress: "A.P. Shah Institute of Technology, Thane, Mumbai University, India",
    languages: ["English", "Hindi", "Marathi"],
    nationality: "Indian",
    bio: "Dedicated academician and researcher with over 11 years of teaching and research experience in Computer Engineering and Information Technology. Research focus on Cyber Security, Artificial Intelligence, DevOps, Cloud Computing, and Open-Source Technologies. IEEE Senior Member with 200+ Google Scholar citations, multiple Scopus indexed publications, two authored books, patents, copyrights, and active reviewer for several Elsevier and Springer journals.",
    objective: "To utilize my technical knowledge and expertise in the field of Computer Engineering and allied streams wherein I can explore new opportunities in research and development.",
    typingTexts: [
      "Assistant Professor (PhD)",
      "IEEE Senior Member",
      "Cyber Security Researcher",
      "AI & ML Enthusiast",
      "DevOps & Cloud Expert",
      "Open-Source Advocate"
    ],
    cvFile: "/cv/Dr_Vishal_Badgujar_Academic_CV.pdf",
    linkedinUrl: "https://linkedin.com/in/vishalbadgujar",
    websiteUrl: "https://sites.google.com/view/vishalbadgujar"
  },

  socialLinks: {
    linkedin: "https://linkedin.com/in/vishalbadgujar",
    googleScholar: "https://scholar.google.co.in/citations?hl=en&pli=1&user=CHbeaF0AAAAJ",
    scopus: "https://www.scopus.com/authid/detail.uri?authorId=57205288144",
    orcid: "https://orcid.org/0000-0002-8265-4168",
    website: "https://sites.google.com/view/vishalbadgujar"
  },

  researchProfiles: [
    { id: "rp1", name: "Google Scholar", url: "https://scholar.google.co.in/citations?hl=en&pli=1&user=CHbeaF0AAAAJ", icon: "google-scholar", color: "#4285F4", description: "200+ Citations, H-Index: 6" },
    { id: "rp2", name: "Scopus", url: "https://www.scopus.com/authid/detail.uri?authorId=57205288144", icon: "scopus", color: "#E9711C", description: "Author ID: 57205288144" },
    { id: "rp3", name: "ORCID", url: "https://orcid.org/0000-0002-8265-4168", icon: "orcid", color: "#A6CE39", description: "0000-0002-8265-4168" },
    { id: "rp4", name: "Web of Science", url: "https://www.webofscience.com/wos/author/record/L-7930-2018", icon: "wos", color: "#5C2D91", description: "ID: L-7930-2018, H-Index: 3" },
    { id: "rp5", name: "VIDWAN", url: "https://vidwan.inflibnet.ac.in/profile/379828", icon: "vidwan", color: "#0077B6", description: "ID: 379828" },
    { id: "rp6", name: "LinkedIn", url: "https://linkedin.com/in/vishalbadgujar", icon: "linkedin", color: "#0A66C2", description: "Professional Network" }
  ],

  stats: {
    publications: 24,
    citations: 200,
    hIndex: 6,
    i10Index: 5,
    yearsExperience: 11,
    patents: 2,
    copyrights: 5,
    books: 2,
    conferences: 21
  },

  areasOfInterest: [
    "Cyber Security",
    "Artificial Intelligence & Machine Learning",
    "DevOps & Cloud Automation",
    "Open-Source Technologies",
    "Big Data Analytics",
    "Cloud Computing"
  ],

  education: [
    { id: "edu1", degree: "Ph.D. in Computer Engineering", specialization: "Risk Level Analysis of AI-Based Open-Source Architecture", institution: "University of Mumbai", year: "2026", description: "Thesis: Risk Level Analysis of AI-Based Open-Source Architecture. Supervisor: Dr. Chandrashekhar Raut" },
    { id: "edu2", degree: "M.E. in Computer Engineering", specialization: "Computer Engineering", institution: "University of Mumbai", year: "2014", description: "Master of Engineering in Computer Engineering." },
    { id: "edu3", degree: "B.E. in Information Technology", specialization: "Information Technology", institution: "North Maharashtra University", year: "2011", description: "Bachelor of Engineering in Information Technology." },
    { id: "edu4", degree: "Higher Secondary School (HSC)", specialization: "Science", institution: "Nasik Board", year: "2007", description: "" },
    { id: "edu5", degree: "Secondary School Certificate (SSC)", specialization: "", institution: "Aurangabad Board", year: "2005", description: "" }
  ],

  experience: [
    { id: "exp1", role: "Assistant Professor", organization: "A.P. Shah Institute of Technology, Thane", duration: "July 2023 – Present", type: "Teaching", description: "Teaching and research in IT department. UG Project Coordinator, NBA Criteria 7 Incharge, NPTEL SPOC, DevOps Club & Red Hat Academy coordinator.", responsibilities: ["UG Project Coordinator – IT Department", "NBA Accreditation Criteria 7 Incharge", "NPTEL Local Chapter SPOC", "Faculty Coordinator – DevOps Club & Red Hat Academy", "Smart India Hackathon Mentor & Evaluator"] },
    { id: "exp2", role: "Senior IT Faculty", organization: "iNurture Education Solutions Pvt. Ltd", duration: "Nov 2022 – July 2023", type: "Teaching", description: "Senior faculty for IT education programs and curriculum delivery.", responsibilities: ["Curriculum delivery", "Student mentoring"] },
    { id: "exp3", role: "Assistant Professor", organization: "Vishwakarma University, Pune", duration: "Aug 2022 – Oct 2022", type: "Teaching", description: "Teaching undergraduate courses in Computer Engineering.", responsibilities: ["Lecture delivery", "Academic activities"] },
    { id: "exp4", role: "Assistant Professor", organization: "A.P. Shah Institute of Technology, Thane", duration: "July 2015 – June 2022", type: "Teaching", description: "7 years of teaching and research. Active contributions in NBA accreditation, hackathons, and institutional development.", responsibilities: ["Teaching UG courses", "Research guidance", "NBA and AICTE committee work", "Technical event organization"] },
    { id: "exp5", role: "Assistant Professor", organization: "PVPPCOE", duration: "Jan 2015 – May 2015", type: "Teaching", description: "Teaching undergraduate engineering courses.", responsibilities: ["Lecture delivery", "Practical sessions"] }
  ],

  publications: {
    journals: [
      { id: "pub_j1", title: "MAOMLB: Advancing Malware Analysis with AI-Based Open-Source Architecture Integrating Machine Learning and Behavioral Techniques", authors: "Badgujar, V.S., Raut, C.M.", journal: "Journal of Applied Research and Technology", year: "2025", indexed: "Scopus (Q3)" },
      { id: "pub_j2", title: "RNN Based Rapid Threat Detection and Response System", authors: "Badgujar, V., Raut, C.", journal: "Industrial Engineering Journal", year: "", indexed: "UGC CARE Group-1" },
      { id: "pub_j3", title: "Secrets of Mind Map in Education", authors: "Badgujar, V., Raut, C.", journal: "Industrial Engineering Journal", year: "", indexed: "UGC CARE Group-1" }
    ],
    conferences: [
      { id: "pub_c1", title: "BAOSAML: Behavioral AI-Based Open-Source Architecture for Malware Analysis Using Machine Learning", authors: "V. Badgujar et al.", conference: "Springer LNNS", indexed: "Springer" },
      { id: "pub_c2", title: "Deep Learning Based Hierarchical Attention Mechanism for Risk Prediction", authors: "V. Badgujar et al.", conference: "Springer LNNS", indexed: "Springer" },
      { id: "pub_c3", title: "VSecureSphere: Developing Virtual Lab for Simulating Safe Environment for Multiple Cyber-Attack Patterns", authors: "V. Badgujar et al.", conference: "Springer LNEE", indexed: "Springer" },
      { id: "pub_c4", title: "ProjectSpace: A Comprehensive Framework for Automated Project Guide Allocation in Academic Institutions", authors: "V. Badgujar et al.", conference: "Springer LNNS", indexed: "Springer" },
      { id: "pub_c5", title: "ChatApsit: A Generative AI-Based Comprehensive Web Framework for Educational Institutes", authors: "V. Badgujar et al.", conference: "Springer LNNS", indexed: "Springer" },
      { id: "pub_c6", title: "Varishta Rakshak: An AI-Based Comprehensive Web Framework for Ensuring Senior Citizen Care in Real Time", authors: "V. Badgujar et al.", conference: "Springer LNNS", indexed: "Springer" },
      { id: "pub_c7", title: "AI-ML Based Smart Online Examination Framework", authors: "V. Badgujar et al.", conference: "Springer LNNS", indexed: "Springer" },
      { id: "pub_c8", title: "Automation of Supply Chain Management for Healthcare", authors: "V. Badgujar et al.", conference: "Springer LNNS", indexed: "Springer" },
      { id: "pub_c9", title: "Spaced Repetition Based Adaptive E-Learning Framework", authors: "V. Badgujar et al.", conference: "Springer LNNS", indexed: "Springer" },
      { id: "pub_c10", title: "Smart UAV Framework for Multi-Assistance", authors: "V. Badgujar et al.", conference: "Springer SIST", indexed: "Springer" },
      { id: "pub_c11", title: "On Trade Cloud Ecosystem Structure for Shared Learning", authors: "V. Badgujar et al.", conference: "Springer LNNS", indexed: "Springer" },
      { id: "pub_c12", title: "Artificial Intelligence based Security Orchestration, Automation and Response System", authors: "V. Badgujar et al.", conference: "IEEE Conference", indexed: "IEEE" },
      { id: "pub_c13", title: "Autonetics and Administration for IT Laboratories", authors: "V. Badgujar et al.", conference: "IEEE Conference", indexed: "IEEE" },
      { id: "pub_c14", title: "Artificial Intelligence based Self-Driving Car", authors: "V. Badgujar et al.", conference: "IEEE Conference", indexed: "IEEE" },
      { id: "pub_c15", title: "Study on feasibility of Uniform Appraisal System", authors: "V. Badgujar et al.", conference: "IEEE Conference", indexed: "IEEE" },
      { id: "pub_c16", title: "Study on Semi Automation in Uniform Faculty Appraisal System", authors: "V. Badgujar et al.", conference: "IEEE Conference", indexed: "IEEE" },
      { id: "pub_c17", title: "ML Enabled Surveillance System for Societies", authors: "V. Badgujar et al.", conference: "IEEE Conference", indexed: "IEEE" },
      { id: "pub_c18", title: "Case Study on an Android App for Inventory Management System with Sales Prediction for Local Shopkeepers in India", authors: "V. Badgujar et al.", conference: "IEEE Conference", indexed: "IEEE" },
      { id: "pub_c19", title: "IoT-Key Towards Automation", authors: "V. Badgujar et al.", conference: "IEEE Conference", indexed: "IEEE" },
      { id: "pub_c20", title: "All About Cloud: A Systematic Survey", authors: "V. Badgujar et al.", conference: "IEEE Conference", indexed: "IEEE" },
      { id: "pub_c21", title: "A Comprehensive Survey on Theoretic Perspective Providing Future Directions on IoT", authors: "V. Badgujar et al.", conference: "IEEE Conference", indexed: "IEEE" }
    ]
  },

  books: [
    { id: "book1", title: "Cyber Forensics", publisher: "University of Mumbai IDOL Publication", year: "2022" },
    { id: "book2", title: "Intrusion Detection System in Wireless Sensor Network", publisher: "LAP Lambert Academic Publishing", year: "2017" }
  ],

  patents: [
    { id: "pat1", title: "Risk Level Analysis for AI Based Open-Source Architecture", number: "202421069723", status: "Published", year: "2024", inventors: "Dr. Vishal S. Badgujar" },
    { id: "pat2", title: "System and Method for Secure Communication Based on ML Using IoT Equipment", number: "202211049343", status: "Published", year: "2022", inventors: "Dr. Vishal S. Badgujar" }
  ],

  copyrights: [
    { id: "cr1", title: "AI-Driven Innovative Integrated Method for Enhanced Security Risk Analysis", regNo: "SW-20211/2025", date: "March 03, 2025" },
    { id: "cr2", title: "VULNDETECT: An Efficient Graph Network Model for Identifying System Vulnerabilities Using Autoencoders, GNNs and GANs", regNo: "SW-19348/2024", date: "August 16, 2024" },
    { id: "cr3", title: "CYBERALARM: Distinguishing True Positive Attacks and Eliminating False Positives in AI-Based Security", regNo: "SW-18997/2024", date: "June 13, 2024" },
    { id: "cr4", title: "Risk Level Analysis for AI-Based Open-Source Architecture", regNo: "SW-18712/2024", date: "May 03, 2024" },
    { id: "cr5", title: "On Trade Cloud Ecosystem Structure for Shared Learning", regNo: "SW-14846/2021", date: "August 25, 2021" }
  ],

  awards: [
    { id: "aw1", title: "IEEE Senior Member", organization: "IEEE", year: "", description: "Recognized as IEEE Senior Member for significant contributions." },
    { id: "aw2", title: "Best Faculty Overall Performance", organization: "APSIT, Thane – Dept. of IT", year: "", description: "Best faculty overall performance in Department of Information Technology." },
    { id: "aw3", title: "Red Hat Academy Program Educator", organization: "Red Hat", year: "2024, 2025 & 2026", description: "Certified Red Hat Academy Program Educator for consecutive years." },
    { id: "aw4", title: "Red Hat Learning Community Mastery Series Winner", organization: "Red Hat", year: "", description: "Winner of the Red Hat Learning Community Mastery Series." },
    { id: "aw5", title: "Excellent Reviewer Rating", organization: "Web of Science", year: "", description: "Excellent reviewer rating for quality reviews." },
    { id: "aw6", title: "BluePrism Best Performing Educator", organization: "BluePrism", year: "", description: "Best performing educator recognition." },
    { id: "aw7", title: "GATE 2012 Qualified", organization: "GATE", year: "2012", description: "Qualified GATE 2012." },
    { id: "aw8", title: "Active Reviewer Recognition", organization: "Elsevier & Springer", year: "", description: "Recognition as Active Reviewer for Elsevier and Springer journals." },
    { id: "aw9", title: "STAR QC Award – NPTEL Translation Project", organization: "Ministry of Education, Govt. of India", year: "", description: "STAR QC Award in NPTEL Translation and Quality Review Project." },
    { id: "aw10", title: "Selected Reviewer for CS Standards", organization: "CSTA, USA", year: "", description: "Selected Reviewer for Computer Science Standards Revision by CSTA, USA." }
  ],

  certifications: [
    { id: "cert1", title: "Red Hat Certified System Administrator (RHCSA)", issuer: "Red Hat", category: "Cloud & DevOps" },
    { id: "cert2", title: "Oracle Cloud Infrastructure Architect Associate", issuer: "Oracle", category: "Cloud & DevOps" },
    { id: "cert3", title: "Oracle Cloud Infrastructure Foundations", issuer: "Oracle", category: "Cloud & DevOps" },
    { id: "cert4", title: "Microsoft Azure Fundamentals (AZ-900)", issuer: "Microsoft", category: "Cloud & DevOps" },
    { id: "cert5", title: "NVIDIA Fundamentals of Deep Learning", issuer: "NVIDIA", category: "AI / Data Science" },
    { id: "cert6", title: "IBM Big Data Foundation", issuer: "IBM", category: "AI / Data Science" },
    { id: "cert7", title: "IBM Hadoop Foundation", issuer: "IBM", category: "AI / Data Science" },
    { id: "cert8", title: "ICSI Certified Network Security Specialist", issuer: "ICSI", category: "Cyber Security" },
    { id: "cert9", title: "Google Certified Educator Level 1 & 2", issuer: "Google", category: "Teaching & Academic" },
    { id: "cert10", title: "NPTEL Elite Certifications (Cloud, Big Data, Ethical Hacking)", issuer: "NPTEL / IIT", category: "Teaching & Academic" }
  ],

  professionalActivities: {
    editorial: [
      { id: "ed1", role: "Section Editor", journal: "Computer Software and Media Application Journal" }
    ],
    reviewer: [
      { id: "rev1", journal: "Elsevier Computers & Security" },
      { id: "rev2", journal: "Elsevier Computer Networks" },
      { id: "rev3", journal: "Elsevier Computer Standards & Interfaces" },
      { id: "rev4", journal: "Elsevier Journal of Information Security and Applications" },
      { id: "rev5", journal: "Springer SN Computer Science" },
      { id: "rev6", journal: "Elsevier Engineering Applications of AI" },
      { id: "rev7", journal: "Springer Cybersecurity" },
      { id: "rev8", journal: "Springer Evolving Systems" },
      { id: "rev9", journal: "Journal of Computers, Materials & Continua" },
      { id: "rev10", journal: "Int. Journal of Information and Education Technology" },
      { id: "rev11", journal: "Journal of Advances in Information Technology" },
      { id: "rev12", journal: "Int. Journal of Computer Theory and Engineering" }
    ],
    memberships: [
      { id: "mem1", organization: "IEEE", membershipId: "Senior Member: 92593454" },
      { id: "mem2", organization: "IAENG", membershipId: "Member: 135433" },
      { id: "mem3", organization: "ISTE", membershipId: "Lifetime: 126884" },
      { id: "mem4", organization: "CSTA", membershipId: "Member: 198358021419" },
      { id: "mem5", organization: "SPSC Ambassador", membershipId: "Sustainability Promoters" }
    ],
    leadership: [
      "Undergraduate Project Coordinator – IT Department",
      "NBA Accreditation Criteria 7 Incharge",
      "NPTEL Local Chapter SPOC",
      "Mentor and Evaluator – Smart India Hackathon",
      "Faculty Coordinator – DevOps Club & APSIT Red Hat Academy",
      "Organizer – Internal Hackathons and Technical Events",
      "Session Chair for international conferences"
    ]
  },

  invitedTalks: [
    { id: "talk1", title: "Deployment and Workflow Automation", venue: "CRCE Bandra", type: "ISTE Approved STTP" },
    { id: "talk2", title: "Strategic Mapping of Engineering Projects to SDG Using Emerging Approaches", venue: "PVPPCOE, Sion", type: "Expert Talk" },
    { id: "talk3", title: "Cloud Security and Career Opportunities in Cloud Computing", venue: "VIT Pune & CSI Pune Chapter", type: "Expert Talk", year: "Oct 2024" },
    { id: "talk4", title: "Cloud Computing, DevOps, Linux, LaTeX", venue: "Multiple Institutions", type: "Expert Talks" }
  ],

  fundedProjects: [
    { id: "fp1", title: "NPTEL Translation and Quality Review Project", funder: "Ministry of Education, Govt. of India (NPTEL/IIT Madras)", role: "Technical Reviewer and Translator", value: "₹10.07 Lakhs", description: "Translation of technical courses (Cloud Computing, OS, Database Systems) into Marathi and Hindi." }
  ],

  ugProjectsGuided: [
    "AssetIQ: AI Enabled Framework for Asset Management of Educational Institute",
    "RiskVision: AI-Based Web Platform for Financial Risk Assessment",
    "ProjectSpace: Web Framework using Genetic Algorithms and ML",
    "VSecureSphere: Virtual Lab for Simulating Cyber Attacks Patterns",
    "ChatApsit: Generative AI Web Framework for Educational Institute",
    "Varistha Rakshak: AI-based Framework for Senior Citizen Care",
    "Automation of Supply Chain Management for Healthcare",
    "AI Based Smart Online Examination Framework",
    "AI based Security Orchestration, Automation & Response System",
    "Autonetics and Administration for IT Laboratories",
    "Automation in Uniform Faculty Appraisal System",
    "ML Enabled Surveillance System for Societies",
    "Artificial Intelligence based Self-Driving Car",
    "AI Based Smart UAV",
    "IoT Enabled Smart Lab"
  ],

  gallery: [
    { id: "gal1", src: "/images/gallery/img1.png", caption: "NCCDMCE ETC 2026 — Conference Recognition", category: "Conference" },
    { id: "gal2", src: "/images/gallery/img2.jpg", caption: "DIPEX — Student Innovation Award", category: "Awards" },
    { id: "gal3", src: "/images/gallery/img3.jpg", caption: "Best Faculty Award Ceremony", category: "Awards" },
    { id: "gal4", src: "/images/gallery/img4.jpg", caption: "APSIT 10th Anniversary Celebration", category: "Event" },
    { id: "gal5", src: "/images/gallery/img5.jpg", caption: "10 Years of Service — APSIT Memento", category: "Awards" },
    { id: "gal6", src: "/images/gallery/img6.jpg", caption: "Certificate Presentation at APSIT", category: "Event" },
    { id: "gal7", src: "/images/gallery/img7.jpg", caption: "PhD Thesis Presentation with Supervisor", category: "Academic" },
    { id: "gal8", src: "/images/gallery/img8.jpg", caption: "Expert Talk — Invited Session", category: "Conference" }
  ]
};

// ── Data Manager (client-side localStorage) ──
export const DataManager = {
  STORAGE_KEY: 'vb_portfolio_data_v2',

  getData() {
    if (typeof window === 'undefined') return JSON.parse(JSON.stringify(DEFAULT_DATA));
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) return deepMerge(DEFAULT_DATA, JSON.parse(stored));
    } catch (e) { console.warn('Error reading localStorage:', e); }
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  },

  saveData(data) {
    if (typeof window === 'undefined') return false;
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
      window.dispatchEvent(new Event('data-updated'));
      return true;
    } catch (e) {
      console.error('Error saving:', e);
      return false;
    }
  },

  updateSection(key, value) {
    const data = this.getData();
    data[key] = value;
    return this.saveData(data);
  },

  addItem(sectionKey, item) {
    const data = this.getData();
    const keys = sectionKey.split('.');
    let target = data;
    for (const k of keys) target = target[k];
    if (Array.isArray(target)) {
      item.id = item.id || genId(sectionKey);
      target.push(item);
      return this.saveData(data);
    }
    return false;
  },

  updateItem(sectionKey, itemId, updated) {
    const data = this.getData();
    const keys = sectionKey.split('.');
    let target = data;
    for (const k of keys) target = target[k];
    if (Array.isArray(target)) {
      const i = target.findIndex(x => x.id === itemId);
      if (i !== -1) { target[i] = { ...target[i], ...updated, id: itemId }; return this.saveData(data); }
    }
    return false;
  },

  deleteItem(sectionKey, itemId) {
    const data = this.getData();
    const keys = sectionKey.split('.');
    let target = data;
    for (const k of keys) target = target[k];
    if (Array.isArray(target)) {
      const i = target.findIndex(x => x.id === itemId);
      if (i !== -1) { target.splice(i, 1); return this.saveData(data); }
    }
    return false;
  },

  resetToDefaults() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.STORAGE_KEY);
      window.dispatchEvent(new Event('data-updated'));
    }
    return true;
  },

  exportData() { return JSON.stringify(this.getData(), null, 2); },

  importData(json) {
    try { return this.saveData(JSON.parse(json)); }
    catch (e) { return false; }
  }
};

function genId(prefix) {
  return prefix.replace(/\./g, '_') + '_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
}

function deepMerge(target, source) {
  const out = { ...target };
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key]) &&
      target[key] && typeof target[key] === 'object' && !Array.isArray(target[key])) {
      out[key] = deepMerge(target[key], source[key]);
    } else {
      out[key] = source[key];
    }
  }
  return out;
}
