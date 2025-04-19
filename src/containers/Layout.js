
 import Link from "next/link";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Head from "next/head";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        {/* Essential Meta Tags */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#005BAC" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="author" content="Bharat Tax File Team" />
        <meta
          name="description"
          content="Bharat Tax File offers quick, secure, and hassle-free ITR & GST filing services in India. Trusted by individuals and businesses across Bharat."
        />
        <meta name="keywords" content="ITR filing, GST filing, tax filing India, Bharat Tax File, file ITR online, file GST online, income tax, online tax services" />

        {/* Title */}
        <title>Bharat Tax File | Fast, Secure GST & ITR Filing in India</title>

        {/* Canonical URL */}
        <link rel="canonical" href="https://bharattaxfile.com" />

        {/* Favicons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#005BAC" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="msapplication-TileColor" content="#005BAC" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Open Graph for Social Media */}
        <meta property="og:title" content="Bharat Tax File | File ITR & GST Online in India" />
        <meta
          property="og:description"
          content="Bharat Tax File is India's trusted platform for fast, secure, and hassle-free online tax filing. File your ITR and GST today!"
        />
        <meta property="og:image" content="https://bharattaxfile.com/android-chrome-512x512.png" />
        <meta property="og:url" content="https://bharattaxfile.com" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:site_name" content="Bharat Tax File" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bharat Tax File | File ITR & GST Online in India" />
        <meta
          name="twitter:description"
          content="Bharat Tax File offers secure and easy online tax filing in India. Trusted by thousands for ITR & GST filing."
        />
        <meta name="twitter:image" content="https://bharattaxfile.com/android-chrome-512x512.png" />

        {/* Structured Data (Organization) */}
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
              ]
            }),
          }}
        />
      </Head>

      {/* Layout Wrapper */}
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>

      {/* Drawer for Mobile */}
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
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