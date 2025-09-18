// src/components/AuthPage.js
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { axios, loading, error, clearError } = useAxios();
  const { login } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const bannerRef = useRef(null);
  const formRef = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isLogin) {
        response = await axios.post("/auth/login", {
          email: formData.email,
          password: formData.password,
        });
      } else {
        if (formData.password !== formData.confirmPassword) {
          clearError();
          return;
        }
        response = await axios.post("/auth/register", {
          email: formData.email,
          password: formData.password,
        });
      }

      if (response.data.token) {
        login(response.data, response.data.token);
        navigate("/transactions");
      }
    } catch (err) {
      console.error(
        `${isLogin ? "Login" : "Registration"} error:`,
        err.response?.data || err.message
      );
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({ email: "", password: "", confirmPassword: "" });
    clearError();
  };

  useEffect(() => {
    if (bannerRef.current && formRef.current && window.innerWidth >= 768) {
      if (isLogin) {
        bannerRef.current.style.transform = "translateX(0)";
        formRef.current.style.transform = "translateX(0)";
      } else {
        bannerRef.current.style.transform = "translateX(100%)";
        formRef.current.style.transform = "translateX(-100%)";
      }
    }
  }, [isLogin]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Container */}
          <div className="flex flex-col md:flex-row relative min-h-[600px]">
            {/* Banner */}
            <div
              ref={bannerRef}
              className="w-full md:w-1/2 h-72 md:h-auto p-8 flex flex-col justify-between transition-transform duration-700 ease-in-out"
              style={{
                background: isLogin
                  ? "linear-gradient(to bottom right, #3b82f6, #6366f1)"
                  : "linear-gradient(to bottom right, #6366f1, #8b5cf6)",
              }}
            >
              {/* Logo + text */}
              <div>
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-xl md:text-2xl font-bold">
                    SP
                  </div>
                </div>
                <div
                  className={`text-white transition-opacity duration-500 ${
                    isLogin ? "opacity-100" : "opacity-0 absolute md:relative"
                  }`}
                >
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">
                    Welcome Back!
                  </h2>
                  <p className="mb-4 opacity-90 text-sm md:text-base">
                    Sign in to access your dashboard and manage your school
                    payments efficiently.
                  </p>
                </div>
                <div
                  className={`text-white transition-opacity duration-500 ${
                    !isLogin ? "opacity-100" : "opacity-0 absolute md:relative"
                  }`}
                >
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">
                    Join Us Today!
                  </h2>
                  <p className="mb-4 opacity-90 text-sm md:text-base">
                    Create an account to streamline your school payment
                    management.
                  </p>
                </div>
              </div>

              <div className="hidden md:block text-center">
                <p className="text-white/80 text-xs md:text-sm">
                  © {new Date().getFullYear()} School Payment Dashboard
                </p>
              </div>
            </div>

            {/* Form */}
            <div
              ref={formRef}
              className="w-full md:w-1/2 h-full p-6 md:p-12 overflow-y-auto transition-transform duration-700 ease-in-out"
            >
              <div className="max-w-md mx-auto flex flex-col justify-center">
                <div className="text-center mb-6">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
                    {isLogin
                      ? "Sign in to your account"
                      : "Create your account"}
                  </h2>
                  <p className="mt-1 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    {isLogin
                      ? "Enter your credentials to access your account"
                      : "Join the School Payment Dashboard today"}
                  </p>
                </div>

                {/* Form */}
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmit}
                >
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      placeholder="you@example.com"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      placeholder="••••••••"
                    />
                  </div>

                  {/* Confirm Password */}
                  {!isLogin && (
                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Confirm Password
                      </label>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        placeholder="••••••••"
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 md:py-3 rounded-lg text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:opacity-70"
                  >
                    {loading
                      ? isLogin
                        ? "Signing in..."
                        : "Creating account..."
                      : isLogin
                      ? "Sign in"
                      : "Create account"}
                  </button>
                </form>

                {/* Toggle */}
                <div className="mt-4 text-center">
                  <button
                    onClick={toggleAuthMode}
                    className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
                  >
                    {isLogin
                      ? "Don't have an account? Sign up"
                      : "Already have an account? Sign in"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
