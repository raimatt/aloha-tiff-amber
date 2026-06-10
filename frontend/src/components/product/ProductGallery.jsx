import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function ProductGallery({ images = [], name }) {
    const [active, setActive] = useState(0)

    // Defensive: a product with no images still renders a neutral placeholder
    // instead of crashing on images[0].
    if (images.length === 0) {
        return <div className="w-full md:max-w-sm lg:max-w-md aspect-square bg-(--secondary) rounded-sm shrink-0" />
    }

    const hasMultiple = images.length > 1
    // Wrap around at both ends so the arrows never dead-end.
    const go = (step) => setActive((i) => (i + step + images.length) % images.length)

    return (
        <div className="w-full md:max-w-sm lg:max-w-md shrink-0 flex flex-col gap-3">
            <div className="relative">
                <img
                    src={images[active]}
                    alt={name}
                    className="w-full aspect-square object-cover rounded-sm"
                />

                {hasMultiple && (
                    <>
                        <button
                            type="button"
                            onClick={() => go(-1)}
                            aria-label="Previous image"
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-(--card)/80 backdrop-blur flex items-center justify-center text-(--foreground) hover:bg-(--card) cursor-pointer shadow-sm"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            type="button"
                            onClick={() => go(1)}
                            aria-label="Next image"
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-(--card)/80 backdrop-blur flex items-center justify-center text-(--foreground) hover:bg-(--card) cursor-pointer shadow-sm"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </>
                )}
            </div>

            {hasMultiple && (
                <div className="flex flex-wrap gap-2">
                    {images.map((url, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => setActive(i)}
                            aria-label={`View image ${i + 1}`}
                            className={`w-16 h-16 rounded-sm overflow-hidden border transition-colors cursor-pointer ${
                                i === active ? "border-(--primary)" : "border-(--border) opacity-70 hover:opacity-100"
                            }`}
                        >
                            <img src={url} alt="" className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
