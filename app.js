require("dotenv").config();
const express = require('express');
const app = express();
const connectDB = require("./db/connect")

const port = process.env.PORT || 5000;

const products_routes = require("./routes/products")

app.get('/', (req, res) => {
    res.send("Hii!!");
});

// middleware 
app.use("/api/products", products_routes);

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
         app.listen(port, () => {
            console.log(`listening on ${port}`);
         });
    } catch (error) {
        console.log(error);
    }
} 


start();