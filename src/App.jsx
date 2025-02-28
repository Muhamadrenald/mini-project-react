import React from "react";
// import Navbar from "./components/Navbar";
import Header from "./components/Header";
import About from "./components/About";
import Projects from "./components/Projects";

const App = () => {
  return (
    <div className="w-full overflow-hidden">
      {/* <h1>Hello World</h1> */}
      {/* <Navbar /> */}
      <Header />
      <About />
      <Projects />
    </div>
  );
};

export default App;
