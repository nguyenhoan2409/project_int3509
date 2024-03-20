
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./Components/Navbar/Navbar";
import { Home } from "~/Pages/Home/home";
import { Request } from "./Pages/Request/Request";
import { Score } from "./Pages/Score/Score";
import { Profile } from "./Pages/Profile/Profile";
import { ShopCategory } from "./Pages/Product/ShopCategory";
import { Product } from "./Pages/Product/Product";
import { Footer } from "./Components/Footer/Footer";
import uniform_banner from "~/Components/Assets/banner_uniform.png"
import {Signup } from "./Pages/LoginSignup/Signup";
import {Login} from "./Pages/LoginSignup/Login";



function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/score' element={<Score/>}></Route>
          <Route path='/request' element={<Request/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
          <Route path='/product' element={<ShopCategory />}>  
             <Route path=':productId' element={<Product />}> </Route>
          </Route>

          <Route path='/login' element={<Login />}> </Route>
          <Route path='/signup' element={<Signup />}> </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>


  );
}

export default App;
