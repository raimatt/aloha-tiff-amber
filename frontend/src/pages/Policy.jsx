import PageHeading from '../components/ui/PageHeading'

// Stub: same shared PageHeading as About, so the two stubs render identically
// until their real content is written.
export default function Policy() {
    return (
        <div className="flex flex-col gap-12 mt-6 md:mt-10">
            <PageHeading title="Policy" />
        </div>
    )
}
