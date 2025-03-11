import { useState } from "react";
import { toast } from "react-toastify";

const useAuthAPI = () => {
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Login successful! Redirecting...", {
          position: "top-right",
        });
        localStorage.setItem("token", data.token);
        return true; // Berhasil login
      } else {
        toast.error(data.error || "Login failed!", { position: "top-right" });
        return false; // Gagal login
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("An error occurred. Please try again.", {
        position: "top-right",
      });
      return false; // Gagal login
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email, password) => {
    setIsLoading(true);
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
        toast.success("Registration successful! Redirecting...", {
          position: "top-right",
        });
        return true; // Berhasil register
      } else {
        toast.error(data.error || "Registration failed", {
          position: "top-right",
        });
        return false; // Gagal register
      }
    } catch (error) {
      console.error("Error registering:", error);
      toast.error("An error occurred. Please try again.", {
        position: "top-right",
      });
      return false; // Gagal register
    } finally {
      setIsLoading(false);
    }
  };

  return { login, register, isLoading };
};

export default useAuthAPI;
