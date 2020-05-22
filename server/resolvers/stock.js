import { promisify } from "../helper";
const StockComment = require("../model/stockComment");

const resolvers = {
  stockComments: (stock) => promisify(StockComment.find({stock: stock.id})).then((result) => result)
  
};

module.exports = resolvers;
