
let Product = require("../models/product");

let addProduct = async (req, res) => {
    try {
        if (Array.isArray(req.body)) {
            let products = await Product.insertMany(req.body);

            return res.status(201).json({
                message: "Products Added Successfully",
                count: products.length
            });
        }

        let newProduct = new Product(req.body);
        await newProduct.save();

        res.status(201).json({
            message: "Product Added Successfully",
            product: newProduct
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

let getProducts = async (req, res) => {
    try {
        let products = await Product.find();

        res.status(200).json({
            message: "Products Fetched Successfully",
            count: products.length,
            products: products
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { addProduct, getProducts };