
import { useEffect } from "react";

import { Signup } from "./pages/Signup";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import { Signin } from "./pages/Signin";
import {Home} from "./pages/Home"
import { Content } from "./pages/Content";

import { Toaster } from "react-hot-toast";

import { Dashboard } from "./pages/Dashboard";
function App() {
 

  useEffect(() => {
  const script = document.createElement("script");
  script.src = "https://platform.twitter.com/widgets.js";
  script.async = true;
  document.body.appendChild(script);
}, []);
  
  return(
    <BrowserRouter>
  
    <Routes>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/signin" element={<Signin/>}></Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
      <Route path="/" element={<Home />}></Route>
      <Route path="/brain/:hash"
      element={<Content/>}
      >
      </Route>

    </Routes>
         <Toaster position="top-center" />
   

    </BrowserRouter>
    
  )
}

export default App
// axios.get("/api/v1/brain/123") // calls backend to fetch data... /api/v1 is for be only not for fe