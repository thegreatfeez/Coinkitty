import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [loginFormData, setLoginFormData] = React.useState({ email: "", password: "" });
  const location = useLocation();
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await signInWithEmailAndPassword(auth, loginFormData.email, loginFormData.password);
      navigate(location.state?.from || "/");
    } catch (error) {
      setError("Failed to log in: " + error.message);
    }

    setLoading(false);
  }

  async function handleGoogleSignIn() {
    try {
      setError("");
      setLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate(location.state?.from || "/");
    } catch (error) {
      setError("Failed to sign in with Google: " + error.message);
    }

    setLoading(false);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const isFormValid = loginFormData.email.trim() !== "" && loginFormData.password.trim() !== "";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md">
        {error && 
          <p className="text-center text-red-500 font-semibold text-sm mb-4">
            {error}
          </p>
        }

        {location.state?.message && 
          <p className="text-center text-red-500 font-semibold text-lg mb-4">
            {location.state.message}
          </p>
        }

        <div className="bg-gray-800 rounded-2xl shadow-xl p-8 text-gray-100">
          <h1 className="text-2xl font-bold text-center mb-6">
            Log in to your account
          </h1>

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
              type="submit"
              disabled={!isFormValid || loading}
              className={`w-full py-2 rounded-lg font-medium transition-colors ${
                isFormValid && !loading
                  ? "bg-blue-600 text-white hover:bg-blue-700" 
                  : "bg-gray-600 text-gray-300 cursor-not-allowed"
              }`}
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-600"></div>
            <span className="mx-2 text-sm text-gray-400">Or continue with</span>
            <div className="flex-grow border-t border-gray-600"></div>
          </div>

          <button 
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 border border-gray-600 py-2 rounded-lg text-gray-200 hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FcGoogle className="h-5 w-5" />
            {loading ? "Signing in..." : "Sign in with Google"}
          </button>

          <p className="mt-4 text-sm text-gray-400 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-400 hover:underline">
              Sign up
            </Link>
          </p>

          <p className="mt-6 text-xs text-gray-500 text-center">
            By logging in, you agree to our{" "}
            <a href="#" className="text-blue-400 hover:underline">Terms of Service</a>{" "}
            and{" "}
            <a href="#" className="text-blue-400 hover:underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}