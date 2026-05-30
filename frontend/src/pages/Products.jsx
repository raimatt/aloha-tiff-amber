import { NavLink, useParams, Link } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'

import { CATEGORIES_WITH_ALL } from '../constants/categories'
import PageHeading from '../components/ui/PageHeading'
import { getAllProducts, getProductsByCategory } from '../services/api'

export default function Products() {
    const { category } = useParams()
    const [ products, setProducts ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(null)
    const prevCount = useRef(4)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                if (category === "all") {
                    const data = await getAllProducts()
                    prevCount.current = data.length
                    setProducts(data)
                    return
                }
                const data = await getProductsByCategory(category)
                prevCount.current = data.length
                setProducts(data)
            } catch (error) {
                console.error("Error fetching data:", error)
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
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                        {Array.from({ length: prevCount.current }).map((_, i) => (
                            <div key={i} className="card-product animate-pulse">
                                <div className="aspect-square bg-stone-200" />
                                <div className="p-5 flex flex-col gap-2">
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
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                        {products.map(product => (
                            <Link
                                key={product._id}
                                to={`/product/${product._id}`}
                                className={`card-product group block ${!product.inStock ? 'opacity-50' : ''}`}
                            >
                                <div className="aspect-square overflow-hidden relative">
                                    <img
                                        className={`w-full h-full object-cover duration-700 ${product.inStock ? 'group-hover:scale-105' : 'grayscale'}`}
                                        src={product.images[0]}
                                        alt={product.name}
                                    />
                                    {!product.inStock && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-label bg-(--foreground) text-(--background) px-3 py-1">Out of Stock</span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-5 flex flex-col gap-1">
                                    <p className="heading-card text-(--foreground) truncate">{product.name}</p>
                                    <p className="text-label text-(--primary)">${product.price.toFixed(2)}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}
