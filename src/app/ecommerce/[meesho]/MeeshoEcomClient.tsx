"use client";

import dynamic from "next/dynamic";

const MeeshoEcom = dynamic(() => import("./MeeshoEcom"), { ssr: false });


export default function MeeshoEcomClient() {
    return <MeeshoEcom />;
}
