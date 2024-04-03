import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./Components/Navbar/Navbar";
import { Home } from "~/Pages/Home/home";
import { Request } from "./Pages/Request/Request";
import { Score } from "./Pages/Score/Score";
import { Profile } from "./Pages/Profile/Profile";
import { ShopCategory } from "./Pages/Product/ShopCategory";
import { Product } from "./Pages/Product/ProductDetail";
import { Footer } from "./Components/Footer/Footer";
import { Signup } from "./Pages/LoginSignup/Signup";
import { Login } from "./Pages/LoginSignup/Login";
import { CreateRequest } from "./Pages/Request/CreateRequest";
import { DashBoard } from "./Pages/AdminPages/DashBoard";
import { ProductDetail } from "./Pages/Product/ProductDetail";




function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          
          {/* User routes */}
          <Route path="/home" element={<Home />}></Route>
          <Route path="/score" element={<Score />}></Route>
          <Route path="/request" element={<Request />}></Route>
          <Route path="/create-request" element={<CreateRequest />}></Route>
          <Route path="/user/:activepage" element={<Profile />}></Route>
          <Route path= "/product/detail/:id" element={<ProductDetail />}></Route>
          <Route path="/product" element={<ShopCategory />}></Route>

          {/* Admin routes */}
          <Route path="/admin/dashboard" element={<DashBoard />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
