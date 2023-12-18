const db = require("../libraries/db");
const { v4: uuidv4 } = require("uuid");

const getUserCart = ({ userId }) => {
    return new Promise((resolve, reject) => {
        
    //     db.from(
    //         "cart_details",
    //         db.raw(`SELECT * FROM cart_details WHERE "userId"='${userId}'`)
    //     )
    //         .select([
    //             "cart_details.id AS id",
    //             "name",
    //             "images",
    //             "quantity",
    //             "price",
    //             "products.id AS productid",
    //         ])
    //         .from("cart_details")
    //         .innerJoin("products", function () {
    //             this.on("cart_details.productid", "=", "products.id");
    //         })
    //         .then((rows) => {
    //             console.log("rows",rows)
    //             resolve(rows)})
    //         .catch((error) => {
    //             // console.log("sfadcas",error)
    //             reject(error)});
    db("cart_details as cd")
    .select([
        "cd.id AS id",
        "p.name",
        "p.images",
        "cd.quantity",
        "p.price",
        "p.id AS productid",
    ])
    .innerJoin("products as p", "cd.productid", "p.id")
    .where("cd.userId", userId)
    .then((rows) => {
        resolve(rows);
    })
    .catch((error) => {
        reject(error);
    });
    });
};

const addProductToCart = ({ userId, productid, quantity }) => {
    return new Promise((resolve, reject) => {
        db("cart_details")
            .insert({ id: uuidv4(), userId, productid, quantity })
            .returning("*")
            .then((rows) => resolve(rows[0]))
            .catch((error) => reject(error));
    });
};

const updateProductQuantity = ({ id, quantity }) => {
    return new Promise((resolve, reject) => {
        db("cart_details")
            .update({ quantity })
            .where({ id })
            .then(() => resolve())
            .catch((error) => reject(error));
    });
};

const removeCartItem = ({ id }) => {
    return new Promise((resolve, reject) => {
        db("cart_details")
            .where({ id })
            .del()
            .then(() => resolve())
            .catch((error) => reject(error));
    });
};

const emptyCart = ({ userId }) => {
    return new Promise((resolve, reject) => {
        db("cart_details")
            .where({ userId })
            .del()
            .then(() => resolve())
            .catch((error) => reject(error));
    });
};

const getCartItemByProductId = ({ productid, userId }) => {
    return new Promise((resolve, reject) => {
        db("cart_details")
            .select("*")
            .where({ userId, productid })
            .then((rows) => resolve(rows[0]))
            .catch((error) => reject(error));
    });
};

const getCartItemById = ({ id }) => {
    return new Promise((resolve, reject) => {
        db("cart_details")
            .select("*")
            .where({ id })
            .then((rows) => resolve(rows[0]))
            .catch((error) => reject(error));
    });
};

module.exports = {
    getUserCart,
    addProductToCart,
    updateProductQuantity,
    removeCartItem,
    emptyCart,
    getCartItemByProductId,
    getCartItemById,
};
