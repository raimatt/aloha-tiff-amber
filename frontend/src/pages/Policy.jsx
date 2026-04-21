import PageHeading from '../components/ui/PageHeading'

export default function Policy() {
    return (
        <div className="flex flex-col gap-12 mt-6 md:mt-10">
            <PageHeading title="Policy" />

            <section className="max-w-2xl mx-auto px-6 pb-16 flex flex-col gap-10">

                <div className="flex flex-col gap-3">
                    <p className="text-label text-(--primary)">SHIPPING</p>
                    <p className="text-body text-(--foreground)">
                        Every piece is made to order. Please allow 7–10 business days for your
                        item to be crafted before it ships. You'll receive an email with tracking
                        information the moment your order is on its way.
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <p className="text-label text-(--primary)">RETURNS</p>
                    <p className="text-body text-(--foreground)">
                        Because each piece is handmade to order, all sales are final. If your
                        item arrives damaged or isn't what you expected, reach out within 7 days
                        of delivery and we'll make it right.
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <p className="text-label text-(--primary)">CARE</p>
                    <p className="text-body text-(--foreground)">
                        Tahitian pearls are organic and should be treated gently. Avoid contact
                        with perfume, lotion, and chlorine. Wipe clean with a soft, dry cloth after
                        wear and store flat, away from direct sunlight.
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <p className="text-label text-(--primary)">QUESTIONS</p>
                    <p className="text-body text-(--foreground)">
                        Have a question about a piece, a custom request, or an existing order?
                        Reach out on Instagram{' '}
                        <a
                            href="https://www.instagram.com/alohatiffamber/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-(--primary) underline underline-offset-4"
                        >
                            @alohatiffamber
                        </a>{' '}
                        — we'd love to hear from you.
                    </p>
                </div>

                <div className="divider-gold"></div>
            </section>
        </div>
    )
}
