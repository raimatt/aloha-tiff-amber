import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { createProduct, getProductById, updateProduct, uploadImage } from "../services/api"
import { CATEGORIES } from "../constants/categories"

export default function AdminProductForm() {
    const { id } = useParams()
    const navigate = useNavigate()
    const isEditMode = !!id

    const [loading, setLoading] = useState(isEditMode)
    const [submitting, setSubmitting] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState(null)

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [inStock, setInStock] = useState(true)
    const [imageUrls, setImageUrls] = useState([])

    const fileInputRef = useRef(null)

    useEffect(() => {
        if (!isEditMode) return

        const fetchProduct = async () => {
            setLoading(true)
            try {
                const data = await getProductById(id)
                setName(data.name)
                setPrice(String(data.price))
                setDescription(data.description)
                setCategory(data.category)
                setInStock(data.inStock)
                setImageUrls(data.images ?? [])
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setSubmitting(true)
        const formData = { name, price: Number(price), description, category, inStock, images: imageUrls }
        try {
            if (isEditMode) {
                await updateProduct(id, formData)
            } else {
                await createProduct(formData)
            }
            navigate("/admin")
        } catch (err) {
            setError(err)
        } finally {
            setSubmitting(false)
        }
    }

    const handleImageUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return
        setUploading(true)
        try {
            const url = await uploadImage(file)
            setImageUrls(prev => [...prev, url])
        } catch (err) {
            setError(err)
        } finally {
            setUploading(false)
            e.target.value = ""
        }
    }

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-(--border) border-t-(--primary) animate-spin" />
        </div>
    )

    return (
        <div className="px-4 sm:px-8 py-8">
            <h1 className="text-2xl font-medium tracking-wide text-(--foreground) mb-6">
                {isEditMode ? "Edit Product" : "New Product"}
            </h1>

            {error && <p className="text-sm text-red-600 mb-6">{error.message}</p>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                <div className="flex flex-col gap-1">
                    <label className="text-label text-(--muted-foreground)">Name</label>
                    <input
                        type="text"
                        required
                        value={name}
                        placeholder="Product name"
                        onChange={e => setName(e.target.value)}
                        className="w-full border-b border-(--border) bg-transparent focus:outline-none pb-1"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-label text-(--muted-foreground)">Price ($)</label>
                    <input
                        type="number"
                        required
                        step="0.01"
                        min="0"
                        value={price}
                        placeholder="0.00"
                        onChange={e => setPrice(e.target.value)}
                        className="w-full border-b border-(--border) bg-transparent focus:outline-none pb-1"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-label text-(--muted-foreground)">Description</label>
                    <textarea
                        value={description}
                        placeholder="Product description"
                        rows={4}
                        onChange={e => setDescription(e.target.value)}
                        className="w-full border-b border-(--border) bg-transparent focus:outline-none pb-1 resize-none"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-label text-(--muted-foreground)">Category</label>
                    <select
                        value={category}
                        required
                        onChange={e => setCategory(e.target.value)}
                        className="w-full border-b border-(--border) bg-transparent focus:outline-none pb-1"
                    >
                        <option value="" disabled>Select a category</option>
                        {CATEGORIES.map(cat => (
                            <option key={cat.path} value={cat.path}>
                                {cat.name[0] + cat.name.slice(1).toLowerCase()}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        id="inStock"
                        checked={inStock}
                        onChange={e => setInStock(e.target.checked)}
                        className="w-4 h-4"
                    />
                    <label htmlFor="inStock" className="text-label text-(--foreground) cursor-pointer">In Stock</label>
                </div>

                <div className="flex flex-col gap-3">
                    <label className="text-label text-(--muted-foreground)">Images</label>
                    {imageUrls.length > 0 && (
                        <div className="flex flex-wrap gap-3">
                            {imageUrls.map((url, i) => (
                                <div key={i} className="relative">
                                    <img src={url} alt="" className="w-20 h-20 object-cover rounded-sm" />
                                    <button
                                        type="button"
                                        onClick={() => setImageUrls(prev => prev.filter((_, idx) => idx !== i))}
                                        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-stone-700 text-white text-xs flex items-center justify-center cursor-pointer"
                                    >×</button>
                                </div>
                            ))}
                        </div>
                    )}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                    />
                    <button
                        type="button"
                        disabled={uploading}
                        onClick={() => fileInputRef.current.click()}
                        className={`btn-outline self-start ${uploading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                    >
                        {uploading ? "Uploading…" : "Add Image"}
                    </button>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-(--border)">
                    <button
                        type="submit"
                        disabled={submitting}
                        className={`btn-primary ${submitting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                    >
                        {submitting ? "Saving…" : isEditMode ? "Save Changes" : "Create Product"}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/admin")}
                        className="btn-outline cursor-pointer"
                    >
                        Cancel
                    </button>
                </div>

            </form>
        </div>
    )
}
