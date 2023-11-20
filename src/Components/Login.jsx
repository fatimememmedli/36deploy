import React from "react";
import { useState } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
function Login({
  checkProduct,
  setCheckProduct,
  users,
  setUsers,
  setIsLogged,
  islogged,
  setLocalLogin,
  localLogin,
}) {
  const navigate = useNavigate();
  const [loginName, setLoginName] = useState("");
  const [loginPass, setLoginPass] = useState("");

  return (
    <div className="container">
      <div className="container-login">
        <div>
          <h1 style={{ color: "white", fontWeight: "bold" }}>Login</h1>
        </div>
        <Input
          onChange={(e) => {
            e.preventDefault();
            setLoginName(e.target.value);
          }}
          style={{ color: "white" }}
          placeholder="enter username"
          size="md"
        />
        <Input
          onChange={(e) => {
            e.preventDefault();
            setLoginPass(e.target.value);
          }}
          placeholder="enter password"
          size="md"
          style={{ color: "white" }}
        />
        <Button
          onClick={(e) => {
            e.preventDefault();
            let localLoginObj = JSON.parse(localStorage.getItem("login"));
            users.forEach((elem) => {
              if (
                !localLoginObj &&
                loginName &&
                loginPass &&
                elem.username == loginName &&
                elem.password == loginPass
              ) {
                let locLogin = {
                  username: elem.username,
                  password: elem.password,
                  favourite: elem.favourite,
                  basket: elem.basket,
                  isAdmin: elem.isAdmin,
                  id: elem.id,
                };

                localStorage.setItem("login", JSON.stringify(locLogin));
                localStorage.setItem("isLogin", true);
                setLocalLogin(locLogin);
                navigate("/product");
                setIsLogged(true);
              }
            });
          }}
          colorScheme="purple"
        >
          Login
        </Button>
        <Button
          onClick={() => {
            setIsLogged(false);
            navigate("/register");
          }}
          colorScheme="red"
        >
          Register
        </Button>
      </div>
    </div>
  );
}

export default Login;
