
import { useEffect } from "react";

import { Signup } from "./pages/Signup";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import { Signin } from "./pages/Signin";
import { useContent } from "./hooks/useContent";


import { Dashboard } from "./pages/Dashboard";
function App() {
  const {refresh}=useContent()

  useEffect(() => {
  const script = document.createElement("script");
  script.src = "https://platform.twitter.com/widgets.js";
  script.async = true;
  document.body.appendChild(script);
}, []);

// useEffect(()=>{
//   refresh()
// },[])
  
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/signin" element={<Signin/>}></Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>

    </Routes>
   

    </BrowserRouter>
    
  )
}

export default App
