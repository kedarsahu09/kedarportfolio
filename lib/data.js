// All portfolio content lives here. Edit this file to update the site.

export const profile = {
  name: 'Kedar Nath Sahu',
  firstName: 'Kedar',
  title: 'Cloud Security Consultant',
  email: 'kedarsahu09@gmail.com',
  phone: '+91 9711276986',
  linkedin: 'https://linkedin.com/in/kedarsahu2007',
  linkedinLabel: 'linkedin.com/in/kedarsahu2007',
  location: 'Noida, India',
  // To offer a direct CV download: put your PDF in /public (e.g. /public/Kedar-CV.pdf)
  // and set cvUrl to '/Kedar-CV.pdf'.
  cvUrl: '/Kedar-CV.pdf',
  oneLiner: 'Helping enterprises close security gaps across cloud, endpoints, Cloud Apps, data and identity.',
  footerLine: 'Cloud Security Consultant  •  18+ Years IT Experience',
};

export const heroTags = [
  'Cloud Security Consultant', 'Microsoft Cloud Security', 'Microsoft Defender',
  'CSPM Wiz Cloud/Wiz Code', 'Azure Security', 'EDR', 'IAM', 'Security Architecture',
];

export const stats = [
  ['18+', 'Years in IT'],
  ['8+', 'Years in Cybersecurity'],
  ['2', 'Germany & Netherlands'],
  ['6', 'Microsoft Certifications'],
];

export const skills = [
  ['cloud', 'Cloud Security', ['Wiz CSPM', 'Defender for Cloud', 'Azure Security', 'Azure Policy', 'Azure Arc']],
  ['shield', 'Microsoft Security', ['Defender for Endpoint', 'Defender for Office 365', 'Defender for Identity', 'Sentinel', 'Defender for Cloud Apps']],
  ['user', 'Endpoint & IAM', ['EDR', 'NGAV', 'ATP', 'ASR', 'Intune', 'GPO', 'Entra ID', 'RBAC', 'PIM', 'MFA']],
  ['arch', 'Security Architecture', ['Enterprise security transformation', 'Endpoint security migration']],
  ['layers', 'Virtualization', ['Citrix Cloud', 'XenApp', 'XenDesktop', 'PVS', 'NetScaler', 'VMware vSphere/ESXi']],
  ['db', 'Infrastructure', ['Windows Server', 'Linux Server', 'Active Directory', 'DNS', 'DHCP', 'SQL Clustering']],
];

export const featured = [
  ['Endpoint Security Migration', 'Supported enterprise migration from CrowdStrike and Trellix to Microsoft Defender for Endpoint, with AV and ASR policies through Intune and GPO.'],
  ['Cloud Security Posture with Wiz', 'Cloud security posture visibility, security assessment and risk management across cloud environments.'],
  ['Microsoft 365 Defender', 'Implemented Defender for Endpoint, Office 365, Identity and Cloud Apps, including Anti-Phishing, Safe Attachments and Safe Links.'],
  ['Information Protection', 'Designed sensitivity labels, email protection and Endpoint DLP policies for enterprise environments.'],
  ['International Engagements', 'Delivered Microsoft Defender ATP implementation in Germany and data center and endpoint migration in the Netherlands.'],
];

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
