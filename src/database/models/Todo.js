const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    title: String,
    desc: String,
    isComplete: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports =  mongoose.model('Todo', TodoSchema);