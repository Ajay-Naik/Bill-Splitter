import React from "react";
import { useDropzone } from "react-dropzone";
import Camera from "../assets/camera.png";

function FileDropZone({ onFileSelect }) {   // accept prop
  const [previews, setPreviews] = React.useState([]);

  const onDrop = React.useCallback((acceptedFiles) => {
    const mapped = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setPreviews(mapped);

    // pass the first file back to Scanner.jsx
    if (onFileSelect) {
      onFileSelect(mapped[0]);   // ✅ now Scanner gets the image
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
  });

  // cleanup for object URLs
  React.useEffect(() => {
    return () => previews.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [previews]);

  return (
    <div
      {...getRootProps()}
      style={{
        border: "none",
        backgroundColor: "	#E5E4E2",
        borderRadius: "8px",
        padding: "20px",
        // margin: "20px 0",
        textAlign: "center",
        cursor: "pointer",
      }}>
      <input {...getInputProps()} />

      {isDragActive && (
        <p style={{ textDecoration: "underline" }}>Upload receipt</p>
      )}

      {previews.length === 0 ? (
        <div style={{ borderRadius: "4px",        border:"1px dotted #36454F",
 }}>
          <img
            src={Camera}
            alt="Camera"
            style={{ width: "250px", height: "150px", marginTop: "80px" }}
          />
          <h2 style={{ fontWeight: "600" }}>Take a photo</h2>
          <p
            style={{
              textDecoration: "underline",
              marginTop: "-10px",
              paddingBottom: "50px",
            }}>
            or upload receipt
          </p>
        </div>
      ) : (
        <div style={{ marginTop: "10px" }}>
          {previews.map((file) => (
            <img
              key={file.name}
              src={file.preview}
              alt={file.name}
              style={{
                maxWidth: "100%",
                height: "auto",
                marginTop: "20px",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FileDropZone;
