// src/DragDropFile.jsx
import { useState, useRef } from "react";
import PropTypes from "prop-types";

// Componente principal de upload com drag & drop
function DragDropFile({ allowedExtensions = ["pdf", "png", "css"] }) {
  const [dragActive, setDragActive] = useState(false);
  const [fileList, setFileList] = useState([]); // Estado para armazenar a lista de arquivos
  const inputRef = useRef(null);

  // Função para validar e adicionar arquivos à lista
  const handleFile = (files) => {
    const validFiles = Array.from(files).filter((file) => {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        alert(`Extensão .${fileExtension} não é permitida.`);
        return false;
      }
      return true;
    });

    // Atualiza a lista de arquivos com os arquivos válidos
    setFileList((prevList) => [...prevList, ...validFiles]);
  };

  // Eventos de arrastar e soltar
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  // Evento ao soltar o arquivo na área de drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files);
    }
  };

  // Evento ao selecionar o arquivo pelo input
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files);
    }
  };

  // Abrir o seletor de arquivos ao clicar no botão
  const onButtonClick = () => {
    inputRef.current.click();
  };

  // Remover arquivo da lista
  const fileRemove = (file) => {
    setFileList((prevList) => prevList.filter((item) => item !== file));
  };

  return (
    <form
      id="form-file-upload"
      onDragEnter={handleDrag}
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        ref={inputRef}
        type="file"
        id="input-file-upload"
        multiple
        onChange={handleChange}
      />
      <label
        id="label-file-upload"
        htmlFor="input-file-upload"
        className={dragActive ? "drag-active" : ""}
      >
        <div>
          <p>Arraste seu arquivo aqui ou </p>
          <button className="upload-button" onClick={onButtonClick}>
            Clique para escolher no repositório.
          </button>
        </div>
      </label>
      {dragActive && (
        <div
          id="drag-file-element"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        ></div>
      )}

      {/* Pré-visualização dos arquivos prontos para upload */}
      {fileList.length > 0 && (
        <div className="drop-file-preview">
          <p className="drop-file-preview__title">Pronto para upload</p>
          {fileList.map((item, index) => (
            <div key={index} className="drop-file-preview__item">
              <div className="drop-file-preview__item__info">
                <p>{item.name}</p>
                <p>{item.size}B</p>
              </div>
              <span
                className="drop-file-preview__item__del"
                onClick={() => fileRemove(item)}
              >
                x
              </span>
            </div>
          ))}
        </div>
      )}
    </form>
  );
}

DragDropFile.propTypes = {
  allowedExtensions: PropTypes.arrayOf(PropTypes.string),
};

export default DragDropFile;
