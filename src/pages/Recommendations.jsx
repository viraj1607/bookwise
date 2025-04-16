import React from "react";
import MoodBased from "../components/MoodBased";
import PersonalizedPicks from "../components/PersonalizedPicks";

function Recommendations() {
  const userBooks = [
    { title: "Atomic Habits" },
    { title: "The Alchemist" },
    { title: "Rich Dad Poor Dad" },
  ];
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-yellow-50 dark:from-indigo-900 dark:to-yellow-900 min-h-screen">
      <MoodBased />
      <PersonalizedPicks userBooks={userBooks} />
    </div>
  );
}

export default Recommendations;
