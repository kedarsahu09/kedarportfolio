/* =====================================================================
   SITE CONTENT: this is the file you edit to change what the website says.

   HOW TO EDIT (from VS Code):
     1. Run `npm run dev` in the VS Code terminal and open http://localhost:3000
     2. Change text below and press Ctrl+S. The browser updates by itself.
     3. When happy: git add . && git commit -m "Update content" && git push
        Vercel then publishes the change automatically.

   RULES (so you don't break anything):
     - Keep the quotes ' ' around text and the commas at the end of lines.
     - If your text contains an apostrophe, either write it as ’ (curly) or
       wrap the text in double quotes " ".
     - In long paragraphs, put **double asterisks** around words to make
       them bold (only where this file says it is supported).
   ===================================================================== */

/* ---------- 1. Your details (used in hero, contact, footer) ---------- */
export const profile = {
  name: 'Kedar Nath Sahu',
  title: 'Cloud Security Consultant',
  email: 'kedarsahu09@gmail.com',
  phone: '+91 97112 76986',
  location: 'Noida, India',
  linkedin: 'https://linkedin.com/in/kedarsahu2007',
  topmate: 'https://topmate.io/kedarnathsahu',
  photo: '/profile.jpg', // replace the file public/profile.jpg, or change this path
  // For a direct CV download: put the PDF in the /public folder (e.g. public/Kedar-CV.pdf)
  // and change the next line to '/Kedar-CV.pdf'
  cvUrl: '/Kedar-CV.pdf',
  footerLine: 'Cloud Security Consultant  •  18+ Years IT Experience',
};

/* Round icon buttons shown under the hero and in the contact card.
   icon must be one of: linkedin, calendar, mail, phone, pin
   (to add Instagram/GitHub later, ask for an icon or reuse 'arrow'). */
export const socials = [
  { label: 'LinkedIn', icon: 'linkedin', href: profile.linkedin },
  { label: 'Book a session on Topmate', icon: 'calendar', href: profile.topmate },
  { label: 'Email', icon: 'mail', href: `mailto:${profile.email}` },
];

/* ---------- 2. Top of the page (hero) ---------- */
export const hero = {
  status: 'Open to consulting & mentoring · Noida, India',
  greeting: 'Namaste, I’m',
  firstName: 'Kedar',          // shown in the colour gradient
  lastName: 'Nath Sahu',       // shown in white
  role: 'Cloud Security Consultant',
  summary:
    'Cloud Security Consultant with 18+ years of IT experience, helping enterprises close security gaps across cloud, endpoints, Cloud Apps, data and identity. Specialised in Microsoft Security, Wiz CSPM, Azure Security and EDR.',
  primaryButton: { label: 'View Projects', href: '#work' },
  secondaryButtonLabel: 'View Resume', // opens profile.cvUrl
};

/* The four numbers under the hero: [big number, small label] */
export const stats = [
  ['18+', 'Years in IT'],
  ['8+', 'Years in Cybersecurity'],
  ['2', 'Germany & Netherlands'],
  ['6', 'Microsoft Certifications'],
];

/* ---------- 3. Section headings (label / title / sub-text) ---------- */
export const sections = {
  about: { label: 'About', title: 'Security expertise grounded in real infrastructure.' },
  skills: {
    label: 'Core Skills',
    title: 'End-to-end security capabilities.',
    text: 'A broad technical foundation spanning modern cloud controls, endpoint defense, identity and enterprise infrastructure.',
  },
  projects: {
    badge: 'Selected Work',
    title: 'Featured Projects',
    text: 'A curated set of security transformation work. Each project reflects real enterprise delivery.',
  },
  experience: {
    label: 'Experience',
    title: 'A career built from the infrastructure up.',
    text: 'Enterprise consulting experience across security, cloud, virtualization and core infrastructure since 2008.',
  },
  credentials: {
    label: 'Credentials',
    title: 'Certified across the security ecosystem.',
    text: 'Current certifications and continued technical training across Microsoft, Citrix and enterprise security.',
  },
  blog: {
    label: 'Blog',
    title: 'Notes on cloud and endpoint security.',
    text: 'Practical write-ups from real projects: what worked, what did not, and what I would do differently.',
  },
  testimonials: { title: 'What people say' },
  contact: {
    badge: 'Let’s Talk',
    title: 'Get in Touch',
    text: 'Have a project, a role, or just a hello? My inbox is open.',
  },
};

/* ---------- 4. About ---------- */
export const about = {
  // **text** inside the lead becomes bold
  lead: 'I help enterprises find and close security gaps. As a Cybersecurity Consultant at Wipro, I work across cloud security, endpoint security, identity and Microsoft 365, with a focus on **Microsoft Security and Wiz Cloud/Wiz Code.**',
  paragraphs: [
    'I started in 2008 as a Windows and infrastructure administrator, then moved through Citrix, VMware and Active Directory into Azure security and identity, and now cloud security with Microsoft 365 Defender and Wiz Cloud/Wiz Code.',
    'That background means I understand how infrastructure really runs, so the security I design works in production, not just on paper.',
  ],
  bullets: [
    'Cloud posture with Wiz Cloud/Wiz Code and Microsoft Defender for Cloud',
    'Endpoint migrations from CrowdStrike and Trellix to Microsoft Defender',
    'Identity with Entra ID, Conditional Access, PIM, MFA and RBAC',
    'Client engagements in Germany and the Netherlands',
  ],
};

/* ---------- 5. Skills: [icon, title, [tags]] ----------
   icon: cloud, shield, user, arch, layers, db */
export const skills = [
  ['cloud', 'Cloud Security', ['Wiz CSPM', 'Defender for Cloud', 'Azure Security', 'Azure Policy', 'Azure Arc']],
  ['shield', 'Microsoft Security', ['Defender for Endpoint', 'Defender for Office 365', 'Defender for Identity', 'Sentinel', 'Defender for Cloud Apps']],
  ['user', 'Endpoint & IAM', ['EDR', 'NGAV', 'ATP', 'ASR', 'Intune', 'GPO', 'Entra ID', 'RBAC', 'PIM', 'MFA']],
  ['arch', 'Security Architecture', ['Enterprise security transformation', 'Endpoint security migration']],
  ['layers', 'Virtualization', ['Citrix Cloud', 'XenApp', 'XenDesktop', 'PVS', 'NetScaler', 'VMware vSphere/ESXi']],
  ['db', 'Infrastructure', ['Windows Server', 'Linux Server', 'Active Directory', 'DNS', 'DHCP', 'SQL Clustering']],
];

/* ---------- 6. Featured projects ----------
   category : small label on the image
   image    : picture on top. Put your own file in public/projects/ and
              write its path here, e.g. '/projects/my-photo.jpg'
   href     : optional link. If you add one, an arrow button appears on the card.
   tags     : small chips at the bottom */
export const projects = [
  {
    category: 'Endpoint Security / Microsoft',
    title: 'Endpoint Security Migration',
    text: 'Supported enterprise migration from CrowdStrike and Trellix to Microsoft Defender for Endpoint, with AV and ASR policies through Intune and GPO.',
    tags: ['Defender for Endpoint', 'Intune', 'GPO', 'ASR'],
    image: '/projects/endpoint.svg',
    href: '',
  },
  {
    category: 'Cloud Security / Wiz',
    title: 'Cloud Security Posture with Wiz',
    text: 'Cloud security posture visibility, security assessment and risk management across cloud environments.',
    tags: ['Wiz CSPM', 'Risk Management', 'Azure'],
    image: '/projects/wiz.svg',
    href: '',
  },
  {
    category: 'Microsoft 365 / Defender',
    title: 'Microsoft 365 Defender',
    text: 'Implemented Defender for Endpoint, Office 365, Identity and Cloud Apps, including Anti-Phishing, Safe Attachments and Safe Links.',
    tags: ['Office 365', 'Identity', 'Cloud Apps'],
    image: '/projects/m365.svg',
    href: '',
  },
  {
    category: 'Data Protection',
    title: 'Information Protection',
    text: 'Designed sensitivity labels, email protection and Endpoint DLP policies for enterprise environments.',
    tags: ['Sensitivity Labels', 'Endpoint DLP', 'Email Protection'],
    image: '/projects/dlp.svg',
    href: '',
  },
  {
    category: 'Identity / Azure',
    title: 'Azure Security & Identity',
    text: 'Implemented Azure Security and IAM across Entra ID, Identity Protection, Conditional Access, RBAC, PIM and MFA, with Key Vault, Azure Policy and Azure Arc.',
    tags: ['Entra ID', 'Conditional Access', 'PIM', 'MFA'],
    image: '/projects/identity.svg',
    href: '',
  },
  {
    category: 'Global Delivery',
    title: 'International Engagements',
    text: 'Delivered Microsoft Defender ATP implementation in Germany and data center and endpoint migration in the Netherlands.',
    tags: ['Germany', 'Netherlands', 'Defender ATP'],
    image: '/projects/global.svg',
    href: '',
  },
];

/* ---------- 7. Experience ---------- */
export const experience = [
  {
    dates: 'Feb 2022 — Present', place: 'Noida', role: 'Cybersecurity Consultant', company: 'Wipro Technologies',
    points: [
      'Manage and support Wiz CSPM for cloud security posture visibility, security assessment and risk management.',
      'Design and implement Microsoft 365 Defender across Endpoint, Office 365, Identity, Cloud Apps and Defender for Cloud.',
      'Deliver Defender for Endpoint onboarding, AV and ASR policies, and CrowdStrike/Trellix migration using Intune, Defender for Cloud, SCCM and GPO.',
    ],
  },
  {
    dates: 'Aug 2016 — Feb 2022', place: 'Noida', role: 'Azure Security / Cloud Consultant', company: 'HCL Technologies',
    points: [
      'Implemented Azure Security and IAM across Entra ID, Identity Protection, Conditional Access, RBAC, PIM, MFA and enterprise applications.',
      'Supported hybrid identity, Azure network security, Key Vault, Azure Policy, Azure Arc and secure Azure Virtual Desktop environments.',
      'Collaborated across infrastructure, identity, network and security teams, including two onsite engagements in the Netherlands.',
    ],
  },
];

/* Shown under "Show earlier career" */
export const earlier = [
  { role: 'Citrix / EUC Consultant', company: 'Tata Consultancy Services · Gurgaon', dates: 'Oct 2014 — Aug 2016',
    points: ['Managed Citrix Cloud Virtual Apps & Desktops, XenApp, XenDesktop, PVS and XenServer.', 'Supported App-V, AppSense, Azure Compute Services and enterprise application delivery.'] },
  { role: 'Citrix / Virtualization Consultant', company: 'Hewlett Packard Globalsoft · Bangalore', dates: 'Aug 2011 — Sep 2014',
    points: ['Supported Citrix XenApp, XenDesktop and VMware vSphere 5.x environments.', 'Administered Windows Server and resolved virtualization and application delivery issues.'] },
  { role: 'Citrix / Windows Administrator', company: 'DCM Data Systems · Gurgaon', dates: 'Jan 2011 — Aug 2011',
    points: ['Managed Citrix Presentation Server, application publishing, user access and session support.', 'Supported Windows Server and VMware vSphere/ESXi infrastructure.'] },
  { role: 'Windows / Infrastructure Administrator', company: 'Mindriver Infotech · Bangalore', dates: 'Jan 2009 — Jan 2011',
    points: ['Administered Windows Server, Active Directory, DNS, DHCP, File Services and FTP.', 'Supported SQL Server Clustering, Symantec Backup and Antivirus operations.'] },
  { role: 'Windows / Infrastructure Administrator', company: 'Renovision Automation Services · Delhi', dates: 'Mar 2008 — Jan 2009',
    points: ['Administered Windows Server and FTP services for reliable day-to-day operations.', 'Managed Microsoft ISA Server and McAfee Antivirus for network and endpoint security.'] },
];

/* ---------- 8. Certifications: ['Issuer · Code', 'Name'] ---------- */
export const certs = [
  ['Microsoft · AZ-500', 'Azure Security Engineer'],
  ['Microsoft · SC-200', 'Security Operations Analyst'],
  ['Microsoft · SC-300', 'Identity & Access Administrator'],
  ['Microsoft · MS-500', 'Microsoft 365 Security Administrator'],
  ['Microsoft · AZ-104', 'Azure Administrator'],
  ['Microsoft · SC-900', 'Security, Compliance & Identity Fundamentals'],
  ['Citrix · 1Y0-241', 'App Delivery & Security'],
  ['Citrix · CCA-V', 'XenDesktop 7.6'],
  ['Citrix · CCA', 'XenApp 6.5'],
  ['Other · ITIL', '2011 Foundation'],
];

export const training = [
  'Wiz Cloud', 'Wiz Code', 'SC-200', 'SC-300', 'SC-400', 'SC-900', 'AZ-500', 'AZ-104',
  'Google Cloud Associate', 'AWS Cloud Associate', 'SOC Analyst', 'CEH', 'MCSA', 'CCNA', 'RHCE', 'Citrix', 'ITIL',
];

export const education = [
  { year: '2011', title: 'B.Sc. (Information Technology)', place: 'VMDU, Tamil Nadu' },
  { year: '2003 — 2006', title: '3-Year Polytechnic Diploma', place: 'Electronics, Fiber Optics & Communication', place2: 'Government Polytechnic College, Jodhpur' },
];

/* ---------- 9. Mentoring section ---------- */
export const mentoring = {
  pill: '1:1 Mentorship · Topmate',
  headline: 'Mentor with Kedar',
  text: 'Career guidance, mentorship and AI tools coaching from an engineer with 18+ years of IT experience, who has worked across the MNCs HP, TCS, HCL and Wipro.',
  bookLabel: 'Book a Session on Topmate',
  linkedinLabel: 'Connect on LinkedIn',
  // Four cards on the right: [big number, small label]
  stats: [
    ['18+', 'Years in IT'],
    ['8+', 'Years in Cybersecurity'],
    ['4', 'MNCs worked at'],
    ['6', 'Microsoft certifications'],
  ],
  workedAtLabel: 'Worked at',
  workedAt: ['HP', 'TCS', 'HCL', 'Wipro'],
};

/* ---------- 10. LinkedIn banner (below mentoring) ---------- */
export const linkedinBanner = {
  eyebrow: 'Security insights · Career guidance',
  titleA: 'Connect with',
  titleB: 'Kedar on LinkedIn',
  text: 'Cloud security, Microsoft Defender and Wiz insights, plus career guidance from 18+ years in IT. Join my professional network on LinkedIn.',
  button: 'Connect on LinkedIn',
};

/* ---------- 11. "Share your experience" banner + testimonial form ---------- */
export const testimonialCta = {
  chip: 'Your turn',
  titleA: 'Worked with Kedar?',
  titleB: 'Share your experience',
  text: 'Your testimonial helps others know what to expect from a mentor session or collaboration. Takes less than a minute.',
  button: 'Leave a Testimonial',
};
