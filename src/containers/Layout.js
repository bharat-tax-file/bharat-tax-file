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
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="keywords" content="GST Filing, ITR Filing, Tax Filing, Bharat Tax File" />
        <meta
          name="description"
          content="File GST & ITR quickly with Bharat Tax File – trusted, secure and easy tax filing platform in India."
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Bharat Tax File" />

        {/* Title */}
        <title>Bharat Tax File | Fast & Secure Tax Filing Platform</title>

        {/* Favicon & Apple Icon */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />

        {/* Open Graph Meta for Social Sharing */}
        <meta property="og:title" content="Bharat Tax File | File ITR & GST Online" />
        <meta
          property="og:description"
          content="File GST & ITR quickly with Bharat Tax File – trusted, secure and easy tax filing platform in India."
        />
        <meta property="og:image" content="https://bharattaxfile.com/favicon.png" />
        <meta property="og:url" content="https://bharattaxfile.com" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Meta */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bharat Tax File | File ITR & GST Online" />
        <meta
          name="twitter:description"
          content="File GST & ITR quickly with Bharat Tax File – trusted, secure and easy tax filing platform in India."
        />
        <meta name="twitter:image" content="https://bharattaxfile.com/favicon.png" />

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Bharat Tax File",
              "url": "https://bharattaxfile.com",
              "logo": "https://bharattaxfile.com/favicon.png"
            }`,
          }}
        />
      </Head>

      {/* Layout Wrapper */}
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>

      {/* Mobile Drawer Menu */}
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
