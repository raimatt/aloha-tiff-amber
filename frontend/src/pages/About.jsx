import PageHeading from '../components/ui/PageHeading'

// Stub: shares the site-wide PageHeading so About matches every other top-of-page
// header. Real copy lands in a later change.
export default function About() {
    return (
        <div className="flex flex-col gap-12 mt-6 md:mt-10">
            <PageHeading title="About" />
        </div>
    )
}
