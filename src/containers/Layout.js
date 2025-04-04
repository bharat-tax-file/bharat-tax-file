import Link from "next/link";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Head from "next/head";


export default function Layout({ children }) {
    return (
        <>
            <Head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="keywords" content="GST Filing, ITR Filing, Tax Filing" />
                <meta name="robots" content="index, follow" />
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="author" content="Tax Filing Platform" />
                <link rel="icon" href="/favicon.png" />
            </Head>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">{children}</main>
                <Footer />
</div>
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                
            <div className="drawer-side">
    <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
    <ul className="menu p-4 w-80 h-full bg-base-100">
        <li className="mr-2">
            <Link href="/">Home</Link>
            <Link href="/about-us">about us</Link>
            <Link href="/services">Services</Link>
            <Link href="/contact">contact us</Link>
            <Link href="/terms-and-conditions">Terms and Conditions</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            
            
        </li>
    </ul>
</div>
            
        </>
    );
}