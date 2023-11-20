import React from "react";
import { Input } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, ButtonGroup } from "@chakra-ui/react";
import axios from "axios";
import Layout from "./Layout";
function Register({ users, setUsers, isLoged, setIsLogged }) {
  const navigate = useNavigate();

  const [registerName, setRegisterName] = useState("");
  const [registerPass, setRegisterPass] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  return (
    <>
      <div className="container">
        <div className="container-register">
          <h1 style={{ color: "white", fontWeight: "bold" }}>Register</h1>
          <Input
            onChange={(e) => {
              e.preventDefault();
              setRegisterName(e.target.value);
            }}
            placeholder="Enter username"
            size="md"
            style={{ color: "white" }}
          />
          <Input
            onChange={(e) => {
              e.preventDefault();
              setRegisterPass(e.target.value);
            }}
            type={"password"}
            placeholder="Enter password"
            size="md"
            style={{ color: "white" }}
          />
          <Input
            onChange={(e) => {
              e.preventDefault();
              setRegisterEmail(e.target.value);
            }}
            type={"email"}
            placeholder="Enter email"
            size="md"
            style={{ color: "white" }}
          />
          <Button
            onClick={(e) => {
              e.preventDefault();
              if (registerName && registerEmail && registerPass) {
                let obj = {
                  username: registerName,
                  password: registerPass,
                  email: registerEmail,
                  basket: [],
                };
                axios.post(
                  "https://6556137684b36e3a431ef611.mockapi.io/usernameProducts/users",
                  obj
                );
                navigate("/login");
                setIsLogged(true);
              }
            }}
            colorScheme="linkedin"
          >
            Register
          </Button>
        </div>
      </div>
    </>
  );
}

export default Register;
