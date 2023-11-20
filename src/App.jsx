import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Layout from "./Components/Layout";
import { ChakraProvider, Table } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Products from "./Components/Products";
import Wishlist from "./Components/Wishlist";
import Header from "./Components/Header";
import Basket from "./Components/Basket";
import MyTable from "./Components/MyTable";
function App() {
  let BasketArr = [];

  let localBasket = JSON.parse(localStorage.getItem("basket")) || [];
  if (localBasket) {
    BasketArr = localBasket;
  }

  const [users, setUsers] = useState([]);
  const [isLogged, setIsLogged] = useState(true);
  const [checkProduct, setCheckProduct] = useState(false);
  const [localLogin, setLocalLogin] = useState({});
  const [basket, setBasket] = useState([BasketArr]);
  const [fav, setFav] = useState([]);
  useEffect(() => {
    axios(
      "https://6556137684b36e3a431ef611.mockapi.io/usernameProducts/users"
    ).then((res) => {
      setUsers(res.data);
    });

    let FavArr = JSON.parse(localStorage.getItem("fav"));
    FavArr ? setFav(FavArr) : setFav([]);
  }, []);
  useEffect(() => {
    localStorage.setItem("fav", JSON.stringify(fav));
  }, [fav]);
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout localLogin={localLogin} setLocalLogin={setLocalLogin} />
            }
          >
            <Route
              path="login"
              element={
                <Login
                  isLogged={isLogged}
                  setIsLogged={setIsLogged}
                  users={users}
                  setUsers={setUsers}
                  checkProduct={checkProduct}
                  setCheckProduct={setCheckProduct}
                  localLogin={localLogin}
                  setLocalLogin={setLocalLogin}
                />
              }
            />
            <Route
              path="register"
              element={
                <Register
                  isLogged={isLogged}
                  setIsLogged={setIsLogged}
                  users={users}
                  setUsers={setUsers}
                />
              }
            />
            <Route
              path="product"
              element={
                <Products
                  fav={fav}
                  setFav={setFav}
                  basket={basket}
                  setBasket={setBasket}
                />
              }
            />
            <Route
              path="wishlist"
              element={<Wishlist fav={fav} setFav={setFav} />}
            />
            <Route
              path="basket"
              element={<Basket basket={basket} setBasket={setBasket} />}
            />
            <Route path="table" element={<MyTable />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
