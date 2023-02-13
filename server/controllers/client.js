import Product from "../models/Proudct.js";
import ProductStat from "../models/ProductStats.js";
import User from "../models/User.js";
export const getProducts = async (req, res) =>{
    try{
        const products = await Product.find();
        const productsWithStats = await Promise.all(
            products.map(async (product) =>{
                const stat = await ProductStat.find({
                    productId: product._id
                });
                return {
                    ...product._doc,
                    stat
                }
            })
        );
        console.log(productsWithStats)
        res.status(200).json(productsWithStats);
    } catch(error) {
        res.status(404).json({message: error.message})
    }
}

export const getCustomers = async( req, res ) => {
    try{
        const customers = await User.find({role: 'user'}).select('-password');
        res.status(200).json(customers)
    } catch(error) {
    res.status(404).json({message: error.message})
}
}
