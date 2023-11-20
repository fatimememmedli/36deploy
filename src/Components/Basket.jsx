import React from "react";
import style from "../../src/Basket.module.css";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Image,
  Heading,
  Text,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import ExitButton from "./ExitButton";
function Basket({ basket, setBasket }) {
  let isLogin = localStorage.getItem("isLogin");
  return (
    <>
      <div className={style.containerBtn}>
        <ExitButton />
      </div>
      <div className={style.container}>
        {basket.map((elem, i) => {
          if (isLogin) {
            return (
              <Card
                key={i}
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="outline"
              >
                <Image
                  objectFit="cover"
                  maxW={{ base: "100%", sm: "200px" }}
                  src="https://cloudfront.slrlounge.com/wp-content/uploads/2016/04/SOOC-1.jpg?x15270"
                  alt="Caffe Latte"
                />

                <Stack>
                  <CardBody>
                    <Heading size="md">{elem.name}</Heading>

                    <Text py="2">{elem.price}$</Text>
                  </CardBody>

                  <CardFooter>
                    <Button variant="solid" colorScheme="blue">
                      Buy Latte
                    </Button>
                  </CardFooter>
                </Stack>
              </Card>
            );
          }
        })}
      </div>
    </>
  );
}

export default Basket;
