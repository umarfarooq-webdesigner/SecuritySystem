import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import LinksNavbar from "../../../components/LinksNavbar/LinksNavbar";
import "./PersonalDiary.css";

const PersonalDiary = () => {
  const [notes, setNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [editId, setEditId] = useState(null);
  const [selectedNotes, setSelectedNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:5002/api/diary");
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  const handleAddNote = async () => {
    if (!title || !note) {
      alert("Both title and note are required!");
      return;
    }

    try {
      if (editId) {
        await axios.put(`http://localhost:5002/api/diary/${editId}`, { title, note });
      } else {
        await axios.post("http://localhost:5002/api/diary", { title, note });
      }
      fetchNotes();
      resetForm();
    } catch (err) {
      console.error("Error saving note:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5002/api/diary/${id}`);
      fetchNotes();
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  const handleDeleteMultiple = async () => {
    try {
      await axios.post("http://localhost:5002/api/diary/delete-multiple", { ids: selectedNotes });
      setSelectedNotes([]);
      fetchNotes();
    } catch (err) {
      console.error("Error deleting multiple notes:", err);
    }
  };

  const handleEdit = (note) => {
    setTitle(note.title);
    setNote(note.note);
    setEditId(note._id);
    setShowForm(true);
  };

  const resetForm = () => {
    setTitle("");
    setNote("");
    setEditId(null);
    setShowForm(false);
  };

  const toggleSelection = (id) => {
    setSelectedNotes((prev) =>
      prev.includes(id) ? prev.filter((noteId) => noteId !== id) : [...prev, id]
    );
  };

  return (
    <div className="diary-container">
      <LinksNavbar />
      <div className="diary-scroll-wrapper">
      <div className="diary-content">
        <h1 className="diary-title">Personal Diary</h1>

        <div className="add-button-container">
          <button className="btn btn-add animated" onClick={() => setShowForm(true)}>
            <FaPlus style={{ marginRight: "5px" }} /> Add Note
          </button>
          {selectedNotes.length > 0 && (
            <button className="btn btn-delete animated" onClick={handleDeleteMultiple}>
              <FaTrash style={{ marginRight: "5px" }} /> Delete Selected
            </button>
          )}
        </div>

        {showForm && (
          <div className="note-form animated">
            <input
              type="text"
              className="input"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="textarea"
              placeholder="Your note..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
            <div className="form-buttons">
              <button className="btn btn-add animated" onClick={handleAddNote}>
                {editId ? "Update" : "Save"}
              </button>
              <button className="btn btn-cancel animated" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="notes-list">
          {notes.map((note) => (
            <div key={note._id} className="note-card animated">
              <input
                type="checkbox"
                className="note-checkbox"
                checked={selectedNotes.includes(note._id)}
                onChange={() => toggleSelection(note._id)}
              />
              <div className="note-content">
                <div className="note-title">{note.title}</div>
                <div className="note-text">{note.note}</div>
                <div className="note-timestamp">
                  {new Date(note.timestamp).toLocaleString()}
                </div>
              </div>
              <div className="note-actions">
                <button className="btn-icon animated" onClick={() => handleEdit(note)}>
                  <FaEdit />
                </button>
                <button
                  className="btn-icon btn-icon-danger animated"
                  onClick={() => handleDelete(note._id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default PersonalDiary;
