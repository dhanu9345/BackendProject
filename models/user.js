let mongoose = require("mongoose");

let userSchema = mongoose.Schema({
    Name: {
        type:String,
        required:true
    },
    Email:{
        type:String,
        //   unique:true,
        required:true,
         lowercase:true
    },
    Password:{
          type:String,
        required:true
    }
},{timestamps:true});

let User = mongoose.models.User||mongoose.model("user", userSchema);

module.exports = User;