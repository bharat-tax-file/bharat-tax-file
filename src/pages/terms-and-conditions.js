import InnerPageContainer from "@/components/common/InnerPageContainer";
import PageMetaTags from "@/containers/PageMetaTags";

export default function Page() {
    return (
        <InnerPageContainer title="Terms and Conditions">
            <PageMetaTags title="Terms and Conditions" description="Terms and Conditions for our GST and ITR filing services" url="/terms-and-conditions"/>

            <p className="mt-8">
                Welcome to our website (referred to as "we," "us," or "our"). By accessing or using our services, including GST filing, Income Tax Return (ITR) filing, and related financial services (the "Services"), you agree to comply with and be bound by the following Terms and Conditions ("Terms"). If you do not agree with these Terms, please do not use our website or Services.
            </p>

            <h2 className="mt-6 font-bold">1. Service Scope</h2>
            <p className="mt-4">
                We provide GST registration, GST return filing, Income Tax Return (ITR) filing, and other tax-related consultancy services. Our services are subject to applicable laws and regulations, and we strive to ensure accuracy and compliance.
            </p>

            <h2 className="mt-6 font-bold">2. User Responsibilities</h2>
            <p className="mt-4">
                - You agree to provide accurate and complete information required for tax filing.  
                - You are responsible for ensuring the correctness of documents submitted for GST and ITR filings.  
                - We are not liable for penalties due to incorrect or delayed submissions caused by false or incomplete information from your side.  
            </p>

            <h2 className="mt-6 font-bold">3. Payment and Refund Policy</h2>
            <p className="mt-4">
                - Service fees must be paid in advance as per the selected plan.  
                - No refunds shall be provided once the filing process has begun.  
                - Any additional services requested after submission will be charged separately.  
            </p>

            <h2 className="mt-6 font-bold">4. Data Privacy and Security</h2>
            <p className="mt-4">
                - We ensure confidentiality and data security, but we are not liable for third-party breaches.  
                - Your personal and financial information will not be shared without your consent, except as required by law.  
            </p>

            <h2 className="mt-6 font-bold">5. Limitation of Liability</h2>
            <p className="mt-4">
                - We are not liable for penalties, fines, or legal consequences arising from incorrect information provided by the user.  
                - Our liability is limited to the service fee paid by the client.  
            </p>

            <h2 className="mt-6 font-bold">6. Modification of Terms</h2>
            <p className="mt-4">
                We reserve the right to update or modify these Terms at any time without prior notice. Continued use of our services implies acceptance of the updated Terms.
            </p>

            <h2 className="mt-6 font-bold">7. Contact Information</h2>
            <p className="mt-4">
                If you have any questions regarding these Terms, please contact us at [your email/contact details].  
            </p>
        </InnerPageContainer>
    );
}
