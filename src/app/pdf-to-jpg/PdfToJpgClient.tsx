"use client";

import dynamic from "next/dynamic";

const PdfToJpg = dynamic(() => import("./PdfToJpg"), { ssr: false });

export default function PdfToJpgClient() {
    return <PdfToJpg />;
}
