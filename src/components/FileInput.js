import React, { useState } from 'react';

const FileInput = ({ onFileSelect, onPreviewClick }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      onFileSelect(selectedFile); // Call the onFileSelect prop with the selected file
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
      setFileName(droppedFile.name);
      onFileSelect(droppedFile); // Call the onFileSelect prop with the dropped file
    }
  };

  return (
    <div className="file-input-container" onDragOver={handleDragOver} onDrop={handleDrop}>
      <input type="file" id="fileInput" className="file-input" onChange={handleFileChange} accept="application/pdf" />
      <label htmlFor="fileInput" className="file-input-label">Choose File</label>
      <span className="file-name">{fileName ? fileName : 'No File Selected'}</span>
      <button className="preview-button" onClick={onPreviewClick} aria-label="Preview PDF">Preview</button>
    </div>
  );
};

export default FileInput;