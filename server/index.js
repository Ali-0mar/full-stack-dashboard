/* Start Configuration Imports {{ */

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

/* }} End configuration Imports */

/* Start Routes Imports {{ */

import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js"
import managementRoutes from "./routes/management.js"
import salesRoutes from "./routes/sales.js"

/* }} End Routes Imports */

/* Start Database Imports {{ */

import User from "./models/User.js";
import {dataUser, dataProduct, dataProductStat, dataTransaction, dataOverallStat} from "./data/index.js";
import Product from "./models/Proudct.js";
import ProductStats from "./models/ProductStats.js";
import Transactions from "./models/Transactions.js";
import OverallStats from "./models/OverallStats.js";
/* }} End Database Imports {{ */


/* Start Configurations {{ */

dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan('common'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

/* }} End Configurations */

/* Start Routes {{ */

app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/* }} End Routes */

/* Start DataBase Configurations {{ */
    const PORT = process.env.PORT ?? 8000;
    try {
        mongoose.connect(process.env.MONGO_URL,()=>{
            app.listen(PORT, async ()=>{
                // await OverallStats.insertMany(dataOverallStat);
                // await ProductStats.insertMany(dataProductStat);
                console.log(`Server Running On Port ${PORT}`);
            })
        })
    } catch (e) {
        console.log(`Error in connecting to dataBase: ${e}`)
    }

/* }} End DataBase Configurations */
