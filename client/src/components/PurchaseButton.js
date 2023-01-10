import styled from "styled-components";
import { useState } from "react";

const PurchaseButton = ({ stock, addToCart, id, cartAmount, innerText }) => {
const [notPurchased, setNotPurchased] = useState(true);
const [outOfStock, setOutOfStock] = useState(false);

const handleClick = (id) => {
      setNotPurchased(false);
      setTimeout(() => {
        setNotPurchased(true);
      }, 1000);
      addToCart(id);

      cartAmount >= stock ? setOutOfStock(true) : setOutOfStock(false);

    }

  return (
    <>
      {stock > 0 ? (
        <button
          disabled={!notPurchased}
          onClick={() => handleClick(id)}
        >
          { outOfStock ? "none left :(" : notPurchased ? innerText ? '+' : "Add to cart" : "Item added!"}
        </button>
      ) : (
        <StyledOut>Item out of stock!</StyledOut>
      )}
    </>
  );
};

const StyledOut = styled.p`
  border: 1px solid black;
  padding: 2px 5px;
  margin-top: 10px;
`;

export default PurchaseButton;
