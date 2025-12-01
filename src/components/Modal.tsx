import { useStore } from "@nanostores/react";
import { isModalOpen, modalContent, closeModal } from "../stores/modalStore";

export default function Modal() {
    const $isOpen = useStore(isModalOpen);
    const $content = useStore(modalContent);

    if (!$isOpen) return null;

    return (
        <div
            onClick={closeModal}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-20"
        >
            <button
                onClick={closeModal}
                className="fixed top-4 right-4 z-30 btn-round"
                aria-label="Close modal"
            >
                <i className="ph ph-x"></i>
            </button>

            <div className="relative w-full h-auto max-w-full max-h-full flex items-center justify-center animate-[modal_0.2s_ease-out]">
                {$content}
            </div>
        </div>
    );
}
