import { Trash2 } from "lucide-react";
import "../styles/Global.css";

export default function NewItem({ item, onUpdate, onDelete, inputRef }) {
    return (
        <li style={{display:"flex",marginBottom:"8px",gap:"8px",alignItems:"center"}}>
          <input
          ref={inputRef}
            type="text"
            placeholder="Item name"
            value={item.name}
            onChange={(e) => onUpdate(item.id,{...item, name: e.target.value })}
            style={{ flex: 2 }}
            autoFocus
          />
<span  style={{color:"black",fontWeight:"400",fontSize:"20px"}}> ₹ </span>
    <input type="number" 
     inputmode="numeric" 
          placeholder="0.00" 
          min={0}
          //  step={0.01}
          value={item.price}
            onChange={(e) => {
          const v = e.target.value;
         
          onUpdate(item.id, { ...item, price: v });
        }}
        style={{ width: 100 }}
          />
          <button onClick={() => onDelete(item.id)} aria-label="Delete item" style={{background:"none",border:"none",cursor:"pointer"}}>
             <Trash2 size={25} color="grey" />
          </button> 
        </li>
    )
 }

    

    