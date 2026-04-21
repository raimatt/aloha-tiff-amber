import { NavLink } from 'react-router-dom'

import { CATEGORIES_WITH_ALL } from '../constants/categories'
import PageHeading from '../components/ui/PageHeading'

export default function Products() {
    return (
        <div className="flex flex-col gap-12 mt-6 md:mt-10">
            <PageHeading title="Shop" />

            <section className="flex flex-wrap justify-center px-6 gap-2">
                {CATEGORIES_WITH_ALL.map((cat) => (
                    <NavLink
                        key={cat.path}
                        to={`/products/${cat.path}`}
                        className={({ isActive }) =>
                            `pill ${isActive ? 'pill-active' : 'pill-inactive'}`
                        }
                    >
                        {cat.name}
                    </NavLink>
                ))}
            </section>

            <section className="flex justify-center px-6 pb-12">
                <p className="text-body text-(--muted-foreground)">Products coming soon.</p>
            </section>
        </div>
    )
}
