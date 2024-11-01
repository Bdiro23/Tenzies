export default function Number(props){
    const styles = {
        // eslint-disable-next-line react/prop-types
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        // eslint-disable-next-line react/prop-types
        <div  className="die-face" style={styles} onClick={props.holdDice}>
            {/* eslint-disable-next-line react/prop-types */}
            <div className="button">{props.number}</div>
        </div>

    )
}