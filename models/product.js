 let  mongoose = require("mongoose")

   let  productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    discount:{
        type:String,
        default:0
    },
     category:{
        type:String
     },
     brand:{
        type:String
     },
     description:{
        type:String
     },
     stock:{
        type:Number,
        default:0
     },
     color:{
        type:String
     },
     size:{
        type:String
     }
   })
   let product= mongoose.model("Product",productSchema)
    module.exports= product