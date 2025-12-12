"use client";

import {
    closestCenter,
    DndContext,
    DragEndEvent,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import {
    arrayMove,
    rectSortingStrategy,
    SortableContext,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DragAndDropInput from "@/src/components/DragAndDropInput";
import { X } from "lucide-react";

interface SortableImageItemProps {
    file: File;
    index: number;
    preview: string;
    removeImage: (index: number) => void;
}

function SortableImageItem({ file, index, preview, removeImage }: SortableImageItemProps) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: file.name + index });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="group relative bg-white hover:bg-gray-50 shadow p-2 border border-gray-300 rounded-xl min-w-[100px] transition-colors cursor-grab active:cursor-grabbing"
        >
            <button
                type="button"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                    e.stopPropagation();
                    removeImage(index);
                }}
                className="top-1.5 right-1.5 z-10 absolute bg-white/80 hover:bg-red-500 shadow-md p-1 rounded-full text-gray-600 hover:text-white transition-colors"
                title="Remove Image"
            >
                <X className="w-4 h-4" />
            </button>

            <div className="relative">
                <img
                    src={preview}
                    alt={`Image ${index + 1}`}
                    className="mb-2 rounded w-full h-48 object-cover"
                />
                <span className="top-1 left-[-4px] absolute bg-indigo-600 px-2 py-1 rounded font-semibold text-white text-xs">
                    {String(index + 1).padStart(2, "0")}
                </span>
            </div>
            <p className="mb-1 text-gray-800 text-xs truncate">{file.name}</p>
            <p className="text-gray-500 text-xs">
                {(file.size / 1024).toFixed(0)} KB
            </p>
        </div>
    );
}

interface JpgToPdfListProps {
    images: File[];
    setImages: React.Dispatch<React.SetStateAction<File[]>>;
    handleFileChange: any;
}

export const JpgToPdfList = ({
    images,
    setImages,
    handleFileChange,
}: JpgToPdfListProps) => {
    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = images.findIndex((_, i) => (images[i].name + i) === active.id);
            const newIndex = images.findIndex((_, i) => (images[i].name + i) === over.id);
            setImages(arrayMove(images, oldIndex, newIndex));
        }
    };

    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    // Create preview URLs for images
    const previews = images.map((file) => URL.createObjectURL(file));

    return (
        <>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToParentElement]}
            >
                <SortableContext
                    items={images.map((img, i) => img.name + i)}
                    strategy={rectSortingStrategy}
                >
                    <div className="gap-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mt-6">
                        {images.map((file, index) => (
                            <SortableImageItem
                                key={file.name + index}
                                file={file}
                                index={index}
                                preview={previews[index]}
                                removeImage={removeImage}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>

            <div className="my-10">
                <DragAndDropInput
                    handleFileChange={handleFileChange}
                    multiFile={true}
                    accept="image/jpeg, image/png, image/jpg"
                />
            </div>
        </>
    );
};
