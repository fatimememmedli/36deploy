import React from "react";
import { useNavigate } from "react-router-dom";

import { Button, ButtonGroup } from "@chakra-ui/react";
function ExitButton({ exit, setExit }) {
  const navigate = useNavigate();

  return (
    <div>
      <Button
        onClick={(e) => {
          e.preventDefault();
          localStorage.removeItem("login");
          localStorage.removeItem("fav");
          localStorage.removeItem("basket");
          localStorage.removeItem("isLogin");
          navigate("/login");
        }}
        colorScheme="red"
      >
        Exit
      </Button>
    </div>
  );
}

export default ExitButton;
