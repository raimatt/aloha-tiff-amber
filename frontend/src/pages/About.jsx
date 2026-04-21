import PageHeading from '../components/ui/PageHeading'

export default function About() {
    return (
        <div className="flex flex-col gap-12 mt-6 md:mt-10">
            <PageHeading title="About" />

            <section className="max-w-2xl mx-auto px-6 pb-16 flex flex-col gap-6">
                <p className="text-label text-(--primary) text-center">OUR STORY</p>

                <p className="text-body text-(--foreground)">
                    Aloha, Tiff Amber began as a love letter to island life. Every bracelet, necklace,
                    and ring is handcrafted in small batches using genuine Tahitian pearls — each one
                    chosen for its natural color, shape, and quiet character.
                </p>

                <p className="text-body text-(--foreground)">
                    No two pieces are exactly alike, because no two pearls are. That's the point. What
                    you wear is a one-of-a-kind marker of a place, a moment, and a maker who still
                    believes in slow, deliberate work.
                </p>

                <p className="text-body text-(--foreground)">
                    Thank you for being here. Every piece finds its person — and we hope ours finds you.
                </p>

                <div className="divider-gold mt-4"></div>

                <p className="text-body text-(--muted-foreground) text-center italic">
                    Made with aloha, one piece at a time.
                </p>
            </section>
        </div>
    )
}
