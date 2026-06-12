// Scanner.jsx
import { useNavigate } from "react-router-dom";
import Button from "../components/Button.jsx";
import Backbutton from "../components/BackButton.jsx";
import "../styles/Global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Tesseract from "tesseract.js";
import FileDropZone from "../components/input.jsx";
import { Spinner } from "react-bootstrap";
import { useState } from "react";
import { ReceiptIndianRupee } from "lucide-react";
import dedent from "dedent";

// AI schema prompt
const systemPrompt = dedent`
  You are an expert at extracting information from receipts.

  Your task:
  1. Analyze the receipt image provided
  2. Extract all relevant billing information
  3. Format the data in a structured way

  Guidelines for extraction:
  - Identify the restaurant/business name if available otherwise return null
  - Find the receipt date or return null, format YYYY-MM-DD
  - For each line item, extract:
    - name: the item description
    - quantity: the numeric quantity/qty for that line (if not shown, use 1)
    - rate: the per-unit rate/price for that line
  - Do NOT calculate or return a total/value field yourself — quantity and rate alone are enough, the app will compute the total
  - Capture tax amount (money, not percentage)
  - Identify tips (money, pick medium if multiple)
  - Ensure all numerical values are accurate
  - Convert all numbers to plain decimal numbers (no currency symbols, no commas)
`;

// Function to call AI and get structured data
async function analyzeBill(ocrText) {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${systemPrompt}\n\nExtract JSON from this receipt text:\n${ocrText}\n
                  JSON format: {
                    billItems: [{name, quantity, rate}],
                    tax,
                    tip
                  } Only return JSON.`,
                },
              ],
            },
          ],
        }),
      }
    );

    const result = await response.json();
    let rawContent = result?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    rawContent = rawContent.replace(/```json|```/g, "").trim();

    try {
      const parsed = JSON.parse(rawContent);

      parsed.billItems = (parsed.billItems || [])
        .filter(item => {
          const name = (item.name || "").toLowerCase();
          return !["total", "subtotal", "tax", "tip", "grand total"].some(keyword => name.includes(keyword));
        })
        .map((item, index) => {
          const quantity = parseFloat(item.quantity) || 1;
          const rate = parseFloat(item.rate?.toString().replace(/[^0-9.]/g, "")) || 0;
          return {
            name: item.name,
            id: `item-${index}`,
            quantity,
            rate,
            price: Math.round(quantity * rate * 100) / 100,
          };
        });

      parsed.tax = parseFloat(parsed.tax || 0);
      parsed.tip = parseFloat(parsed.tip || 0);

      return parsed;
    } catch (err) {
      console.warn("Failed to parse Gemini JSON:", rawContent);
      return null;
    }
  } catch (err) {
    console.error("Error calling Gemini:", err);
    return null;
  }
}

// OCR function with whitelist for digits and preprocessing
async function extractText(file) {
  const { data: { text } } = await Tesseract.recognize(file, "eng", {
    logger: (m) => console.log(m),
  });
  return text;
}

export default function Scanner() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState("Scanning...");
  const [image, setImage] = useState(null);

  const handleScan = async () => {
    if (!image) return;
    setLoading(true);

    try {
      setStage("Extracting text...");
      const text = await extractText(image.preview);

      setStage("Analyzing receipt...");
      const structured = await analyzeBill(text);

      if (structured) {
        localStorage.setItem("billData", JSON.stringify(structured));
        navigate("/person", { state: { items: structured.billItems, tax: structured.tax, tip: structured.tip } });
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

  return (
    <div style={{ textAlign: "center", padding: "20px", minHeight: "1000px" }}>
      <Backbutton onClick={() => navigate("/")} />
      <h2>Scan Receipt</h2>
      <p>Take a photo or upload an image of your receipt</p>

      <div style={{ position: "relative", display: "inline-block" }}>
        <FileDropZone onFileSelect={(file) => setImage(file)} />

        {loading && image && (
          <>
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
              <Spinner animation="border" size="sm" variant="danger" />
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
