export default function TextInputSection() {
    return (
        <div className="bg-white rounded-3xl p-8 shadow-sm">

            {/* Header */}
            <div className="flex items-center justify-between">

                <h2 className="text-xl font-semibold text-gray-900">
                    Paste CV Text
                </h2>

                <button className="text-blue-700 text-sm font-medium">
                    Clear
                </button>
            </div>

            {/* Textarea */}
            <textarea
                placeholder="Paste candidate's professional summary, experience, and skills here..."
                className="w-full h-[220px] mt-6 bg-[#f5f7fb] rounded-2xl p-5 resize-none outline-none border border-gray-200 text-gray-700"
            ></textarea>
        </div>
    );
}