import mongoose from "mongoose";
import AutoIncrementFactory from 'mongoose-sequence';

const AutoIncrement = AutoIncrementFactory(mongoose);

const metalListSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: String,
    shortCode: String,
    taxGroup: String,
    status: String
}, { timestamps: true });

metalListSchema.plugin(AutoIncrement, { inc_field: 'id' });

const MetalList = mongoose.model('MetalList', metalListSchema);

export default MetalList;
