import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import { getProductById } from '../services/api'

export default function ProductDetail() {
    const { id } = useParams()
    const [ product, setProduct ] = useState(null)
    const [ loading, setLoading ] = useState(true)
    const [ error, setError ] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const data = await getProductById(id)
                setProduct(data)
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [id])

    return (
        <div className="flex flex-col gap-12 mt-6 md:mt-10">
            <section>
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-6 pb-12 animate-pulse">
                        <div className="aspect-square bg-stone-200 rounded-sm" />
                        <div className="flex flex-col gap-4 pt-4">
                            <div className="h-8 bg-stone-200 rounded w-2/3" />
                            <div className="h-4 bg-stone-200 rounded w-1/4" />
                            <div className="h-px bg-stone-200 w-12" />
                            <div className="h-4 bg-stone-200 rounded w-full" />
                            <div className="h-4 bg-stone-200 rounded w-5/6" />
                            <div className="h-4 bg-stone-200 rounded w-4/6" />
                        </div>
                    </div>
                ) : error ? (
                    <div>
                        <p className="text-body text-(--muted-foreground)">Product not found</p>
                        <Link to="/products/all" className="btn-outline">Back to Shop</Link>
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row gap-8 px-6 pb-12 items-start justify-center">
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full md:w-auto md:max-w-sm lg:max-w-md aspect-square object-cover rounded-sm shrink-0"
                        />
                        <div>
                            <h1 className="heading-section mb-2">{product.name}</h1>
                            <p className="text-label mb-2">${product.price.toFixed(2)}</p>
                            <div className="divider-gold mb-4" />
                            <p className="text-body mb-4">{product.description}</p>
                            <div className="flex items-center gap-2 mb-4">
                                <span className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
                                <p className={`text-label ${product.inStock ? 'text-green-600' : 'text-red-500'}`}>
                                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                                </p>
                            </div>
                            <button
                                className={`btn-primary w-full ${product.inStock ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
                                disabled={!product.inStock}
                            >
                                {product.inStock ? 'Request' : 'Out of Stock'}
                            </button>
                        </div>
                    </div>
                )}
            </section>
        </div>
    )
}
