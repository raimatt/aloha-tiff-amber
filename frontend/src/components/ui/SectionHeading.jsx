// Section-level heading used inside Home's "Categories" and "Featured Pieces"
// sections. Three parts stack: a small gold eyebrow label, the section title,
// and the gold divider. Uses <h2> because this sits below Home's <h1>.
export default function SectionHeading({ eyebrow, title }) {
    return (
        <div className="flex flex-col items-center">
            <p className="text-label text-(--primary) mb-3">{eyebrow}</p>
            <h2 className="heading-section text-(--foreground)">{title}</h2>
            <div className="divider-gold mt-4 mb-12"></div>
        </div>
    )
}
