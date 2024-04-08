import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "~/Pages/Home/home";
import { Request } from "./Pages/Request/Request";
import { Score } from "./Pages/Score/Score";
import { Profile } from "./Pages/Profile/Profile";
import { ShopCategory } from "./Pages/Product/ShopCategory";
import { Signup } from "./Pages/LoginSignup/Signup";
import { Login } from "./Pages/LoginSignup/Login";
import { CreateRequest } from "./Pages/Request/CreateRequest";
import { DashBoard } from "./Pages/AdminPages/DashBoard/DashBoard";
import { ProductDetail } from "./Pages/Product/ProductDetail";
import { Certificate } from "./Pages/Request/Certificate";
import { Sidebar } from "./Components/SideBar/Sidebar";
import { ProductsManagement } from "./Pages/AdminPages/Products.admin/ProductsLayout/Products.admin";
import { UpdateProduct } from "./Pages/AdminPages/Products.admin/UpdateProduct/UpdateProduct";
import { CreateProduct } from "./Pages/AdminPages/Products.admin/CreateProduct/CreateProduct";
import { ScoresManagement } from "./Pages/AdminPages/Score.admin/ScoreLayout/ScoreLayout";
import { ScoresList } from "./Pages/AdminPages/Score.admin/ScoreList/ScoresList";
import { UpdateScores } from "./Pages/AdminPages/Score.admin/ScoresUpdate/ScoresUpdate";
import { AddScores } from "./Pages/AdminPages/Score.admin/ScoresAdd/AddScores";
import { AddStudents } from "./Pages/AdminPages/Score.admin/ScoresAdd/AddStudents";
import { ProductsList } from "./Pages/AdminPages/Products.admin/ProductsList/ProductsList";
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
          <Route path="/certificate/:id" element={<Certificate/>}></Route>
          <Route path="/user/:activepage" element={<Profile />}></Route>
          <Route path= "/product/detail/:id" element={<ProductDetail />}></Route>
          <Route path="/product" element={<ShopCategory />}></Route>

          {/* Admin routes */}
          <Route path="/admin/dashboard" element={<DashBoard />}></Route>
          <Route path="/admin/sidebar" element={<Sidebar />}></Route>
          <Route path="/admin/products" element={<ProductsManagement/>}></Route>
          <Route path="/admin/products/list" element={<ProductsList/>}></Route>
          <Route path="/admin/products/update/:id" element={<UpdateProduct/>}></Route>
          <Route path="/admin/products/add" element={<CreateProduct/>}></Route>
          <Route path="/admin/scores" element={<ScoresManagement/>}></Route>
          <Route path="/admin/scores/list" element={<ScoresList/>}></Route>
          <Route path="/admin/scores/update/:id" element={<UpdateScores/>}></Route>
          <Route path="/admin/scores/add" element={<AddScores/>}></Route>
          <Route path="/admin/students/add" element={<AddStudents/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
