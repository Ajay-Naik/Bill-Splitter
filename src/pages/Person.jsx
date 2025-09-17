import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Plus, X, ArrowBigRight } from "lucide-react";
import Button from "../components/Button.jsx";
import Backbutton from "../components/BackButton.jsx";
import "../styles/index.css";

export default function Person() {
  const [billData, setBillData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // items, tax, tip can come from Manual.jsx OR from scanned bill
  const [items, setItems] = useState([]);
  const [tax, setTax] = useState(0);
  const [tip, setTip] = useState(0);

  useEffect(() => {
    // 1. Try to load from scanned bill
    const data = localStorage.getItem("billData");
    if (data) {
      const parsed = JSON.parse(data);
      setBillData(parsed);
      setItems(parsed.items || []);
      setTax(parsed.tax || 0);
      setTip(parsed.tip || 0);
    } else if (location.state) {
      // 2. Otherwise, load from Manual.jsx
      setItems(location.state.items || []);
      setTax(location.state.tax || 0);
      setTip(location.state.tip || 0);
    }
  }, [location.state]);

  const [people, setPeople] = useState([]);
  const [nameInput, setNameInput] = useState("");
  const [assignments, setAssignments] = useState({});
  const [splitMode, setSplitMode] = useState("evenly");

  const addPerson = () => {
    if (!nameInput.trim()) return;
    const newPerson = { id: uuidv4(), name: nameInput.trim() };
    setPeople([...people, newPerson]);
    setNameInput("");
  };

  const removePerson = (id) => {
    setPeople((prev) => prev.filter((p) => p.id !== id));
    const newAssignments = {};
    for (let itemId in assignments) {
      newAssignments[itemId] = (assignments[itemId] || []).filter(
        (pid) => pid !== id
      );
    }
    setAssignments(newAssignments);
  };

  const toggleAssign = (itemId, personId) => {
    setAssignments((prev) => {
      const current = prev[itemId] || [];
      return {
        ...prev,
        [itemId]: current.includes(personId)
          ? current.filter((pid) => pid !== personId)
          : [...current, personId],
      };
    });
  };

  if (!items.length) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Backbutton onClick={() => navigate("/scanner")} />
        <h2>No bill data found</h2>
        <p>Please scan or enter a receipt first.</p>
      </div>
    );
  }

  return (
    <div className="personPage">
      <Backbutton onClick={() => navigate("/manual")} />
      <h2>Who paid for what?</h2>

      {/* Input for adding person */}
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Enter a name"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addPerson()}
        />
        <button onClick={addPerson}>
          <Plus style={{ height: "15px", marginTop: "5px" }} /> Add person
        </button>
      </div>

      {/* Pills for people */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "10px" }}>
        {people.map((p) => (
          <span
            key={p.id}
            style={{
              border: "1px solid grey",
              padding: "4px 10px",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "#333",
              cursor: "default",
              background: "var(--light-grey)",
            }}
          >
            {p.name}
            <X
              style={{ height: "14px", cursor: "pointer" }}
              onClick={() => removePerson(p.id)}
            />
          </span>
        ))}
      </div>

      {/* Toggle Split Mode */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <p>Assign items</p>
        <p
          style={{
            border: "1.5px solid var(--light-grey)",
            padding: "5px 10px",
            borderRadius: "15px",
            fontSize: "15px",
            cursor: "pointer",
          }}
          onClick={() =>
            setSplitMode((prev) => (prev === "evenly" ? "items" : "evenly"))
          }
        >
          {splitMode === "evenly" ? "Split Evenly" : "Split by Items"}
        </p>
      </div>

      {/* Item list with assignment */}
      <div className="assignItems" style={{ padding: "5px", marginTop: "10px", marginBottom: "10px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: "17px", fontWeight: "500", color: "#4b4b4bff" }}>Item</span>
          <span style={{ fontSize: "16px", fontWeight: "500", color: "#4b4b4bff" }}>Price</span>
        </div>

        {items.map((item, index) => (
          <div
            key={item.id || index}
            style={{
              marginTop: "10px",
              alignItems: "center",
              color: "#333",
              padding: "10px",
              borderRadius: "6px",
              cursor: "default",
              background: "inherit",
              border: "1px solid var(--light-grey)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>{item.name}</span>
              <span>₹{item.price}</span>
            </div>
            {splitMode === "items" && (
              <div style={{ display: "flex", gap: "6px" }}>
                {people.map((p) => (
                  <span
                    key={p.id}
                    onClick={() => toggleAssign(item.id || index, p.id)}
                    style={{
                      border: "1px solid var(--light-grey)",
                      padding: "2px 10px",
                      marginTop: "6px",
                      borderRadius: "20px",
                      cursor: "pointer",
                      background: (assignments[item.id || index] || []).includes(p.id)
                        ? "#d44326"
                        : "white",
                      color: (assignments[item.id || index] || []).includes(p.id)
                        ? "white"
                        : "var(--dark-grey)",
                    }}
                  >
                    {p.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <span style={{ fontSize: "14px", color: "#808080" }}>
        {splitMode === "items"
          ? "Click a person to assign items"
          : "Bill will be split evenly"}
      </span>

      {/* Totals */}
      <div style={{ marginTop: "20px", textAlign: "left" }}>
        <p><strong>Tax:</strong> ₹{tax}</p>
        <p><strong>Tip:</strong> ₹{tip}</p>
      </div>

      <Button
        className="homeBtn"
        width="100%"
        name="Continue"
        icon={ArrowBigRight}
        fontSize="18px"
        color="#f8f8ff"
        bg_color="#d44326"
        onClick={() =>
          navigate("/summary", {
            state: { people, items, tax, tip, assignments, splitMode },
          })
        }
      />
    </div>
  );
}
