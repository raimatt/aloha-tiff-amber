import { NavLink } from 'react-router-dom'

export default function Products() {
    const categories = [
        { name: "ALL", path: "all" },
        { name: "BRACELETS", path: "bracelets" },
        { name: "NECKLACES", path: "necklaces" },
        { name: "EARRINGS", path: "earrings" },
        { name: "RINGS", path: "rings" },
        { name: "ANKLETS", path: "anklets" },
        { name: "SETS", path: "sets" },
    ]

    const baseClass = "text-label px-2 py-2 border duration-300 md:px-5"

    const activeClass = "border-(--primary) text-(--primary)"

    const inactiveClass = "border-(--border) text-(--muted-foreground) hover:border-(--foreground) hover:text-(--foreground)"

    return (
        <div className="flex flex-col gap-12 mt-6 md:mt-10">

            <section className="text-center">
                <h1 className="heading-section text-(--foreground)">Shop</h1>
                <div className="divider-gold mt-4"></div>
            </section>

            <section className="flex flex-wrap justify-center px-6 mb-12 gap-2">
                {categories.map((cat) => (
                    <NavLink
                        key={cat.path}
                        to={`/products/${cat.path}`}
                        className={({ isActive }) =>
                            `${baseClass} ${
                                isActive ? activeClass : inactiveClass
                            }`
                        }
                    >
                        {cat.name}
                    </NavLink>
                ))}
            </section>
        </div>
    )
}