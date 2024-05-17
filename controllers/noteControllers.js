const asyncHandler = require("express-async-handler");
const Note = require("../models/noteModel");

// @desc all notes
// @route GET /api/notes
// @access private
const getNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find();
    res.status(200).json({ success: true, data: notes });
});

// @desc note
// @route GET /api/notes/:id
// @access private
const getNoteDetails = asyncHandler(async (req, res) => {
    const noteId = req.params.id;
    const note = await Note.findOne({ _id: noteId });
    console.log("adasdas :>> ", note);
    if (!note) {
        res.status(404).json({
            success: false,
            message: "Note with given id not found",
        });
    }

    res.status(200).json({ success: true, data: note });
});

// @desc Create a new note
// @route POST /api/notes/
// @access private
const createNote = asyncHandler(async (req, res) => {
    const { title, description, hashtags = [] } = req.body;
    if (!title || !description) {
        res.status(400).json({
            success: false,
            message: "Title and description are mandatory",
        });
    }

    const note = await Note.create({ title, description, hashtags });
    res.status(200).json({ success: true, data: note });
});

// @desc Update a new note
// @route PUT /api/notes/:id
// @access private
const updateNote = asyncHandler(async (req, res) => {
    const noteId = req.params.id;
    const { title, description, hashtags = [] } = req.body;
    const existingNote = await Note.findOne({ _id: noteId });
    if (!existingNote) {
        res.status(404).json({
            success: false,
            message: "Note with given id not found",
        });
    }

    const note = { title, description, hashtags };
    const updatedNote = await Note.findByIdAndUpdate({ _id: noteId }, note, {
        new: true,
    });
    console.log("updatedNote :>> ", updatedNote);
    res.status(200).json({ success: true, data: updatedNote });
});

// @desc Delete a new note
// @route DELETE /api/notes/:id
// @access private
const deleteNote = asyncHandler(async (req, res) => {
    const noteId = req.params.id;

    const existingNote = await Note.findOne({ _id: noteId });
    if (!existingNote) {
        res.status(404).json({
            success: false,
            message: "Note with given id not found",
        });
    }

    const result = await Note.deleteOne({ _id: noteId });
    if (result.acknowledged) {
        res.status(200).json({ success: true, data: existingNote });
    } else {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
});

module.exports = {
    getNotes,
    getNoteDetails,
    createNote,
    updateNote,
    deleteNote,
};
