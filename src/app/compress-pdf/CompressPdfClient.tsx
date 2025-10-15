"use client";

import dynamic from "next/dynamic";

const CompressPdf = dynamic(() => import("./CompressPdf"), { ssr: false });


export default function CompressPdfClient() {
    return <CompressPdf />;
}
