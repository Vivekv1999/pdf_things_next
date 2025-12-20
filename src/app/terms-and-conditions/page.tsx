import type { Metadata } from "next";
import { siteConfig } from "@/src/constants/appConstants";

export const metadata: Metadata = {
    title: "Terms & Conditions | PDF Things",
    description: "Read the terms and conditions for using PDF Things. All services are currently free with browser-based processing.",
    alternates: {
        canonical: `${siteConfig.url}/terms-and-conditions`,
    },
};

const TermsAndConditions = () => {
    return (
        <div className="mx-auto p-6 max-w-4xl">
            <h1 className="mb-6 font-bold text-4xl">Terms & Conditions</h1>
            <p className="mb-8 text-gray-600">
                Last updated: December 9, 2025
            </p>

            <div className="space-y-8 text-gray-700">
                <section>
                    <h2 className="mb-3 font-semibold text-2xl text-gray-900">1. Acceptance of Terms</h2>
                    <p>
                        By accessing and using PDF Things, you accept and agree to be bound by these Terms and Conditions.
                        If you do not agree to these terms, please do not use our services.
                    </p>
                </section>

                <section>
                    <h2 className="mb-3 font-semibold text-2xl text-gray-900">2. Description of Service</h2>
                    <p className="mb-3">
                        PDF Things is a web-based platform that provides PDF manipulation tools including merging, splitting,
                        cropping, compression, and e-commerce label processing.
                    </p>
                    <p className="mb-3">
                        <strong className="text-gray-900">Important:</strong> All processing is performed in your browser using your device&apos;s resources.
                    </p>
                    <ul className="space-y-2 pl-6 list-disc">
                        <li>Your files are NOT uploaded to our servers</li>
                        <li>All operations happen locally on your device</li>
                        <li>Performance depends on your device&apos;s capabilities</li>
                        <li>Heavy operations may not work on less powerful devices</li>
                    </ul>
                </section>

                <section>
                    <h2 className="mb-3 font-semibold text-2xl text-gray-900">3. Current Pricing and Future Changes</h2>
                    <p className="mb-3">
                        <strong className="text-gray-900">Currently:</strong> All services are provided free of charge.
                    </p>
                    <p className="mb-3">
                        <strong className="text-gray-900">Future Plans:</strong> We may introduce subscription plans in the future.
                        Users will be notified in advance of any pricing changes.
                    </p>
                    <ul className="space-y-2 pl-6 list-disc">
                        <li>Existing free features may become part of paid tiers</li>
                        <li>You will not be charged without your explicit consent</li>
                        <li>We reserve the right to modify pricing and service offerings</li>
                    </ul>
                </section>

                <section>
                    <h2 className="mb-3 font-semibold text-2xl text-gray-900">4. User Responsibilities</h2>
                    <p className="mb-3">When using our services, you agree to:</p>
                    <ul className="space-y-2 pl-6 list-disc">
                        <li>Use the service only for lawful purposes</li>
                        <li>Not use the service to process illegal, harmful, or inappropriate content</li>
                        <li>Not attempt to reverse engineer, modify, or interfere with the service</li>
                        <li>Not use automated systems to access the service excessively</li>
                        <li>Ensure you have proper rights to any files you process</li>
                    </ul>
                </section>

                <section>
                    <h2 className="mb-3 font-semibold text-2xl text-gray-900">5. Device Requirements and Limitations</h2>
                    <p className="mb-3">
                        Since all processing happens in your browser:
                    </p>
                    <ul className="space-y-2 pl-6 list-disc">
                        <li>You need a modern browser with JavaScript enabled</li>
                        <li>Large files or complex operations require adequate device resources</li>
                        <li>Processing speed depends on your device&apos;s CPU and memory</li>
                        <li>We are not responsible for performance issues related to device limitations</li>
                    </ul>
                </section>

                <section>
                    <h2 className="mb-3 font-semibold text-2xl text-gray-900">6. Intellectual Property</h2>
                    <p className="mb-3">
                        All content, features, and functionality of PDF Things are owned by us and are protected by
                        copyright, trademark, and other intellectual property laws.
                    </p>
                    <p>
                        You retain all rights to the files you process using our service.
                    </p>
                </section>

                <section>
                    <h2 className="mb-3 font-semibold text-2xl text-gray-900">7. Disclaimer of Warranties</h2>
                    <p className="mb-3">
                        Our service is provided &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; without warranties of any kind, either express or implied.
                    </p>
                    <ul className="space-y-2 pl-6 list-disc">
                        <li>We do not guarantee uninterrupted or error-free service</li>
                        <li>We do not warrant the accuracy or completeness of results</li>
                        <li>We are not responsible for data loss or file corruption</li>
                        <li>We recommend keeping backups of important files</li>
                    </ul>
                </section>

                <section>
                    <h2 className="mb-3 font-semibold text-2xl text-gray-900">8. Limitation of Liability</h2>
                    <p>
                        To the maximum extent permitted by law, we shall not be liable for any indirect, incidental,
                        special, consequential, or punitive damages resulting from your use of or inability to use the service.
                    </p>
                </section>

                <section>
                    <h2 className="mb-3 font-semibold text-2xl text-gray-900">9. Privacy and Data</h2>
                    <p>
                        Your use of the service is also governed by our Privacy Policy. Since we process files in your browser:
                    </p>
                    <ul className="space-y-2 pl-6 list-disc">
                        <li>We do not store your files</li>
                        <li>We do not collect your document data</li>
                        <li>Your files remain on your device throughout processing</li>
                    </ul>
                </section>

                <section>
                    <h2 className="mb-3 font-semibold text-2xl text-gray-900">10. Termination</h2>
                    <p>
                        We reserve the right to suspend or terminate your access to the service at any time,
                        for any reason, including violation of these terms.
                    </p>
                </section>

                <section>
                    <h2 className="mb-3 font-semibold text-2xl text-gray-900">11. Changes to Terms</h2>
                    <p>
                        We may modify these Terms and Conditions at any time. Changes will be posted on this page
                        with an updated revision date. Continued use of the service after changes constitutes
                        acceptance of the new terms.
                    </p>
                </section>

                <section>
                    <h2 className="mb-3 font-semibold text-2xl text-gray-900">12. Governing Law</h2>
                    <p>
                        These terms shall be governed by and construed in accordance with applicable laws,
                        without regard to conflict of law provisions.
                    </p>
                </section>

                <section>
                    <h2 className="mb-3 font-semibold text-2xl text-gray-900">13. Contact Information</h2>
                    <p>
                        If you have any questions about these Terms and Conditions, please contact us through our contact page.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default TermsAndConditions;
