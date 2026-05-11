import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { getAllProducts } from '../services/api'
import { CATEGORIES } from '../constants/categories'
import SectionHeading from '../components/ui/SectionHeading'

import heroImage from '../assets/hero-jewelry.jpg'

export default function Home() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        async function fetchProducts() {
            const data = await getAllProducts()
            setProducts(data)
        }
        fetchProducts()
    }, [])

    return (
        <div>
            <section className="relative h-[85vh] flex items-center justify-center overflow-hidden hero-grain">
                <img
                    src={heroImage}
                    alt="Aloha Tiff Amber jewelry collection"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-(--foreground)/30"></div>

                <div className="relative text-center text-(--background) px-4 sm:px-6">
                    <div className="flex items-center justify-center gap-4 mb-4 animate-fade-up fade-delay-1">
                        <div className="h-px w-8 bg-(--primary)"></div>
                        <p className="text-label opacity-80">HANDCRAFTED WITH ALOHA</p>
                        <div className="h-px w-8 bg-(--primary)"></div>
                    </div>

                    <h1 className="heading-hero mb-6 animate-fade-up fade-delay-2">
                        Aloha, Tiff Amber
                    </h1>

                    <p className="text-body max-w-xs sm:max-w-md mx-auto mb-8 opacity-90 animate-fade-up fade-delay-3">
                        Island-inspired jewelry made with love. Delicate, golden, and uniquely yours.
                    </p>

                    <Link
                        className="btn-primary inline-block animate-fade-up fade-delay-4"
                        to="/products/all"
                    >
                        Shop Collection
                    </Link>
                </div>
            </section>

            <section className="section-page">
                <SectionHeading eyebrow="BROWSE BY" title="Categories" />
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {CATEGORIES.map(({ name, path }) => (
                        <Link
                            key={path}
                            to={`/products/${path}`}
                            className="btn-outline text-center py-4 hover:border-(--primary) hover:text-(--primary)"
                        >
                            {name}
                        </Link>
                    ))}
                </div>
            </section>

            <section className="section-page bg-(--secondary)/50">
                <SectionHeading eyebrow="CURATED FOR YOU" title="Featured Pieces" />
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
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
                            <div className="p-5 flex flex-col gap-1">
                                <p className="heading-card text-(--foreground) truncate">{product.name}</p>
                                <p className="text-label text-(--primary)">${product.price}.00</p>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="mt-12">
                    <Link to="/products/all" className="btn-outline inline-block">
                        View All Pieces
                    </Link>
                </div>
            </section>
        </div>
    )
}
