import type { Metadata } from "next";
import { siteConfig } from "@/src/constants/appConstants";

export const metadata: Metadata = {
    title: "Contact Us | PDF Things",
    description: "Get in touch with the PDF Things team. We'd love to hear from you!",
    alternates: {
        canonical: `${siteConfig.url}/contact-us`,
    },
};

const page = () => {
    return (
        <div className="mx-auto p-6 max-w-3xl">
            <h1 className="mb-4 font-bold text-3xl">Contact Us</h1>
            <p className="mb-8 text-gray-600">
                We&apos;d love to hear from you! Fill out the form below and our team will get back to you soon.
            </p>

            <div className="bg-white shadow-md p-4 rounded-lg">
                <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScVX-hNzpYSYp_KEEM98mV_OGo9LOwA050Cep8c7ugSlyE2sQ/viewform?embedded=true" width="640" height="721">Loading…</iframe>
            </div>
        </div>
    );
};

export default page;
