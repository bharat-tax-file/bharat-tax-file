import InnerPageContainer from "@/components/common/InnerPageContainer";
import PageMetaTags from "@/containers/PageMetaTags";
import Link from "next/link";

export default function Page() {
  return (
    <InnerPageContainer title="">
      <PageMetaTags
        title="About Us - Bharat Tax File"
        description="GST and ITR Filing Services by Bharat Tax File. Expert consultancy for hassle-free tax filing."
        url="/about-us"
      />

      <section className="bg-[#F8FAFC] px-6 py-16 rounded-3xl shadow-md">
        <h1 className="text-4xl font-extrabold text-[#1E3A8A] mb-6 text-center">
          About Bharat Tax File
        </h1>
        <p className="text-gray-700 text-lg text-center max-w-3xl mx-auto">
          Welcome to <strong>Bharat Tax File</strong>, your trusted partner for hassle-free GST and ITR filing.
          We simplify compliance with expert support and secure digital tools.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Our Mission Section */}
          <div className="bg-white p-8 rounded-2xl border border-blue-100 shadow">
            <h3 className="text-2xl font-bold text-[#1E3A8A] mb-4">Our Mission</h3>
            <p className="text-gray-600">
              To empower individuals and businesses to meet their tax obligations effortlessly. We use modern
              technology and expert advice to reduce stress and maximize accuracy.
            </p>
          </div>

          {/* Why Choose Us Section */}
          <div className="bg-white p-8 rounded-2xl border border-blue-100 shadow">
            <h3 className="text-2xl font-bold text-[#1E3A8A] mb-4">Why Choose Us?</h3>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>Flexible, personalized consultancy</li>
              <li>Expert guidance with every step</li>
              <li>Transparent, affordable pricing</li>
              <li>Timely and accurate tax filing</li>
              <li>100% secure and encrypted platform</li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-[#1E3A8A] mb-4">Get Started Today</h3>
          <p className="text-gray-700 max-w-xl mx-auto">
            Join thousands who trust us with their tax filing needs. Whether you're a small business or an
            individual, we make tax filing smooth, secure, and stress-free.
          </p>
          <Link
            href="/contact"
            className="inline-block mt-6 px-8 py-3 bg-[#3B82F6] text-white rounded-full shadow hover:bg-[#2563EB] transition"
          >
            Start Filing Now
          </Link>
        </div>
      </section>
    </InnerPageContainer>
  );
}
