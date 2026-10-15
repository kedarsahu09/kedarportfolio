import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const DESC =
  'Portfolio of Kedar Nath Sahu, a Cloud Security and Cybersecurity Consultant specializing in Microsoft Security, Wiz CSPM, Azure Security, EDR and IAM.';

export const metadata = {
  metadataBase: new URL(SITE),
  title: { default: 'Kedar Nath Sahu | Cloud Security Consultant', template: '%s | Kedar Nath Sahu' },
  description: DESC,
  openGraph: {
    title: 'Kedar Nath Sahu | Cloud Security Consultant',
    description: DESC,
    type: 'website',
    images: ['/profile.jpg'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#050c22',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
        />
      </head>
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
