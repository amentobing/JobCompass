// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import { motion } from 'framer-motion'; // <-- Import framer-motion
// import { Loader2 } from 'lucide-react'; // <-- Import ikon loading
// import Navbar from '../components/landing/Navbar';
// import Footer from '../components/landing/Footer';

// export default function LoginPage() {
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         email: "",
//         password: "",
//     });

//     const [loading, setLoading] = useState(false);

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             const response = await axios.post(
//                 "https://9dnnv6l4-3001.asse.devtunnels.ms/login",
//                 formData,
//                 {
//                     headers: {
//                         "Content-Type": "application/json",
//                         "x-ms-dev-tunnel-bypass": "true",
//                     },
//                 }
//             );

//             if (response.data.status === "success") {
//                 localStorage.setItem("accessToken", response.data.data.accessToken);
//                 localStorage.setItem("refreshToken", response.data.data.refreshToken);

//                 alert("Login berhasil!");
//                 navigate("/dashboard");
//             } else {
//                 alert(response.data.message);
//             }
//         } catch (error) {
//             console.error(error);
//             alert("Login gagal");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         // Tema diubah ke bg-blue-50
//         <div className="min-h-screen flex flex-col bg-blue-50/30">
//             <Navbar />

//             {/* Tambahkan pt-32 agar tidak tertutup Navbar */}
//             <main className="flex-grow flex items-center justify-center p-6 pt-32 pb-12">
//                 {/* Animasi Masuk Card */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.6, ease: "easeOut" }}
//                     className="bg-white w-full max-w-md rounded-3xl shadow-xl border border-blue-100 p-8"
//                 >

//                     <h1 className="text-3xl font-black text-blue-950 text-center mb-2">
//                         Welcome Back
//                     </h1>

//                     <p className="text-slate-500 text-center mb-8">
//                         Login untuk melanjutkan ke JobCompass
//                     </p>

//                     <form onSubmit={handleLogin} className="space-y-5">
//                         <div>
//                             <label className="text-sm font-bold text-slate-700">
//                                 Email
//                             </label>
//                             <input
//                                 type="email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 placeholder="Masukkan email"
//                                 // Outline diubah ke ring-blue-500
//                                 className="w-full mt-2 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//                                 required
//                             />
//                         </div>

//                         <div>
//                             <label className="text-sm font-bold text-slate-700">
//                                 Password
//                             </label>
//                             <input
//                                 type="password"
//                                 name="password"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                                 placeholder="Masukkan password"
//                                 // Outline diubah ke ring-blue-500
//                                 className="w-full mt-2 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//                                 required
//                             />
//                         </div>

//                         {/* Tombol dengan animasi dan loading state */}
//                         <motion.button
//                             type="submit"
//                             disabled={loading}
//                             whileHover={!loading ? { scale: 1.02, y: -2 } : {}}
//                             whileTap={!loading ? { scale: 0.98 } : {}}
//                             className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${loading
//                                     ? "bg-blue-400 text-white cursor-wait"
//                                     : "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-200"
//                                 }`}
//                         >
//                             {loading ? (
//                                 <>
//                                     <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
//                                         <Loader2 size={20} />
//                                     </motion.div>
//                                     Loading...
//                                 </>
//                             ) : "Login"}
//                         </motion.button>
//                     </form>

//                     <p className="text-sm text-slate-500 mt-6 text-center">
//                         Belum punya akun?{" "}
//                         <Link
//                             to="/register"
//                             className="text-blue-600 font-bold hover:underline"
//                         >
//                             Register
//                         </Link>
//                     </p>
//                 </motion.div>
//             </main>

//             <Footer />
//         </div>
//     );
// }