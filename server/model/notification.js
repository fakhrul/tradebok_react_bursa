const mongoose = require("mongoose");
const Schema = mongoose.Schema;
import timestamps from 'mongoose-timestamp';

const schema = new Schema({
  resourceId: {
    type: String,
    trim: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  actionUser: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  type: {
    type: String,
    required: true,
  },
}, {timestamps: true});


module.exports = mongoose.model("Notification", schema);
