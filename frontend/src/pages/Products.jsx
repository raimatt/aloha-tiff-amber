import { NavLink, useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { CATEGORIES_WITH_ALL } from '../constants/categories'
import PageHeading from '../components/ui/PageHeading'
import { getAllProducts, getProductsByCategory } from '../services/api'

export default function Products() {
    const { category } = useParams()
    const [ products, setProducts ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                if (category === "all") {
                    const data = await getAllProducts()
                    setProducts(data)
                    return
                }
                const data = await getProductsByCategory(category)
                setProducts(data)
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [category])

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
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="card-product animate-pulse">
                                <div className="aspect-square bg-stone-200" />
                                <div className="p-4 flex flex-col gap-2">
                                    <div className="h-4 bg-stone-200 rounded w-3/4" />
                                    <div className="h-3 bg-stone-200 rounded w-1/3" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <p className="text-body text-(--muted-foreground)">{error.message}</p>
                ) : products.length === 0 ? (
                    <p className="text-body text-(--muted-foreground)">No products in this category yet.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map(product => (
                            <Link
                                key={product._id}
                                to={`/product/${product._id}`}
                                className="card-product group block"
                            >
                                <div className="aspect-square overflow-hidden">
                                    <img
                                        className="w-full h-full object-cover duration-700 group-hover:scale-105"
                                        src={product.images[0]}
                                        alt={product.name}
                                    />
                                </div>
                                <div className="p-4">
                                    <p className="heading-card text-(--foreground)">{product.name}</p>
                                    <p className="text-label text-(--muted-foreground) mt-1">${product.price}.00</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}
