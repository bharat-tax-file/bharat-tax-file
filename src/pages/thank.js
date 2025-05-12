// pages/thank.js
import InnerPageContainer from "@/components/common/InnerPageContainer";
import PageMetaTags from "@/containers/PageMetaTags";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";

export default function ThankYouPage() {
  return (
    <InnerPageContainer title="Thank You">
      <PageMetaTags
        title="Thank You - Bharat Tax File"
        description="Your submission was successful. We'll be in touch soon."
        url="/thank"
      />

      <section className="flex flex-col items-center justify-center text-center py-20 px-6 bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-xl">
        <FaCheckCircle className="text-green-500 text-6xl mb-6 animate-bounce" />
        <h1 className="text-4xl font-bold text-blue-800 mb-4">Thank You!</h1>
        <p className="text-gray-700 text-lg max-w-xl mx-auto mb-6">
          Your message has been received successfully. Our tax experts will connect with you shortly to assist with your requirements.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium shadow-lg transition-all"
        >
          Back to Home
        </Link>
      </section>
    </InnerPageContainer>
  );
}
// pages/thank.js
import InnerPageContainer from "@/components/common/InnerPageContainer";
import PageMetaTags from "@/containers/PageMetaTags";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";

export default function ThankYouPage() {
  return (
    <InnerPageContainer title="Thank You">
      <PageMetaTags
        title="Thank You - Bharat Tax File"
        description="Your submission was successful. We'll be in touch soon."
        url="/thank"
      />

      <section className="flex flex-col items-center justify-center text-center py-20 px-6 bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-xl">
        <FaCheckCircle className="text-green-500 text-6xl mb-6 animate-bounce" />
        <h1 className="text-4xl font-bold text-blue-800 mb-4">Thank You!</h1>
        <p className="text-gray-700 text-lg max-w-xl mx-auto mb-6">
          Your message has been received successfully. Our tax experts will connect with you shortly to assist with your requirements.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium shadow-lg transition-all"
        >
          Back to Home
        </Link>
      </section>
    </InnerPageContainer>
  );
}
