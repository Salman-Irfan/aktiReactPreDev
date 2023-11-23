import React, { useState, useEffect } from "react";
import getAllNotesApiService from "../services/apiIntegrations/noteApis/getAllNotesApi";
import { useNavigate } from "react-router-dom";
import deleteNoteByIdApi from "../services/apiIntegrations/noteApis/deleteNoteById";
import endPoints from "../constants/endPoints/endPoints";

const MyNotes = () => {
    const navigate = useNavigate();
    const [notes, setNotes] = useState([]);
    const [token, setToken] = useState('');
    // fetch auth token
    useEffect(() => {
        const authToken = localStorage.getItem('authtoken');
        setToken(authToken);
    }, []);

    useEffect(() => {
        // Call the service to fetch the data
        getAllNotesApiService(endPoints.GET_USER_NOTES, token)
            .then((data) => {
                setNotes(data);
            });
    }, [token]); // Add token as a dependency to re-run the effect when the token changes
    // functions
    // function to delete note
    const handleDeleteNote = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this note?");
        if (confirmDelete) {
            const response = await deleteNoteByIdApi(id, endPoints.DELETE_NOTE, token)
            // if note deleted, update the UI
            if (response.Success) {
                setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
            }
            if (response.error) {
                alert(response.error);
            }
        }
    };
    // update function
    const handleUpdateNotePage = (id) => {
        navigate(`/notes/update/${id}`, { state: { from: '/my-notes' } });
    };
    return (
        <div className="container">
            <h1 className="text-center mb-4">My Notes</h1>

            <div className="row">
                {Array.isArray(notes) && notes.length > 0 ? (
                    notes.map((note) => (
                        <div key={note._id} className="col-md-4 mb-4">
                            <div className="card">
                                <div className="card-header bg-primary text-white text-center">
                                    <div className="d-flex">
                                        <img
                                            src={note.userId.profileImage}
                                            className="img-fluid rounded-circle mt-2"
                                            alt="userProfileImage"
                                            width={80}
                                        />
                                        <p className="mt-3 mx-4">{note.userId.firstName}</p>
                                    </div>
                                    <p className="text-warning">{note.userId.email}</p>
                                    <h5 className="card-title m-0 bg-secondary py-2">Title: {note.title}</h5>
                                </div>

                                <div className="card-body bg-warning">
                                    <hr className="my-3" />

                                    <h6 className="card-subtitle mb-2 text-muted">Description</h6>
                                    <p className="card-text">{note.description}</p>

                                    <h6 className="card-subtitle mb-2 text-muted">Tags</h6>
                                    <ul className="list-unstyled">
                                        {note.tags.map((tag) => (
                                            <li key={tag} className="badge badge-info mr-2 text-dark">{tag}</li>
                                        ))}
                                    </ul>

                                    <div className="d-flex justify-content-center">
                                        <button
                                            className="btn btn-danger mx-2"
                                            onClick={() => handleDeleteNote(note._id)}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className="btn btn-success mx-2"
                                            onClick={() => handleUpdateNotePage(note._id)}
                                        >
                                            Update
                                        </button>
                                    </div>
                                </div>

                                <div className="card-footer text-muted text-center">
                                    Date: {new Date(note.date).toDateString()}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No notes available.</p>
                )}
            </div>
        </div>
    );




};

export default MyNotes;
