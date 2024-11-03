// src/App.jsx

import "./App.css";
import DragDropFile from "./DragDropFile";

function App() {
  return (
    <div className="page">
      <h1>Upload de Planilha</h1>
      <DragDropFile allowedExtensions={["pdf", "png", "jpg"]} />
    </div>
  );
}

export default App;
