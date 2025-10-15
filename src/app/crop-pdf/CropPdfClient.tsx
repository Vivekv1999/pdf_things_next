"use client";

import dynamic from "next/dynamic";

const CropPdf = dynamic(() => import("./CropPdf"), { ssr: false });

export default function CropPdfClient() {
    return <CropPdf />;
}
