
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./Components/Navbar/Navbar";
import { Shop } from "~/Pages/Shop/Shop";
import { Request } from "./Pages/Request/Request";
import { Schedule } from "./Pages/Schedule/Schedule";
import { Profile } from "./Pages/Profile/Profile";
import { Product } from "./Pages/Product/Product";
import { ShopCategory } from "./Pages/Shop/ShopCategory";
import { Footer } from "./Components/Footer/Footer";
import uniform_banner from "~/Components/Assets/banner_uniform.png"
import { LoginSignup } from "./Pages/LoginSignup/LoginSignup";
import { CreateRequest } from "./Pages/Request/CreateRequest";


import React from "react";
import Login from "./login";
import Register from "./register";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
              <Route path='/' element={<Shop/>}></Route>
              <Route path='/uniforms' element={<ShopCategory banner={uniform_banner} category="uniform"/>}></Route>
              <Route path='/tools' element={<ShopCategory banner={uniform_banner} category="tool"/>}></Route>
              <Route path='/request' element={<Request/>}></Route>
              <Route path='/create-request' element={<CreateRequest/>}></Route>
              <Route path='/schedule' element={<Schedule/>}></Route>
              <Route path='/profile' element={<Profile/>}></Route>

              <Route path='/product' element={<Product/>}>
                <Route path=':productId' element={<Product/>}></Route>
              </Route>

              <Route path='/login' element={<LoginSignup/>}>
                
              </Route>
        </Routes>
        <Footer/>
    </BrowserRouter>
      <Register/>
    </div>
    
  
  );
}

export default App;
