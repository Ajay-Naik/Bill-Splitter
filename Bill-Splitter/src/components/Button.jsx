import './Button.css'

export default function Button({name, color, bg_color}) {
    let styles = {
        
        color : color,
        backgroundColor : bg_color
    }
    return (
        <button style={styles}>{name}</button>
    )   
}