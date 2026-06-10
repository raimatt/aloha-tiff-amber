import { useEffect, useState } from "react"
import { X } from "lucide-react"

const FORMSUBMIT_EMAIL = "raidenmlazaro@gmail.com"

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

export default function RequestModal({ product, onClose }) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [instagram, setInstagram] = useState("")
    const [message, setMessage] = useState("")
    const [quantity, setQuantity] = useState(1)

    // One modal, two modes: in-stock request (quantity/total) vs out-of-stock question.
    const inStock = product.inStock
    const total = product.price * quantity

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    // Hidden honeypot: real users never see or fill this, bots usually do.
    const [honeypot, setHoneypot] = useState("")

    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key === "Escape") onClose()
        }
        document.addEventListener("keydown", onKeyDown)
        document.body.style.overflow = "hidden"
        return () => {
            document.removeEventListener("keydown", onKeyDown)
            document.body.style.overflow = ""
        }
    }, [onClose])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        // Honeypot tripped: almost certainly a bot. Fake success, send nothing.
        if (honeypot) {
            setSuccess(true)
            return
        }

        if (!name.trim()) {
            setError("Please enter your name.")
            return
        }
        if (!email.trim() && !instagram.trim()) {
            setError("Please add an email or Instagram so Tiff can reach you.")
            return
        }
        if (email.trim() && !isEmail(email.trim())) {
            setError("That email doesn't look right.")
            return
        }

        setLoading(true)
        try {
            const handle = instagram.trim()
            const payload = {
                _subject: inStock
                    ? `New request: ${product.name}`
                    : `Availability question: ${product.name}`,
                _template: "table",
                _captcha: "false",
                Product: product.name,
                Price: `$${product.price.toFixed(2)}`,
                // Tell Tiff which kind of message this is, and only attach
                // quantity/total for an actual in-stock request.
                Availability: inStock ? "In stock" : "Out of stock",
                ...(inStock && { Quantity: quantity, Total: `$${total.toFixed(2)}` }),
                Name: name.trim(),
                // Lowercase `email` is FormSubmit's special field: it both prints in
                // the table and sets the auto-reply target. Only sent when provided.
                ...(email.trim() && { email: email.trim() }),
                ...(handle && {
                    Instagram: `@${handle}`,
                    // Full URL so the email client renders it as a clickable link.
                    "Instagram profile": `https://www.instagram.com/${handle}/`,
                }),
                Message: message.trim() || "(none)",
                "Product link": window.location.href,
                _honey: honeypot,
            }

            if (email.trim()) {
                payload._autoresponse =
                    "Aloha! Thank you for your request with Aloha, Tiff Amber. " +
                    "We've received it and Tiff will reach out to you personally very soon. " +
                    "With love, Aloha Tiff Amber"
            }

            const res = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_EMAIL}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(payload),
            })

            // FormSubmit can return 200 with { success: "false" }, so check the body too.
            const data = await res.json().catch(() => ({}))
            if (!res.ok || data.success === "false" || data.success === false) {
                throw new Error(data.message || "Something went wrong. Please try again.")
            }

            setSuccess(true)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-(--card) border border-(--border) rounded-sm shadow-sm p-8"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute top-4 right-4 text-(--muted-foreground) hover:text-(--foreground) cursor-pointer"
                >
                    <X className="w-5 h-5" />
                </button>

                {success ? (
                    <div className="text-center py-6">
                        <h2 className="heading-section text-(--foreground)">{inStock ? "Request sent" : "Message sent"}</h2>
                        <div className="divider-gold mt-4 mb-6" />
                        <p className="text-body text-(--muted-foreground) mb-8">
                            Thank you. Tiff will reach out to you soon about <span className="text-(--foreground)">{product.name}</span>.
                        </p>
                        <button type="button" onClick={onClose} className="btn-primary cursor-pointer">
                            Close
                        </button>
                    </div>
                ) : (
                    <>
                        <h2 className="heading-section text-(--foreground) text-center">
                            {inStock ? "Request this piece" : "Ask about this piece"}
                        </h2>
                        <p className="text-label text-(--muted-foreground) text-center mt-2">{product.name}</p>
                        {/* For an out-of-stock piece, set expectations up front. */}
                        {!inStock && (
                            <p className="text-body text-(--muted-foreground) text-center mt-3">
                                This piece is currently out of stock. Ask Tiff when it might return, or anything else.
                            </p>
                        )}
                        <div className="divider-gold mt-4 mb-8" />

                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
                                <label>
                                    Leave this field empty
                                    <input
                                        type="text"
                                        tabIndex={-1}
                                        autoComplete="off"
                                        value={honeypot}
                                        onChange={(e) => setHoneypot(e.target.value)}
                                    />
                                </label>
                            </div>

                            {/* Quantity only matters for an in-stock request. */}
                            {inStock && (
                                <div className="flex flex-col gap-1">
                                    <label className="text-label text-(--muted-foreground)">Quantity</label>
                                    <div className="flex items-center border border-(--border) rounded-sm w-fit">
                                        <button
                                            type="button"
                                            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                            aria-label="Decrease quantity"
                                            className="px-4 py-1 text-(--muted-foreground) hover:text-(--foreground) cursor-pointer"
                                        >
                                            −
                                        </button>
                                        <span className="px-4 py-1 min-w-10 text-center text-body text-(--foreground)">{quantity}</span>
                                        <button
                                            type="button"
                                            onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                                            aria-label="Increase quantity"
                                            className="px-4 py-1 text-(--muted-foreground) hover:text-(--foreground) cursor-pointer"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-col gap-1">
                                <label className="text-label text-(--muted-foreground)">Name</label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    placeholder="Your name"
                                    maxLength={100}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full border-b border-(--border) bg-transparent focus:outline-none pb-1"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-label text-(--muted-foreground)">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    placeholder="you@email.com"
                                    maxLength={254}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full border-b border-(--border) bg-transparent focus:outline-none pb-1"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-label text-(--muted-foreground)">Instagram</label>
                                <div className="relative">
                                    <span className="absolute left-0 bottom-1 text-(--muted-foreground) pointer-events-none">@</span>
                                    <input
                                        type="text"
                                        value={instagram}
                                        placeholder="yourhandle"
                                        maxLength={30}
                                        onChange={(e) => setInstagram(e.target.value.replace(/@/g, ""))}
                                        className="w-full border-b border-(--border) bg-transparent focus:outline-none pb-1 pl-5"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-label text-(--muted-foreground)">
                                    {inStock ? "Message (optional)" : "Your question"}
                                </label>
                                <textarea
                                    value={message}
                                    rows={3}
                                    maxLength={1000}
                                    placeholder={inStock ? "Anything you'd like Tiff to know" : "e.g. When will this be back in stock?"}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full border-b border-(--border) bg-transparent focus:outline-none pb-1 resize-none"
                                />
                            </div>

                            {/* Total is only meaningful for an in-stock request. */}
                            {inStock && (
                                <div className="flex items-center justify-between border-t border-(--border) pt-4">
                                    <span className="text-label text-(--muted-foreground)">Total</span>
                                    <span className="text-(--foreground) font-medium text-base">${total.toFixed(2)}</span>
                                </div>
                            )}

                            {error && <p className="text-sm text-red-600">{error}</p>}

                            <button
                                type="submit"
                                disabled={loading}
                                className={`btn-primary w-full ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                            >
                                {loading ? "Sending..." : inStock ? "Send Request" : "Send Question"}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    )
}
