var express = require('express');
var router = express.Router();
const userModel=require("./users");
const post1Model=require("./post1");
const post2Model=require("./post2");
const post3Model=require("./post3");
const post4Model=require("./post4");
const post5Model=require("./post5");
const post6Model=require("./post6");
const post7Model=require("./post7");
const passport = require('passport');
const localStrategy = require('passport-local');
const upload=require("./multer");


passport.use(new localStrategy(userModel.authenticate()));

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/Business_register', function(req, res) {
  res.render('Business_register');
});

router.get('/Business_login', function(req, res) {
  res.render('Business_login');
});

router.get('/FrontPage',isLoggedIn, function(req, res) {
  res.render('FrontPage', {footer: false});
});
router.get('/sidemenu',isLoggedIn, function(req, res) {
  res.render('sidemenu');
});
router.get('/Bakery_and_Cakes_Shop',isLoggedIn,async function(req, res) {
  const posts=await post1Model.find().populate("user");
  res.render('Sidemenus/Bakery_and_Cakes_Shop', {posts});
});
router.get('/Mehandi_Artist',isLoggedIn,async function(req, res) {
  const posts=await post3Model.find().populate("user");
  res.render('Sidemenus/Mehandi_Artist', {posts});
});
router.get('/Home_Cooked_Food_Services',isLoggedIn,async function(req, res) {
  const posts=await post2Model.find().populate("user");
  res.render('Sidemenus/Home_Cooked_Food_Services', {posts});
});
router.get('/Photography_Services',isLoggedIn,async function(req, res) {
  const posts=await post4Model.find().populate("user");
  res.render('Sidemenus/Photography_Services', {posts});
});
router.get('/Laundry_Services',isLoggedIn,async function(req, res) {
  const posts=await post5Model.find().populate("user");
  res.render('Sidemenus/Laundry_Services', {posts});
});
router.get('/Tutoring_Services',isLoggedIn,async function(req, res) {
  const posts=await post6Model.find().populate("user");
  res.render('Sidemenus/Tutoring_Services', {posts});
});
router.get('/Plumbing_Services',isLoggedIn,async function(req, res) {
  const posts=await post7Model.find().populate("user");
  res.render('Sidemenus/Plumbing_Services', {posts});
});
router.get('/logout',isLoggedIn,function(req, res,next) {
  res.redirect('/');
});

router.get('/profile',isLoggedIn,async function(req, res) {
  const user = await userModel.findOne({
    username:req.session.passport.user})
    // .populate("posts");
  res.render('profile', {user});
  });

router.get('/edit',isLoggedIn,async function(req, res) {
  const user=await userModel.findOne
  ({username:req.session.passport.user});
  res.render('edit', {user});
});

router.get('/uploadBakers',isLoggedIn,async function(req, res) {
  const user=await userModel.findOne
  ({username:req.session.passport.user});
  res.render('AllUploads/uploadBakers', {user});
});
router.get('/uploadHomeFood',isLoggedIn,async function(req, res) {
  const user=await userModel.findOne
  ({username:req.session.passport.user});
  res.render('AllUploads/uploadHomeFood', {user});
});
router.get('/uploadMehandi',isLoggedIn,async function(req, res) {
  const user=await userModel.findOne
  ({username:req.session.passport.user});
  res.render('AllUploads/uploadMehandi', {user});
});
router.get('/uploadPhotography',isLoggedIn,async function(req, res) {
  const user=await userModel.findOne
  ({username:req.session.passport.user});
  res.render('AllUploads/uploadPhotography', {user});
});
router.get('/uploadLaundry',isLoggedIn,async function(req, res) {
  const user=await userModel.findOne
  ({username:req.session.passport.user});
  res.render('AllUploads/uploadLaundry', {user});
});
router.get('/uploadTutoring',isLoggedIn,async function(req, res) {
  const user=await userModel.findOne
  ({username:req.session.passport.user});
  res.render('AllUploads/uploadTutoring', {user});
});
router.get('/uploadPlumbing',isLoggedIn,async function(req, res) {
  const user=await userModel.findOne
  ({username:req.session.passport.user});
  res.render('AllUploads/uploadPlumbing', {user});
});

router.post("/Business_register",function(req,res,next){
  const userData= new userModel({
    username:req.body.username,
    name:req.body.name,
    email:req.body.email,
  });
  userModel.register(userData,req.body.password)
  .then(function(){
    passport.authenticate("local")(req,res,function(){
      res.redirect("/FrontPage");
    })
  })
});

router.post('/Business_login',passport.authenticate("local",{
  successRedirect:"/FrontPage",
  failureRedirect:"/Business_login"
}), function(req, res) {
  // res.redirect("/FrontPage");
});

router.post("/update",upload.single("image"),async function(req,res){
  const user = await userModel.findOneAndUpdate(
    {username:req.session.passport.user},
    {username:req.body.username,
      name:req.body.name,
      bio:req.body.bio},
    {new:true});
    if(req.file){
      user.profileImage= req.file.filename;
    }
    await user.save();
    res.redirect("/Profile");
});

router.post("/uploadBakers",isLoggedIn,upload.single("image"),async function(req,res){
  const user=await userModel.findOne
  ({username:req.session.passport.user});
  const post =await post1Model.create({
    picture:req.file.filename,
    user:user._id,
    phone:req.body.phone,
    email:req.body.email,
    username:req.body.username,
    name:req.body.name,
    opensUntil:req.body.opensUntil,
    location:req.body.location,
    caption:req.body.caption,
  })
  user.posts.push(post._id);
  await user.save();
  res.redirect("/Bakery_and_Cakes_Shop");
});
router.post("/uploadHomeFood",isLoggedIn,upload.single("image"),async function(req,res){
  const user=await userModel.findOne
  ({username:req.session.passport.user});
  const post =await post2Model.create({
    picture:req.file.filename,
    user:user._id,
    phone:req.body.phone,
    email:req.body.email,
    username:req.body.username,
    name:req.body.name,
    opensUntil:req.body.opensUntil,
    location:req.body.location,
    caption:req.body.caption,
  })
  user.posts.push(post._id);
  await user.save();
  res.redirect("/Home_Cooked_Food_Services");
});
router.post("/uploadMehandi",isLoggedIn,upload.single("image"),async function(req,res){
  const user=await userModel.findOne
  ({username:req.session.passport.user});
  const post =await post3Model.create({
    picture:req.file.filename,
    user:user._id,
    phone:req.body.phone,
    email:req.body.email,
    username:req.body.username,
    name:req.body.name,
    opensUntil:req.body.opensUntil,
    location:req.body.location,
    caption:req.body.caption,
  })
  user.posts.push(post._id);
  await user.save();
  res.redirect("/Mehandi_Artist");
});
router.post("/uploadPhotography",isLoggedIn,upload.single("image"),async function(req,res){
  const user=await userModel.findOne
  ({username:req.session.passport.user});
  const post =await post4Model.create({
    picture:req.file.filename,
    user:user._id,
    phone:req.body.phone,
    email:req.body.email,
    username:req.body.username,
    name:req.body.name,
    opensUntil:req.body.opensUntil,
    location:req.body.location,
    caption:req.body.caption,
  })
  user.posts.push(post._id);
  await user.save();
  res.redirect("/Photography_Services");
});
router.post("/uploadLaundry",isLoggedIn,upload.single("image"),async function(req,res){
  const user=await userModel.findOne
  ({username:req.session.passport.user});
  const post =await post5Model.create({
    picture:req.file.filename,
    user:user._id,
    phone:req.body.phone,
    email:req.body.email,
    username:req.body.username,
    name:req.body.name,
    opensUntil:req.body.opensUntil,
    location:req.body.location,
    caption:req.body.caption,
  })
  user.posts.push(post._id);
  await user.save();
  res.redirect("/Laundry_Services");
});
router.post("/uploadTutoring",isLoggedIn,upload.single("image"),async function(req,res){
  const user=await userModel.findOne
  ({username:req.session.passport.user});
  const post =await post6Model.create({
    picture:req.file.filename,
    user:user._id,
    phone:req.body.phone,
    email:req.body.email,
    username:req.body.username,
    name:req.body.name,
    opensUntil:req.body.opensUntil,
    location:req.body.location,
    caption:req.body.caption,
  })
  user.posts.push(post._id);
  await user.save();
  res.redirect("/Tutoring_Services");
});
router.post("/uploadPlumbing",isLoggedIn,upload.single("image"),async function(req,res){
  const user=await userModel.findOne
  ({username:req.session.passport.user});
  const post =await post7Model.create({
    picture:req.file.filename,
    user:user._id,
    phone:req.body.phone,
    email:req.body.email,
    username:req.body.username,
    name:req.body.name,
    opensUntil:req.body.opensUntil,
    location:req.body.location,
    caption:req.body.caption,
  })
  user.posts.push(post._id);
  await user.save();
  res.redirect("/Plumbing_Services");
});

function isLoggedIn(req,res,next){
  if(req.isAuthenticated())
  return next();
res.redirect("/")
}

module.exports = router;
