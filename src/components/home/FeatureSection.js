import Link from "next/link";
import FeatureImageContainer from "../common/FeatureImageContainer";

function FeatureSection({ title, leftText, showHeading }) {
  const heading = title || "File Your GST & ITR with Ease";
  const description =
    "Use our platform to file your GST and Income Tax Returns quickly, accurately, and securely. Stay compliant with the latest regulations and avoid penalties.";

  return (
    <section className="w-full bg-white py-16 px-4 sm:px-8 lg:px-12">
      {showHeading && (
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-16">
          Simplify Your Tax Filing
        </h2>
      )}

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left image (if leftText is false) */}
        {!leftText && (
          <FeatureImageContainer
            imageUrl="https://plus.unsplash.com/premium_photo-1661773541234-1b2a3e4f5d6e?auto=format&fit=crop&q=80&w=2831&ixlib=rb-4.0.3"
            altText="Tax filing illustration"
          />
        )}

        {/* Text Content */}
        <div className="text-center md:text-left space-y-6">
          <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800 leading-tight">
            {heading}
          </h3>
          <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto md:mx-0">
            {description}
          </p>
          <Link href="/start-filing">
            <a
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              aria-label="Start tax filing"
            >
              Get Started
            </a>
          </Link>
        </div>

        {/* Right image (if leftText is true) */}
        {leftText && (
          <FeatureImageContainer
            imageUrl="https://plus.unsplash.com/premium_photo-1661773541234-1b2a3e4f5d6e?auto=format&fit=crop&q=80&w=2831&ixlib=rb-4.0.3"
            altText="Income tax filing concept"
          />
        )}
      </div>
    </section>
  );
}

export default FeatureSection;
