import React, {useState} from 'react';
import Header from './components/Header';
import Panel from './components/Panel';
import FileInput from './components/FileInput';

const App = () => {
  const [file, setFile] = useState(null);

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
  };

  return (
    <div className="App">
      <Header title="Kraft E-Invoice Portal" />
      <FileInput onFileSelect={handleFileSelect} />
      <Panel file={file} />
    </div>
  );
};

export default App;
