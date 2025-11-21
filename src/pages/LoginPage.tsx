import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import image from "../assets/7675936.jpg"
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import GoogleSignupButton from "../components/GoogleSignupButton";
import LinkedinSignupButton from "../components/LinkedinSignupButton";


const HOST = import.meta.env.VITE_HOST;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await axios.post(`${HOST}/api/auth/login`, formData);
      localStorage.setItem("token", response.data.token);

       const user = response.data.user;
  if (user) {
    localStorage.setItem("usr", user.id || user.user_id);
  }
      
      navigate("/dashboard");
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex bg-white">

      {/* LEFT SIDE */}
      <div
        className="hidden lg:flex w-1/2 items-center justify-center bg-blue-700 text-white relative"
        style={{
          backgroundImage:
            `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute top-10 left-10">
          <img src="/logo.png" className="h-12" />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-8 py-12">
        <div className="w-full max-w-xl">

          
          <h1 className="text-4xl font-semibold mb-8 text-gray-900">Sign In</h1>

          
          <GoogleSignupButton
            onError={setErrorMessage}
            text="Sign in with Google"
          />

          
          <div className="mt-4 mb-6">
            <LinkedinSignupButton
              onError={setErrorMessage}
              text="Continue with LinkedIn"
            />
          </div>

         
          <p className="text-gray-600 mb-6">
            Or sign in using your email address
          </p>

          {errorMessage && (
            <p className="text-red-600 text-center mb-4">{errorMessage}</p>
          )}

          
          <form className="space-y-6" onSubmit={handleSubmit}>
            
          
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  <span className="text-red-600">*</span> Your email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder=""
                  required
                  className="w-full border bg-gray-100 rounded-md px-3 py-2"
                />
              </div>

              <div>
  <label className="block text-sm font-medium text-gray-800 mb-1">
    <span className="text-red-600">*</span> Password
  </label>

  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      name="password"
      value={formData.password}
      onChange={handleChange}
      required
      className="w-full border bg-gray-100 rounded-md px-3 py-2 pr-12"
    />


    <button
      type="button"
      onClick={() => setShowPassword((prev) => !prev)}
      className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
    >
      {showPassword ? (
        <EyeOff className="h-5 w-5" />
      ) : (
        <Eye className="h-5 w-5" />
      )}
    </button>
  </div>
</div>



            </div>

            
            <div className="flex justify-between items-center text-sm mt-2">
              <NavLink
                to="/forgot-password"
                className="text-blue-700 font-medium"
              >
                Forget Password?
              </NavLink>

              <div>
                <span className="text-gray-700">New User? </span>
                <NavLink
                  to="/signup"
                  className="text-blue-700 font-medium"
                >
                  Create an account
                </NavLink>
              </div>
            </div>

            
            <button
              type="submit"
              className="w-full bg-blue-900 text-white py-3 rounded-md font-medium text-lg"
            >
              Sign In
            </button>

          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;
