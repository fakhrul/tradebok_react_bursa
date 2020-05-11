
  const mongoose = require("mongoose");
  const Schema = mongoose.Schema;


  const user = new Schema({
    authId: String,
    avatar: String,
    name: String,
    email: String,
    about: String
  
  })
  module.exports = mongoose.model("User", user);