import React, { useState, useEffect } from "react";
import getAllNotesApiService from "../services/apiIntegrations/noteApis/getAllNotesApi";

import { useNavigate } from "react-router-dom";

import deleteNoteByIdApi from "../services/apiIntegrations/noteApis/deleteNoteById";
import endPoints from "../constants/endPoints/endPoints";

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [token, setToken] = useState('');
    // fetch auth token
    useEffect(() => {
        const authToken = (localStorage.getItem('authtoken'))
        setToken(authToken);
    }, [])

    useEffect(() => {
        // Call the service to fetch the data
        getAllNotesApiService(endPoints.GET_ALL_NOTES)
            .then((data) => {
                setNotes(data);
            })
    }, []);

    // Function to handle note deletion with confirmation dialog
    const handleDeleteNote = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this note?");
        if (confirmDelete) {
            const response = await deleteNoteByIdApi(id, endPoints.DELETE_NOTE ,token)
            // if note deleted, update the UI
            if (response.Success) {
                setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
            }
            if (response.error) {
                alert(response.error);
            }
        }
    };


    // update page
    const navigate = useNavigate();
    const handleUpdateNotePage = (id) => {
        navigate(`/notes/update/${id}`, { state: { from: '/notes' } });
    };
    return (
        // edit modal
        <div className="container">
            <h1>Notes</h1>


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

                                {/* Display user's details (firstName, email and profilePicture) */}
                                <h5 className="card-title">User Details</h5>
                                <p className="card-text">
                                    <strong>Name:</strong> {note.userId.firstName}
                                </p>
                                <p className="card-text">
                                    <strong>Email:</strong> {note.userId.email}
                                </p>
                                <p className="card-text">
                                    <strong>Profile Image:</strong>
                                    <img src={note.userId.profileImage} width={100} alt="" srcSet="" />

                                </p>

                                {/* update / delete buttons  */}
                                <div className="d-flex justify-content-center">
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDeleteNote(note._id)}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className="btn btn-success mx-4"
                                        onClick={() => handleUpdateNotePage(note._id)}
                                    >
                                        Update
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
