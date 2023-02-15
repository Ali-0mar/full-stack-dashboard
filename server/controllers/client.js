import Product from "../models/Proudct.js";
import ProductStat from "../models/ProductStats.js";
import User from "../models/User.js";
import Transactions from "../models/Transactions.js";
import Transaction from "../models/Transactions.js";
import getCountryIso3 from "country-iso-2-to-3"
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

export const getTransactions = async(req, res) => {
    try {
        // Sort Should be like this from the front-end : {'field': 'userId', sort: 'desc | asc'}
        const {page = 1, pageSize = 20, sort = null, search = ''} = req.query;
        // Formatted Sort  information should be: {userId: -1 | 1}
        const generateSortInfo = () =>{
            const parsedSortInfo = JSON.parse(sort);
            const formattedSortInfo = {
                [parsedSortInfo.field]: parsedSortInfo.sort === 'asc' ? 1 : -1
            }
            return formattedSortInfo;
        }
        // TODO Add more Error handling
        const formattedSortInfo = !!sort ? generateSortInfo : {};

        const transactions = await Transactions.find({
            //TODO Add more search logic
            $or: [
                {cost:{$regex: new RegExp(search, 'i')}},
                {userId:{$regex: new RegExp(search, 'i')}}
            ]
        })
            .sort(formattedSortInfo())
            .skip(page * pageSize)
            .limit(pageSize)
        const total = await Transaction.countDocuments({
            name: {$regex: search, $options: 'i'}
        });
        res.status(200).json({
            transactions,
            total
        })
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}
 export const getGeography = async (req, res) =>{
    try {
        const users = await User.find();

        const mappedLocations = users.reduce((acc, {country}) =>{
            const countryISO3 = getCountryIso3(country);
            if(!acc[countryISO3]) {
                acc[countryISO3] = 0;
            }
            acc[countryISO3]++;
            return acc;
        },{});
        const formattedLocations = Object.entries(mappedLocations).map(([country, count]) => {
            return{
                id: country,
                value: count
            }
        })
        res.status(200).json(formattedLocations);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
 }