import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "./Form";
import { ClimbingBoxLoader } from "react-spinners";
import PurchaseButton from "./PurchaseButton";

const ShoppingCart = ({
  shoppingCart,
  addToCart,
  darkMode,
  setItemAdded,
  itemAdded,
}) => {
  const [orderTotal, setOrderTotal] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [form, setForm] = useState({});
  const [disableBut, setDisableBut] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let order = 0;
    let moneyPer = 0;
    shoppingCart.forEach((item) => {
      moneyPer = Number(item.price.replace("$", ""));
      if (item.cartAmount > 1) {
        order += moneyPer * item.cartAmount;
      } else {
        order += moneyPer;
      }
    });
    setOrderTotal(parseFloat(order).toFixed(2));
    setTaxes(parseFloat(order * 0.15).toFixed(2));
    setGrandTotal(parseFloat(order * 1.15).toFixed(2));
  }, [shoppingCart]);

  // this function deletes all items in the cart collection
  // when the clear cart button is clicked
  const deleteCart = () => {
    fetch(`/delete-cart`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({

      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setItemAdded(!itemAdded);
      });

  }

// deletes the entire collection of SAME items
  const deleteItem = (_id) => {
    fetch(`/delete-cartItem`, {
      method: "DELETE",
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

  // reduces number of items in cart by 1
  const deleteOne = (_id) => {
    fetch(`/delete-item`, {
      method: "DELETE",
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
// sends order from shopping cart to order collection
  const confirmation = () => {
    fetch(`/post-order`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((data) => {
        setItemAdded(!itemAdded);
      });
navigate("/confirmation");
  };

  const handleAddOne = (id, e) => {
    e.preventDefault();
    setDisableBut(true)
    setTimeout(()=>{setDisableBut(false)}, 1000)
    addToCart(id);
  }

  if (!shoppingCart) {
    return <StyledLoader color="#433ede" />;
  }
  return (
    <StyledCart darkMode={darkMode}>
      <ul>
        {shoppingCart.length > 0 ? (
          shoppingCart.map((item) => {
            return (
              <li key={item._id}>
                <img src={item.imageSrc} alt="product"></img>
                <div>
                  <h4>{item.name}</h4>
                  <h2>{item.cartAmount}</h2>
                  <p>{item.price}</p>
                  <p>{item.numInStock} left in stock!</p>
                  <button onClick={(e) => deleteItem(item._id)}>
                    Remove from Cart
                  </button>
                  {item.cartAmount > 1 ? (
                    <button onClick={() => deleteOne(item._id)}>-</button>
                  ) : (
                    <button disabled={true}>-</button>
                  )}
                  {item.cartAmount === item.numInStock ? (
                    <button disabled={true}>+</button>
                  ) : (
                    <StyledPurchase
                      stock={item.numInStock}
                      addToCart={addToCart}
                      id={item._id}
                      cartAmount={item.cartAmount}
                      innerText={true}
                    />
                    // stock, addToCart, id, cartAmount
                  )}
                </div>
              </li>
            );
          })
        ) : (
          <h2>Your Cart is empty!</h2>
        )}
      </ul>
      {shoppingCart.length > 0 ? (
        <StyledOrder>
          <ClearCart onClick={deleteCart}>Clear Cart</ClearCart>
          <h5>Subtotal</h5>
          <p>{orderTotal}</p>
          <h5>Taxes</h5>
          <p>{taxes}</p>
          <h2>Total</h2>
          <h3>{grandTotal}</h3>
          <Form setForm={setForm} form={form} confirmation={confirmation} />
        </StyledOrder>
      ) : (
        ""
      )}
    </StyledCart>
  );
};

const StyledPurchase=styled(PurchaseButton)`

`
const StyledLoader = styled(ClimbingBoxLoader)`
  position: absolute;
  top: 300px;
  left: 45%;
  z-index: 5;
`;
const StyledCart = styled.div`
  position: absolute;
  top: 80px;
  right: 0;
  left: 0;
  bottom: 0;
  height: auto;
  border: ${(props) =>
    props.darkMode ? "100px solid #2C2A30" : "100px solid #e6e6fa"};
  background-color: ${(props) => (props.darkMode ? "#330B26" : "#c1bfff")};
  height: 100vh;
  ul {
    padding: 50px;
    position: relative;
    li {
      display: flex;
      list-style-type: none;
      margin: 20px;
      position: relative;
      max-width: 60%;
      img {
        margin-right: 20px;
        width: 200px;
        height: 200px;
        box-shadow: rgba(17, 17, 26, 0.1) 0px 8px 24px,
          rgba(17, 17, 26, 0.1) 0px 16px 56px,
          rgba(17, 17, 26, 0.1) 0px 24px 80px;
        border-radius: 5px;
      }
    }
  }

  transition: all 0 ease;
  @media (max-width: 768px) {
    top: 198px;
  }
`;

const StyledOrder = styled.div`
position:absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  float:right;
  right: 75px;
  top: 70px;
  @media (max-width: 768px) {
    left: 50;
    top: 50px;
  }
`;

const ClearCart = styled.button `

`

export default ShoppingCart;
