import mongoose from "mongoose";

const metalRatesSchema = new mongoose.Schema({
    time: String,
    gold18KT: Number,
    gold22KT: Number,
    gold24KT: Number,
    platinum: Number,
    silver: Number,
    silverKg: Number,
    employee: String
}, { timestamps: true });

const MetalRates = mongoose.model('MetalRates', metalRatesSchema);

export default MetalRates;