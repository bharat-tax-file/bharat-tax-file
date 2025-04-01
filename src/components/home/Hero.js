import Link from "next/link";
import { motion } from "framer-motion";
import { FaRegFileAlt } from "react-icons/fa";

function Hero() {
  return (
    <div className="hero py-12 bg-gradient-to-t from-blue-500 to-purple-700">
      <div className="hero-content md:px-0 px-4 max-w-6xl flex-col lg:flex-row-reverse">
        {/* Left side content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="col-span-8 place-self-center text-center sm:text-left justify-self-start"
        >
          <h1 className="text-5xl text-white font-bold md:leading-none leading-tight md:mt-0 mt-10">
            <FaRegFileAlt className="inline-block mr-4 text-white text-4xl" />
            Simplify Your <span className="md:block mt-4 text-white">ITR & GST Filing</span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="py-2 text-xl text-white mt-4 pr-8"
          >
            Use our platform to file your Income Tax Returns and GST quickly and accurately.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="mt-6"
          >
            <Link href="/contact">
              <button className="btn text-lg mt-6 px-12 bg-white text-blue-700 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition-transform transform hover:scale-105">
                Get Started
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Hero;
