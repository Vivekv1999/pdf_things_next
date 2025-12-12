"use client";

import dynamic from "next/dynamic";

const JpgToPdf = dynamic(() => import("./JpgToPdf"), { ssr: false });

export default function JpgToPdfClient() {
    return <JpgToPdf />;
}
