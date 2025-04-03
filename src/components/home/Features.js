import { motion } from "framer-motion";

const featuresData = [
    { title: "Expert Assistance", description: "Get guidance from tax experts to ensure accurate and hassle-free GST and ITR filing." },
    { title: "Quick Filing", description: "File your GST and Income Tax Returns quickly with our user-friendly platform." },
    { title: "Compliance Support", description: "Stay compliant with the latest tax regulations and avoid penalties." },
    { title: "Secure Data Handling", description: "Your financial data is encrypted and handled with the utmost security." },
    { title: "Affordable Pricing", description: "Access our services at competitive prices, tailored to your needs." },
    { title: "24/7 Support", description: "Our dedicated support team is available round the clock to assist you." },
];

function Features() {
    return (
        <section className="flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white py-24 px-6">
            {/* SEO-Optimized Heading */}
            <h1 className="text-5xl font-extrabold text-blue-700 text-center mb-6">
                <span className="text-gray-900">Our</span> Services
            </h1>
            <p className="text-lg text-gray-600 text-center max-w-3xl mb-12">
                We provide expert solutions for seamless tax filing, ensuring accuracy, security, and compliance.
            </p>

            {/* Feature Cards Grid */}
            <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 w-full max-w-6xl">
                {featuresData.map((feature, index) => (
                    <motion.article
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative group bg-white/80 backdrop-blur-lg border border-blue-200 shadow-xl rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl hover:border-blue-500"
                    >
                        {/* Animated Title */}
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="text-xl font-semibold text-gray-800"
                        >
                            {feature.title}
                        </motion.h2>
                        <p className="text-gray-600 mt-2">{feature.description}</p>

                        {/* SEO-Friendly Bottom Glowing Line on Hover */}
                        <motion.div
                            className="absolute bottom-0 left-1/2 w-0 h-[3px] bg-blue-500 transition-all duration-300 group-hover:w-2/3 transform -translate-x-1/2"
                        />
                    </motion.article>
                ))}
            </div>
        </section>
    );
}

export default Features;
