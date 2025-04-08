const express = require("express")
const app = express();
const mongooes = require("mongoose");
const initData = require("./data.js");
const listing = require("../model/listing.js");

main().then((err, res) => {
    if (err) throw err;
    console.log("Databass is successfully connected");
}).catch((err) => {
    console.log("getting error")
})



async function main() {
    await mongooes.connect("mongodb://127.0.0.1:27017/wanderlust");

}


let initdb = async () => {
    await listing.deleteMany({});
    console.log("delete success");
    initData.data = initData.data.map((obj) => ({ ...obj, owner: "672e17560d6b36503eebfee6" }));
    await listing.insertMany(initData.data);
    console.log("data was initialized");
}

initdb();