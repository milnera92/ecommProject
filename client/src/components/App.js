import { useState, useEffect } from "react";
import Header from "./Header";
import GlobalStyles from "./GlobalStyles";
import Body from "./Body";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllProductPage from "./AllProductPage";
import IndividualProduct from "./IndividualProduct";
import ShoppingCart from "./ShoppingCart";
import Confirmation from "./Confirmation";
import { ClimbingBoxLoader } from "react-spinners";
import styled from "styled-components";
import Footer from "./Footer";

function App() {
  const [numItems, setNumItems] = useState(0);
  const [allItems, setAllItems] = useState([]);
  const [randArr, setRandArr] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [itemAdded, setItemAdded] = useState(false);

  //THIS IS THE FETCH THAT GETS ALL THE ITEMS IN THE SHOPPING CART

  useEffect(() => {
    fetch("/get-cart")
      .then((res) => res.json())
      .then((data) => {
        setShoppingCart(data.data);
        let numInCart = 0;
        data.data.forEach((item) => {
          numInCart += item.cartAmount - 1;
        });
        setNumItems(data.data.length + numInCart);
      });
  }, [itemAdded]);

  // THIS IS THE FETCH FOR ALL THE PRODUCTS ON THE HOME PAGE AND PRODUCT PAGE

  useEffect(() => {
    fetch("/get-items")
      .then((res) => res.json())
      .then((data) => {
        setAllItems(data.data);
        let preArr = [];
        while (preArr.length < 18) {
          preArr.push(Math.floor(Math.random() * 347) + 1);
        }
        setRandArr(preArr);
      });
  }, []);

  // THIS IS FUNCTION THAT ADDS TO CART

  const addToCart = (_id) => {
    fetch(`/post-cart`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setItemAdded(!itemAdded);
      });
  };

  if (!allItems) {
    return (

        <StyledLoader color="#433ede" />

    );
  }
  return (
    <BrowserRouter>
      <GlobalStyles darkMode={darkMode} />
      <Header
        numItems={numItems}
        allItems={allItems}
        shoppingCart={shoppingCart}
        setDarkMode={setDarkMode}
        darkMode={darkMode}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Body
              allItems={allItems}
              randArr={randArr}
              darkMode={darkMode}
              addToCart={addToCart}
            />
          }
        />
        <Route
          path="/all"
          element={
            <AllProductPage
              allItems={allItems}
              darkMode={darkMode}
              addToCart={addToCart}
            />
          }
        />
        <Route
          path="/product/:productId"
          element={
            <IndividualProduct
              addToCart={addToCart}
              darkMode={darkMode}
              setItemAdded={setItemAdded}
            />
          }
        />
        <Route
          path="/shoppingcart"
          element={
            <ShoppingCart
              setNumItems={setNumItems}
              shoppingCart={shoppingCart}
              addToCart={addToCart}
              setShoppingCart={setShoppingCart}
              darkMode={darkMode}
              setItemAdded={setItemAdded}
              itemAdded={itemAdded}
            />
          }
        />
        <Route
          path="/confirmation"
          element={
            <Confirmation darkMode={darkMode} />
          }
        />
      </Routes>
      <Footer darkMode={darkMode} />
    </BrowserRouter>
  );
}

const StyledLoader = styled(ClimbingBoxLoader)`
  position: absolute;
  top: 300px;
  left: 45%;
  z-index: 5;
`;

export default App;
