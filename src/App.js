import React, { useState } from 'react';
import Header from './components/Header';
import Panel from './components/Panel';
import FileInput from './components/FileInput';
import './index.css';

const App = () => {
  const [file, setFile] = useState(null);
  const [showPanels, setShowPanels] = useState(false);

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setShowPanels(false); // Hide panels when a new file is selected
  };

  const handlePreviewClick = () => {
    if (file) {
      setShowPanels(true); // Show panels when Preview button is clicked
    }
  };

  return (
    <div className="App">
      <Header title="Kraft E-Invoice Portal" />
      <FileInput onFileSelect={handleFileSelect} onPreviewClick={handlePreviewClick} />
      {showPanels && <Panel file={file} />}
    </div>
  );
};

export default App;
