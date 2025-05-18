import Link from "next/link";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Head from "next/head";

// This Layout component wraps all pages and includes SEO tags, header, footer, and responsive mobile drawer
export default function Layout({ children }) {
  return (
    <>
      <Head>
        {/* ===== HTML Meta Tags ===== */}
        {/* These ensure proper rendering and scaling across devices and browsers */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#005BAC" />
        <meta name="author" content="Bharat Tax File Team" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

        {/* ===== SEO Title and Description ===== */}
        <title>Tax Filing in India | File ITR & GST Online - Bharat Tax File</title>
        <meta
          name="description"
          content="Bharat Tax File makes tax filing in India simple and secure. File ITR, GST, and income tax returns online. Trusted platform for individuals and businesses."
        />

        {/* ===== Expanded Keywords for Better Search Reach ===== */}
        <meta
          name="keywords"
          content="tax filing in India, online tax filing, how to file tax in India, file ITR online, file GST returns, GST registration, income tax India, income tax return filing, Bharat Tax File, tax platform India, Indian tax services, efiling portal, gst portal India, itr filing help, itr online, itr 1, itr 4, gst online, gst return, tax consultants online, digital tax service"
        />

        {/* ===== Canonical Tag to Avoid Duplicate Content Issues ===== */}
        <link rel="canonical" href="https://bharattaxfile.com" />

        {/* ===== Favicons for Multiple Devices and Browsers ===== */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#005BAC" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="msapplication-TileColor" content="#005BAC" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* ===== Open Graph Tags for Facebook, LinkedIn, WhatsApp Sharing ===== */}
        <meta property="og:title" content="Tax Filing in India | File ITR & GST Online - Bharat Tax File" />
        <meta
          property="og:description"
          content="Fast, easy, and secure online tax filing services in India. File your ITR and GST returns with Bharat Tax File – trusted by individuals and businesses."
        />
        <meta property="og:image" content="https://bharattaxfile.com/android-chrome-512x512.png" />
        <meta property="og:url" content="https://bharattaxfile.com" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:site_name" content="Bharat Tax File" />

        {/* ===== Twitter Cards for Sharing on Twitter ===== */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tax Filing in India | File ITR & GST Online - Bharat Tax File" />
        <meta
          name="twitter:description"
          content="Bharat Tax File offers online income tax and GST filing in India. Get expert help to file your returns easily and securely."
        />
        <meta name="twitter:image" content="https://bharattaxfile.com/android-chrome-512x512.png" />

        {/* ===== Structured Data for Google Rich Results (JSON-LD) ===== */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Bharat Tax File",
              url: "https://bharattaxfile.com",
              logo: "https://bharattaxfile.com/android-chrome-512x512.png",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-XXXXXXXXXX",
                contactType: "Customer Service",
                areaServed: "IN",
                availableLanguage: ["English", "Hindi"],
              },
              sameAs: [
                "https://www.facebook.com/bharattaxfile",
                "https://www.instagram.com/bharattaxfile",
                "https://www.linkedin.com/company/bharattaxfile"
              ],
              description:
                "Bharat Tax File is an online platform for filing income tax and GST returns in India. We offer fast, secure, and trusted tax filing services.",
              serviceType: [
                "Online ITR Filing",
                "GST Filing Services",
                "Tax Consulting",
                "Tax Compliance Services"
              ],
              areaServed: "India",
            }),
          }}
        />
      </Head>

      {/* ===== Main Layout Structure ===== */}
      <div className="flex flex-col min-h-screen">
        {/* Navbar: Top navigation bar with logo and links */}
        <Navbar />

        {/* Page Content Area: Dynamic content injected here from each page */}
        <main className="flex-grow">{children}</main>

        {/* Footer: Bottom section with links and company info */}
        <Footer />
      </div>

      {/* ===== Mobile Navigation Drawer (for small screens) ===== */}
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>

        {/* Side Menu Items (Visible on mobile only) */}
        <ul className="menu p-4 w-80 h-full bg-base-100 text-base-content space-y-2">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about-us">About Us</Link></li>
          <li><Link href="/services">Services</Link></li>
          <li><Link href="/contact">Contact Us</Link></li>
          <li><Link href="/terms-and-conditions">Terms and Conditions</Link></li>
          <li><Link href="/privacy-policy">Privacy Policy</Link></li>
        </ul>
      </div>
    </>
  );
}
