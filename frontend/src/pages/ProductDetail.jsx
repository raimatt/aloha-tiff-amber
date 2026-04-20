import PageHeading from '../components/ui/PageHeading'

// Stub: only the shared page shell is standardized here. The actual product
// view (images, price, description, Request button) is a later feature.
export default function ProductDetail() {
    return (
        <div className="flex flex-col gap-12 mt-6 md:mt-10">
            <PageHeading title="Product Detail" />
        </div>
    )
}
