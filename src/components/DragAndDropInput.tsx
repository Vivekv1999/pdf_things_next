// components/DragAndDropInput.tsx
import { ChangeEvent, FC, useState } from "react";

interface DragAndDropInputProps {
    handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
    multiFile?: boolean;
    accept?: string;
}

const DragAndDropInput: FC<DragAndDropInputProps> = ({
    handleFileChange,
    multiFile = true,
    accept = "application/pdf"
}) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        // Simple validation based on accept
        // If accept is "application/pdf", we filtering by type
        // If accept is "image/*", we filter by type starts with image/
        // If accept has extensions, checking is harder. 
        // For now, let's keep it simple: allow all if accept is not "application/pdf" specifically, 
        // or try to match. Or relying on user to pass a validator is better but let's stick to minimal changes.

        let files = Array.from(e.dataTransfer.files);

        if (accept === "application/pdf") {
            files = files.filter(file => file.type === "application/pdf");
        } else if (accept.includes("image/")) {
            files = files.filter(file => file.type.startsWith("image/"));
        }

        // If "accept" is a list like "image/jpeg, image/png", simple includes check might fail if file.type is specific.
        // Let's iterate and check if the file type corresponds to one of the accepted MIME types.
        if (accept !== "application/pdf" && !accept.includes("image/")) {
            // Fallback: pass all, let the parent handle or input handle (though drop bypasses input)
            // But actually, for JPG/PDF tool, we pass "image/jpeg, image/png".
            const acceptedTypes = accept.split(",").map(t => t.trim());
            files = files.filter(file => acceptedTypes.some(type => {
                if (type.endsWith("/*")) {
                    const base = type.replace("/*", "");
                    return file.type.startsWith(base);
                }
                return file.type === type;
            }));
        }

        if (files.length > 0) {
            // Fake event so parent handler can work
            const fakeEvent = {
                target: { files } as unknown as HTMLInputElement,
            } as ChangeEvent<HTMLInputElement>;
            handleFileChange(fakeEvent);
        }
    };

    return (
        <div className="flex justify-center items-center">

            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById("file-upload")?.click()}
                className={`flex items-center justify-center sm:w-11/12 md:w-full h-32 px-4 transition border-2 border-dashed rounded-md cursor-pointer hover:border-indigo-500
        ${isDragging
                        ? "bg-indigo-50 border-indigo-500 scale-105 shadow-lg"
                        : "bg-white border-gray-300"
                    }`}
            >
                <span className="text-gray-600 text-sm md:text-base">
                    {isDragging
                        ? "Drop your files here 📄"
                        : "Click or drop files here to select"}
                </span>
                <input
                    id="file-upload"
                    type="file"
                    multiple={multiFile}
                    accept={accept}
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>
        </div>

    );
};

export default DragAndDropInput;
