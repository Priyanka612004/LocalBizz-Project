const mongoose=require("mongoose");
const plm =require("passport-local-mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/LocalBizz");

const userSchema=mongoose.Schema({
  username:String,
  name:String,
  email:String,
  password:String,
  profileImage:String,
  bio:String,
  posts:[{type:mongoose.Schema.Types.ObjectId, ref:"post1"}],
  posts:[{type:mongoose.Schema.Types.ObjectId, ref:"post2"}],
  posts:[{type:mongoose.Schema.Types.ObjectId, ref:"post3"}],
  posts:[{type:mongoose.Schema.Types.ObjectId, ref:"post4"}],
  posts:[{type:mongoose.Schema.Types.ObjectId, ref:"post5"}],
  posts:[{type:mongoose.Schema.Types.ObjectId, ref:"post6"}],
  posts:[{type:mongoose.Schema.Types.ObjectId, ref:"post7"}],
});
userSchema.plugin(plm);

module.exports=mongoose.model("user",userSchema);