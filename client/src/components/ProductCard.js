import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import PurchaseButton from "./PurchaseButton";

const ProductCard = ({ product, darkMode, addToCart }) => {
  return (
    <StyledProductCard darkMode={darkMode}>
      <Link to={`/product/${product._id}`}>
        <img src={product.imageSrc} alt="product" />
      </Link>
      <StyledProductDescription>
        <h4>{product.name}</h4>
        <p>{product.price}</p>
      </StyledProductDescription>
      <StyledButton>
        <PurchaseButton
          stock={product.numInStock}
          addToCart={addToCart}
          id={product._id}
          key={product._id}
          cartAmount={product.cartAmount}
        />
      </StyledButton>
    </StyledProductCard>
  );
};

const StyledButton = styled.div`
  position: absolute;
  bottom: 5px;
  font-size: 12px;
`;

const StyledProductCard = styled.div`
  margin-top: 300px;
  height: 350px;
  width: 300px;
  background-color: ${(props) => (props.darkMode ? "#111921" : "#94b8ff")};
  padding: 50px;
  margin: 25px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  transition: all 0.5s ease;
  border-radius: 10px;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
  img {
    max-width: 200px;
    border-radius: 5px;
    position: relative;
    bottom: 50px;
  }
  :hover {
    background-color: ${(props) => (props.darkMode ? "#330B26" : "#c2c9cf")};
    transition: all 0.5s ease;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
      rgba(0, 0, 0, 0.22) 0px 15px 12px;
  }
`;
const StyledProductDescription = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 30px;
  flex-wrap: wrap;
  left: 30px;
  right: 30px;
  h4,
  p {
    padding-top: 10px;
    font-size: 0.8rem;
  }
`;

export default ProductCard;
