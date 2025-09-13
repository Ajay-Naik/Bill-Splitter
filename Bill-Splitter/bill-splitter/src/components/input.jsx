import React from "react";
import { useDropzone } from "react-dropzone";
import Camera from "../assets/camera.png"

function FileDropZone() {
  const onDrop = React.useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={{
        border: "none",
        backgroundColor: "#fdf5f5ff",
        borderRadius: "8px",
        padding: "20px",
        margin:"20px 0",
        height:"30rem",
        textAlign: "center",
        cursor: "pointer",
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p style={{textDecoration:"underline"}}>upload receipt</p>
      ) : (
        <div style={{height:"30rem",borderRadius:"4px", backgroundColor:"#eeededff"}}>
            <img src={Camera} alt="Camera" style={{width:"250px", height:"150px", marginTop:"80px"
            }}/>
            <h2 style={{fontWeight:"600"}}>Take a photo </h2><p style={{textDecoration:"underline", marginTop:"-10px"}}>or upload receipt</p></div>
      )}

      <ul>
        {acceptedFiles.map((file) => (
          <li key={file.name}>
            {file.name} - {file.size} bytes
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FileDropZone;
