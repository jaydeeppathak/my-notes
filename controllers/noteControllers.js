const asyncHandler = require("express-async-handler");
const Note = require("../models/noteModel");

// @desc all notes
// @route GET /api/notes
// @access private
const getNotes = asyncHandler(async (req, res) =>
    res.status(200).json({ message: "All notes" }),
);

// @desc note
// @route GET /api/notes/:id
// @access private
const getNoteDetails = asyncHandler(async (req, res) =>
    res.status(200).json({ message: `Note details for ${req.params.id}` }),
);

// @desc Create a new note
// @route POST /api/notes/
// @access private
const createNote = asyncHandler(async (req, res) =>
    res.status(200).json({ message: "Create a note" }),
);

// @desc Update a new note
// @route PUT /api/notes/:id
// @access private
const updateNote = asyncHandler(async (req, res) =>
    res
        .status(200)
        .json({ message: `Update note details for ${req.params.id}` }),
);

// @desc Delete a new note
// @route DELETE /api/notes/:id
// @access private
const deleteNote = asyncHandler(async (req, res) =>
    res.status(200).json({ message: `Delete note ${req.params.id}` }),
);

module.exports = {
    getNotes,
    getNoteDetails,
    createNote,
    updateNote,
    deleteNote,
};
