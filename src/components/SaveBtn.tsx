import svg1 from "../assets/starBlue.svg";
import svg2 from "../assets/starYellow.svg";
import { useEffect, useState } from "react";
import { supabase } from "../config/supabaseClient";

interface Props {
  uid: number;
}
/**
 * A save button that stores the card which is saved.
 * @returns the view of the button
 */
const SaveBtn = ({ uid }: Props) => {
  // the boolean value of whether a card was saved or not.
  const [saved, setSaved] = useState(false);

  /**
   * Fetches the status of the saved status from the database using the uid
   */
  useEffect(() => {
    const getSavedStatus = async () => {
      const { data, error } = await supabase
        .from("ListingTable")
        .select("saved")
        .eq("listingId", uid)
        .single();

      if (error) {
        console.log("Error fetching the saved status", error);
      }

      if (data) {
        console.log("got it");
        setSaved(data.saved);
      }
    };
    getSavedStatus();
  }, []);

  /**
   * Sets the state variable to true or false based on saved status and changes the value in the database.
   */
  const save = async () => {
    if (saved) {
      setSaved(false);
      const { data, error } = await supabase
        .from("ListingTable")
        .update({ saved: false })
        .eq("listingId", uid);

      if (error) {
        console.log("There was an error unsaving", error);
      }

      if (data) {
        console.log("Successfuly unsaved", data);
      }
    } else {
      setSaved(true);
      const { data, error } = await supabase
        .from("ListingTable")
        .update({ saved: true })
        .eq("listingId", uid);

      if (error) {
        console.log("There was an error saving", error);
      }

      if (data) {
        console.log("Successfuly saved", data);
      }
    }
  };
  return (
    <button onClick={save}>
      <img src={saved == false ? svg1 : svg2} alt="" className="max-h-6 " />
    </button>
  );
};

export default SaveBtn;
