import styled from "styled-components";
import ProductCard from "./ProductCard";
import background from "./assets/Glorious-blue-mountain-range.jpg";
import { Link } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";
import mountain from "./assets/mountain.png"

const Body = ({ allItems, randArr, darkMode, addToCart }) => {
  if (!allItems) {
    return <StyledLoader color="#433ede" />;
  }
  return (
    <>
      <StyledBrand>
        <span>
          <StyledLogo src={mountain} />
        </span>
        <span>N</span>
        ordtech
      </StyledBrand>
      <StyledTag>Modern products for the modern explorer</StyledTag>
      <StyledBackgroundImage darkMode={darkMode} />
      <StyledBody darkMode={darkMode}>
        <StyledProducts darkMode={darkMode}>
          {randArr.map((i) => {
            return (
              <ProductCard
                darkMode={darkMode}
                key={allItems[i]._id}
                product={allItems[i]}
                addToCart={addToCart}
              />
            );
          })}
        </StyledProducts>
        <StyledAllPageButton>
          <Link to={`/all`}>
            <button>Explore all Products</button>
          </Link>
        </StyledAllPageButton>
      </StyledBody>
    </>
  );
};
const StyledLogo = styled.img`
position: absolute;
right: 160px;
width: 60px;
`;
const StyledAllPageButton = styled.div`
  width: 100%;
  text-align: center;
  button {
    margin: 120px auto;
    padding: 10px;
    width: 250px;
    font-size: 20px;
    font-weight: bold;
  }
`;
const StyledLoader = styled(ClimbingBoxLoader)`
  position: absolute;
  top: 600px;
  left: 45%;
  z-index: 5;
`;
const StyledBackgroundImage = styled.div`
  height: 100vh;
  position: relative;
  opacity: 100%;
  filter: ${(props) =>
    props.darkMode ? `brightness(20%)` : `brightness(100%)`};
  background-image: url(${background});
  clip-path: inset(0 0 200px 0);
`;
const StyledBody = styled.div`
  position: relative;
  padding-top: 100px;
  margin-top: -270px;
  opacity: 85%;
  background-color: ${(props) => (props.darkMode ? "#131852" : "#e6e6fa")};
  z-index: -1;
  width: 100%;
`;
const StyledTag = styled.div`
  position: absolute;
  top: 200px;
  right: 200px;
  z-index: 2;
  @media (max-width: 768px) {
    left: 15%;
    top: 530px;
  }
`;
const StyledBrand = styled.h1`
  position: absolute;
  z-index: 2;
  top: 150px;
  left: 150px;
  span {
    transform: rotate(7deg);
  }
  @media (max-width: 768px) {
    left: 15%;
    top: 430px;
  }
`;
const StyledProducts = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export default Body;
