import { useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";

export default function ContactForm() {
    const [result, setResult] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onHCaptchaChange = (token) => {
        setValue("h-captcha-response", token);
    };

    const accessKey = "e88a7154-0937-4a84-bfab-b23b549ebccf";
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsSubmitting(true);
        setResult("Sending....");
        const formData = new FormData(e.currentTarget);

        formData.append("access_key", accessKey);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                setResult("Form Submitted Successfully!");
                e.target.reset();
            } else {
                console.log("Error", data);
                setResult(data.message || "An error occurred.");
            }
        } catch (error) {
            console.error("Submission error:", error);
            setResult("An error occurred while submitting the form.");
        } finally {
            setIsSubmitting(false);

            setTimeout(() => {
                setResult("");
            }, 5000);
        }
    };

    return (
        <div
            className="bg-zinc-900 p-8 rounded-2xl w-full max-w-md border border-orange-300 shadow-2xl flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
        >
            <h2 className="mb-6 flex items-center gap-2">
                <i className="ph ph-briefcase text-orange-300"></i>
                Business Inquiry
            </h2>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col w-full gap-4 text-left text-sm"
            >
                <div>
                    <label className="text-gray-400 mb-1 block">Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        className="w-full p-3 rounded-lg bg-black/40 border border-zinc-700 focus:border-orange-300 text-white outline-none transition-colors"
                        placeholder="Your Name"
                    />
                </div>

                <div>
                    <label className="text-gray-400 mb-1 block">Email</label>
                    <input
                        type="email"
                        name="email"
                        required
                        className="w-full p-3 rounded-lg bg-black/40 border border-zinc-700 focus:border-orange-300 text-white outline-none transition-colors"
                        placeholder="email@example.com"
                    />
                </div>

                <div>
                    <label className="text-gray-400 mb-1 block">Inquiry</label>
                    <textarea
                        required
                        name="message"
                        className="w-full p-3 rounded-lg bg-black/40 border border-zinc-700 focus:border-orange-300 text-white outline-none transition-colors"
                        placeholder="How can I help you?"
                    ></textarea>
                </div>

                <HCaptcha
                    sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
                    reCaptchaCompat={true}
                    theme="dark"
                    size="normal"
                    onVerify={onHCaptchaChange}
                />

                <button type="submit" className="btn" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                </button>

                {result && (
                    <span className="mt-2 block text-center text-sm">
                        {result}
                    </span>
                )}
            </form>
        </div>
    );
}
