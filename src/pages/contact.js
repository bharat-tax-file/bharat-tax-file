import dynamic from "next/dynamic";
import { FaWhatsapp, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import InnerPageContainer from "@/components/common/InnerPageContainer";

const PageMetaTags = dynamic(() => import("@/containers/PageMetaTags"), { ssr: false });

export default function ContactPage() {
  return (
    <div className="relative bg-white text-gray-800">
      <InnerPageContainer title="Contact Us">
        <PageMetaTags
          title="Contact Us - GST & ITR Experts"
          description="Expert GST registration, ITR filing, and tax compliance services. Contact our professionals for seamless and hassle-free financial solutions."
          url="/contact-us"
        />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-blue-50 p-10 rounded-3xl shadow-lg"
          >
            <h3 className="text-3xl font-bold text-blue-700 mb-6">
              We&rsquo;d love to hear from you
            </h3>
            <div className="space-y-4 text-lg">
              <p className="flex items-center gap-3">
                <FaPhoneAlt className="text-blue-600" />
                <a href="tel:+919205174213" className="hover:underline">
                  +91 9205174213
                </a>
              </p>
              <p className="flex items-center gap-3">
                <FaEnvelope className="text-blue-600" />
                <a href="mailto:easyreturn@bharattaxfile.com" className="hover:underline">
                  easyreturn@bharattaxfile.com
                </a>
              </p>
              <a
                href="https://wa.me/919205174213"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 mt-4 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full shadow-lg transition"
              >
                <FaWhatsapp className="text-lg" /> Chat on WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-10 bg-white border border-blue-100 rounded-3xl shadow-xl"
          >
            <h3 className="text-2xl font-semibold text-blue-800 mb-4">Send us a message</h3>
            <form
              action="https://formsubmit.co/easyreturn@bharattaxfile.com"
              method="POST"
              className="space-y-6"
            >
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value="https://bharattaxfile.com/thank" />

              <div>
                <label className="block text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="mt-1 w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="mt-1 w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Message</label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  className="mt-1 w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-medium transition"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </InnerPageContainer>

      {/* Floating WhatsApp Icon */}
      <a
        href="https://wa.me/919205174213"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl transition-all duration-300"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="text-2xl" />
      </a>
    </div>
  );
}
