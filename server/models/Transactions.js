import mongoose from "mongoose";

const transactionsSchema = new mongoose.Schema(
    {
        userId: String,
        cost: String,
        products: {
            type: [mongoose.Types.ObjectId],
            of: Number
        }
    },
    {timestamps: true}
);

const Transaction = mongoose.model('transactions', transactionsSchema);
export default Transaction;