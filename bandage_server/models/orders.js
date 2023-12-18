const { v4: uuidv4 } = require("uuid");
const db = require("../libraries/db");

const createNewOrder = ({ products, userId:userid, amount }) => {
    console.log("Dasdcs",userid)
    return new Promise((resolve, reject) => {
        db("orders")
            .insert({
                id: uuidv4(),
                userid,
                products,
                amount,
                createdat: Date.now(),
            })
            .returning("*")
            .then((rows) => resolve(rows[0]))
            .catch((error) => {
                reject(error)});
    });
};

const getUserOrders = ({ userid }) => {
    console.log("sdas",userid)
    return new Promise((resolve, reject) => {
        db("orders")
            .select("*")
            .where({ userid })
            .orderBy("createdat", "desc")
            .then((rows) => resolve(rows))
            .catch((error) => 
            { console.log(error)
                reject(error)});
    });
};

module.exports = { createNewOrder, getUserOrders };
