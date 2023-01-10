import styled from "styled-components";
import SearchBar from "./SearchBar";
import { ShoppingCart, Moon, Sun } from "react-feather";
import { Link } from "react-router-dom";

const Header = ({ shoppingCart, numItems, darkMode, setDarkMode }) => {

  return (
    <StyledHeader darkMode={darkMode}>
      <Link to="/">
        <h2>Nordtech</h2>
      </Link>
      <SearchBar darkMode={darkMode} />

      <Link to={`/all`}>
        <h2>Explore All Products</h2>
      </Link>

      <StyledDark onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? <Sun /> : <Moon />}
      </StyledDark>

      <Link to="/shoppingcart">
        <StyledCart>
          <StyledIcon num={shoppingCart.length} darkMode={darkMode} />
          <div>{shoppingCart.length ? numItems : ""}</div>
        </StyledCart>
      </Link>
    </StyledHeader>
  );
};

const StyledCart = styled.div`
  display: flex;
  flex-direction: row;
  div {
    padding-left: 10px;
  }

`;
const StyledDark = styled.div`
  cursor: pointer;
  @media (max-width: 768px) {
    padding: 20px;
  }
`;
const StyledIcon = styled(ShoppingCart)`
  fill: ${(props) => (props.num ? "red" : props.darkMode ? "#fff" : "#2C2A30")};
  color: ${(props) =>
    props.num ? "red" : props.darkMode ? "#fff" : "#2C2A30"};
  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const StyledHeader = styled.div`
  width: 100%;
  background-color: ${(props) => (props.darkMode ? "#282645" : "#fff")};
  color: ${(props) => (props.darkMode ? "#fff" : "#2C2A30")};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  a {
    text-decoration: none;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    a{
      h2{
        padding: 10px;
      }
    }
  }
`;



export default Header;
