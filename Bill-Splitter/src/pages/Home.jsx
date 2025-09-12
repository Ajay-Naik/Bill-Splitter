import { useNavigate } from "react-router-dom";
import Button from "../components/Button.jsx";
import QR from "../assets/QR.png";
import "../styles/Global.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="headings">
        <img src={QR} alt="QR" />
        <h1>Scan. Tap. Split</h1>
        <p>
          Snap the receipt, tap your items, see who owes what.
          No sign-ups, no math, no drama.
        </p>
      </div>

      <div className="buttons">
        <Button
          name={"📷 Scan receipt"}
          color={"#f8f8ff"}
          bg_color={"#d44326"}
          onClick={() => navigate("/scanner")} 
        />

        <Button
          name={"Enter Manually"}
          color={"black"}
          bg_color={"white"}
          onClick={() => navigate("/manual")} 
        />
      </div>
    </div>
  );
}
