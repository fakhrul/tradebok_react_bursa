const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    body: {
      type: String,
    },
    stock: {
      type: Schema.Types.ObjectId,
      ref: 'Stock'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("StockComment", schema);
