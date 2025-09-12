import Button from "./Button.jsx";
import './headings.css'
import QR from '../assets/QR.png'

export default function Headings() {
  return <>
  <div className="container">
       <div className="headings">
           <img src={QR} alt="" />
           <h1>Scan. Tap. Split</h1>
           <p>Snap the receipt, tap your items, see who owes what. No sign-ups, no math, no drama</p>
       </div>  
       <div className="buttons">
        <Link to="/scanner">
            <Button name={"📷 Scan receipt"} color={"#f8f8ff"} bg_color={"#d44326"}/>
          </Link>
          <Link to="/manual">
             <Button name={"Enter Manually"} color={"black"} bg_color={"white"}/>
          </Link>
       </div>
    </div>
  </>
}



