import React, { useState, useEffect } from "react";
import getAllNotesApiService from "../services/apiIntegrations/noteApis/getAllNotesApi";
import EditNote from "../views/EditNote";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import deleteNoteByIdApi from "../services/apiIntegrations/noteApis/deleteNoteById";
import updateNoteByIdApiService from "../services/apiIntegrations/noteApis/updateNoteByIdApi";

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editedNote, setEditedNote] = useState(null);

    useEffect(() => {
        // Call the service to fetch the data
        getAllNotesApiService()
            .then((data) => {
                setNotes(data);
            })
    }, []);

    // Function to handle note deletion with confirmation dialog
    const handleDeleteNote = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this note?");
        if (confirmDelete) {
            deleteNoteByIdApi(id)
                .then(() => {
                    // After successful deletion, remove the note from the state
                    setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
                })
                .catch((error) => {
                    console.error("Error deleting note:", error);
                });
        }
    };

    // Function to handle edit button click
    const handleEditNoteModal = (note) => {
        setEditedNote(note);
        setIsEditing(true);
    };

    // Log updated value of isEditing when it changes
    useEffect(() => {
        // Your logic here
    }, [isEditing]);

    // function to save updated note
    const handleSaveUpdatedNote = (updatedNote) => {
        // Handle saving the updated note
        // console.log(updatedNote._id)
        // console.log("Save note:", updatedNote);
        // integrate this api
        // make axios.put request to the specified url
        // setIsEditing(false);
        // setEditedNote(null);
        // ################################
        // Handle saving the updated note
        // const url = `http://localhost:8000/api/v1/notes/${updatedNote._id}`; // Replace with your API endpoint

        // axios
        //     .put(url, updatedNote) // Send a PUT request to update the note
        //     .then((response) => {
        //         console.log("Note updated successfully");
        //         // You can handle any success behavior here, e.g., show a success message
        //         setIsEditing(false);
        //         setEditedNote(null);
        //     })
        //     .catch((error) => {
        //         console.error("Error updating note:", error);
        //         // Handle errors, e.g., show an error message
        //     });
        const response = updateNoteByIdApiService(updatedNote._id, updatedNote);
        setIsEditing(false);
        setEditedNote(null);
    };

    // function to cancel edit modal
    const handleCancelEditModal = () => {
        setIsEditing(false);
        setEditedNote(null);
    }

    // update page
    const navigate = useNavigate();
    const handleUpdateNotePage = (id) => {
        navigate(`/notes/update/${id}`);
    };
    return (
        // edit modal
        <div className="container">
            <h1>Notes</h1>
            {isEditing && (
                <EditNote
                    note={editedNote}
                    onSave={handleSaveUpdatedNote}
                    onCancel={handleCancelEditModal}
                />
            )}

            {/* all notes */}
            <div className="row">
                {notes.map((note) => (
                    <div key={note._id} className="col-md-4">
                        <div className="card mb-4">
                            <div className="card-body">
                                <div className="card-title bg-primary text-white text-center">
                                    <p className="card-text">{note.title}</p>
                                </div>

                                <h5 className="card-title">Description</h5>
                                <p className="card-text">{note.description}</p>

                                <h5 className="card-title">Tags</h5>
                                <ul className="list-unstyled">
                                    {note.tags.map((tag) => (
                                        <li key={tag}>{tag}</li>
                                    ))}
                                </ul>

                                {/* Display user's details (firstName and email) */}
                                <h5 className="card-title">User Details</h5>
                                <p className="card-text">
                                    <strong>Name:</strong> {note.userId.firstName}
                                </p>
                                <p className="card-text">
                                    <strong>Email:</strong> {note.userId.email}
                                </p>
                                <p className="card-text">
                                    <strong>Profile Image:</strong> 
                                    <img src={note.userId.profileImage} width={100} alt="" srcset="" />
                                    
                                </p>

                                {/* update / delete buttons with confirmation dialog */}
                                <div className="d-flex justify-content-center">
                                    {/* first integrate this api */}
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleEditNoteModal(note)} // Pass the note to handleEditNote
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDeleteNote(note._id)}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => handleUpdateNotePage(note._id)}
                                    >
                                        Update in a separate page
                                    </button>
                                </div>
                            </div>
                            <div className="card-footer text-muted">
                                Date: {new Date(note.date).toDateString()}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notes;
