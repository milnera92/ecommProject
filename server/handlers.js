"use strict";

const { v4: uuidv4 } = require("uuid");

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const { query } = require("express");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
///////////////////////////////////////////////
// Gets all items from the "items" collection//
///////////////////////////////////////////////
const getAllItems = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("groupproject");
  const result = await db.collection("items").find().toArray();
  result
    ? res.status(200).json({ status: 200, data: result, message: "All Items" })
    : res.status(404).json({ status: 404, message: "Not Found" });
  client.close();
};
//////////////////////////////////////////////////////
//Gets all companies from the "companies" collection//
//////////////////////////////////////////////////////
const getAllCompanies = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("groupproject");
  const result = await db.collection("companies").find().toArray();
  result
    ? res
        .status(200)
        .json({ status: 200, data: result, message: "All Companies" })
    : res.status(404).json({ status: 404, message: "Not Found" });
  client.close();
};
/////////////////////////////////////
// Gets a specific item based on id//
/////////////////////////////////////
const getItem = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const _id = Number(req.params.itemId);
  await client.connect();
  const db = client.db("groupproject");
  const result = await db.collection("items").findOne({ _id: _id });
  result
    ? res
        .status(200)
        .json({ status: 200, data: result, message: "Get YOUR Item" })
    : res.status(404).json({ status: 404, message: "Not Found" });
  client.close();
};
///////////////////////////////////////////
// Shows all items for specific body part//
///////////////////////////////////////////
const getItemBodyLocation = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { bodyPart } = req.body;
  await client.connect();
  const db = client.db("groupproject");
  const result = await db.collection("items").find().toArray();
  const newArray = result.filter((item) => {
    return bodyPart === item.body_location;
  });
  newArray
    ? res
        .status(200)
        .json({ status: 200, data: newArray, message: "Get YOUR Item" })
    : res.status(404).json({ status: 404, message: "Not Found" });
  client.close();
};
/////////////////////////////////////////
//Shows all items for specific category//
/////////////////////////////////////////
const getItemCategory = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { category } = req.body;
  await client.connect();
  const db = client.db("groupproject");
  const result = await db.collection("items").find().toArray();
  const newArray = result.filter((item) => {
    return category === item.category;
  });
  newArray
    ? res
        .status(200)
        .json({ status: 200, data: newArray, message: "Get YOUR Item" })
    : res.status(404).json({ status: 404, message: "Not Found" });
  client.close();
};
///////////////////////////////
// Gets all items in the cart//
///////////////////////////////
const getCartItems = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("groupproject");
  const result = await db.collection("cart").find().toArray();
  result
    ? res.status(200).json({ status: 200, data: result, message: "Get CART" })
    : res.status(404).json({ status: 404, message: "Not Found" });
  client.close();
};
/////////////////////////////
// Adds an item to the cart//
/////////////////////////////
const postCartItems = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("groupproject");
  // gets the item from the cart based on id
  const existingItem = await db
    .collection("cart")
    .findOne({ _id: req.body._id });
  // if that item exists in the cart, then adds quantity plus 1
  if (existingItem) {
    await db
      .collection("cart")
      .updateOne(
        { _id: req.body._id },
        { $set: { cartAmount: existingItem.cartAmount + 1 } }
      );
    res.status(200).json({ status: 200, message: "cart updated" });
    // if not, then it adds that item to the cart
  } else {
    const newItem = await db.collection("items").findOne({ _id: req.body._id });
    await db.collection("cart").insertOne(newItem);
    await db
      .collection("cart")
      .updateOne(
        { _id: req.body._id },
        { $set: { cartAmount: newItem.cartAmount + 1 } }
      );
    res.status(200).json({ status: 200, message: "item added to the cart " });
  }
  client.close();
};
///////////////////////////////////////////////////////////////////////////////////////////
// Removes the entire item from the cart (if multiple of same item, they are ALL removed)//
///////////////////////////////////////////////////////////////////////////////////////////
const deleteCartItem = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("groupproject");
  const _id = req.body;
  const result = await db.collection("cart").deleteOne(_id);
  const deleteResult = await db.collection("cart").find().toArray();
  result.deletedCount > 0
    ? res.status(200).json({
        status: 200,
        data: deleteResult,
        message: "Item DELETED from CART",
      })
    : res.status(404).json({ status: 404, message: "Not Found" });
  client.close();
};
/////////////////////////////////////////////////////////////////////
// Sends the cart contents from cart collection to order collection//
/////////////////////////////////////////////////////////////////////
const postOrder = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("groupproject");
  const result = await db.collection("cart").find().toArray();
  // adds an order ID to the final order
  const finalResult = await db.collection("orders").insertOne({
    _id: uuidv4(),
    result,
  });
  // clears the contents of the cart after sending items to order collection
  await db.collection("cart").deleteMany({});
  finalResult
    ? res.status(200).json({
        status: 200,
        data: finalResult,
        message: "Cart POSTed to Order",
      })
    : res.status(404).json({ status: 404, message: "Not Found" });
  client.close();
};
//////////////////////////////
// Returns the current order//
//////////////////////////////
const getOrder = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("groupproject");
  const result = await db.collection("orders").find().toArray();
  console.log(result);
  result
    ? res.status(200).json({ status: 200, data: result, message: "Get ORDER" })
    : res.status(404).json({ status: 404, message: "Not Found" });
  client.close();
};
//////////////////////////////////////////////////////
// Reduces the quantity of a single item in the cart//
//////////////////////////////////////////////////////
const deleteQuantity = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("groupproject");
  const existingItem = await db
    .collection("cart")
    .findOne({ _id: req.body._id });
  if (existingItem) {
    await db
      .collection("cart")
      .updateOne(
        { _id: req.body._id },
        { $set: { cartAmount: existingItem.cartAmount - 1 } }
      );
    res.status(200).json({ status: 200, message: "cart updated" });
  } else {
    res.status(404).json({ status: 404, message: "item not found " });
  }
  client.close();
};
///////////////////////////
// Clears the entire cart//
///////////////////////////
const deleteCart = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("groupproject");
  const deleteResult = await db.collection("cart").deleteMany({});
  deleteResult
    ? res.status(200).json({
        status: 200,
        data: deleteResult,
        message: "Cart Contents Cleared",
      })
    : res.status(404).json({ status: 404, message: "Not Found" });
  client.close();
};

const getFitness = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const category = "Fitness";
  await client.connect();
  const db = client.db("groupproject");
  const result = await db.collection("items").find().toArray();
  const newArray = result.filter((item) => {
    return category === item.category;
  });
  newArray
    ? res
        .status(200)
        .json({ status: 200, data: newArray, message: "Get YOUR Item" })
    : res.status(404).json({ status: 404, message: "Not Found" });
  client.close();
};


const getLifestyle = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const category = "Lifestyle";
  await client.connect();
  const db = client.db("groupproject");
  const result = await db.collection("items").find().toArray();
  const newArray = result.filter((item) => {
    return category === item.category;
  });
  newArray
    ? res
        .status(200)
        .json({ status: 200, data: newArray, message: "Get YOUR Item" })
    : res.status(404).json({ status: 404, message: "Not Found" });
  client.close();
};

const getEntertainment = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const category = "Entertainment";
  await client.connect();
  const db = client.db("groupproject");
  const result = await db.collection("items").find().toArray();
  const newArray = result.filter((item) => {
    return category === item.category;
  });
  newArray
    ? res
        .status(200)
        .json({ status: 200, data: newArray, message: "Get YOUR Item" })
    : res.status(404).json({ status: 404, message: "Not Found" });
  client.close();
};

const getMedical = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const category = "Medical";
  await client.connect();
  const db = client.db("groupproject");
  const result = await db.collection("items").find().toArray();
  const newArray = result.filter((item) => {
    return category === item.category;
  });
  newArray
    ? res
        .status(200)
        .json({ status: 200, data: newArray, message: "Get YOUR Item" })
    : res.status(404).json({ status: 404, message: "Not Found" });
  client.close();
};

const getChest = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const bodyPart = "Chest";
  await client.connect();
  const db = client.db("groupproject");
  const result = await db.collection("items").find().toArray();
  const newArray = result.filter((item) => {
    return bodyPart === item.body_location;
  });
  newArray
    ? res
        .status(200)
        .json({ status: 200, data: newArray, message: "Get YOUR Item" })
    : res.status(404).json({ status: 404, message: "Not Found" });
  client.close();
};

const getWaist = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const bodyPart = "Waist";
  await client.connect();
  const db = client.db("groupproject");
  const result = await db.collection("items").find().toArray();
  const newArray = result.filter((item) => {
    return bodyPart === item.body_location;
  });
  newArray
    ? res
        .status(200)
        .json({ status: 200, data: newArray, message: "Get YOUR Item" })
    : res.status(404).json({ status: 404, message: "Not Found" });
  client.close();
};

const getWrist = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const bodyPart = "Wrist";
  await client.connect();
  const db = client.db("groupproject");
  const result = await db.collection("items").find().toArray();
  const newArray = result.filter((item) => {
    return bodyPart === item.body_location;
  });
  newArray
    ? res
        .status(200)
        .json({ status: 200, data: newArray, message: "Get YOUR Item" })
    : res.status(404).json({ status: 404, message: "Not Found" });
  client.close();
};

const getArms = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const bodyPart = "Arms";
  await client.connect();
  const db = client.db("groupproject");
  const result = await db.collection("items").find().toArray();
  const newArray = result.filter((item) => {
    return bodyPart === item.body_location;
  });
  newArray
    ? res
        .status(200)
        .json({ status: 200, data: newArray, message: "Get YOUR Item" })
    : res.status(404).json({ status: 404, message: "Not Found" });
  client.close();
};

const getHead = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const bodyPart = "Head";
  await client.connect();
  const db = client.db("groupproject");
  const result = await db.collection("items").find().toArray();
  const newArray = result.filter((item) => {
    return bodyPart === item.body_location;
  });
  newArray
    ? res
        .status(200)
        .json({ status: 200, data: newArray, message: "Get YOUR Item" })
    : res.status(404).json({ status: 404, message: "Not Found" });
  client.close();
};

const getFeet = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const bodyPart = "Feet";
  await client.connect();
  const db = client.db("groupproject");
  const result = await db.collection("items").find().toArray();
  const newArray = result.filter((item) => {
    return bodyPart === item.body_location;
  });
  newArray
    ? res
        .status(200)
        .json({ status: 200, data: newArray, message: "Get YOUR Item" })
    : res.status(404).json({ status: 404, message: "Not Found" });
  client.close();
};


module.exports = {
  getAllItems,
  getItem,
  getItemBodyLocation,
  getItemCategory,
  getAllCompanies,
  getCartItems,
  postCartItems,
  deleteCartItem,
  postOrder,
  getOrder,
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
};
