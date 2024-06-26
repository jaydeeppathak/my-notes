const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        title: {
            type: String,
            required: [true, "Note title is mandatory"],
        },
        description: {
            type: String,
            required: [true, "Note description is mandatory"],
        },
        hashtags: {
            type: Array,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model("Note", noteSchema);
