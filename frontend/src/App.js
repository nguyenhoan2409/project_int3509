import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Home} from "./pages/UserPages/Home/home"
import { Request } from "./pages/UserPages/Request/Request";
import { Score } from "./pages/UserPages/Score/Score";
import { Profile } from "./pages/AdminUserPages/Profile/Profile";
import { ShopCategory } from "./pages/UserPages/Product/ShopCategory";
import { Signup } from "./pages/AdminUserPages/LoginSignup/Signup";
import { Login } from "./pages/AdminUserPages/LoginSignup/Login";
import { CreateRequest } from "./pages/UserPages/Request/CreateRequest";
import { RequestAdmin } from "./pages/AdminPages/Request/ResquestAdmin";


import { ProductDetail } from "./pages/UserPages/Product/ProductDetail";
import { Certificate } from "./pages/UserPages/Request/Certificate";
import { ProductsManagement } from "./pages/AdminPages/Products.admin/ProductsLayout/Products.admin";
import { UpdateProduct } from "./pages/AdminPages/Products.admin/UpdateProduct/UpdateProduct";
import { CreateProduct } from "./pages/AdminPages/Products.admin/CreateProduct/CreateProduct";
import { ScoresManagement } from "./pages/AdminPages/Score.admin/ScoreLayout/ScoreLayout";
import { ScoresList } from "./pages/AdminPages/Score.admin/ScoreList/ScoresList";
import { UpdateScores } from "./pages/AdminPages/Score.admin/ScoresUpdate/ScoresUpdate";
import { ScoreStudentAdd } from "./pages/AdminPages/Score.admin/ScoresAdd/ScoreStudentAdd";
import { ProductsList } from "./pages/AdminPages/Products.admin/ProductsList/ProductsList";
import { AdminHome } from "./pages/AdminPages/AdminHome/AdminHome";
import { UserManagement } from "./pages/AdminPages/UserManagement/UserManagement";
import ProtectedRoute from "./components/ProtectRoute/ProtectRoute";
import { EmailVerify } from "./pages/AdminUserPages/LoginSignup/EmailVerify";
import { NotificationLoginSignup } from "./pages/AdminUserPages/LoginSignup/NotificationLoginSignup";
import { NewPasswordForForgottenPassword } from "./pages/AdminUserPages/LoginSignup/NewPasswordForForgottenPassword";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/user/:id/verify/:code" element={<EmailVerify />}></Route>
          <Route path="/user/forgottenPassword/:id/verify/:code" element={<NewPasswordForForgottenPassword />}></Route>
          <Route path="/notificationLoginSignup" element={<NotificationLoginSignup />}></Route>
          
            {/* User routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/score" element={<Score />}></Route>
            <Route path="/request" element={<Request />}></Route>
            <Route path="/create-request/:product_id" element={<CreateRequest />}></Route>
            <Route path="/certificate/:id" element={<Certificate/>}></Route>
            <Route path="/user/:activepage" element={<Profile />}></Route>
            <Route path= "/product/detail/:id" element={<ProductDetail />}></Route>
            <Route path="/product" element={<ShopCategory />}></Route>
          

            {/* Admin routes */}
          
            <Route path="/admin/dashboard" element={<AdminHome/>}></Route>
            <Route path="/admin/request" element={<RequestAdmin />}></Route>
            <Route path="/admin/users/list" element={<UserManagement/>}></Route>
            <Route path="/admin/products" element={<ProductsManagement/>}></Route>
            <Route path="/admin/products/list" element={<ProductsList/>}></Route>
            <Route path="/admin/products/update/:id" element={<UpdateProduct/>}></Route>
            <Route path="/admin/products/add" element={<CreateProduct/>}></Route>
            <Route path="/admin/scores" element={<ScoresManagement/>}></Route>
            <Route path="/admin/scores/list" element={<ScoresList/>}></Route>
            <Route path="/admin/scores/update/:id" element={<UpdateScores/>}></Route>
            <Route path="/admin/scores/add" element={<ScoreStudentAdd/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
