
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const player = new Schema({
    position: String,
    name: String,
    team: String,
    String,
    jerseyNumber: Number,
    wonSuperBowl: Boolean,
  });
  
  module.exports = mongoose.model("Player", player);
