const HistorySection = () => (
    <section className="mb-16 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-10">
            Our Journey So Far
        </h2>
        <div className="space-y-8 relative pl-6 border-l-4 border-blue-200">
            
            {/* Timeline Item 1 */}
            <div className="relative">
                <span className="absolute -left-[30px] top-1 w-5 h-5 bg-blue-600 rounded-full border-4 border-white"></span>
                <p className="text-xs text-gray-500">2020</p>
                <h3 className="text-xl font-semibold text-gray-800">CareNet was Founded</h3>
                <p className="text-gray-600">Launched with a mission to help 10,000 children get clean water.</p>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative">
                <span className="absolute -left-[30px] top-1 w-5 h-5 bg-blue-600 rounded-full border-4 border-white"></span>
                <p className="text-xs text-gray-500">2021</p>
                <h3 className="text-xl font-semibold text-gray-800">Reached $5 Million Milestone</h3>
                <p className="text-gray-600">Expanded our operations to support global healthcare projects.</p>
            </div>

             <div className="relative">
                <span className="absolute -left-[30px] top-1 w-5 h-5 bg-blue-600 rounded-full border-4 border-white"></span>
                <p className="text-xs text-gray-500">2022</p>
                <h3 className="text-xl font-semibold text-gray-800">Reached $5 Million Milestone</h3>
                <p className="text-gray-600">Expanded our operations to support global healthcare projects.</p>
            </div>

             <div className="relative">
                <span className="absolute -left-[30px] top-1 w-5 h-5 bg-blue-600 rounded-full border-4 border-white"></span>
                <p className="text-xs text-gray-500">2025</p>
                <h3 className="text-xl font-semibold text-gray-800">Reached $5 Million Milestone</h3>
                <p className="text-gray-600">Expanded our operations to support global healthcare projects.</p>
            </div>
            
        </div>
    </section>
);

export default HistorySection;