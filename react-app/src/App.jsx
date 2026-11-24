
import { useCallback, useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";

import { supabase } from "./supabase.js";
import "./App.css";

function App() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMatches = useCallback(async () => {
    const { data, error: fetchError } = await supabase
      .from("matches")
      .select("*")
      .order("id", { ascending: true });

    if (fetchError) {
      console.error("Error fetching matches:", fetchError.message);
      setError(fetchError.message);
      return;
    }

    setMatches(data || []);
    setError("");
  }, []);

  useEffect(() => {
    async function loadMatches() {
      setLoading(true);
      await fetchMatches();
      setLoading(false);
    }

    loadMatches();
  }, [fetchMatches]);

  return (
    <div>
      <Navbar />

      <Hero />

      <section id="matches">
        <h2 className="section-title">
          Available Matches
        </h2>

        <div className="matches-container">
          {loading && <p>Loading matches...</p>}

          {!loading && error && (
            <p>Unable to load matches: {error}</p>
          )}

          {!loading && !error && matches.length === 0 && (
            <p>No matches available.</p>
          )}

          {!loading && !error && matches.map((match) => (
            <MatchCard
              key={match.id}
              id={match.id}
              team1={match.team1}
              team2={match.team2}
              date={match.date}
              venue={match.venue}
              price={match.price}
              available_seats={match.available_seats}
              onBookingSuccess={fetchMatches}
            />
          ))}
        </div>
      </section>

      <footer id="booking">
        <p>© 2026 IPL Ticket Booking</p>
        <p>Enjoy the excitement of IPL!</p>
      </footer>
    </div>
  );
}

export default App;
