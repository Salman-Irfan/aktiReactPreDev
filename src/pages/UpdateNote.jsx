import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import { useNavigate, useParams } from 'react-router-dom';
import updateNoteByIdApiService from "../services/apiIntegrations/noteApis/updateNoteByIdApi";

const UpdateNote = () => {
    const navigate = useNavigate()
    const { noteId } = useParams();
    const [note, setNote] = useState({
        title: "",
        description: "",
        tags: [],
        newTag: ""
    });

    const [token, setToken] = useState('');
    // fetch auth token
    useEffect(() => {
        const authToken = (localStorage.getItem('authtoken'))
        setToken(authToken);
    }, [])


    useEffect(() => {
        // Fetch the note details for the given noteId and populate the fields
        fetchNoteDetails(noteId);
    }, [noteId]);

    const fetchNoteDetails = (noteId) => {
        // Make an API request to get note details
        axios.get(`http://localhost:8000/api/v1/note/${noteId}`)
            .then((response) => {
                const noteDetails = response.data; // Assuming the API response structure matches the note object
                setNote({
                    title: noteDetails.title,
                    description: noteDetails.description,
                    tags: noteDetails.tags,
                    newTag: ""
                });
            })
            .catch((error) => {
                console.error("Error fetching note details:", error);
            });
    };

    const handleTitleChange = (e) => {
        setNote({ ...note, title: e.target.value });
    };

    const handleDescriptionChange = (e) => {
        setNote({ ...note, description: e.target.value });
    };

    const handleTagChange = (e) => {
        setNote({ ...note, newTag: e.target.value });
    };

    const handleAddTag = () => {
        if (note.newTag) {
            setNote({
                ...note,
                tags: [...note.tags, note.newTag],
                newTag: ""
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Create an object with the updated note data
        const updatedNoteData = {
            title: note.title,
            description: note.description,
            tags: note.tags,
        };

        try {
            const response = await updateNoteByIdApiService(noteId, updatedNoteData, token);
            
            if (response.error) {
                alert(response.error);
            }else{
                alert('note updated successfully')
                navigate('/notes')
            }
        } catch (error) {
            // Handle any errors that occur during the request
            console.error("An error occurred:", error);
        }
    };

    return (
        <>
            <div className="container py-4 px-4 my-4 bg-dark text-white">
                <form onSubmit={handleSubmit}>
                    <h4 className="text-center text-warning">Update Note</h4>
                    {/* title */}
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            placeholder="Title"
                            name="title"
                            value={note.title}
                            onChange={handleTitleChange}
                            required
                        />
                    </div>
                    {/* description */}
                    <div className="mb-3">
                        <textarea
                            className="form-control"
                            id="description"
                            rows={3}
                            placeholder="Description"
                            name="description"
                            value={note.description}
                            onChange={handleDescriptionChange}
                            required
                        />
                    </div>
                    {/* tags */}
                    <div className="mb-3 input-group">
                        <input
                            type="text"
                            className="form-control"
                            id="tags"
                            placeholder="Tags"
                            name="tags"
                            value={note.newTag}
                            onChange={handleTagChange}
                        />
                        <button className="btn btn-outline-primary" type="button" onClick={handleAddTag}>
                            Add Tag
                        </button>
                    </div>
                    {/* Display added tags */}
                    <div>
                        Tags:
                        <ul>
                            {note.tags.map((tag, index) => (
                                <li key={index}>{tag}</li>
                            ))}
                        </ul>
                    </div>
                    {/* submit button */}
                    <div className="mb-3 text-center">
                        <button className="btn btn-primary form-control" type="submit">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default UpdateNote;
