// components/PdfPageHeader.tsx
import { FC } from "react";

interface PdfPageHeaderProps {
    title: string;
    description?: string;
}

const PdfPageHeader: FC<PdfPageHeaderProps> = ({ title, description }) => {
    return (
        <header className="flex flex-col justify-center items-center mb-6 pb-4 text-center">
            <h1 className="block font-bold text-2xl md:text-5xl">{title}</h1>

            {description && (
                <p className="mt-3 max-w-2xl font-medium text-gray-600 text-lg">
                    {description}
                </p>
            )}
        </header>
    );
};

export default PdfPageHeader;
