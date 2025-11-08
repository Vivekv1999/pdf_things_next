
interface PdfPageHeaderProps {
    title: string;
    description?: string;
}

const PdfPageHeader = ({ title, description }: PdfPageHeaderProps) => {
    return (
        <div className="flex flex-col justify-center items-center mb-6 pb-4">
            <h1 className="block font-bold text-2xl md:text-5xl text-center">{title}</h1>
            {description && (
                <p className="mt-3 font-medium text-gray-600 text-lg text-center">{description}</p>
            )}
        </div>
    );
};

export default PdfPageHeader;
