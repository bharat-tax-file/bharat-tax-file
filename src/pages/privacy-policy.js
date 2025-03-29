import InnerPageContainer from "@/components/common/InnerPageContainer";
import PageMetaTags from "@/containers/PageMetaTags";

export default function Page() {
    return (
        <InnerPageContainer title="Privacy Policy">
            <PageMetaTags title="Privacy Policy" description="Learn how we handle your data while using our GST and ITR filing platform." url="/privacy-policy" />
            <p className="mt-8">
                Our platform is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you use our GST and ITR filing services.
                <br />
                <br />
                We ensure that your data is handled securely and in compliance with applicable laws and regulations.
            </p>
        </InnerPageContainer>
    );
}
