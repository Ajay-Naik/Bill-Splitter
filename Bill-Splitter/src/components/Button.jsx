import '../styles/Button.css'

export default function Button({name, color, bg_color, onClick}) {
    let styles = {   
        color : color,
        backgroundColor : bg_color
    }
    return (
        <button style={styles} onClick={onClick}>{name}</button>
    )   
}