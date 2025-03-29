import Link from "next/link";

function Hero() {
    return (
        <div className="hero py-12 bg-gradient-to-t from-blue-500 to-purple-700">
            <div className="hero-content md:px-0 px-4 max-w-6xl flex-col lg:flex-row-reverse">
                <div className="lg:mr-auto lg:ml-4"> {/* Added margin-left for more left alignment */}
                    <h1 className="text-5xl text-slate-100 font-bold md:leading-none leading-tight md:mt-0 mt-10">
                        Simplify Your <span className="md:block mt-4">ITR & GST Filing</span>
                    </h1>
                    <p className="py-2 text-xl text-slate-100 mt-4 pr-8"> {/* Reduced padding-right */}
                        Use our platform to file your Income Tax Returns and GST quickly and accurately.
                    </p>
                    <Link href="/contact">
                        <button className="btn text-lg mt-16 px-12 btn-primary normal-case">Get Started</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Hero;