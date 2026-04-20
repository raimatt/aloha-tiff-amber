import { NavLink } from 'react-router-dom'

import { CATEGORIES_WITH_ALL } from '../constants/categories'
import PageHeading from '../components/ui/PageHeading'

export default function Products() {
    // Base + active/inactive split so the NavLink callback stays a one-liner.
    const baseClass = "text-label px-2 py-2 border duration-300 md:px-5"
    const activeClass = "border-(--primary) text-(--primary)"
    const inactiveClass = "border-(--border) text-(--muted-foreground) hover:border-(--foreground) hover:text-(--foreground)"

    return (
        <div className="flex flex-col gap-12 mt-6 md:mt-10">
            <PageHeading title="Shop" />

            {/* Tabs pull from the shared CATEGORIES_WITH_ALL list so Home and
                Products always show the same set of categories. */}
            <section className="flex flex-wrap justify-center px-6 gap-2">
                {CATEGORIES_WITH_ALL.map((cat) => (
                    <NavLink
                        key={cat.path}
                        to={`/products/${cat.path}`}
                        className={({ isActive }) =>
                            `${baseClass} ${isActive ? activeClass : inactiveClass}`
                        }
                    >
                        {cat.name}
                    </NavLink>
                ))}
            </section>

            {/* Intentional empty state — reads as deliberate rather than blank
                until the product grid is wired up. */}
            <section className="flex justify-center px-6 pb-12">
                <p className="text-body text-(--muted-foreground)">Products coming soon.</p>
            </section>
        </div>
    )
}
