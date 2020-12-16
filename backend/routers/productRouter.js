import express from "express";
import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import data from "../data.js";
import { isAuth } from '../utils.js';
const productRouter = express.Router();

productRouter.get('/' ,expressAsyncHandler(async(req, res) => {
    const products = await Product.find({});
    res.send(products);
}));

productRouter.get('/seed',expressAsyncHandler(async(req, res) => {
    // await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({createdProducts});
}));


productRouter.get('/:id', expressAsyncHandler( async(req, res) => {
    const product = await Product.findById(req.params.id);
    if(product){
        res.send(product);
    }else{
        res.status(404).send({message: 'Product not found'});
    }
}));

productRouter.post('/',isAuth, expressAsyncHandler(async(req,res) => {
    const product = new Product({
        name:'sample name',
        image:'/images/product-2.jpg',
        address: 'address',
        catagory: 'sample catagory',
        brand: 'sample brand',
        countInStock: 0,
        rating: 0,
        numReviews: 0,
        description: 'sample description',
    });
    const createdProduct = await product.save();
    res.send({message: 'Product Created', product: createdProduct});
} ))
export default productRouter;

productRouter.put('/:id',isAuth,expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
        product.name = req.body.name;
        product.address = req.body.address;
        product.image = req.body.image;
        product.category = req.body.category;
        product.brand = req.body.brand;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;
        const updatedProduct = await product.save();
        res.send({ message: 'Product Updated', product: updatedProduct });
    } else {
    res.status(404).send({ message: 'Product Not Found' });
    }
    })
  );