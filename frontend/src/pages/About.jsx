export default function About() {
    return (
        <div>
            <div className="flex flex-col gap-12">
                <div className="bg-yellow-50 border border-yellow-200 px-6 p-6 text-center">
                    <p className="text-sm sm:text-base font-medium text-yellow-800">
                        🚧 This site is currently in progress — new features coming soon.
                    </p>
                </div>
                <section className="text-center">
                    <h1 className="heading-section text-(--foreground)">About</h1>
                    <div className="divider-gold mt-4 mb-12"></div>
                </section>
            </div>
        </div>
    )
}