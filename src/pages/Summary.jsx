import { useLocation, useNavigate } from "react-router-dom";
import Backbutton from "../components/BackButton.jsx";
import Button from "../components/Button.jsx";

export default function Summary() {
  const navigate = useNavigate();
  const location = useLocation();
  const { people = [], items = [], tax, tip, assignments = {}, splitMode } =
    location.state || {};

  // Helper to calculate extras
  const subtotal = items.reduce(
    (sum, it) => sum + (parseFloat(it.price) || 0),
    0
  );
  const calcExtra = (data) => {
    if (!data || !data.amount) return 0;
    return data.type === "%" ? (subtotal * data.amount) / 100 : data.amount;
  };
  const taxValue = calcExtra(tax);
  const tipValue = calcExtra(tip);
  const extraTotal = taxValue + tipValue;

  // Totals per person
  const totals = {};
  people.forEach((p) => (totals[p.id] = 0));

  if (splitMode === "items") {
    // Split based on assignments
    items.forEach((item) => {
      const assigned = assignments[item.id] || [];
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

  const grandTotal = subtotal + extraTotal;

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
    <div style={{ padding: "20px", width: "400px", height: "600px" }}>
      <Backbutton onClick={() => navigate("/person")} />
      <h2 style={{ textAlign: "center" }}>Split Summary</h2>
      <p>Here is how you should split this bill:</p>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span
          style={{ fontSize: "17px", fontWeight: "500", color: "#4b4b4bff" }}
        >
          Person
        </span>
        <span
          style={{ fontSize: "16px", fontWeight: "500", color: "#4b4b4bff" }}
        >
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
              background: "#f5f5f5",
            }}
          >
            <span style={{ fontWeight: "500" }}>{p.name}</span>
            <span>₹{totals[p.id].toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "15px", fontSize: "14px", color: "#666" }}>
        <p
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <strong>Tip: </strong> ₹{tipValue.toFixed(2)}
        </p>
        <p
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
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
        fontSize="16px"
        color="#f8f8ff"
        bg_color="#d44326"
        onClick={handleShare}
      />
      <div style={{ marginTop: "20px" }} />
      <Button
        className="homeBtn"
        width="100%"
        name="Done"
        fontSize="16px"
        color="black"
        bg_color="#ffffff"
        onClick={() => navigate("/")}
      />
    </div>
  );
}
