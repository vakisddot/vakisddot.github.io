import { useState, useRef, type TouchEvent, type MouseEvent } from "react";
import { openModal } from "../stores/modalStore";

type ImageGalleryProps = {
    images: string[];
    altText?: string;
};

export default function ImageGallery({ images, altText }: ImageGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    const isSwiping = useRef(false);

    const minSwipeDistance = 50;

    if (!images || images.length === 0) {
        return (
            <div className="p-4 text-center text-gray-500">
                No images to display.
            </div>
        );
    }

    const handlePrevious = (e?: MouseEvent) => {
        e?.stopPropagation();
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleNext = (e?: MouseEvent) => {
        e?.stopPropagation();
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const onTouchStart = (e: TouchEvent) => {
        touchEndX.current = null;
        touchStartX.current = e.targetTouches[0].clientX;
        isSwiping.current = false;
    };

    const onTouchMove = (e: TouchEvent) => {
        touchEndX.current = e.targetTouches[0].clientX;
        
        if (
            touchStartX.current &&
            Math.abs(touchEndX.current - touchStartX.current) > 10
        ) {
            isSwiping.current = true;
        }
    };

    const onTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return;

        const distance = touchStartX.current - touchEndX.current;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            handleNext();
        } else if (isRightSwipe) {
            handlePrevious();
        }
    };

    const handleImageClick = () => {
        if (isSwiping.current) return;

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

    return (
        <div className="relative w-full max-w-3xl mx-auto group select-none">
            <button
                onClick={handlePrevious}
                className="absolute z-20 left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                aria-label="Previous image"
            >
                <i className="ph ph-arrow-left"></i>
            </button>

            <div
                className="overflow-hidden rounded-lg shadow-2xl bg-black/80 backdrop-blur-sm relative cursor-pointer touch-pan-y"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                onClick={handleImageClick}
            >
                <div
                    className="flex transition-transform duration-500 ease-out h-full"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {images.map((img, index) => (
                        <img
                            src={img}
                            alt={
                                altText
                                    ? `${altText} ${index + 1}`
                                    : `Gallery Image ${index + 1}`
                            }
                            className="w-full aspect-video object-contain"
                            draggable={false}
                        />
                    ))}
                </div>

                {/* Counter Badge */}
                <div className="absolute bottom-2 right-2 z-10 bg-black/50 text-white text-xs px-2 py-1 rounded">
                    {currentIndex + 1} / {images.length}
                </div>
            </div>

            {/* Right Button */}
            <button
                onClick={handleNext}
                className="absolute z-20 right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                aria-label="Next image"
            >
                <i className="ph ph-arrow-right"></i>
            </button>
        </div>
    );
}
