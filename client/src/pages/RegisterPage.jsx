import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { registerUser } from "../services/authService";

const RegisterPage = () => {
    const { setUser } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await registerUser(formData);
            setUser(res.data);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-50 pt-24 px-4">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6">
                <h1 className="text-3xl font-extrabold text-zinc-900 text-center">Create Account</h1>
                <div>
                    <label className="block mb-2 text-zinc-700 font-semibold">Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-zinc-100 text-zinc-900 border border-zinc-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
                <div>
                    <label className="block mb-2 text-zinc-700 font-semibold">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-zinc-100 text-zinc-900 border border-zinc-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
                <div>
                    <label className="block mb-2 text-zinc-700 font-semibold">Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full bg-zinc-100 text-zinc-900 border border-zinc-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <button type="submit" disabled={loading} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-all duration-300 disabled:bg-orange-300">
                    {loading ? "Creating Account..." : "Register"}
                </button>
                <p className="text-center text-zinc-600">
                    Have an account? <Link to="/login" className="font-semibold text-orange-600 hover:underline">Login</Link>
                </p>
            </form>
        </div>
    );
};

export default RegisterPage;