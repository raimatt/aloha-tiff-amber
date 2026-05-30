import PageHeading from '../components/ui/PageHeading'

export default function About() {
    return (
        <div className="flex flex-col gap-12 mt-6 md:mt-10">
            <PageHeading title="About" />

            <section className="max-w-2xl mx-auto px-6 pb-16 flex flex-col gap-6">
                <p className="text-label text-(--primary) text-center">MY STORY</p>

                <p className="text-body text-(--foreground)">
                    Three things have always meant the most to me — the ocean, making memories
                    with my friends and family, and shopping. So it probably makes sense that I
                    fell in love with jewelry and decided to start making my own.
                </p>

                <p className="text-body text-(--foreground)">
                    When I finished my very first piece, I felt something I hadn't expected: pure
                    joy. It was so exciting that I couldn't keep it to myself — I wanted to share
                    that feeling with everyone.
                </p>

                <p className="text-body text-(--foreground)">
                    Aloha, Tiff Amber was born during the pandemic, when the world made it nearly
                    impossible to get hired. Instead of waiting, I turned that time into something
                    of my own. What started as a creative outlet became a real business —
                    handcrafted one piece at a time, with love. I've since graduated college, and
                    this little brand is still going strong.
                </p>

                <p className="text-body text-(--foreground)">
                    Thank you so much for your support. It means more than you know — now go have
                    fun shopping!
                </p>

                <div className="divider-gold mt-4"></div>

                <p className="text-body text-(--muted-foreground) text-center italic">
                    Made with aloha, one piece at a time.
                </p>
            </section>
        </div>
    )
}
