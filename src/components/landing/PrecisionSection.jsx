export default function PrecisionSection() {
    return (
        <section className="bg-white py-24 px-6">

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Left Content */}
                <div>

                    <h2 className="text-4xl font-bold leading-tight text-gray-900">
                        Beyond Keywords.
                        <br />
                        <span className="text-blue-700">
                            Semantic Precision.
                        </span>
                    </h2>

                    <p className="mt-6 text-gray-600 leading-relaxed">
                        Traditional platforms rely on rigid boolean searches. SkillFit
                        employs deep contextual analysis to understand the weight of your
                        experiences.
                    </p>

                    {/* Features */}
                    <div className="mt-8 space-y-6">

                        <div>
                            <h4 className="font-semibold text-gray-900">
                                Skill Topology Mapping
                            </h4>

                            <p className="text-gray-600 text-sm mt-1">
                                Visualizing depth and breadth of your expertise.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-gray-900">
                                Cultural Resonance
                            </h4>

                            <p className="text-gray-600 text-sm mt-1">
                                Evaluating work style preferences against company ethos.
                            </p>
                        </div>

                    </div>
                </div>

                {/* Right Card */}
                <div className="bg-[#f8f8f8] rounded-3xl p-8 shadow-md">

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">TOP MATCH</p>

                            <h3 className="text-2xl font-bold mt-2">
                                Senior UX Architect
                            </h3>

                            <p className="text-gray-600 mt-1">
                                Fintech Innovation Ltd.
                            </p>
                        </div>

                        <div className="text-blue-700 font-bold text-xl">
                            94%
                        </div>
                    </div>

                    {/* Progress */}
                    <div className="mt-8 space-y-6">

                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span>Technical Alignment</span>
                                <span>High</span>
                            </div>

                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-700 h-2 rounded-full w-[90%]"></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span>Domain Experience</span>
                                <span>Exceptional</span>
                            </div>

                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-700 h-2 rounded-full w-[95%]"></div>
                            </div>
                        </div>

                    </div>

                    {/* Tags */}
                    <div className="mt-8 flex flex-wrap gap-3">

                        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">
                            Interaction Design
                        </span>

                        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">
                            Design Systems
                        </span>

                        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">
                            +12 Core Skills
                        </span>

                    </div>
                </div>
            </div>
        </section>
    );
}