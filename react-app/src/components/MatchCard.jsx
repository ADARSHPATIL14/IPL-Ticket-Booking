
import { useState } from "react";

function MatchCard(props) {

    const [booked, setBooked] = useState(false);

    return (
        <div className="match-card">

            <h3>{props.team1} vs {props.team2}</h3>

            <p><strong>Date:</strong> {props.date}</p>

            <p><strong>Venue:</strong> {props.venue}</p>

            <p><strong>Ticket Price:</strong> ₹{props.price}</p>

            <button onClick={() => setBooked(!booked)}>
                {booked ? "Selected" : "Book"}
            </button>

        </div>
    );
}

export default MatchCard;
