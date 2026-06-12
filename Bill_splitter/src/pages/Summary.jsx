import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Backbutton from "../components/BackButton.jsx";
import Button from "../components/Button.jsx";
import { House, Files } from "lucide-react";

export default function Summary() {
  const navigate = useNavigate();
  const location = useLocation();

  const [people, setPeople] = useState([]);
  const [items, setItems] = useState([]);
  const [tax, setTax] = useState(0);
  const [tip, setTip] = useState(0);
  const [assignments, setAssignments] = useState({});
  const [splitMode, setSplitMode] = useState("evenly");

  // ✅ Load scanned bill OR manual data
  useEffect(() => {
    const data = localStorage.getItem("billData");
    if (data) {
      const parsed = JSON.parse(data);
      setItems(parsed.items || []);
      setTax(parsed.tax || 0);
      setTip(parsed.tip || 0);
    }
    if (location.state) {
      setPeople(location.state.people || []);
      setItems(location.state.items || []);
      setTax(location.state.tax || 0);
      setTip(location.state.tip || 0);
      setAssignments(location.state.assignments || {});
      setSplitMode(location.state.splitMode || "evenly");
    }
  }, [location.state]);

  // Helper to calculate extras
  const subtotal = items.reduce(
    (sum, it) => sum + (parseFloat(it.price) || 0),
    0
  );

  // tax/tip may be numbers or { type, amount }
  const calcExtra = (data) => {
    if (!data) return 0;
    if (typeof data === "object" && data.amount !== undefined) {
      return data.type === "%"
        ? (subtotal * data.amount) / 100
        : data.amount;
    }
    return parseFloat(data) || 0;
  };

  const taxValue = calcExtra(tax);
  const tipValue = calcExtra(tip);
  const extraTotal = taxValue + tipValue;
  const grandTotal = subtotal + extraTotal;

  // Totals per person
  const totals = {};
  people.forEach((p) => (totals[p.id] = 0));

  if (splitMode === "items") {
    // Split based on assignments
    items.forEach((item, index) => {
      const assigned = assignments[item.id || index] || [];
      if (assigned.length > 0) {
        const share = (parseFloat(item.price) || 0) / assigned.length;
        assigned.forEach((pid) => {
          totals[pid] += share;
        });
      }
    });
  } else {
    // Split evenly
    const share = subtotal / (people.length || 1);
    people.forEach((p) => {
      totals[p.id] += share;
    });
  }

  // Split extras evenly
  const splitExtras = extraTotal / (people.length || 1);
  people.forEach((p) => {
    totals[p.id] += splitExtras;
  });

  const handleShare = () => {
    let shareText = "Bill Split Summary:\n";
    people.forEach((p) => {
      shareText += `${p.name}: ₹${totals[p.id].toFixed(2)}\n`;
    });
    shareText += `\nTotal Bill: ₹${grandTotal.toFixed(2)}`;
    if (navigator.share) {
      navigator
        .share({
          title: "Bill Split Summary",
          text: shareText,
        })
        .catch(console.error);
    } else {
      navigator.clipboard.writeText(shareText);
      alert("Summary copied to clipboard!");
    }
  };

  return (
    <div style={{ width: "400px", height: "600px" }}>
      <Backbutton onClick={() => navigate("/person")} />
      <h2 style={{ textAlign: "center" }}>Split Summary</h2>
      <p>Here is how you should split this bill:</p>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: "17px", fontWeight: "500", color: "#4b4b4bff" }}>
          Person
        </span>
        <span style={{ fontSize: "16px", fontWeight: "500", color: "#4b4b4bff" }}>
          Amount
        </span>
      </div>

      <div style={{ marginTop: "20px" }}>
        {people.map((p) => (
          <div
            key={p.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
              marginBottom: "8px",
              borderRadius: "6px",
              color: "#333",
              cursor: "default",
              background: "var(--light-grey)",
            }}
          >
            <span style={{ color: "black", backgroundColor: "transparent" }}>
              {p.name}
            </span>
            <span style={{ backgroundColor: "transparent" }}>
              ₹{totals[p.id].toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "15px", fontSize: "14px", color: "#666" }}>
        <p style={{ display: "flex", justifyContent: "space-between" }}>
          <strong>Tip: </strong> ₹{tipValue.toFixed(2)}
        </p>
        <p style={{ display: "flex", justifyContent: "space-between" }}>
          <strong>Tax: </strong> ₹{taxValue.toFixed(2)}
        </p>
      </div>

      <div
        style={{
          color: "#282828ff",
          fontSize: 18,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <strong>Total: </strong>
        <span>₹{grandTotal.toFixed(2)}</span>
      </div>

      <Button
        className="homeBtn"
        width="100%"
        name="Share"
        icon={Files}
        fontSize="16px"
        color="#f8f8ff"
        bg_color="#d44326"
        onClick={handleShare}
      />
      <div style={{ marginTop: "20px" }} />
      <Button
        className="homeBtn"
        width="100%"
        icon={House}
        name="Back Home"
        fontSize="16px"
        color="black"
        bg_color="#ffffff"
        onClick={() => navigate("/")}
      />
    </div>
  );
}
