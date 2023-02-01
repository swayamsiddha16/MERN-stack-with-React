const express = require("express")
const app = express();
const PORT = 8081;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/")
  .then(() => {
    console.log("MongoDb connected");

    app.listen(PORT, (err) => {
      if (err) {
        console.log(err);
      } else console.log("server running at Port", PORT);
    });
  })
  .catch((err) => {
    console.log("unable to connect to mdb");
  });

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: String, 
    email: String,
    phone: Number,
    address: String,
  });

const UserModel = mongoose.model("users",UserSchema);

let data = [
    {
        name:"swayam",
        email:"jeon.jungkook@gmail.com",
        phone:8580295988,
        address:"107 Ramakrishna Nagar",
    },
     {
        name:"Motu",
        email:"Motu.patlu@gmail.com",
        phone:8580295988,
        address:"107 Ramakrishna Nagar",
    },
    
    {
        name:"Sushmita",
        email:"Swayam.jeon@gmail.com",
        phone:8580295988,
        address:"107 Lalpur CHowk krishna Nagar Ranchi",
    },
    {
        name:"Khushi",
        email:"Khushi.kumari@gmail.com",
        phone:8580295988,
        address:"107 NISt Pallur Hills Berhampur",
    }
]

app.get("/data",async (req,res)=>{
    const users = await UserModel.find({}); 
    res.send(users);
})

app.post("/data",async (req,res)=>{
    const newUser = new UserModel({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        address:req.body.address,
      });
      await newUser.save();    
    res.send("User Added Successfully")
})

app.delete("/data/:userId", async (req, res, next) => {
    const userId = req.params.userId;
    await UserModel.findByIdAndDelete(userId);
    res.send("User deleted Successfully");
});

app.put("/data/:userId",async(req,res)=>{
    const userId = req.params.userId;
    await UserModel.updateMany({_id:userId},
        {
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        address:req.body.address,
    })
    res.send("User updated Successfylly")
})


app.listen(8080,()=>{
    console.log("server running on port 8080")
})
