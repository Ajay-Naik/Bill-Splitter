import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button.jsx";
import Backbutton from "../components/BackButton.jsx";
import "../styles/Global.css";
import { Plus, Trash2 } from "lucide-react";

export default function Manual() {
  const navigate = useNavigate();
  let [newItem, setNewItem] = useState("");

  let addNewItem = (e) => {
    e.preventDefault();
    console.log("addNewItem()", newItem);
  };

  let updateItemValue = (e) => {
    setNewItem(e.target.value);
  };

  return (
    <div>
      <Backbutton onClick={() => navigate("/")} />
      <h2>Receipt Items</h2>
      <p>Type in your receipt details to split the bill</p>
      <ul>
        <li>
          <input
            type="text"
            name="itemName"
            placeholder="Item name"
            value={newItem}
            onChange={updateItemValue}
          />
          <input type="number" placeholder="0.00" />
          <Trash2 size={20} color="grey" /> 
        </li>
      </ul>
<div style={{display:"flex",flexDirection:"column",gap:"20px"}}>
      <Button
        className="homeBtn"
        width={"100%"}
        icon={Plus}
        name="Add item"
        color="#2d2d2eff"
        bg_color="#d4d1d1ff"
        onClick={addNewItem}
      />

      <Button
        className="homeBtn"
        width={"100%"}
        name="Continue"
        color="#f8f8ff"
        bg_color="#d44326"
        onClick={() => navigate("/")}
      />
    </div>
    </div>
  );
}
