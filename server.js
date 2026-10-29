let express = require("express")
let cors = require("cors")
let mongoose = require("mongoose")
require("dotenv").config()
let cookieParser=require("cookie-parser")

let productRoute = require("./routes/productroute")
let userRoute = require("./routes/userroute");
let loginRoute = require("./routes/loginroute");
let cookieRoute = require("./routes/cookieroute")



let app = express()


app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json()) 
app.use(cookieParser());

mongoose.connect(process.env.MONGODBURL)
.then(()=>{
    console.log("MongoDB Connected")
})
.catch((err)=>{
    console.log(err)
})


app.use("/product", productRoute)
app.use("/user", userRoute)
app.use("/", loginRoute)
app.use("/cookie",cookieRoute)

app.get("/", (req,res)=>{
    res.send("Backend Running")
})


app.listen(2025, ()=>{ console.log(`Server running on ${process.env.PORT ||2025}`);})