import React, { useState, useRef, useEffect } from "react";

const EditNote = ({ note, onSave, onCancel }) => {
    const [editedTitle, setEditedTitle] = useState(note.title);
    const [editedDescription, setEditedDescription] = useState(note.description);

    const titleInputRef = useRef(null); // Create a ref for the title input

    useEffect(() => {
        // Focus the title input when the component mounts
        titleInputRef.current.focus();
    }, []);

    const handleSave = () => {
        const updatedNote = {
            ...note,
            title: editedTitle,
            description: editedDescription,
        };

        onSave(updatedNote);
    };

    return (
        <div className="edit-note">
            <h2>Edit Note</h2>
            <input
                type="text"
                placeholder="Title"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                ref={titleInputRef} // Attach the ref to focus on this input
            />
            <textarea
                placeholder="Description"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default EditNote;
