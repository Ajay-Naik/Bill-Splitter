import { useNavigate } from "react-router-dom";
import Button from "../components/Button.jsx";
import Backbutton from "../components/BackButton.jsx";
import "../styles/Global.css";
import "bootstrap/dist/css/bootstrap.min.css";

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
          setTimeout(() => {
            setLoading(false);
            navigate("/person");
          }, 2000);
        }
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [loading, navigate]);

  return (
    <div style={{ textAlign: "center", padding: "20px",minHeight:"1000px" }}>
      <Backbutton onClick={() => navigate("/")} />
      <h2>Scan Receipt</h2>
      <p>Take a photo or upload an image of your receipt</p>

      {/* FileDropZone handles preview */}
      <div style={{ position: "relative", display: "inline-block" }}>
        <FileDropZone onFileSelect={(file) => setImage(file)} />

        {/* Loader + scanning effect overlay */}
        {loading && image && (
          <>
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
                  background: "#d67663ff",
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
                width: "55%",
                transform: "translate(-50%, -50%)",
                color: "#1f1e1eff",
                backgroundColor: "whiteSmoke",
                padding: "10px 20px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Spinner animation="border" size="sm"  variant="danger" />
              <span>{stage}</span>
            </div>
          </>
        )}
      </div>

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
