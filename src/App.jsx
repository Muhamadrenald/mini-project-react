import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Testimonials from "./components/Testimonials/Testimonials";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ListUsers from "./pages/ListUsers/ListUsers";
import DetailUser from "./pages/DetailUser/DetailUser";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./routes/ProtectedRoute";

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
        {/* <Route path="/list-users" element={<ListUsers />} />
        <Route path="/user/:id" element={<DetailUser />} /> */}
        {/* Protected Route */}
        <Route element={<ProtectedRoute />}>
          <Route path="/list-users" element={<ListUsers />} />
          <Route path="/user/:id" element={<DetailUser />} />
        </Route>
        {/* <Route
          path="/list-users"
          element={
            <ProtectedRoute>
              <ListUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/:id"
          element={
            <ProtectedRoute>
              <DetailUser />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
