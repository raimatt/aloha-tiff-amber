import PageHeading from '../components/ui/PageHeading'

export default function Policy() {
    return (
        <div className="flex flex-col gap-12 mt-6 md:mt-10">
            <PageHeading title="Policy" />

            <section className="max-w-2xl mx-auto px-6 pb-16 flex flex-col gap-10">

                <div className="flex flex-col gap-3">
                    <p className="text-label text-(--primary)">OUR JEWELRY</p>
                    <p className="text-body text-(--foreground)">
                        Unless otherwise specified, all pieces are made with 14K gold filled metal
                        and AA to AAA grade Tahitian pearls. Because every pearl is a natural gem,
                        the piece you receive will not be identical to the one pictured — blemishes,
                        rings, and natural markings are part of what makes each pearl one of a kind.
                        Every piece of jewelry is handmade, so no two are ever exactly alike.
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <p className="text-label text-(--primary)">HOW TO ORDER</p>
                    <p className="text-body text-(--foreground)">
                        See something you love? Hit the Request button on the product page and
                        fill out your name, email, and/or Instagram handle — plus an optional
                        message. We'll send you a confirmation, and then follow up
                        to confirm your order and total price. If you provided an email, we'll
                        reach out there. If you only left your Instagram, expect a DM from us.
                        Once confirmed, payment is due via Venmo as soon as possible — please
                        stay in touch if there's a delay.
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <p className="text-label text-(--primary)">PAYMENT</p>
                    <p className="text-body text-(--foreground)">
                        Payment is accepted via Venmo. When sending payment, please type only
                        your favorite emoji as the message — no other text needed. If payment is
                        not received within a reasonable time and there is no communication, your
                        order will be cancelled. You're always welcome to request again!
                    </p>
                    <p className="text-body text-(--foreground)">
                        Cash meetups are available for those in the Mililani area. We'll agree on
                        a time, date, and place that works for both of us once your order is confirmed.
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <p className="text-label text-(--primary)">SHIPPING</p>
                    <p className="text-body text-(--foreground)">
                        We ship First Class with tracking included. Rates are $8 within Hawaii
                        and $9 to the U.S. Mainland (heavier packages may vary by weight). Ask us
                        about Priority shipping if you need it sooner.
                    </p>
                    <p className="text-body text-(--foreground)">
                        Pre-orders and custom orders require additional time — please plan
                        accordingly. Once your tracking number has been provided, we are no longer
                        responsible for your package.
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <p className="text-label text-(--primary)">SALES & RETURNS</p>
                    <p className="text-body text-(--foreground)">
                        All sales are final. We do not accept returns or hold items. Once an
                        order has shipped, we cannot be responsible for it — please ensure your
                        shipping details are correct before confirming.
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <p className="text-label text-(--primary)">QUESTIONS</p>
                    <p className="text-body text-(--foreground)">
                        Have a question about a piece, a custom order, or an existing request?
                        Reach out on Instagram{' '}
                        <a
                            href="https://www.instagram.com/alohatiffamber/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-(--primary) underline underline-offset-4"
                        >
                            @alohatiffamber
                        </a>
                        {' '}or email us at{' '}
                        <a
                            href="mailto:tiffamber.ono@gmail.com"
                            className="text-(--primary) underline underline-offset-4"
                        >
                            tiffamber.ono@gmail.com
                        </a>
                        {' '}— we'd love to hear from you.
                    </p>
                </div>

                <div className="divider-gold"></div>
            </section>
        </div>
    )
}
