import { MdAlternateEmail } from "react-icons/md";
import { FaFingerprint, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./index.css"; // Import file CSS

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(""); // State untuk error email
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordView = () => setShowPassword(!showPassword);

  // Validasi email saat input berubah
  const validateEmail = (value) => {
    if (!value.includes("@")) {
      setEmailError("Please include '@' in the email address.");
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      setEmailError("Invalid email format.");
    } else {
      setEmailError(""); // Reset error jika valid
    }
    setEmail(value);
  };

  const handleRegister = async (e) => {
    e.preventDefault(); // Mencegah reload saat submit

    if (emailError || !email) {
      setEmailError("Please enter a valid email.");
      return;
    }

    setIsLoading(true); // Aktifkan loading

    try {
      const response = await fetch("https://reqres.in/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Registration successful! Redirecting...");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        toast.error(data.error || "Registration failed");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error registering:", error);
      toast.error("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen login-page register-page">
      <div className="w-[90%] max-w-sm md:max-w-md lg:max-w-md p-5 bg-gray-900 flex-col flex items-center gap-3 rounded-xl shadow-lg">
        <img src="/logo.svg" alt="logo" className="w-[100px]" />
        <h1 className="text-lg font-semibold md:text-xl">Create an Account</h1>
        <p className="text-xs text-center text-gray-500 md:text-sm">
          Already have an account?
          <span
            className="text-white cursor-pointer"
            onClick={() => navigate("/login")}
          >
            {" "}
            Login
          </span>
        </p>

        <form className="flex flex-col w-full gap-3" onSubmit={handleRegister}>
          {/* Input Email */}
          <div className="flex flex-col w-full">
            <div className="flex items-center w-full gap-2 p-2 bg-gray-800 rounded-xl">
              <MdAlternateEmail />
              <input
                type="email"
                placeholder="Email address"
                className="w-full text-sm bg-transparent border-0 outline-none md:text-base"
                value={email}
                onChange={(e) => validateEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            {emailError && (
              <p className="mt-1 text-xs text-red-500">{emailError}</p>
            )}
          </div>

          {/* Input Password */}
          <div className="relative flex items-center w-full gap-2 p-2 bg-gray-800 rounded-xl">
            <FaFingerprint />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full text-sm bg-transparent border-0 outline-none md:text-base"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
            {showPassword ? (
              <FaRegEyeSlash
                className="absolute cursor-pointer right-5"
                onClick={togglePasswordView}
              />
            ) : (
              <FaRegEye
                className="absolute cursor-pointer right-5"
                onClick={togglePasswordView}
              />
            )}
          </div>

          <button
            type="submit"
            className={`w-full p-2 mt-3 text-sm rounded-xl md:text-base ${
              isLoading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
