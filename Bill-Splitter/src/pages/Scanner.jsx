import { useNavigate } from "react-router-dom";
import Button from "../components/Button.jsx"
import Backbutton from "../components/BackButton.jsx"
import "../styles/Global.css";
import FileDropZone from "../components/input.jsx"

export default function Scanner() {
   const navigate = useNavigate()

   let styles={
    // height: "80% !important",   
    backgroundColor: "#f8f8ff", 
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    // flexDirection: "column"
}
    return (
        <div>
            <Backbutton onClick={() => navigate("/")}/>
            <h2>Scan Receipt</h2>
            <p>Take a photo or upload an image of your receipt</p>

               <FileDropZone />
             
            <Button
              className={"homeBtn"}
                name={"Scrape the bill"}
                    color={"#f8f8ff"}
                bg_color={"#d44326"}
                onClick={() => navigate("/scanner")} 
            />
            
        </div>
    )
}