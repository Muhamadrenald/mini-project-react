import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "./pages/Login/Login";
import Header from "./components/Header/Header";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Testimonials from "./components/Testimonials/Testimonials";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Register from "./pages/Register/Register";
import ListUsers from "./pages/ListUsers/ListUsers";
import DetailUser from "./pages/DetailUser/DetailUser";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <About />
              <Projects />
              <Testimonials />
              <Contact />
              <Footer />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/list-users" element={<ListUsers />} />
        <Route path="/user/:id" element={<DetailUser />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
