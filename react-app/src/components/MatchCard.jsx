
import { useState } from "react";
import { supabase } from "../supabase.js";

function MatchCard({
  id,
  team1,
  team2,
  date,
  venue,
  price,
  available_seats,
  onBookingSuccess
}) {
  const [userName, setUserName] = useState("");
  const [tickets, setTickets] = useState("1");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleBooking() {
    setMessage("");
    setError("");

    const name = userName.trim();
    const ticketCount = Number(tickets);

    if (!name) {
      setError("Please enter your name.");
      return;
    }

    if (!Number.isInteger(ticketCount) || ticketCount <= 0) {
      setError("Enter a valid ticket quantity.");
      return;
    }

    if (ticketCount > available_seats) {
      setError(`Only ${available_seats} seats are available.`);
      return;
    }

    setLoading(true);

    try {
      const { data, error: bookingError } = await supabase.rpc(
        "book_tickets",
        {
          p_match_id: id,
          p_user_name: name,
          p_tickets: ticketCount
        }
      );

      if (bookingError) {
        throw bookingError;
      }

      if (!data || !data.success) {
        throw new Error("Booking could not be completed.");
      }

      setMessage(
        `Booking successful! Your booking ID is ${data.booking_id}. Total: ₹${data.total_price}.`
      );

      setUserName("");
      setTickets("1");

      if (onBookingSuccess) {
        await onBookingSuccess();
      }
    } catch (bookingError) {
      console.error("Booking failed:", bookingError);
      setError(bookingError.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="match-card">
      <h3>{team1} vs {team2}</h3>

      <p><strong>Date:</strong> {date}</p>
      <p><strong>Venue:</strong> {venue}</p>
      <p><strong>Ticket Price:</strong> ₹{price}</p>

      <p>
        <strong>Available Seats:</strong> {available_seats}
      </p>

      <div className="booking-form">
        <label htmlFor={`name-${id}`}>Your Name</label>

        <input
          id={`name-${id}`}
          type="text"
          placeholder="Enter your name"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
          disabled={loading}
        />

        <label htmlFor={`tickets-${id}`}>Number of Tickets</label>

        <input
          id={`tickets-${id}`}
          type="number"
          min="1"
          max={available_seats}
          value={tickets}
          onChange={(event) => setTickets(event.target.value)}
          disabled={loading}
        />

        <p>
          <strong>Total Price:</strong>{" "}
          ₹{price * (Number(tickets) || 0)}
        </p>

        <button
          type="button"
          onClick={handleBooking}
          disabled={loading || available_seats <= 0}
        >
          {loading
            ? "Booking..."
            : available_seats <= 0
              ? "Sold Out"
              : "Book Tickets"}
        </button>

        {message && (
          <p className="booking-success">{message}</p>
        )}

        {error && (
          <p className="booking-error">{error}</p>
        )}
      </div>
    </div>
  );
}

export default MatchCard;
