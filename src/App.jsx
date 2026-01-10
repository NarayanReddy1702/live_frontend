import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/user/Home";
import Register from "./UI/Auth/Register";
import Login from "./UI/Auth/Login";
import Profile from "./pages/user/Profile";

import AuthMiddleware from "./middleware/AuthMiddleware";

// Admin imports
import AdminDashboard from "./pages/admin/AdminDashboard";
import HomeAdmin from "./pages/admin/HomeAdmin";
import UserLayout from "./components/UserLayout";
import UserAdmin from "./pages/admin/UserAdmin";
import AdminProfile from "./pages/admin/AdminProfile";
import AllItems from "./pages/admin/AllItems";
import AddItems from "./pages/admin/AddItems";
import AdminEdit from "./pages/admin/AdminEdit";
import OrderList from "./pages/user/OrderList";
import ViewDetails from "./pages/user/ViewDetails";
import UpdateUser from "./pages/user/UpdateUser";



const App = () => {
  return (
    <Routes>

      <Route element={<UserLayout />}>
        <Route element={<AuthMiddleware />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={<OrderList/>} />
        <Route path="/viewDet/:id" element={<ViewDetails/>}  />
        <Route path="/updateUser/:id" element={<UpdateUser/>}/>    
          </Route>

     
      <Route element={<AuthMiddleware />}>
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<HomeAdmin />} />
          {/* future admin routes */}
          <Route path="users" element={<UserAdmin />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="allItems" element={<AllItems />} />
          <Route path="addItem" element={<AddItems/>}/>
          <Route path="userEdit/:id" element={<AdminEdit/>} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
