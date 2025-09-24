import React from "react"
import { useNavigate, useLocation } from "react-router-dom"

export default function Login() {
    const [loginFormData, setLoginFormData] = React.useState({ email: "", password: "" })
    const location = useLocation()

    function handleSubmit(e) {
        e.preventDefault()
    }

    function handleChange(e) {
        const { name, value } = e.target
        setLoginFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4">
            <div className="w-full max-w-md">
               
                {location.state?.message && 
                <p className="text-center text-red-500 font-semibold text-lg mb-4">
                    {location.state.message}
                </p>}

               
                <div className="bg-gray-800 rounded-2xl shadow-xl p-8 text-gray-100">
                    <h1 className="text-2xl font-bold text-center mb-2">
                        Log in to your account
                    </h1>
                    <p className="text-sm text-gray-400 text-center mb-6">
                        This is just for <span className="font-semibold text-white">testing purposes</span>, 
                        not a real authentication.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            name="email"
                            onChange={handleChange}
                            type="email"
                            placeholder="Email address"
                            value={loginFormData.email}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg placeholder-gray-400 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <input
                            name="password"
                            onChange={handleChange}
                            type="password"
                            placeholder="Password"
                            value={loginFormData.password}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg placeholder-gray-400 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />

                        <div className="flex justify-end">
                            <a href="#" className="text-sm text-blue-400 hover:underline">
                                Forgot your password?
                            </a>
                        </div>

                        <button
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                            Log in
                        </button>
                    </form>

                    <div className="flex items-center my-6">
                        <div className="flex-grow border-t border-gray-600"></div>
                        <span className="mx-2 text-sm text-gray-400">Or continue with</span>
                        <div className="flex-grow border-t border-gray-600"></div>
                    </div>

                    <button className="w-full flex items-center justify-center gap-2 border border-gray-600 py-2 rounded-lg text-gray-200 hover:bg-gray-700 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" 
                             className="h-5 w-5" 
                             fill="none" 
                             viewBox="0 0 24 24" 
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 
                                   9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Demo Login
                    </button>

                    <p className="mt-6 text-xs text-gray-500 text-center">
                        By logging in, you agree to our{" "}
                        <a href="#" className="text-blue-400 hover:underline">Terms of Service</a>{" "}
                        and{" "}
                        <a href="#" className="text-blue-400 hover:underline">Privacy Policy</a>.
                    </p>
                </div>
            </div>
        </div>
    )
}
