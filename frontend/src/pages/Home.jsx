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
            {/* Palette-safe site notice — see .banner-notice in index.css. */}
            <div className="banner-notice">
                This site is currently in progress — new features coming soon.
            </div>

            <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
                <img
                    src={heroImage}
                    alt="Aloha Tiff Amber jewelry collection"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-(--foreground)/30"></div>

                <div className="relative text-center text-(--background) px-4 sm:px-6">
                    <p className="text-label mb-4 opacity-80">HANDCRAFTED WITH ALOHA</p>

                    <h1 className="heading-hero text-3xl sm:text-5xl mb-6">
                        Aloha, Tiff Amber
                    </h1>

                    {/* Dropped the inline text-base override so .text-body's sizing wins,
                        keeping body copy consistent with every other page. */}
                    <p className="text-body max-w-xs sm:max-w-md mx-auto mb-8 opacity-90">
                        Island-inspired jewelry made with love. Delicate, golden, and uniquely yours.
                    </p>

                    <Link className="btn-primary inline-block" to="/products/all">
                        Shop Collection
                    </Link>
                </div>
            </section>

            <section className="section-page">
                <SectionHeading eyebrow="BROWSE BY" title="Categories" />
                {/* Category tiles come from the shared CATEGORIES constant so Home
                    and Products never drift. One hover rule, one className chain. */}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map(product => (
                        // Card is now a <Link> — real navigation, keyboard-focusable,
                        // and no invalid <Link><button> nesting.
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
                <div className="mt-12">
                    {/* Link styled as a button instead of <Link><button>…</button></Link>
                        (which is invalid HTML). /products/all replaces the old literal
                        ":category" placeholder that didn't route anywhere. */}
                    <Link to="/products/all" className="btn-outline inline-block">
                        View All Pieces
                    </Link>
                </div>
            </section>
        </div>
    )
}
