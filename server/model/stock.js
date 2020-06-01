const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    name: {
      type: String,
    },
    country: {
      type: String,
    },
    fullName: {
      type: String,
    },
    logo: {
      type: String,
    },
    code: {
      type: String,
    },
    isShariah: {
      type: Boolean,
    },
    mainSector: {
      type: Schema.Types.ObjectId,
      ref: 'Sector'
    },
    analysis: [{
      type: Schema.Types.ObjectId,
      ref: 'Analysis'
    }],
    stockComments: [{
      type: Schema.Types.ObjectId,
      ref: 'StockComment'
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Stock", schema);
