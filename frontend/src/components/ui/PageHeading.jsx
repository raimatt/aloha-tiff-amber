// Shared page-level heading (heading-section + gold divider, centered).
// About, Policy, Products, and ProductDetail all render this so the
// top of every page looks identical.
export default function PageHeading({ title }) {
    return (
        <section className="text-center">
            <h1 className="heading-section text-(--foreground)">{title}</h1>
            <div className="divider-gold mt-4"></div>
        </section>
    )
}
