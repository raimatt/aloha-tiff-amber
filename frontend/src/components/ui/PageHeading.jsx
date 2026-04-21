export default function PageHeading({ title }) {
    return (
        <section className="text-center">
            <h1 className="heading-section text-(--foreground)">{title}</h1>
            <div className="divider-gold mt-4"></div>
        </section>
    )
}
