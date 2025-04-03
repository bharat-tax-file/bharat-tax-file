import DocumentTextIcon from '@heroicons/react/24/outline/DocumentTextIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/outline/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/outline/ArrowUpOnSquareIcon';

const generationStepData = [
    { icon: <ArrowUpOnSquareIcon className="w-10 h-10 text-blue-500 transition-all duration-300 group-hover:scale-110" />, title: "Step 1: Contact Us", description: "Get in touch with our team to start the process." },
    { icon: <DocumentTextIcon className="w-10 h-10 text-blue-500 transition-all duration-300 group-hover:scale-110" />, title: "Step 2: Verification", description: "We’ll review and verify all your details accurately." },
    { icon: <ArrowDownOnSquareIcon className="w-10 h-10 text-blue-500 transition-all duration-300 group-hover:scale-110" />, title: "Step 3: File GST & ITR", description: "Get your GST & ITR filed seamlessly." },
];

function GenerationStep() {
    return (
        <section className="flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white py-24 px-6">
            <h2 className="text-4xl font-extrabold text-blue-700 text-center mb-12">
                File Your <span className="text-blue-500">GST & ITR</span> in 3 Simple Steps
            </h2>

            <div className="w-full max-w-3xl bg-white/70 backdrop-blur-lg border border-blue-100 shadow-2xl rounded-3xl p-10 md:p-14 flex flex-col gap-10 transition-all hover:shadow-blue-300/50">
                {generationStepData.map((step, index) => (
                    <div key={index} className="flex items-start gap-5 relative group">
                        {/* Step Number */}
                        <div className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white font-bold rounded-full shadow-lg transition-all duration-300 group-hover:scale-110">
                            {index + 1}
                        </div>

                        {/* Step Content */}
                        <div className="flex flex-col">
                            <div className="flex items-center gap-3">
                                {step.icon}
                                <h3 className="text-lg font-semibold text-gray-800">{step.title}</h3>
                            </div>
                            <p className="text-gray-600 mt-1">{step.description}</p>
                        </div>

                        {/* Animated Connector Line (Not for last step) */}
                        {index !== generationStepData.length - 1 && (
                            <div className="absolute left-6 top-14 w-[3px] h-12 bg-gradient-to-b from-blue-400 to-blue-200 animate-pulse"></div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}

export default GenerationStep;
