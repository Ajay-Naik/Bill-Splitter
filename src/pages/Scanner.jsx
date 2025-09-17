import { useNavigate } from "react-router-dom";
import Button from "../components/Button.jsx";
import Backbutton from "../components/BackButton.jsx";
import "../styles/Global.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import FileDropZone from "../components/input.jsx";
import { Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { ReceiptIndianRupee } from "lucide-react";

export default function Scanner() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState("Scanning...");
  const [image, setImage] = useState(null);

  // simulate scanning stages
  useEffect(() => {
    if (loading) {
      const stages = ["Checking tax and tips...", "Looking at receipt..."];
      let i = 0;
      const interval = setInterval(() => {
        setStage(stages[i]);
        i++;
        if (i >= stages.length) {
          clearInterval(interval);
          // simulate finish
          setTimeout(() => {
            setLoading(false);
            navigate("/results"); // go to results page
          }, 2000);
        }
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [loading, navigate]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <Backbutton onClick={() => navigate("/")} />
      <h2>Scan Receipt</h2>
      <p>Take a photo or upload an image of your receipt</p>

      {/* FileDropZone should provide image file */}
      <FileDropZone onFileSelect={(file) => setImage(file)}  />

      <Button
        className={"homeBtn"}
        icon={ReceiptIndianRupee}
        name={"Scrape the bill"}
        color={"#f8f8ff"}
        bg_color={"#d44326"}
        onClick={() => {
          if (image) setLoading(true);
        }}
      />

      {/* Loader + scanning effect */}
      {loading && image && (
        <div style={{ position: "relative", display: "inline-block", marginTop: "20px" }}>
          {/* Image preview */}
          <img
            src={image.preview}
            alt="scanning"
            style={{ maxWidth: "300px", borderRadius: "8px" }}
          />

          {/* scanning line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "4px",
                background: "rgba(0, 255, 0, 0.7)",
                animation: "scan 2s linear infinite",
              }}
            ></div>
          </div>

          {/* Spinner + text */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "white",
              background: "rgba(0,0,0,0.5)",
              padding: "10px 20px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Spinner animation="border" size="sm" />
            <span>{stage}</span>
          </div>
        </div>
      )}

      {/* scanning animation keyframes */}
      <style>
        {`
          @keyframes scan {
            0% { top: 0; }
            100% { top: 100%; }
          }
        `}
      </style>
    </div>
  );
}
