
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
import { LoginSignup } from "./Pages/LoginSignup/LoginSignup";



function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/score' element={<Score/>}></Route>
          <Route path='/request' element={<Request/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
          <Route path='/product' element={<ShopCategory banner={uniform_banner} category="uniform" />}>  <Route path=':productId' element={<Product />}></Route>
          </Route>

          <Route path='/login' element={<LoginSignup />}>

          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>


  );
}

export default App;
