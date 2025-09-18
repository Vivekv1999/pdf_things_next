"use client";
import { ReactNode } from "react";

export default function ToolWrapper({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col justify-start items-center px-4 py-6 w-full min-h-screen">
            <div className="w-full max-w-5xl md:max-w-6xl lg:max-w-6xl">
                {children}
            </div>
        </div>
    );
}