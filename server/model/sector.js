const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    name: {
      type: String,
    },
    stocks: [{
      type: Schema.Types.ObjectId,
      ref: 'Stock'
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sector", schema);
