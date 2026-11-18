
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";
import { supabase } from "./supabase.js";
import "./App.css";

function App() {

    // Match details stored in an array
    const matches = [
        {
            id: 1,
            team1: "RCB",
            team2: "SRH",
            date: "10 April 2026",
            venue: "Bengaluru",
            price: 800
        },

        {
            id: 2,
            team1: "MI",
            team2: "KKR",
            date: "12 April 2026",
            venue: "Mumbai",
            price: 1000
        },

        {
            id: 3,
            team1: "CSK",
            team2: "RR",
            date: "14 April 2026",
            venue: "Chennai",
            price: 700
        }
    ];

    return (
        <div>

            <Navbar />

            <Hero />

            <section id="matches">

                <h2 className="section-title">
                    Available Matches
                </h2>

                <div className="matches-container">

                    {matches.map((match) => (

                        <MatchCard
                            key={match.id}
                            team1={match.team1}
                            team2={match.team2}
                            date={match.date}
                            venue={match.venue}
                            price={match.price}
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
