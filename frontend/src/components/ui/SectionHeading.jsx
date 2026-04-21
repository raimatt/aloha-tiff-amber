export default function SectionHeading({ eyebrow, title }) {
    return (
        <div className="flex flex-col items-center">
            <p className="text-label text-(--primary) mb-3">{eyebrow}</p>
            <h2 className="heading-section text-(--foreground)">{title}</h2>
            <div className="divider-gold mt-4 mb-12"></div>
        </div>
    )
}
