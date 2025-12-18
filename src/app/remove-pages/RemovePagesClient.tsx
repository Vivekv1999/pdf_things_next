"use client";

import dynamic from "next/dynamic";

const RemovePages = dynamic(() => import("./RemovePages"), { ssr: false });

export default function RemovePagesClient() {
    return <RemovePages />;
}
