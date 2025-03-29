import InnerPageContainer from "@/components/common/InnerPageContainer";
import PageMetaTags from "@/containers/PageMetaTags";

export default function Page() {
    return (
      <InnerPageContainer title="About Us">
            <PageMetaTags title="About Us" description={"GST and ITR Filing Services"} url="/about-us"/>
            <p className="mt-8">
            Welcome to [Your Company Name], your trusted partner for hassle-free GST and ITR filing! We specialize in making tax compliance easy, efficient, and stress-free for businesses and individuals. Our expert team is committed to providing accurate and timely tax solutions tailored to your needs.
            </p>

            <h3 className="mt-8 font-bold text-xl">Our Mission</h3>
            <p className="mt-2">
            Our mission is to simplify tax compliance for everyone, ensuring businesses and individuals stay legally compliant without unnecessary complexity. We leverage technology and expert knowledge to provide seamless GST and ITR filing solutions, minimizing errors and maximizing savings.
            </p>
            
            <h3 className="mt-8 font-bold text-xl">Why Choose Us?</h3>
            <p className="mt-2">
             
             1. Flexible hours consultancy 
             2. Personalized consultancy 
             3. Expert knowledge  
             4. Stress free tax filing
             5. Transparent pricing 
             6. Timely services             
            </p>
            
            <h3 className="mt-8 font-bold text-xl">Get Started Today!</h3>
            <p className="mt-2">
            Join thousands of satisfied customers who trust us for their tax compliance needs. Whether you're a business owner or an individual taxpayer, we’re here to make GST and ITR filing effortless for you. Let us handle the paperwork while you focus on what truly matters!
            </p>
      </InnerPageContainer>
    )
}
