import InnerPageContainer from "@/components/common/InnerPageContainer";
import PageMetaTags from "@/containers/PageMetaTags";
import {
  FaFileInvoiceDollar,
  FaMoneyCheckAlt,
  FaBusinessTime,
  FaBuilding,
  FaReceipt,
  FaUtensils,
} from "react-icons/fa";

const icons = {
  "Income Tax Return (ITR) Filing": FaFileInvoiceDollar,
  "Income Tax Notice Response": FaMoneyCheckAlt,
  "Income Tax Refund Assistance": FaBusinessTime,
  "Income Tax Assessment": FaBuilding,
  "GST Registration": FaReceipt,
  "GST Modification": FaReceipt,
  "GST Cancellation": FaReceipt,
  "GST Return Filing": FaReceipt,
  "FSSAI Registration & Licensing": FaUtensils,
};

export default function ServicesPage() {
  const services = [
    {
      category: "Income Tax Services",
      color: "from-yellow-100 to-yellow-200",
      services: [
        { name: "Income Tax Return (ITR) Filing", description: "Accurate and timely filing of ITR for individuals, businesses, and professionals." },
        { name: "Income Tax Notice Response", description: "Expert assistance in handling and responding to Income Tax notices effectively." },
        { name: "Income Tax Refund Assistance", description: "Guidance in claiming refunds and ensuring timely processing by the authorities." },
        { name: "Income Tax Assessment", description: "Professional support for scrutiny assessments and compliance with tax regulations." },
      ],
    },
    {
      category: "GST Services",
      color: "from-blue-100 to-blue-200",
      services: [
        { name: "GST Registration", description: "Hassle-free registration under GST for businesses and startups." },
        { name: "GST Modification", description: "Update business details, address, and amendments in GST registration." },
        { name: "GST Cancellation", description: "Proper guidance for voluntary and mandatory GST cancellation procedures." },
        { name: "GST Return Filing", description: "Timely filing of monthly, quarterly, and annual GST returns to ensure compliance." },
      ],
    },
    {
      category: "FSSAI Registration",
      color: "from-green-100 to-green-200",
      services: [
        { name: "FSSAI Registration & Licensing", description: "Obtain food safety registration and license for your food business with ease." },
      ],
    },
  ];

  return (
    <InnerPageContainer title="">
      <PageMetaTags
        title="Our Services - Income Tax, GST & FSSAI Experts"
        description="Professional tax solutions including Income Tax Returns, GST Filing, and FSSAI Registration. Trusted financial experts at your service."
        url="/services"
      />

      <div className="mt-16 space-y-24">
        {services.map((section, idx) => (
          <div key={idx}>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-10 text-center relative z-10">
              <span className="px-6 py-2 bg-white rounded-full shadow inline-block border-2 border-blue-300">
                {section.category}
              </span>
            </h2>

            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8`}>
              {section.services.map((service, i) => {
                const Icon = icons[service.name] || FaBusinessTime;

                return (
                  <div
                    key={i}
                    className={`bg-gradient-to-br ${section.color} rounded-3xl border border-white/40 shadow-xl p-6 backdrop-blur-xl`}
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="bg-white text-blue-600 p-3 rounded-full shadow-lg">
                        <Icon className="text-xl" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-800">{service.name}</h3>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </InnerPageContainer>
  );
}
