// this post is for Photography Services
const mongoose=require("mongoose");

const postSchema=mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  },
  picture:String,
  profileImage:String,
  username:String,
  name:String,
  caption:String,
  phone:Number,
  email:String,
  opensUntil:Number,
  location:String,
  date:{
    type:Date,
    default:Date.now
  },
  likes:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
  ]
});

module.exports=mongoose.model("post4",postSchema);