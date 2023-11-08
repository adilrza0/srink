const express=require("express");
const { default: mongoose } = require("mongoose");
const { UrlModel } = require("./model/url.model");
require("dotenv").config()
const shortid = require("shortid");
const app =express();
app.set('view engine','ejs')
app.use(express.json())
app.get("/",(req,res)=>{
    res.render('index.ejs')
})
app.get("/:shortUrl",async(req,res)=>{
    const {shortUrl}=req.params
    try {
        const fullurl=await UrlModel.findOne({short:shortUrl})
        res.redirect(fullurl.full)
    } catch (error) {
        console.log(error)
        res.status(400).send({"err":error})
        
    }


    
})

app.post("/addUrl",async(req,res)=>{
    const {url,customName}=req.body
    console.log(customName)
    try {
        const ShortUrl=new UrlModel({full:url,short:`${customName}-${shortid.generate()}`,click:0})
        await ShortUrl.save()
        res.status(200).send({"msg":"Url is shortened",ShortUrl:ShortUrl.short})
    } catch (error) {
        res.status(400).send({"err":error})
        
    }

})


app.listen(process.env.port||5500,async()=>{
    try {
        await mongoose.connect(process.env.MongoUrl)
        console.log(`db is connected & server running at ${process.env.port||5500} `)
    } catch (error) {
        console.log(error)
        
    }
   

})