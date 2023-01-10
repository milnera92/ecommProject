const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const  companies  = require("./data/companies.json");
const  items = require("./data/items.json");

items.forEach(item => {
    item.cartAmount = 0
})

const batchImport = async() => {
    
console.log(MONGO_URI);
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("groupproject");
        console.log("connected!");
        const resultCompanies = await db.collection("companies").insertMany(companies);
        const resultItems = await db.collection("items").insertMany(items);
        if (resultCompanies.length === 0 && resultItems.length === 0) {
            console.log("smth went wrong")
        }
        else {
            console.log("it worked")
        }
    } catch (err) {
        console.log(err.stack);
    }
    client.close();
    console.log("disconnected!");
}

batchImport();
