import DocumentTextIcon from '@heroicons/react/24/outline/DocumentTextIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/outline/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/outline/ArrowUpOnSquareIcon';

const generationStepData = [
    { icon: <ArrowUpOnSquareIcon className="w-10 h-10 inline-block mr-2" />, description: "Get in contact with our Team." },
    { icon: <DocumentTextIcon className="w-10 h-10 inline-block mr-2" />, description: "Review and verify your details." },
    { icon: <ArrowDownOnSquareIcon className="w-10 h-10 inline-block mr-2" />, description: "Get your GST and ITR filed." },
];

function GenerationStep() {
    return (
        <>
            <div className="grid place-items-center bg-slate-50 w-full">
                <div className="max-w-6xl w-full py-24 px-4 content-center justify-center">
                    <h2 className="text-3xl text-center font-bold">File Your GST & ITR in 3 Simple Steps</h2>
                    <div className="grid mt-24 md:grid-cols-3 grid-cols-1 gap-8">
                        {generationStepData.map((step, index) => (
                            <div key={index} className="card w-full bg-base-100 shadow-xl hover:shadow-2xl">
                                <div className="grid -mt-4 place-items-center">
                                    <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-100 flex font-bold justify-center items-center">
                                        <p>{index + 1}</p>
                                    </div>
                                </div>
                                <div className="card-body items-center text-center">
                                    <p className="text-primary">{step.icon}</p>
                                    <p className="mt-2">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default GenerationStep;