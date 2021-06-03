const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.ObjectId, ref: "user"},
    name: String,
    description: String,
    status: String,
    image: String,
    date: { type: Date,default: Date.now}
});

const Board = mongoose.model("board", boardSchema);

module.exports = Board;