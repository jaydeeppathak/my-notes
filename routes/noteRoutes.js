const express = require("express");
const router = express.Router();
const {
    getNotes,
    getNoteDetails,
    createNote,
    updateNote,
    deleteNote,
} = require("../controllers/noteControllers");
const validateToken = require("../middleware/validateToken");

router.use(validateToken);

router.get("/", validateToken, getNotes);

router.get("/:id", getNoteDetails);

router.post("/", createNote);

router.put("/:id", updateNote);

router.delete("/:id", deleteNote);

module.exports = router;
