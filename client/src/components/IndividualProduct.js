import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import background from "./assets/Glorious-blue-mountain-range.jpg";
import PurchaseButton from "./PurchaseButton";
import { ClimbingBoxLoader } from "react-spinners";

const IndividualProduct = ({ addToCart, darkMode, setItemAdded }) => {
  const { productId } = useParams();

  const [indivProduct, setIndivProduct] = useState(null);

  useEffect(() => {
    fetch(`/get-item/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setIndivProduct(data.data);
      });
  }, [productId]);

  if (!indivProduct) {
    return <StyledLoader color="#433ede" />;
  }
  return (
    <StyledProductPage>
      <StyledBackground darkMode={darkMode}></StyledBackground>
      <StyledProduct>
        <StyledImg src={indivProduct.imageSrc} alt={`product-${indivProduct.name}`} />
        <h2>{indivProduct.name}</h2>
        <p>{indivProduct.price}</p>
        <PurchaseButton
          addToCart={addToCart}
          id={indivProduct._id}
          stock={indivProduct.numInStock}
          cartAmount={indivProduct.cartAmount}
        />
      </StyledProduct>
    </StyledProductPage>
  );
};

const StyledImg = styled.img `
  border-radius: 5px;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 8px 24px,
          rgba(17, 17, 26, 0.1) 0px 16px 56px,
          rgba(17, 17, 26, 0.1) 0px 24px 80px;
        border-radius: 5px;
        margin: 25px;
`

const StyledLoader = styled(ClimbingBoxLoader)`
  position: absolute;
  top: 300px;
  left: 45%;
  z-index: 5;
`;

const StyledProductPage = styled.div`
  position: relative;
`;
const StyledBackground = styled.div`
  background-color: ${(props) => (props.darkMode ? "#2C2A30" : "#e6e6fa")};
  height: 100vh;
  position: relative;
  opacity: ${(props) => (props.darkMode ? `100%` : `50%`)};
  filter: ${(props) =>
    props.darkMode ? `brightness(10%)` : `brightness(100%)`};
  background-image: url(${background});
`;
const StyledProduct = styled.div`
  position: absolute;
  width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 5%;
  top: 10%;
  font-size: 1.5rem;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  h2 p,
  button {
    margin: 15px;
    padding: 10px;
  }
  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 45px;
    width: 400px;
    img {
      width: 200px;
    }
  }
`;

export default IndividualProduct;
