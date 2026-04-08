import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { getAllProducts } from '../services/api'

import heroImage from '../assets/hero-jewelry.jpg'

export default function Home() {
    const [ products, setProducts ] = useState([])

    useEffect(() => {
        async function fetchProducts() {
            const data = await getAllProducts()
            setProducts(data)
        }
        fetchProducts()
    }, [])

    if (!products) return (
        <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-zinc-400 text-lg">Loading...</p>
        </div>
    )

    return (
        <div>
            <div className="bg-yellow-50 border border-yellow-200 px-6 py-6 text-center">
                <p className="text-sm sm:text-base font-medium text-yellow-800">
                    🚧 This site is currently in progress — new features coming soon.
                </p>
            </div>
            <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
                <img src={heroImage} alt="Aloha Tiff Amber jewelry collection" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-(--foreground)/30"></div>

                <div className="relative text-center text-(--background) px-4 sm:px-6">
                    <p className="text-label mb-4 opacity-80">HANDCRAFTED WITH ALOHA</p>

                    <h1 className="heading-hero text-3xl sm:text-5xl mb-6">
                    Aloha, Tiff Amber
                    </h1>

                    <p className="text-body max-w-xs sm:max-w-md mx-auto mb-8 opacity-90 text-base">
                    Island-inspired jewelry made with love. Delicate, golden, and uniquely yours.
                    </p>

                    <Link className="btn-primary inline-block" to="/products/:category">
                    Shop Collection
                    </Link>
                </div>
            </section>
            <section className="flex flex-col items-center justify-center py-12">
                <p className="text-label text-(--primary) mb-3">BROWSE BY</p>
                <h1 className="heading-section text-(--foreground)">Categories</h1>
                <div className="divider-gold mt-4 mb-12"></div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <Link to="/products/:category" className="btn-outline text-center py-4 hover:border-(--primary) hover:text-(--primary)"><button>BRACELETS</button></Link>
                    <Link to="/products/:category" className="btn-outline text-center py-4 hover:border-(--primary) hover:text-(--primary)"><button>NECKLACES</button></Link>
                    <Link to="/products/:category" className="btn-outline text-center py-4 hover:border-(--primary) hover:text-(--primary)"><button>EARRINGS</button></Link>
                    <Link to="/products/:category" className="btn-outline text-center py-4 hover:border-(--primary) hover:text-(--primary)"><button>RINGS</button></Link>
                    <Link to="/products/:category" className="btn-outline text-center py-4 hover:border-(--primary) hover:text-(--primary)"><button>ANKLETS</button></Link>
                    <Link to="/products/:category" className="btn-outline text-center py-4 hover:border-(--primary) hover:text-(--primary)"><button>SETS</button></Link>
                </div>
            </section>
            <section className="flex flex-col bg-(--secondary)/50 items-center justify-center py-12 p-6">
                <p className="text-label text-(--primary) mb-3">CURATED FOR YOU</p>
                <h1 className="heading-section text-(--foreground)">Featured Pieces</h1>
                <div className="divider-gold mt-4 mb-12"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map(product => (
                        <button className="card-product group" key={product._id}>
                            <div className="aspect-square overflow-hidden">
                                <img className="w-full h-full transition-transform duration-700 group-hover:scale-105" src={product.images[0]} />
                            </div>
                            <div className="p-4">
                                <p className="heading-card text-(--foreground)">{product.name}</p>
                                <p className="text-label text-(--muted-foreground) mt-1">${product.price}.00</p>
                            </div>
                        </button>
                    ))}
                </div>
                <div className="mt-12">
                    <Link to="/products/:category"><button className="btn-outline cursor-pointer">View All Pieces</button></Link>
                </div>
            </section>
        </div>
    )
}