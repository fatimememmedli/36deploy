import React from "react";
import { useState, useEffect } from "react";
// import "./App.css";
import axios from "axios";
import { Outlet, Link } from "react-router-dom";
import "../../src/Layout.css";
import { ChakraProvider, Table } from "@chakra-ui/react";
import Login from "./Login";
import Register from "./Register";
import Products from "./Products";
import Header from "./Header";
function Layout(localLogin, setLocalLogin) {
  const [users, setUsers] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [checkProduct, setCheckProduct] = useState(false);

  let isLogin = JSON.parse(localStorage.getItem("isLogin"));
  let login = JSON.parse(localStorage.getItem("login"));
  useEffect(() => {
    axios(
      "https://6556137684b36e3a431ef611.mockapi.io/usernameProducts/users"
    ).then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <div className="navbar">
      <nav>
        <div className="nav-container">
          <div className="nav-register">
            {!isLogin ? <Link to="register">Register</Link> : null}
            {!isLogin ? <Link to="login">Login</Link> : null}
          </div>
          <div className="product-wishlist">
            {isLogin ? <Link to="product">Products</Link> : null}
            {isLogin ? <Link to="wishlist">Wishlist</Link> : null}
            {isLogin ? <Link to="basket">Basket</Link> : null}
            {isLogin && login.isAdmin ? (
              <Link to="table">Edit Product</Link>
            ) : null}
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default Layout;
