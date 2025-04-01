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
                {/* Contact Form */}
                <div className="p-6 bg-gray-100 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800">Send Us a Message</h3>
                    <form className="mt-4 space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Your Name"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Your Phone Number"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Your Message"
                                required
                            ></textarea>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>

                {/* Contact Information */}
                <div className="p-6 bg-gray-800 text-white rounded-lg">
                    <h3 className="text-lg font-semibold">Get in Touch</h3>
                    <p className="mt-2">
                        📞 Call us: <a href="tel:+91123456789" className="underline">+91 9205174213</a>  
                        <br />
                        📧 Email: <a href="mailto:contact@d.com" className="underline">easyreturn@bharattaxfile.com</a>  
                    </p>
                </div>
            </div>
        </InnerPageContainer>
    );
}
