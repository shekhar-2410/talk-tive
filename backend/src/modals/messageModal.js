const moonggoose = require("mongoose");
const Schema = moonggoose.Schema;
const messageSchema = new Schema(
    {
    sender:{ type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, trim: true },
    chat:{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    },
    {
        timestamps: true,
    }

);

const Message = moonggoose.model("Message", messageSchema);
module.exports = Message