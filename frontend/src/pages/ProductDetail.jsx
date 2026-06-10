import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

import { getProductById } from '../services/api'
import RequestModal from '../components/product/RequestModal'
import ProductGallery from '../components/product/ProductGallery'

export default function ProductDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [ product, setProduct ] = useState(null)
    const [ loading, setLoading ] = useState(true)
    const [ error, setError ] = useState(null)
    const [ isModalOpen, setIsModalOpen ] = useState(false)

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
            <button
                onClick={() => navigate(-1)}
                className="text-label text-(--muted-foreground) hover:text-(--foreground) transition-colors cursor-pointer flex items-center gap-2 px-6"
            >
                <ArrowLeft className="w-4 h-4" /> Back
            </button>
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
                        <ProductGallery images={product.images} name={product.name} />
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
                                onClick={() => setIsModalOpen(true)}
                                className={`w-full cursor-pointer ${product.inStock ? 'btn-primary' : 'btn-outline'}`}
                            >
                                {product.inStock ? 'Request' : 'Ask About Availability'}
                            </button>
                        </div>
                    </div>
                )}
            </section>

            {isModalOpen && (
                <RequestModal product={product} onClose={() => setIsModalOpen(false)} />
            )}
        </div>
    )
}
