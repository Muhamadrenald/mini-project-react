import { MdAlternateEmail } from "react-icons/md";
import { FaFingerprint } from "react-icons/fa";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { BsApple } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import "./index.css"; // Import file CSS

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordView = () => setShowPassword(!showPassword);

  return (
    <div className="flex items-center justify-center w-full h-screen login-page">
      <div className="w-[90%] max-w-sm md:max-w-md lg:max-w-md p-5 bg-gray-900 flex-col flex items-center gap-3 rounded-xl shadow-slate-500 shadow-lg">
        <img src="/logo.svg" alt="logo" className="w-[100px]" />
        <h1 className="text-lg font-semibold md:text-xl">Welcome Back</h1>
        <p className="text-xs text-center text-gray-500 md:text-sm">
          Don&apos;t have an account?
          <span className="text-white"> Sign up</span>
        </p>

        <div className="flex flex-col w-full gap-3">
          <div className="flex items-center w-full gap-2 p-2 bg-gray-800 rounded-xl">
            <MdAlternateEmail />
            <input
              type="email"
              placeholder="Email address"
              className="w-full text-sm bg-transparent border-0 outline-none md:text-base"
            />
          </div>

          <div className="relative flex items-center w-full gap-2 p-2 bg-gray-800 rounded-xl">
            <FaFingerprint />
            <input
              type={showPassword ? "password" : "text"}
              placeholder="Password"
              className="w-full text-sm bg-transparent border-0 outline-none md:text-base"
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
        </div>

        <button className="w-full p-2 mt-3 text-sm bg-blue-500 rounded-xl hover:bg-blue-600 md:text-base">
          Login
        </button>

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
