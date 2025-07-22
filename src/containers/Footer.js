import Link from "next/link";
import { FaInstagram, FaFacebookF } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-14 pb-6 px-4 sm:px-10 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Grid Structure */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">TaxEase</h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Simplifying GST & ITR filing with expert support, secure tech, and affordable pricing.
            </p>
            <p className="mt-4 text-sm font-medium text-gray-400">📞 +91 9205174213</p>

            <div className="mt-4 flex gap-4 text-xl text-gray-400">
              <a
                href="https://www.instagram.com/bharattaxfiling/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            
            </div>
          </div>

          {/* Link Groups */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Information</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/about" className="hover:text-blue-400 transition">About Us</Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-blue-400 transition">FAQs</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/privacy-policy" className="hover:text-blue-400 transition">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-blue-400 transition">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          {/* Optional Newsletter / CTA */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Get Updates</h3>
            <p className="text-sm text-gray-400 mb-4">Stay up to date with our latest services and offers.</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-md bg-gray-800 text-sm text-white placeholder-gray-400 outline-none border border-gray-700 focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 transition rounded-md text-white"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
