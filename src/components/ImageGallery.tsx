import { useState, type TouchEvent } from "react";
import { openModal } from "../stores/modalStore";

type ImageGalleryProps = {
    images: string[];
    altText?: string;
};

export default function ImageGallery({ images, altText }: ImageGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    const minSwipeDistance = 50;

    if (!images || images.length === 0) {
        return (
            <div className="p-4 text-center text-gray-500">
                No images to display.
            </div>
        );
    }

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handleOpenModal = () => {
        openModal(
            <div
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center"
            >
                <img
                    src={images[currentIndex]}
                    alt={altText ?? `Gallery Image ${currentIndex + 1}`}
                    className="w-auto h-auto max-h-[90vh] max-w-[90vw] object-contain rounded-md shadow-2xl"
                />
            </div>
        );
    };

    const onTouchStart = (e: TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            handleNext();
        }

        if (isRightSwipe) {
            handlePrevious();
        }
    };

    return (
        <div className="flex items-center gap-2 select-none relative">
            <button
                onClick={handlePrevious}
                className="btn-round absolute z-10 left-4"
                aria-label="Previous image"
            >
                <i className="ph ph-arrow-left"></i>
            </button>

            <div
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                onClick={handleOpenModal}
                className="w-full max-w-3xl rounded-lg overflow-hidden shadow-2xl bg-black/80 backdrop-blur-sm relative cursor-pointer touch-pan-y"
            >
                <img
                    src={images[currentIndex]}
                    alt={altText ?? `Gallery Image ${currentIndex + 1}`}
                    className="w-full aspect-video object-contain"
                />

                <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                    {currentIndex + 1} / {images.length}
                </div>
            </div>

            <button
                onClick={handleNext}
                className="btn-round absolute z-10 right-4"
                aria-label="Next image"
            >
                <i className="ph ph-arrow-right"></i>
            </button>
        </div>
    );
}
