import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { getAllProducts, deleteProduct } from "../services/api"

export default function AdminDashboard() {
    const navigate = useNavigate()
    const [ products, setProducts ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const data = await getAllProducts()
                setProducts(data)
            } catch (error) {
                console.log("Error fetching data:", error)
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            await deleteProduct(id)
            setProducts(products.filter(p => p._id !== id))
        }
    }

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-(--border) border-t-(--primary) animate-spin" />
        </div>
    )
    if (error) return <p className="text-body text-(--muted-foreground) text-center mt-12">{error.message}</p>

    return (
        <div className="px-4 sm:px-8 py-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-medium tracking-wide text-(--foreground)">Products</h1>
                <button className="btn-primary cursor-pointer" onClick={() => navigate("/admin/products/new")}>+ New Product</button>
            </div>
            {products.length === 0 ? (
                <div className="border border-dashed border-(--border) rounded-sm text-center px-6 py-16 mt-6">
                    <p className="heading-section text-(--foreground) mb-2">No products yet</p>
                    <p className="text-body text-(--muted-foreground) mb-8">Add your first piece to see it on the storefront.</p>
                    <button className="btn-primary cursor-pointer" onClick={() => navigate("/admin/products/new")}>+ Add your first product</button>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full min-w-200 text-xs sm:text-sm">
                        <thead>
                            <tr className="text-left border-b border-(--border)">
                                <th className="text-label pb-3 pr-4"></th>
                                <th className="text-label pb-3 pr-4">Name</th>
                                <th className="text-label pb-3 pr-4">Category</th>
                                <th className="text-label pb-3 pr-4">Price</th>
                                <th className="text-label pb-3 pr-4">In Stock</th>
                                <th className="text-label pb-3 pr-4">Added</th>
                                <th className="text-label pb-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(item => (
                                <tr key={item._id} className="border-b border-(--border)/50">
                                    <td className="py-3 pr-4">
                                        {item.images?.[0]
                                            ? <img src={item.images[0]} alt={item.name} className="w-10 h-10 object-cover rounded-sm" />
                                            : <div className="w-10 h-10 rounded-sm bg-(--border)" />
                                        }
                                    </td>
                                    <td className="py-3 pr-4 max-w-24 sm:max-w-48 truncate">{item.name}</td>
                                    <td className="py-3 pr-4 capitalize">{item.category}</td>
                                    <td className="py-3 pr-4">${item.price.toFixed(2)}</td>
                                    <td className="py-3 pr-4">
                                        {item.inStock
                                            ? <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">In Stock</span>
                                            : <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-stone-100 text-stone-400">Out of Stock</span>
                                        }
                                    </td>
                                    <td className="py-3 pr-4 text-(--muted-foreground)">
                                        {new Date(item.createdAt).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })}
                                    </td>
                                    <td className="py-3 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="btn-outline cursor-pointer" onClick={() => navigate(`/admin/products/${item._id}/edit`)}>Edit</button>
                                            <button className="border border-red-400 text-red-500 font-body px-8 py-3 text-xs font-medium uppercase tracking-[0.15em] transition-all duration-300 hover:bg-red-500 hover:text-white cursor-pointer" onClick={() => handleDelete(item._id)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
