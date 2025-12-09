const PrivacyPolicy = () => {
    return (
        <div className="mx-auto p-6 max-w-4xl">
            <h1 className="mb-6 font-bold text-4xl">Privacy Policy</h1>
            <p className="mb-8 text-gray-600">
                Last updated: December 9, 2025
            </p>

            <div className="space-y-8 text-gray-700">
                <section>
                    <h2 className="mb-3 font-semibold text-2xl text-gray-900">1. Introduction</h2>
                    <p>
                        Welcome to PDF Things. We are committed to protecting your privacy and ensuring the security of your data.
                        This Privacy Policy explains how we handle your information when you use our services.
                    </p>
                </section>

                <section>
                    <h2 className="mb-3 font-semibold text-2xl text-gray-900">2. Data Processing and Storage</h2>
                    <p className="mb-3">
                        <strong className="text-gray-900">Important:</strong> All PDF processing happens directly in your browser using your device's processing power.
                    </p>
                    <ul className="space-y-2 pl-6 list-disc">
                        <li>We do NOT upload your files to our servers</li>
                        <li>We do NOT store your files anywhere</li>
                        <li>We do NOT collect your document data</li>
                        <li>All operations are performed locally on your device</li>
                    </ul>
                    <p className="mt-3 text-sm italic">
                        Note: Because processing happens in your browser, the app's performance depends on your device's capabilities.
                        Heavy operations may not be possible on less powerful devices.
                    </p>
                </section>

                <section>
                    <h2 className="mb-3 font-semibold text-2xl text-gray-900">3. Information We Collect</h2>
                    <p className="mb-3">Currently, we collect minimal information:</p>
                    <ul className="space-y-2 pl-6 list-disc">
                        <li><strong>Usage Analytics:</strong> We may collect anonymous usage statistics to improve our service</li>
                        <li><strong>Contact Information:</strong> If you contact us, we collect the information you provide</li>
                        <li><strong>Browser Information:</strong> Standard browser data like IP address, browser type, and device information</li>
                    </ul>
                </section>

                <section>
                    <h2 className="mb-3 font-semibold text-2xl text-gray-900">4. How We Use Your Information</h2>
                    <p className="mb-3">The limited information we collect is used to:</p>
                    <ul className="space-y-2 pl-6 list-disc">
                        <li>Improve and optimize our services</li>
                        <li>Respond to your inquiries and support requests</li>
                        <li>Analyze usage patterns to enhance user experience</li>
                        <li>Ensure the security and proper functioning of our website</li>
                    </ul>
                </section>

                <section>
                    <h2 className="mb-3 font-semibold text-2xl text-gray-900">5. Third-Party Services</h2>
                    <p>
                        We may use third-party services for analytics and website functionality. These services may collect
                        information as described in their respective privacy policies.
                    </p>
                </section>

                <section>
                    <h2 className="mb-3 font-semibold text-2xl text-gray-900">6. Cookies</h2>
                    <p>
                        We may use cookies and similar technologies to enhance your browsing experience. You can control
                        cookie preferences through your browser settings.
                    </p>
                </section>

                <section>
                    <h2 className="mb-3 font-semibold text-2xl text-gray-900">7. Data Security</h2>
                    <p>
                        Since all file processing happens in your browser and we don't store your files, your documents
                        remain completely private and secure on your device. We implement industry-standard security measures
                        to protect any information we do collect.
                    </p>
                </section>

                <section>
                    <h2 className="mb-3 font-semibold text-2xl text-gray-900">8. Your Rights</h2>
                    <p className="mb-3">You have the right to:</p>
                    <ul className="space-y-2 pl-6 list-disc">
                        <li>Know what information we collect about you</li>
                        <li>Request deletion of your personal information</li>
                        <li>Opt-out of data collection where applicable</li>
                        <li>Update or correct your information</li>
                    </ul>
                </section>

                <section>
                    <h2 className="mb-3 font-semibold text-2xl text-gray-900">9. Children's Privacy</h2>
                    <p>
                        Our services are not intended for children under 13. We do not knowingly collect information from children.
                    </p>
                </section>

                <section>
                    <h2 className="mb-3 font-semibold text-2xl text-gray-900">10. Changes to This Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time. Any changes will be posted on this page with
                        an updated revision date. We encourage you to review this policy periodically.
                    </p>
                </section>

                <section>
                    <h2 className="mb-3 font-semibold text-2xl text-gray-900">11. Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us through our contact page.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
