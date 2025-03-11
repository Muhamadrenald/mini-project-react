import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdAlternateEmail } from "react-icons/md";
import { FaFingerprint, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { BsApple } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import "./index.css"; // Import file CSS
import useAuthAPI from "../../hooks/useAuthAPI"; // Import custom hook

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(""); // State untuk pesan error email
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(""); // State untuk pesan error password
  const navigate = useNavigate();

  // Gunakan custom hook untuk API
  const { login, isLoading } = useAuthAPI();

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

  const handleLogin = async (e) => {
    e.preventDefault(); // Mencegah reload saat submit

    // Validasi email dan password sebelum melanjutkan
    if (!email) {
      setEmailError("Please enter a valid email.");
      return;
    }

    if (!password) {
      setPasswordError("Please enter your password.");
      return;
    }

    if (emailError) {
      return;
    }

    // Panggil fungsi login dari custom hook
    const isSuccess = await login(email, password);

    if (isSuccess) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen login-page">
      <div className="w-[90%] max-w-sm md:max-w-md lg:max-w-md p-5 bg-gray-900 flex-col flex items-center gap-3 rounded-xl shadow-lg">
        <img src="/logo.svg" alt="logo" className="w-[100px]" />
        <h1 className="text-lg font-semibold md:text-xl">Welcome Back</h1>
        <p className="text-xs text-center text-gray-500 md:text-sm">
          Don&apos;t have an account?
          <span
            className="text-white cursor-pointer"
            onClick={() => navigate("/register")}
          >
            {" "}
            Sign up
          </span>
        </p>

        <form className="flex flex-col w-full gap-3" onSubmit={handleLogin}>
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
          {passwordError && (
            <p className="mt-1 text-xs text-red-500">{passwordError}</p>
          )}

          <button
            type="submit"
            className={`w-full p-2 mt-3 text-sm rounded-xl md:text-base ${
              isLoading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="relative flex items-center justify-center w-full py-3">
          <div className="w-2/5 h-[2px] bg-gray-800"></div>
          <h3 className="px-4 text-xs text-gray-500 font-lora md:text-sm">
            Or
          </h3>
          <div className="w-2/5 h-[2px] bg-gray-800"></div>
        </div>

        <div className="flex items-center w-full gap-2 justify-evenly md:justify-between">
          <div className="p-2 cursor-pointer md:px-6 lg:px-10 bg-slate-700 rounded-xl hover:bg-slate-800">
            <BsApple className="text-lg md:text-xl" />
          </div>
          <div className="p-1 cursor-pointer md:px-6 lg:px-10 bg-slate-700 rounded-xl hover:bg-slate-800">
            <img
              src="/google-icon.png"
              alt="google-icon"
              className="w-6 md:w-8"
            />
          </div>
          <div className="p-2 cursor-pointer md:px-6 lg:px-10 bg-slate-700 rounded-xl hover:bg-slate-800">
            <FaXTwitter className="text-lg md:text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
