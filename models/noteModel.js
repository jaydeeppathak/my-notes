const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Note title is mandatory"],
        },
        content: {
            type: String,
            required: [true, "Note Content is mandatory"],
        },
        hashtags: {
            type: Array,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model("Note", noteSchema);
