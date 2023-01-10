"use strict";

const express = require("express");
const morgan = require("morgan");

const PORT = 4000;

const {
  getAllItems,
  getAllCompanies,
  getItem,
  getItemBodyLocation,
  getItemCategory,
  getCartItems,
  postCartItems,
  postOrder,
  getOrder,
  deleteCartItem,
  deleteQuantity,
  deleteCart,
  getFitness,
  getLifestyle,
  getEntertainment,
  getMedical,
  getChest,
  getWaist,
  getWrist,
  getArms,
  getHead,
  getFeet
} = require("./handlers");

// patchCart,

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // Gets all items from the "items" collection
  .get("/get-items", getAllItems)
  // Gets a specific item based on id
  .get("/get-item/:itemId", getItem)
  // Shows all items for specific body part
  .get("/get-itemsbody", getItemBodyLocation)
  // Shows all items for specific category
  .get("/get-itemscategory", getItemCategory)
  // Gets all companies from the "companies" collection

  // Gets all items for a specific body part
      .get("/get-fitness", getFitness)
      .get("/get-lifestyle", getLifestyle)
      .get("/get-entertainment", getEntertainment)
      .get("/get-medical", getMedical)
      
  // Gets all items from a specific category//
      .get("/get-chest", getChest)
      .get("/get-waist", getWaist)
      .get("/get-wrist", getWrist)
      .get("/get-arms", getArms)
      .get("/get-head", getHead)
      .get("/get-feet", getFeet)

  .get("/get-companies", getAllCompanies)
  // Adds an item to the cart
  .post("/post-cart", postCartItems)
  // Gets all items in the cart
  .get("/get-cart/", getCartItems)
  // Removes the entire item from the cart (if multiple of same item, they are ALL removed)
  .delete("/delete-cartItem", deleteCartItem)
  // Sends the cart contents from cart collection to order collection
  .post("/post-order", postOrder)
  // Returns the current order
  .get("/get-order", getOrder)
  // Reduces the quantity of a single item in the cart
  .delete("/delete-item", deleteQuantity)
  // Clears the entire cart
  .delete("/delete-cart", deleteCart)

  // body location - Chest, Waist, Wrist, Arms, Head, Feet
  // category - Fitness, lifestyle, Entertainment, Medical

  //////////////////////////////////////////

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
