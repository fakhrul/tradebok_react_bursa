const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    priceChange: {
      type: String,
    },
    priceChangePercent: {
      type: String,
    },
    priceOpen: {
      type: String,
    },
    volume: {
      type: String,
    },
    priceNow: {
      type: String,
    },
    priceClose: {
      type: String,
    },
    graphSummary: {
      type: String,
    },
    stock: {
      type: Schema.Types.ObjectId,
      ref: "Stock",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Stock", schema);

// priceChange: "-0.030",
// priceChangePercent: "-2.44",
// priceOpen: "1.22",
// volume: "390700",
// priceNow: "1.200",
// priceClose: "1.230",

// rating: "5",
// totalRating: "10",
// ratingRemarks: "Up Trend!",

// upTrend: "1",
// topProfit: "0",
// topRev: "1",
// breakOut: "1",
// dayCount: "2",

// coq: "0",
// ytoy: "0",
// qtoq: "0",

// pe: "73.66",
// dy: "0",
// roe: 3.32,
// profitMargin: 7.64,

// marketSummary: "5.Bull to Bear",

// macdLine: "-0.00126",
// macdSignal: "-0.00215",
// macdSid: 1,
// macdAbove: 0,
// macd: "1",
// macdDayCount: 10,
// macdRemarks: "LDC",

// rsi: "40.83",
// rsiRemarks: "40.83",

// obv: "-1321300.00",
// obv20: "-523750.00",
// obvSid: 0,
// obvRemarks: "Downtrend",

// ma10: "1.224",
// ma60: "1.24",
// ma50: "1.31",
// ma200: "1.234",
// maRemarks: "0.89%",

// tp: "1.536",
// potential: "28.00",

// candleEngulfing: "0",

// bbUp: "3.00",
// bbDown: "3.00",
// bb: 3,
// bbCentrifugal: "-1.40",
// bbDayCount: 2,
// bbRemarks: "2.15% (LB 6d)",
