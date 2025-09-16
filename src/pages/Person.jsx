import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Plus, X } from "lucide-react";
import Button from "../components/Button.jsx";
import Backbutton from "../components/BackButton.jsx";
import "../styles/index.css";

export default function Person() {
  const navigate = useNavigate();
  const location = useLocation();

  // items, tax, tip come from Manual.jsx
  const { items = [], tax, tip } = location.state || {};

  const [people, setPeople] = useState([]);
  const [nameInput, setNameInput] = useState("");
  const [assignments, setAssignments] = useState({}); // { itemId: [personIds] }
  const [splitMode, setSplitMode] = useState("evenly"); // "evenly" | "items"

  const addPerson = () => {
    if (!nameInput.trim()) return;
    const newPerson = { id: uuidv4(), name: nameInput.trim() };
    setPeople([...people, newPerson]);
    setNameInput("");
  };

  const removePerson = (id) => {
    setPeople((prev) => prev.filter((p) => p.id !== id));
    // cleanup from assignments
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
          <Plus style={{ height: "15px", marginTop: "1px" }} /> Add person
        </button>
      </div>

      {/* Pills for people */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          marginTop: "10px",
        }}
      >
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
              background: "#f5f5f5",
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
            border: "1.5px solid #939393ff",
            padding: "5px",
            borderRadius: "10px",
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
      <div
        className="assignItems"
        style={{ padding: "5px", marginTop: "10px", marginBottom: "10px" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span
            style={{ fontSize: "17px", fontWeight: "500", color: "#4b4b4bff" }}
          >
            Item
          </span>
          <span
            style={{ fontSize: "16px", fontWeight: "500", color: "#4b4b4bff" }}
          >
            Price
          </span>
        </div>

        {items.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
              alignItems: "center",
              color: "#333",
              cursor: "default",
              background: "#f5f5f5",
            }}
          >
            <span>{item.name}</span>
            <span>₹{item.price}</span>

            {splitMode === "items" && (
              <div style={{ display: "flex", gap: "6px", marginLeft: "10px" }}>
                {people.map((p) => (
                  <span
                    key={p.id}
                    onClick={() => toggleAssign(item.id, p.id)}
                    style={{
                      border: "1px solid grey",
                      padding: "2px 10px",
                      borderRadius: "20px",
                      cursor: "pointer",
                      background: (assignments[item.id] || []).includes(p.id)
                        ? "#d44326"
                        : "#f5f5f5",
                      color: (assignments[item.id] || []).includes(p.id)
                        ? "white"
                        : "black",
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

      <Button
        className="homeBtn"
        width="100%"
        name="Continue"
        fontSize="16px"
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
