import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    thumbnail:{
        type: String,
    },
    code:{
        type: String,
        required: true
    },
    stock:{
        type: Number,
        default: 0
    }
});

export const productsModel = mongoose.model("Products", productsSchema);