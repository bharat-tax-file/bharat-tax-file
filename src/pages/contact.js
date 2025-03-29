import InnerPageContainer from "@/components/common/InnerPageContainer";
import PageMetaTags from "@/containers/PageMetaTags";

export default function Page() {
    return (
        <InnerPageContainer title="Contact Us">
            <PageMetaTags 
                title="Contact Us - GST & ITR Experts" 
                description="Expert GST registration, ITR filing, and tax compliance services. Contact our professionals for seamless and hassle-free financial solutions." 
                url="/contact-us" 
            />

            <div className="mt-12 space-y-8 text-gray-700">
                {/* Introduction */}
                <p className="text-lg font-semibold">
                    Your Trusted Partner for GST & ITR Services
                </p>
                <p>
                    We specialize in GST registration, tax compliance, and ITR filin to help businesses and individuals stay compliant while optimizing tax benefits. Our team of certified tax professionals ensures accurate, timely, and hassle-free tax solutions tailored to your needs.
                </p>

                {/* Services Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* GST Services */}
                    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                        <h3 className="text-lg font-semibold text-blue-700">GST Services</h3>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>GST Registration & Compliance</li>
                            <li>Monthly GST Return Filing</li>
                            <li>GST Audit & Reconciliation</li>
                        </ul>
                    </div>

                    {/* ITR Services */}
                    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                        <h3 className="text-lg font-semibold text-green-700">ITR Filing Services</h3>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Individual & Business ITR Filing</li>
                            <li>Tax Planning & Deductions</li>
                            <li>Income Tax Assessments</li>
                        </ul>
                    </div>
                </div>

                {/* Why Choose Us */}
                <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-700">Why Choose Us?</h3>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Certified Tax Experts with years of experience</li>
                        <li>Fast & Error-Free Filing to avoid penalties</li>
                        <li>Affordable Pricing with transparent processes</li>
                        <li>Dedicated Suppor for all tax-related queries</li>
                    </ul>
                </div>

                {/* Contact Information */}
                <div className="p-6 bg-gray-800 text-white rounded-lg">
                    <h3 className="text-lg font-semibold">Get in Touch</h3>
                    <p className="mt-2">
                        📞 Call us: <a href="tel:+91123456789" className="underline">+91 123456789</a>  
                        <br />
                        📧 Email: <a href="mailto:contact@d.com" className="underline">contact@d.com</a>  
                        <br />
                      
                    </p>
                </div>
            </div>
        </InnerPageContainer>
    );
}
