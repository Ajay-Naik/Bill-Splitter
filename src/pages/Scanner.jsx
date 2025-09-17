import { useNavigate } from "react-router-dom";
import Button from "../components/Button.jsx";
import Backbutton from "../components/BackButton.jsx";
import "../styles/Global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Tesseract from "tesseract.js";

import FileDropZone from "../components/input.jsx";
import { Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { ReceiptIndianRupee } from "lucide-react";

async function analyzeBill(ocrText) {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`, // .env key
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that extracts structured data from receipts."
          },
          {
            role: "user",
            content: `
            Here is the receipt text:
            ${ocrText}

            Extract the data in JSON with keys:
            items (array of {name, price, quantity, rate}),
            tax,
            tip,
            total.
            Only return JSON, no extra text.
            `
          }
        ],
      }),
    });

    const result = await response.json();

    // Step 1: Get raw content from assistant
    let rawContent = result?.choices?.[0]?.message?.content;
    if (!rawContent) {
      console.warn("No content returned from OpenRouter.");
      return null;
    }

    // Step 2: Remove Markdown code blocks if present
    rawContent = rawContent.replace(/```json|```/g, "").trim();

    // Step 3: Parse JSON safely
    try {
      return JSON.parse(rawContent);
    } catch (err) {
      console.warn("Failed to parse JSON from OpenRouter response.");
      console.log("Raw content:", rawContent);
      return null; // fallback
    }
  } catch (err) {
    console.error("Error calling OpenRouter:", err);
    return null;
  }
}



export default function Scanner() {
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState("Scanning...");
  const [image, setImage] = useState(null);

 // 🔹 Extract text from image
  async function extractText(file) {
    setStage("Running OCR...");
    const { data: { text } } = await Tesseract.recognize(file, "eng");
    return text;
  }

  // 🔹 Full scan flow
  const handleScan = async () => {
    if (!image) return;
    setLoading(true);

    try {
      // Step 1: OCR
      const text = await extractText(image.preview);

      // Step 2: Send to LLaMA
      setStage("Analyzing with LLaMA...");
      const structured = await analyzeBill(text);

      if (structured) {
        // Step 3: Save to localStorage
        localStorage.setItem("billData", JSON.stringify(structured));

        // Step 4: Navigate to person page
        navigate("/person");
      } else {
        setStage("Error extracting data.");
      }
    } catch (err) {
      console.error(err);
      setStage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };


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
        onClick={handleScan}
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
