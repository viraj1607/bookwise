import React from "react";
import MoodBased from "../components/MoodBased";
import PersonalizedPicks from "../components/PersonalizedPicks";
import { useBookContext } from "../bookContext";

function Recommendations() {
  const { bookTitles } = useBookContext();
  // const userBooks = [
  //   { title: "Atomic Habits" },
  //   { title: "The Alchemist" },
  //   { title: "Rich Dad Poor Dad" },
  // ];
  return (
    <div className="bg-gradient-to-br from-indigo-100 to-yellow-100 dark:from-indigo-900 dark:to-yellow-900 min-h-screen">
      <MoodBased />
      <PersonalizedPicks userBooks={bookTitles} />
    </div>
  );
}

export default Recommendations;
