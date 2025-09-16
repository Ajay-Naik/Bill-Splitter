// import React from 'react'
import { useNavigate } from "react-router-dom";

import Button from "../components/Button.jsx";
import { Plus, X } from "lucide-react";
import "../styles/index.css"
import Backbutton from '../components/BackButton.jsx'
import { useState } from "react";

export default function Person() {
  const navigate = useNavigate();
  let [PersonName, setPersonName] = useState([])

  return <div className="personPage">
      <Backbutton onClick={() => navigate("/manual")} />
      <h2>Who paid for what?</h2>
    <div>
      <div className="input-wrapper">
        
         <input type="text" placeholder="Enter a name"/>
         <button><Plus style={{height:"15px",marginTop:"1px"}}/> Add person</button>
      </div>
       <p style={{border:"1px solid grey",padding:'4px 7px',width:"70px",borderRadius:"20px"}}>{PersonName}<X style={{height:"14px",marginLeft:"15px"}}/></p>
    </div>
    <div style={{display:"flex", justifyContent:"space-between", marginTop:"20px"}}>
        <p>Assign items</p>
        <p style={{border:"1.5px solid #939393ff",padding:"5px",borderRadius:"10px",fontSize:"15px"}}>Split Evenly</p>    
    </div>
    
    <div className="assignItems" style={{ padding:'5px',height:"4rem",marginTop:"-10px",marginBottom:"10px"}}>
      <div style={{display:"flex",justifyContent:"space-between"}}>
        <span style={{fontSize:"17px",fontWeight:"500",color:"#4b4b4bff"}}>item name</span>
        <span style={{fontSize:"16px",fontWeight:"500", color:"#4b4b4bff"}}>Price</span>
      </div>  
      <div style={{display:"flex",gap:"30px",marginTop:'10px'}}>
        <p style={{border:"1px solid grey",padding:'2px 17px',borderRadius:"20px"}}>fhg</p>
        <p style={{border:"1px solid grey",padding:'2px 17px',borderRadius:"20px"}}>hjhj</p>

      </div>
    </div>
    
    
    <span style={{fontSize:"14px", color:"#808080", marginTop:"-10px"}}>You can assign items after adding them</span>
    <Button
            className="homeBtn"
            width="100%"  
            name="Continue"
            fontSize= "16px"
            color="#f8f8ff"
            bg_color="#d44326"
            onClick={() => navigate("/summary")}
          />
          
  </div>

}

