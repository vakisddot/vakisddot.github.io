import { openModal } from "../stores/modalStore";
import ContactForm from "./ContactForm";

type ContactFormButtonProps = {
    className?: string;
};

export default function ContactFormButton({ className }: ContactFormButtonProps) {
    const handleOpenModal = () => {
        openModal(<ContactForm />);
    };

    return (
        <a onClick={handleOpenModal} className={className}>
            <i className="ph ph-briefcase"></i> Business Inquiry
        </a>
    );
}
