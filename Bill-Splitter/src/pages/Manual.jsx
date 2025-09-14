import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import Button from "../components/Button.jsx";
import NewItem from "../components/NewItem.jsx";
import Backbutton from "../components/BackButton.jsx";
import "../styles/Global.css";
import "../styles/index.css";
import { Plus } from "lucide-react";

export default function Manual() {
  const navigate = useNavigate();
  let [items, setItems] = useState([]);
  const [lastAddedId, setLastAddedId ] = useState(null);
  const refs = useRef({})


   const addItem = useCallback(() => {
    const id = uuidv4(); 
    const newItem = { id, name: "", price: "" };
    setItems(prev => [...prev, newItem]);   
    setLastAddedId(id);
  }, []);

  const updateItem = useCallback((id, updated) => {
    setItems(prev => prev.map(item => (item.id === id ? updated : item)));
  }, []);

    const deleteItem = useCallback((id) => {
    setItems(prev => prev.filter(item => item.id !== id));
    delete refs.current[id];
  }, []);

   useEffect(() => {
    if (lastAddedId && refs.current[lastAddedId]) {
        refs.current[lastAddedId].focus();
        setLastAddedId(null);
    }
   }, [lastAddedId, items]);

     const total = items.reduce((sum, it) => {
    const p = parseFloat(it.price);
    return sum + (Number.isFinite(p) ? p : 0);
  }, 0);

  return (
    <div style={{height:"600px", width:"400px"}}>
      <Backbutton onClick={() => navigate("/")} />
      <h2>Receipt Items</h2>
      <p>Type in your receipt details to split the bill</p>
      
        <ul style={{listStyleType:"none",padding:"0"}}>
            {items.map((item) => (
            <NewItem
            key={item.id}
            item={item}
            onUpdate={updateItem}
            onDelete={deleteItem}
            inputref = {(el) => (refs.current[item.id] = el)}
            />
            ))}
        </ul>
      
      
      <div style={{display:"flex",flexDirection:"column",gap:"20px"}}>
      <Button
        className="homeBtn"
        icon={Plus}
        name="Add item"
        color="#2d2d2eff"
        bg_color="#bebebeff"
        onClick={addItem}
      />
      
      <div style={{ marginTop: 12, color: "#191919ff", padding: 10, borderRadius: 4, fontSize: 18 }}>
        <strong >Total: </strong> ₹{total.toFixed(2)}
      </div>

      <Button
        className="homeBtn"
        name="Continue"
        fontSize= "16px"
        color="#f8f8ff"
        bg_color="#d44326"
        onClick={() => navigate("/")}
      />
    </div>
    </div>
  );
}
