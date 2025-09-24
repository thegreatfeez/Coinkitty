import React, { useState } from "react"
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate, Link } from "react-router-dom"

export default function Register() {
    const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" })
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    function handleChange(e) {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault()

        if (formData.password !== formData.confirmPassword) {
            return setError("Passwords do not match")
        }

        try {
            setError("")
            setLoading(true)
            await createUserWithEmailAndPassword(auth, formData.email, formData.password)
            navigate("/login")
        } catch (error) {
            setError("Failed to create account: " + error.message)
        }

        setLoading(false)
    }

    const isFormValid = formData.email.trim() !== "" && 
                       formData.password.trim() !== "" && 
                       formData.confirmPassword.trim() !== ""

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4">
            <div className="w-full max-w-md">
                <div className="bg-gray-800 rounded-2xl shadow-xl p-8 text-gray-100">
                    <h1 className="text-2xl font-bold text-center mb-6">
                        Create your account
                    </h1>

                    {error && 
                        <p className="text-center text-red-500 font-semibold text-sm mb-4">
                            {error}
                        </p>
                    }

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            name="email"
                            onChange={handleChange}
                            type="email"
                            placeholder="Email address"
                            value={formData.email}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg placeholder-gray-400 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <input
                            name="password"
                            onChange={handleChange}
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg placeholder-gray-400 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <input
                            name="confirmPassword"
                            onChange={handleChange}
                            type="password"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg placeholder-gray-400 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />

                        <button
                            type="submit"
                            disabled={!isFormValid || loading}
                            className={`w-full py-2 rounded-lg font-medium transition-colors ${
                                isFormValid && !loading
                                    ? "bg-blue-600 text-white hover:bg-blue-700" 
                                    : "bg-gray-600 text-gray-300 cursor-not-allowed"
                            }`}
                        >
                            {loading ? "Creating account..." : "Create account"}
                        </button>
                    </form>

                    <p className="mt-6 text-sm text-gray-400 text-center">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-400 hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}