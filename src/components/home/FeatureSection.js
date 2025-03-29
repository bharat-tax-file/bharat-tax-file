import Link from "next/link";
import FeatureImageContainer from "../common/FeatureImageContainer";

function FeatureSection({ title, leftText, showHeading }) {
    return (
        <>
            {showHeading && <h2 className="text-3xl mt-12 text-center font-bold">Simplify Your Tax Filing</h2>}
            <div className={`grid place-items-center w-full ${leftText ? "" : ""}`}>
                <div className="max-w-6xl px-4 py-12 content-center justify-center">
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
                        {
                            !leftText && (
                                <FeatureImageContainer imageUrl="https://plus.unsplash.com/premium_photo-1661773541234-1b2a3e4f5d6e?auto=format&fit=crop&q=80&w=2831&ixlib=rb-4.0.3" />
                            )
                        }

                        <div className="text-center py-24">
                            <h2 className="text-2xl text-center leading-10 font-bold">
                                {title || "File Your GST & ITR with Ease"}
                            </h2>
                            <p className="mt-4 text-lg text-gray-600">
                                Use our platform to file your GST and Income Tax Returns quickly, accurately, and securely. Stay compliant with the latest regulations and avoid penalties.
                            </p>
                            <Link href="/start-filing">
                                <button className="btn btn-primary mt-8 px-8 normal-case">Get Started</button>
                            </Link>
                        </div>

                        {
                            leftText && (
                                <FeatureImageContainer imageUrl="https://plus.unsplash.com/premium_photo-1661773541234-1b2a3e4f5d6e?auto=format&fit=crop&q=80&w=2831&ixlib=rb-4.0.3" />
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default FeatureSection;