// import { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Loader2 } from "lucide-react";
// import Navbar from "../components/landing/Navbar";
// import Footer from "../components/landing/Footer";

// export default function RegisterPage() {
//     const navigate = useNavigate();

//     // 1. STATE DIPERBARUI: Menyesuaikan dengan kebutuhan API (username & confirmPass)
//     const [formData, setFormData] = useState({
//         email: "",
//         username: "",
//         password: "",
//         confirmPass: "",
//     });

//     const [loading, setLoading] = useState(false);

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleRegister = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             // 2. URL DIPERBARUI: Mengarah ke localhost backend API
//             const response = await axios.post(
//                 "http://localhost:3001/register",
//                 formData,
//                 {
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                 }
//             );

//             if (response.data.status === "success") {
//                 alert("Register berhasil! Silakan login.");
//                 navigate("/login");
//             } else {
//                 alert(response.data.message);
//             }
//         } catch (error) {
//             console.error(error);
//             // Menangkap pesan error dari backend jika ada (misal: password tidak sesuai kriteria)
//             if (error.response && error.response.data && error.response.data.message) {
//                 alert(`Register gagal: ${error.response.data.message}`);
//             } else {
//                 alert("Register gagal. Pastikan server backend berjalan.");
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen flex flex-col bg-blue-50/30">
//             <Navbar />

//             <main className="flex-grow flex items-center justify-center p-6 pt-32 pb-12">
//                 <motion.div
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.6, ease: "easeOut" }}
//                     className="bg-white w-full max-w-md rounded-3xl shadow-xl border border-blue-100 p-8"
//                 >

//                     <h1 className="text-3xl font-black text-blue-950 text-center mb-2">
//                         Create Account
//                     </h1>

//                     <p className="text-slate-500 text-center mb-8">
//                         Daftar untuk mulai menggunakan JobCompass
//                     </p>

//                     <form onSubmit={handleRegister} className="space-y-5">

//                         {/* 3. INPUT USERNAME (Menggantikan input Name) */}
//                         <div>
//                             <label className="text-sm font-bold text-slate-700">
//                                 Username
//                             </label>
//                             <input
//                                 type="text"
//                                 name="username"
//                                 value={formData.username}
//                                 onChange={handleChange}
//                                 placeholder="Min 4 karakter (huruf/angka)"
//                                 className="w-full mt-2 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//                                 required
//                             />
//                         </div>

//                         <div>
//                             <label className="text-sm font-bold text-slate-700">
//                                 Email
//                             </label>
//                             <input
//                                 type="email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 placeholder="Masukkan email valid"
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
//                                 placeholder="Min 1 karakter khusus (._%#!-)"
//                                 className="w-full mt-2 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//                                 required
//                             />
//                         </div>

//                         {/* 4. INPUT KONFIRMASI PASSWORD BARU */}
//                         <div>
//                             <label className="text-sm font-bold text-slate-700">
//                                 Konfirmasi Password
//                             </label>
//                             <input
//                                 type="password"
//                                 name="confirmPass"
//                                 value={formData.confirmPass}
//                                 onChange={handleChange}
//                                 placeholder="Ulangi password"
//                                 className="w-full mt-2 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//                                 required
//                             />
//                         </div>

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
//                             ) : "Register"}
//                         </motion.button>
//                     </form>

//                     <p className="text-sm text-slate-500 mt-6 text-center">
//                         Sudah punya akun?{" "}
//                         <Link
//                             to="/login"
//                             className="text-blue-600 font-bold hover:underline"
//                         >
//                             Login
//                         </Link>
//                     </p>
//                 </motion.div>
//             </main>

//             <Footer />
//         </div>
//     );
// }