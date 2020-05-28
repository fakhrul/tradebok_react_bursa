const mongoose = require("mongoose");
const Schema = mongoose.Schema;
import timestamps from "mongoose-timestamp";

const schema = new Schema(
    {
        type: {
            type: String
        },
        asset: {
            type: String
        },
        body: {
            type: String
        },
        seen: {
            type: Boolean
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        chat: {
            type: Schema.Types.ObjectId,
            ref: "Chat"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Message", schema);
