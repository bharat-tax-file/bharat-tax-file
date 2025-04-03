import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-slate-100 text-gray-700">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Information Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Information</h2>
          <ul className="space-y-1 text-gray-600">
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/faqs">FAQs</Link></li>
            <li>+91 9205174213</li>
          </ul>
        </div>

        {/* Legal Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Legal</h2>
          <ul className="space-y-1 text-gray-600">
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/terms-and-conditions">Terms & Conditions</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div className="bg-gray-800 text-center py-3 text-white text-sm">
        <p>© 2025 - All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
