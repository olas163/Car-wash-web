import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setTimeout(() => {
        setLoading(false);
        // alert("You've successfully logged in");
        navigate("/dashboard");
      });
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        <div className="text-center flex flex-col items-center">
          {/* Bouncing loader */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="animate-bounce rounded-full h-10 w-10 bg-white " style={{animationDelay: '0s'}}></div>
            <div className="animate-bounce rounded-full h-10 w-10 bg-white" style={{animationDelay: '0.2s'}}></div>
            <div className="animate-bounce rounded-full h-10 w-10 bg-white" style={{animationDelay: '0.4s'}}></div>
          </div>
  
          {/* Status message */}
          <h2 className="text-3xl font-semibold text-white">Logging you in...</h2>
          <p className="text-gray-300 mt-4 text-lg">Please wait while we authenticate your account.</p>
        </div>
      </div>
    );
  }


  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100 py-12 px-6">
      <div className="flex flex-col md:flex-row gap-6 md:gap-12 bg-white shadow-xl px-8 py-10 rounded-lg w-full max-w-4xl">
        <div className="flex justify-center items-center md:w-1/2">
          <img
            src="/tire-shine.png"
            alt="Profile"
            className="max-w-full h-auto object-contain"
          />
        </div>
        <form className="space-y-6 md:w-1/2" onSubmit={handleLogin}>
          <h1 className="text-3xl font-semibold text-center text-gray-800">
            Login
          </h1>
          {error && <div className="text-red-500 text-center">{error}</div>}

          <div className="relative">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your Email"
              className="w-full p-3 mt-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your Password"
              className="w-full p-3 mt-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 mt-4 text-white font-semibold rounded-md transition ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-black hover:bg-gray-700"
            }`}
          >
            {loading ? "Logging in..." : "login"}
          </button>
          <p className="text-center text-gray-600 mt-4">
            Don't have an account? <Link className="font-semibold text-black" to={"/profile"}>Create One</Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default LoginPage;
