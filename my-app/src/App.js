import React from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import Exercise from "./components/Exercise";
import Movie from "./components/Movie";
import Form from "./components/Form";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router} from "react-router-dom";
import { Routes,Route } from "react-router-dom";
import Footer from "./components/Footer";
import NotFound from "./components/Notfound";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
       <Route exact path="/" element={<Home/>}/>
       <Route exact path="home" element={<Home/>}/>
        <Route path="login" element={<Login />} />
       <Route path="exercise" element={<Exercise/>}/>
       <Route path="movie" element={<Movie />} />
       <Route path="dashboard" element={<Dashboard />} />
       <Route path="form" element={<Form />} />
       <Route path="*" element={<NotFound/>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
