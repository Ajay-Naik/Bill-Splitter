import React from "react";
import { useDropzone } from "react-dropzone";
import Camera from "../assets/camera.png"

function FileDropZone() {
 const [previews, setPreviews] = React.useState([]);

  const onDrop = React.useCallback((acceptedFiles) => {
    // Convert dropped files into objects with preview URLs
    const mapped = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setPreviews(mapped);

    // Optional: log to check
    console.log(mapped);
  }, []);
   const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [] // only allow images
    },
  });

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

       {/* Show list of files */}
      <ul>
        {previews.map((file) => (
          <li key={file.name}>
            {file.name} - {file.size} bytes
          </li>
        ))}
      </ul>

      {/* Show image previews */}
      <div>
        {previews.map((file) => (
          <img
            key={file.name}
            src={file.preview}
            alt={file.name}
            style={{ width: "250px", marginTop: "10px", borderRadius: "8px" }}
          />
        ))}
      </div>
    </div>
  );
}

export default FileDropZone;
