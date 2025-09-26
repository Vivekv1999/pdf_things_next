"use client"

import { Button } from "@/src/components/ui/button";
import { RotateCcw } from "lucide-react";

const SplitActionButton = ({ splitPdf,
    setPdfs
}: any) => {

    return (
        <div className="flex sm:flex-row flex-col justify-center items-center gap-3 mt-28">
            {/* {!loading && !alredyMergePdf && ( */}
            <Button
                onClick={splitPdf}
                className="bg-[#4f3df7] hover:bg-[#4f3df7]/90 rounded-lg text-white"
            >
                Split & Download
            </Button>
            {/* )} */}

            {/* {loading && <LoadingDownload progress={progress} messages={messages} />} */}

            {/* {alredyMergePdf && !loading && (
                <ProcessComplete
                    message="Merge Complete"
                    title={`${pdfs.length} files merged successfully`}
                    onDownload={handleMergePdfs}
                    buttonLabel=" Download Merged PDF"
                />
            )} */}

            <Button
                variant="outline"
                className="hover:bg-red-50 border-red-300 rounded-lg text-red-500 hover:text-red-600"
                onClick={() => {
                    setPdfs([]);
                    // setProgress(null);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }}
            >
                <RotateCcw className="size-4" />
                Reset
            </Button>
        </div>
    )
}

export default SplitActionButton
