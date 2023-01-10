import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { ClimbingBoxLoader } from "react-spinners";

const AllProductPage = ({ darkMode, addToCart }) => {
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [category, setCategroy] = useState(null);

  const handleChange = (e) => {
    setCategroy(e.target.value);
  };

  useEffect(() => {
    fetch(`/get-items`)
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data.data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch(`/get-${category}`)
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data.data);
        setLoading(false);
      });
  }, [category]);

  if (loading) {
    return <StyledLoader color="#433ede" />;
  }
  return (
    <>
      {/*  Category Buttons Below */}
      <StyledSelect>
        <select onClick={handleChange}>
          <option value="">Select a Category</option>
          <option value="fitness">Fitness</option>
          <option value="lifestyle">Lifestyle</option>
          <option value="entertainment">Entertainment</option>
          <option value="medical">Medical</option>
        </select>
        {/*  Body Location Buttons Below */}
        <select onClick={handleChange}>
          <option value="">Select a Body Location</option>
          <option value="chest">Chest</option>
          <option value="waist">Waist</option>
          <option value="wrist">Wrist</option>
          <option value="head">Head</option>
          <option value="feet">Feet</option>
        </select>
      </StyledSelect>
      {/*  Category Buttons End */}
      <StyledBody darkMode={darkMode}>
        <StyledH1>All Products:</StyledH1>
        <FlexCont>
          {allProducts.map((item) => {
            return (
              <ProductCard
                darkMode={darkMode}
                key={item._id}
                product={item}
                addToCart={addToCart}
              />
            );
          })}
        </FlexCont>
      </StyledBody>
    </>
  );
};

const StyledH1 = styled.h1`
margin-left: 45px;
`

const StyledSelect = styled.div`
position: absolute;
top: 120px;
left: 35%;
font-size: 18px;
select{
  margin: 10px;
}
`

const StyledLoader = styled(ClimbingBoxLoader)`
  position: absolute;
  top: 400px;
  left: 45%;
  z-index: 5;
`;

const StyledBody = styled.div`
  border: 2px black solid;
  position: relative;
  padding-top: 50px;
  //margin-top: -270px;
  opacity: 85%;
  background-color: ${(props) => (props.darkMode ? "#131852" : "#e6e6fa")};
  z-index: -1;
  width: 100%;
`;

const FlexCont = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const StyledButton = styled.div`
  //position: absolute;
  bottom: 5px;
  font-size: 12px;
`;

export default AllProductPage;
