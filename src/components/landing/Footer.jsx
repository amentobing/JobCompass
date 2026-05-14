export default function Footer() {
    return (
        <footer className="bg-[#f8f8f8] py-8 px-6 border-t">

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

                {/* Logo */}
                <h2 className="text-xl font-bold text-blue-700">
                    Job Compass
                </h2>

                {/* Links */}
                <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                    <a href="#">Cookie Settings</a>
                    <a href="#">Global Careers</a>
                    <a href="#">Support</a>
                </div>

                {/* Copyright */}
                <p className="text-sm text-gray-500">
                    © 2024 Job Compass Inc.
                </p>
            </div>
        </footer>
    );
}