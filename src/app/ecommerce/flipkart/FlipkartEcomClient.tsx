"use client";

import dynamic from "next/dynamic";

const FlipkartEcom = dynamic(() => import("./FlipkartEcom"), { ssr: false });


const FlipkartEcomClient = () => {
    return <FlipkartEcom />;
}

export default FlipkartEcomClient