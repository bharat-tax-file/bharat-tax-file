import Footer from "./Footer";
import Navbar from "./Navbar";
import Head from "next/head";
import Link from "next/link";
import Login from "../pages/login";

// ✅ Layout Component
export default function Layout({ children }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#005BAC" />
        <meta name="author" content="Bharat Tax File Team" />
        <meta name="robots" content="index, follow" />
        <title>Tax Filing | File ITR & GST Online - Bharat Tax File</title>
        <meta
          name="description"
          content="Bharat Tax File makes tax filing in India simple and secure. File ITR, GST, and income tax returns online. Trusted platform for individuals and businesses."
        />
        <link rel="canonical" href="https://bharattaxfile.com" />
        <meta property="og:title" content="Tax Filing in India | File ITR & GST Online - Bharat Tax File" />
        <meta property="og:description" content="Fast, easy, and secure online tax filing services in India." />
        <meta property="og:image" content="https://bharattaxfile.com/android-chrome-512x512.png" />
        <meta property="og:url" content="https://bharattaxfile.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tax Filing in India | File ITR & GST Online - Bharat Tax File" />
        <meta name="twitter:description" content="Online income tax and GST filing in India. Expert help to file your returns easily and securely." />
        <meta name="twitter:image" content="https://bharattaxfile.com/android-chrome-512x512.png" />
      </Head>

      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>

      {/* Drawer menu for mobile view */}
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
