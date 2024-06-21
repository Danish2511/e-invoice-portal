import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import FileInput from './components/FileInput';
import Panel from './components/Panel';
import Login from './components/Login'; // Import the new Login component

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPanels, setShowPanels] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handlePreviewClick = () => {
    setShowPanels(true);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Header title="Kraft E-Invoice Portal" />
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/home"
          element={
            isAuthenticated ? (
              <>
                <FileInput onFileSelect={handleFileSelect} onPreviewClick={handlePreviewClick} />
                {showPanels && <Panel file={selectedFile} />}
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
