import styled from "styled-components";
import { Link } from "react-router-dom";

const Footer = ({ darkMode }) => {
  return (
    <StyledFooter darkMode={darkMode}>
      <Container>
        <p>Contact us at: 555-555-5555 - nordtech@fastmail.com</p>
      </Container>
      <Container>
        <p>123 North Street Unit D Fairbanks, Alaska 99703 </p>
      </Container>
      <p>Copyright NordTech LLC. All Rights Reserved</p>
    </StyledFooter>
  );
};

const Container = styled.div `
width: 600px;
display: flex;
`

const StyledFooter = styled.div`
  width: 100%;
  background-color: ${(props) => (props.darkMode ? "#282645" : "#fff")};
  color: ${(props) => (props.darkMode ? "#fff" : "#2C2A30")};
  height: 40px;
  border-top: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
 

  a {
    text-decoration: none;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    a {
      h2 {
        padding: 10px;
      }
    }
  }
`;

export default Footer;
