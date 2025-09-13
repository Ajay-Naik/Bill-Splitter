import '../styles/Button.css'

export default function Button({name, className, color, bg_color, width, onClick, icon: Icon}) {
    let styles = {   
        width : width,
        color : color,
        backgroundColor : bg_color
    }
    return (
        <button style={styles} className={className} onClick={onClick}>{Icon && <Icon size={20}/> } {name}</button>
    )   
}