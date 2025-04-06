'use client'; // Only needed for App Router

import dynamic from "next/dynamic";
import { FaWhatsapp, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import InnerPageContainer from "@/components/common/InnerPageContainer";

const PageMetaTags = dynamic(() => import("@/containers/PageMetaTags"), { ssr: false });

export default function ContactPage() {
  return (
    <div className="relative">
      <InnerPageContainer title="Contact Us">
        <PageMetaTags
          title="Contact Us - GST & ITR Experts"
          description="Expert GST registration, ITR filing, and tax compliance services. Contact our professionals for seamless and hassle-free financial solutions."
          url="/contact-us"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 text-gray-700">
          {/* Contact Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 bg-gray-800 text-white rounded-2xl shadow-xl"
          >
            <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
            <div className="space-y-3 text-sm">
              <p className="flex items-center gap-2">
                <FaPhoneAlt />
                <a href="tel:+919205174213" className="underline hover:text-green-400">+91 9205174213</a>
              </p>
              <p className="flex items-center gap-2">
                <FaEnvelope />
                <a href="mailto:easyreturn@bharattaxfile.com" className="underline hover:text-blue-400">easyreturn@bharattaxfile.com</a>
              </p>
            </div>

            <div className="mt-6">
              <a
                href="https://wa.me/919205174213"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg shadow-lg transition-all duration-200 text-sm"
              >
                <FaWhatsapp className="text-lg" />
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-6 bg-white border border-gray-200 rounded-2xl shadow-md"
          >
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Send us a message</h3>
            <form
              action="https://formsubmit.co/easyreturn@bharattaxfile.com"
              method="POST"
              className="space-y-5"
            >
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value="https://yourdomain.com/thank-you" />

              <div>
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Message</label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
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
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="text-2xl" />
      </a>
    </div>
  );
}
