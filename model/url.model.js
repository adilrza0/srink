const { default: mongoose } = require("mongoose");
const shortId=require("shortid")

const Urlschema=new mongoose.Schema({
    full:String,
    short:String,
    clicks:Number
})

const UrlModel=mongoose.model("url",Urlschema)

module.exports={
    UrlModel
}