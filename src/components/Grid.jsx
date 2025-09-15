import React from 'react'

let grid = {
   display: "grid",
   grid: "auto / auto 1fr 1fr 1fr ",
   width: "450px",
   height: "40px",
   placeItems: "center",
   gap: "10px",
//    backgroundColor: "#8585a8ff",
}

export default function Grid({name}) {
    
  return (
    <div className="grid" style={grid}>
        <span className="taxTip" style={{fontSize:"20px",fontWeight:"500",color:"black",backgroundColor:"inherit"}}>
          {name}
        </span>
          <select name="flat%" id="taxTipSelect" style={{color:"black",border:"none", fontSize: 15,borderRadius:"5px", backgroundColor:"#cdc9c9ff",padding:"10px", width:"100px",height:"2.8rem"
          }}>
            <option name="% or flat" id="" selected disabled>% or flat</option>
            <option value="%">%</option>
            <option value="flat">flat</option>
          </select>
          <input type="number" inputMode="numeric" 
          placeholder="0.00" 
          min={0} className="taxTipInput" style={{width:"80px",height:"1.5rem", fontSize: 16}}></input>
          <span className="Result" placeholder="0.00" style={{backgroundColor:"inherit",color:"black", fontSize: 18}}>0.00</span>

          </div>
  )
}


