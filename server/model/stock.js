const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    name: {
      type: String,
    },
    stockComments: [{
      type: Schema.Types.ObjectId,
      ref: 'StockComment'
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Stock", schema);
