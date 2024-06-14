import React, { useState } from 'react';

const FileInput = ({ onFileSelect }) => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
            setFileName(selectedFile.name);
        }
    };

    const handlePreviewClick = () => {
        if (file) {
            onFileSelect(file);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        setFile(droppedFile);
        setFileName(droppedFile ? droppedFile.name : 'No File Selected');
    };

    return (
        <div className="file-input-container" onDragOver={handleDragOver} onDrop={handleDrop}>
            <input type="file" id="fileInput" className="file-input" onChange={handleFileChange} accept="application/pdf" />
            <label htmlFor="fileInput" className="file-input-label">Choose File</label>
            <span className="file-name">{fileName ? fileName : 'No File Selected'}</span>
            <button className="preview-button" onClick={handlePreviewClick} aria-label="Preview PDF">Preview</button>
        </div>
    );
}

export default FileInput;
