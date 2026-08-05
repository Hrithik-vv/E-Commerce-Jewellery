import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";
import Header from "./Components/Navbar";
import Footer from "./Components/Footer";
import About from "./pages/About";
import UserProfile from "./pages/UserProfile";
import SignUp from "./pages/SignUp";


function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
        <Route path="/" element={<Home />} />
      <Route path="/login"element={<Login/>}/>
      <Route path="/about"element={<About/>}/>
      <Route path="/profile"element={<UserProfile/>}/>
      <Route path="/signup"element={<SignUp/>}/>
 </Routes>
       <ToastContainer position='top-right' autoClose={1500}/>
       <Footer/>
    </BrowserRouter>
  
  );
}

export default App;
