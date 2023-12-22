const knexObject = require("knex");
const pg = require("pg");
const dotenv = require("dotenv").config();

pg.types.setTypeParser(20, Number);

const knexConfig = {
    client: "pg",
    connection: {
        connectionString: "postgres://satyam:ub1NqOvHQaR6nNe01Reo8aAeYu1H5FIs@dpg-cm0ip7mn7f5s73c7afcg-a/bandage",
        port: 5432,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    },
    pool: {
        min: 2,
        max: 20,
        idleTimeoutMillis: 6000000, // free resources are destroyed after this many milliseconds
        reapIntervalMillis: 1000, // how frequent to check for idle resources to destroy
        propagateCreateError: false
    },
};
const testDatabaseConnection = async () => {
    const db = knexObject(knexConfig);

    try {
        db.raw('Select 1')
        .then((data) => {
            console.log('Connected to the database');
            console.log(data)

        })
        .catch((error) => {
            console.log(error)
        })
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};

testDatabaseConnection();
module.exports = knexObject(knexConfig);
