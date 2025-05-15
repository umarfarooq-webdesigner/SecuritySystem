const express = require("express");
const router = express.Router();
const PersonalDairy = require("../models/PersonalDairy");

// Get all notes
router.get("/", async (req, res) => {
  try {
    const notes = await PersonalDairy.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: "Error fetching notes" });
  }
});

// Create a new note
router.post("/", async (req, res) => {
  try {
    const { title, note } = req.body;
    if (!title || !note) {
      return res.status(400).json({ error: "Both title and note are required!" });
    }
    const newNote = new PersonalDairy({
      title,
      note,
    });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ error: "Error saving note" });
  }
});

// Edit an existing note
router.put("/:id", async (req, res) => {
  try {
    const { title, note } = req.body;
    if (!title || !note) {
      return res.status(400).json({ error: "Both title and note are required!" });
    }
    const updatedNote = await PersonalDairy.findByIdAndUpdate(
      req.params.id,
      { title, note },
      { new: true }
    );
    if (!updatedNote) return res.status(404).json({ error: "Note not found" });
    res.json(updatedNote);
  } catch (err) {
    res.status(500).json({ error: "Error updating note" });
  }
});

// Delete a note
router.delete("/:id", async (req, res) => {
  try {
    const deletedNote = await PersonalDairy.findByIdAndDelete(req.params.id);
    if (!deletedNote) return res.status(404).json({ error: "Note not found" });
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting note" });
  }
});

// Delete multiple notes
router.post("/delete-multiple", async (req, res) => {
  try {
    const { ids } = req.body;
    const deletedNotes = await PersonalDairy.deleteMany({ _id: { $in: ids } });
    res.json({ message: `${deletedNotes.deletedCount} notes deleted` });
  } catch (err) {
    res.status(500).json({ error: "Error deleting multiple notes" });
  }
});

module.exports = router;
