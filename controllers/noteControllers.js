const asyncHandler = require("express-async-handler");
const Note = require("../models/noteModel");
const checkIfIdIsValid = require("../helpers/utils");

// @desc all notes
// @route GET /api/notes
// @access private
const getNotes = asyncHandler(async (req, res) => {
    console.log("req.user :>> ", req.user);
    const notes = await Note.find({ userId: req.user.id });
    res.sendSuccess(notes);
});

// @desc note
// @route GET /api/notes/:id
// @access private
const getNoteDetails = asyncHandler(async (req, res) => {
    const noteId = req.params.id;

    if (!checkIfIdIsValid(noteId)) {
        res.status(401).json({
            success: false,
            message: "Note with given id not found",
        });
        const error = new Error("Note with given id not found");
        res.sendError(error, 401);
        return;
    }

    const note = await Note.findOne({ _id: noteId, userId: req.user.id });
    if (!note) {
        const error = new Error("Note with given id not found");
        res.sendError(error, 404);
        return;
    }

    res.sendSuccess(note);
});

// @desc Create a new note
// @route POST /api/notes/
// @access private
const createNote = asyncHandler(async (req, res) => {
    const { title, description, hashtags = [] } = req.body;
    if (!title || !description) {
        const error = new Error("Title and description are mandatory");
        res.sendError(error, 400);
        return;
    }

    const note = await Note.create({
        title,
        description,
        hashtags,
        userId: req.user.id,
    });
    res.sendSuccess(note, "Note created successfully");
});

// @desc Update a new note
// @route PUT /api/notes/:id
// @access private
const updateNote = asyncHandler(async (req, res) => {
    const noteId = req.params.id;

    if (!checkIfIdIsValid(noteId)) {
        const error = new Error("Note with given id not found");
        res.sendError(error, 401);
        return;
    }

    const { title, description, hashtags = [] } = req.body;
    const existingNote = await Note.findOne({
        _id: noteId,
        userId: req.user.id,
    });
    if (!existingNote) {
        const error = new Error("Note with given id not found");
        res.sendError(error, 404);
        return;
    }

    const note = { title, description, hashtags, userId: req.user.id };
    const updatedNote = await Note.findByIdAndUpdate({ _id: noteId }, note, {
        new: true,
    });
    res.sendSuccess(updatedNote, "Note updated successfully");
});

// @desc Delete a new note
// @route DELETE /api/notes/:id
// @access private
const deleteNote = asyncHandler(async (req, res) => {
    const noteId = req.params.id;

    if (!checkIfIdIsValid(noteId)) {
        const error = new Error("Note with given id not found");
        res.sendError(error, 401);
        return;
    }

    const existingNote = await Note.findOne({
        _id: noteId,
        userId: req.user.id,
    });
    if (!existingNote) {
        const error = new Error("Note with given id not found");
        res.sendError(error, 404);
        return;
    }

    const result = await Note.deleteOne({ _id: noteId, userId: req.user.id });
    if (result.acknowledged) {
        res.status(200).json({ success: true, data: existingNote });
        res.sendSuccess(existingNote);
    } else {
        const error = new Error("Something went wrong");
        res.sendError(error, 500);
        return;
    }
});

module.exports = {
    getNotes,
    getNoteDetails,
    createNote,
    updateNote,
    deleteNote,
};
