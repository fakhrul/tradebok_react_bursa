const mongoose = require("mongoose");
const Schema = mongoose.Schema;
import timestamps from "mongoose-timestamp";

const schema = new Schema(
    {
        participants: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }],
        messages: [{
            type: Schema.Types.ObjectId,
            ref: "Message"
        }]
    },
    { timestamps: true }
);

module.exports = mongoose.model("Chat", schema);
