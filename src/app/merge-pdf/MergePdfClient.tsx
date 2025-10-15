"use client";

import dynamic from "next/dynamic";

const MergePdf = dynamic(() => import("./MergePdf"), { ssr: false });

export default function MergePdfClient() {
    return <MergePdf />;
}
