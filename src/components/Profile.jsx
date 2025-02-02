import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Profile() {
  const [agree, setAgree] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!agree) {
      setError("You must agree to the terms and conditions");
      return;
    }

    setLoading(true); // Show loading screen

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setTimeout(() => {
        setLoading(false);
        alert("Account created successfully!");
        navigate("/dashboard");
      }, 3000); // Simulating a delay for better UX
    } catch (error) {
      setError(error.message);
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
          <h2 className="text-3xl font-semibold text-white">Creating your account...</h2>
          <p className="text-gray-300 mt-4 text-lg">Please wait while we authenticate your account.</p>
        </div>
      </div>
    );
  }


  return (
    <section className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-gray-100 py-12 px-6 md:px-96">
      <div className="w-full  md:w-1/2  h-48 sm:h-fit object-cover  flex justify-center">
        <img
          src="/tire-shine.png"
          alt="profile"
          className="w-full md:w-full max-w-sm rounded-lg shadow-lg"
        />
      </div>

      <div className="w-full md:w-1/2 bg-white shadow-xl px-8 py-6 rounded-lg">
        <form className="space-y-6" onSubmit={handleSignUp}>
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Register
          </h1>

          {error && (
            <p className="text-red-600 text-center bg-red-100 p-2 rounded">
              {error}
            </p>
          )}

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter Name"
              className="w-full p-3 mt-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
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
              required
              className="w-full p-3 mt-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
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
              required
              className="w-full p-3 mt-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="terms"
              checked={agree}
              onChange={() => setAgree(!agree)}
              className="h-5 w-5 text-orange-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the
              <span className="text-black font-semibold">
                {" "}
                Terms, Privacy Policy,{" "}
              </span>
              and <span className="text-black font-semibold">Fees</span>.
            </label>
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
            {loading ? "Signing Up..." : "Register"}
          </button>
          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link className="font-semibold text-black" to={"/Login"}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Profile;
