import InnerPageContainer from "@/components/common/InnerPageContainer";
import PageMetaTags from "@/containers/PageMetaTags";

export default function ServicesPage() {
    const services = [
        {
            category: "Income Tax Services",
            services: [
                { name: "Income Tax Return (ITR) Filing", description: "Accurate and timely filing of ITR for individuals, businesses, and professionals." },
                { name: "Income Tax Notice Response", description: "Expert assistance in handling and responding to Income Tax notices effectively." },
                { name: "Income Tax Refund Assistance", description: "Guidance in claiming refunds and ensuring timely processing by the authorities." },
                { name: "Income Tax Assessment", description: "Professional support for scrutiny assessments and compliance with tax regulations." },
            ],
        },
        {
            category: "GST Services",
            services: [
                { name: "GST Registration", description: "Hassle-free registration under GST for businesses and startups." },
                { name: "GST Modification", description: "Update business details, address, and amendments in GST registration." },
                { name: "GST Cancellation", description: "Proper guidance for voluntary and mandatory GST cancellation procedures." },
                { name: "GST Return Filing", description: "Timely filing of monthly, quarterly, and annual GST returns to ensure compliance." },
            ],
        },
        {
            category: "FSSAI Registration",
            services: [
                { name: "FSSAI Registration & Licensing", description: "Obtain food safety registration and license for your food business with ease." },
            ],
        },
    ];

    return (
        <InnerPageContainer title="Our Services">
            <PageMetaTags 
                title="Our Services - Income Tax, GST & FSSAI Experts"
                description="Professional tax solutions including Income Tax Returns, GST Filing, and FSSAI Registration. Trusted financial experts at your service."
                url="/services"
            />

            <div className="mt-12 space-y-8 text-gray-700">
                {services.map((category, index) => (
                    <div key={index} className="p-6 border border-gray-200 rounded-lg bg-gray-50">
                        <h3 className="text-lg font-semibold text-blue-700">{category.category}</h3>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            {category.services.map((service, i) => (
                                <li key={i}>
                                    <strong>{service.name}:</strong> {service.description}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </InnerPageContainer>
    );
}
