import { Listing } from "../components/Listing";
import React from "react";
import Navbar from '../components/nav-bar'; // Import the Navbar component using relative path

const HomePage = () => {
  return (
    <div className="h-100 p-10">
      <Navbar />
      <Listing
        orgName={"Merrimack Highschool"}
        orgNumber={"+1 (603) 493-6842"}
        orgLoc={"38 McElwain St, Merrimack, NH 03054"}
        orgNeeds={["Curry", "Draws", "Curry", "Draws", "Curry", "Draws"]}
      />
    </div>
  );
};

export default HomePage;
