import { atom } from "nanostores";

export const isModalOpen = atom(false);

export const modalContent = atom(null);

export function openModal(content) {
    isModalOpen.set(true);
    modalContent.set(content);
}

export function closeModal() {
    isModalOpen.set(false);
    modalContent.set(null);
}