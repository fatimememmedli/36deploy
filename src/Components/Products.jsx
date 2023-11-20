import React, { Profiler } from "react";
import Header from "./Header";
import axios from "axios";
import { useState, useEffect } from "react";
import style from "../../src/Products.module.css";

import { Input } from "@chakra-ui/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import ExitButton from "./ExitButton";
function Products({ basket, setBasket, fav, setFav }) {
  const [products, setProducts] = useState([]);
  const [fakeProducts, setfakeProducts] = useState([]);
  const [check, setCheck] = useState(false);
  const [sort, setSort] = useState(false);
  const [exit, setExit] = useState(false);
  let isLogin = JSON.parse(localStorage.getItem("isLogin"));
  // console.log(fav);
  useEffect(() => {
    axios(
      "https://6556137684b36e3a431ef611.mockapi.io/usernameProducts/products"
    ).then((res) => {
      setProducts(res.data);
      setfakeProducts(res.data);
    });
  }, [sort]);
  let arrProduct = products;

  let BasketArr = [];

  let localBasket = JSON.parse(localStorage.getItem("basket")) || [];
  if (localBasket) {
    BasketArr = localBasket;
  }

  return (
    <>
      <div className={style.containerBtn}>
        <ExitButton exit={exit} setExit={setExit} />
      </div>
      <div className={style.containerInputSort}>
        <Input
          onChange={(e) => {
            let arr = products;

            arr = fakeProducts.filter((elem) =>
              elem.name.toUpperCase().includes(e.target.value.toUpperCase())
            );
            setProducts(arr);
          }}
          placeholder="search product"
          size="md"
        />
        <Button
          onClick={(e) => {
            e.preventDefault();
            setSort((sort) => !sort);
            arrProduct.sort((a, b) => a.price - b.price);
            setProducts(arrProduct);
          }}
          colorScheme="yellow"
        >
          Sort(Price)
        </Button>
      </div>
      <div className={style.container}>
        {products.map((elem, i) => {
          if (isLogin == true) {
            return (
              <Card className={style.card} key={i} maxW="sm">
                <CardBody>
                  <Image
                    src="https://cloudfront.slrlounge.com/wp-content/uploads/2016/04/SOOC-1.jpg?x15270"
                    alt="Green double couch with wooden legs"
                    borderRadius="lg"
                  />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">{elem.name}</Heading>
                    <Text>
                      This sofa is perfect for modern tropical spaces, baroque
                      inspired spaces, earthy toned spaces and for people who
                      love a chic design with a sprinkle of vintage design.
                    </Text>
                    <Text color="blue.600" fontSize="2xl">
                      {elem.price}$
                    </Text>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup spacing="2">
                    <Button
                      data-id={elem.id}
                      variant="solid"
                      colorScheme="blue"
                      onClick={(e) => {
                        e.preventDefault();

                        {
                          let result = products.find(
                            (elem) =>
                              elem.id == e.target.getAttribute("data-id")
                          );

                          BasketArr.push(result);
                          localStorage.setItem(
                            "basket",
                            JSON.stringify(BasketArr)
                          );
                          setBasket(BasketArr);
                        }
                      }}
                    >
                      Add to cart
                    </Button>
                    <Button
                      colorScheme="red"
                      variant="outline"
                      size="md"
                      id={elem.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCheck((check) => !check);
                        let findFav = products.find(
                          (element) => element.id == e.target.getAttribute("id")
                        );
                        let FavArr = [];
                        if (
                          fav.find(
                            (element) =>
                              element.id == e.target.getAttribute("id")
                          )
                        ) {
                          FavArr = fav.filter(
                            (x) => x.id != e.target.getAttribute("id")
                          );

                          setFav([...FavArr]);
                        } else {
                          setFav([...fav, findFav]);
                          // console.log(fav);
                        }
                      }}
                    >
                      {/* <FontAwesomeIcon icon={faHeart} /> */}
                      Favourite
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            );
          }
        })}
      </div>
    </>
  );
}

export default Products;
