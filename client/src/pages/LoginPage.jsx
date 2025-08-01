import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { loginUser } from "../services/authService";

const LoginPage = () => {
    const { setUser } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
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
            const res = await loginUser(formData);
            setUser(res.data);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-50 pt-24 px-4">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6">
                <h1 className="text-3xl font-extrabold text-zinc-900 text-center">Login</h1>
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
                    {loading ? "Logging in..." : "Login"}
                </button>
                <p className="text-center text-zinc-600">
                    No account? <Link to="/register" className="font-semibold text-orange-600 hover:underline">Register</Link>
                </p>
            </form>
        </div>
    );
};

export default LoginPage;
