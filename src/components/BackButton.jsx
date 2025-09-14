import { ArrowLeft } from "lucide-react"
import "../styles/Global.css";
import Button from "../components/Button.jsx"

export default function Backbutton({ onClick }) {
    return (
        <Button
            className={"backBtn"}
            icon={ArrowLeft}
            name={"Back"}
            color={"#6a7282"}
            bg_color={"transparent"}
            onClick={onClick}
         />
    )
}   