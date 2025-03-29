const featuresData = [
    {title : "Expert Assistance", description : "Get guidance from tax experts to ensure accurate and hassle-free GST and ITR filing."},
    {title : "Quick Filing", description : "File your GST and Income Tax Returns quickly with our user-friendly platform."},
    {title : "Compliance Support", description : "Stay compliant with the latest tax regulations and avoid penalties."},
    {title : "Secure Data Handling", description : "Your financial data is encrypted and handled with the utmost security."},
    {title : "Affordable Pricing", description : "Access our services at competitive prices, tailored to your needs."},
    {title : "24/7 Support", description : "Our dedicated support team is available round the clock to assist you."},
];

function Features(){
    return(
        <>
             <div className="grid place-items-center w-full bg-base-200">
            <div className="max-w-5xl py-24 content-center justify-center">
                <h1 className="text-4xl text-center font-bold">Our Services</h1>
                <div className="grid mt-12 md:grid-cols-3 grid-cols-1 gap-8">
                {
                    featuresData.map((i, k) => {
                        return(
                            <div key={k} className="card w-full bg-base-100 shadow-xl hover:shadow-2xl">
                                <div className="card-body mt-4 items-center text-center">
                                    <h2 className="card-title">{i.title}</h2>
                                    <p>{i.description}</p>
                                </div>
                            </div>
                        )
                    })
                }
                
            </div>
            </div>
        </div>
        </>
    )
}

export default Features;