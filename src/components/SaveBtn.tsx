import { useEffect, useState } from "react";
import { supabase } from "../config/supabaseClient";
import starBlue from "../assets/starBlue.svg";
import starYellow from "../assets/starYellow.svg";

interface Props {
  listingId: number;
}
const SaveBtn = ({ listingId }: Props) => {
  const [isSaved, setIsSaved] = useState(false);
  const [user_id, setUserId] = useState<string | null>(null);

  // This function toggles the saved status of a listing
  const toggleSave = async () => {
    try {
      const { data, error } = await supabase
        .from("savedtable")
        .select("list_of_listings")
        .eq("user_id", user_id)
        .single();

      //Eventually should be done in the creation of an account
      if (error && error.message.includes("The result contains 0 rows")) {
        // Handle no existing row for the user by creating one
        const { error: creationError } = await supabase
          .from("savedtable")
          .insert([{ user_id, list_of_listings: [listingId] }]);

        if (creationError) throw creationError;

        setIsSaved(true); // Since we just added the listing, set saved to true
        return;
      } else if (error) {
        throw error;
      }

      const isCurrentlySaved = data?.list_of_listings.includes(listingId);
      const updatedList = isCurrentlySaved
        ? data.list_of_listings.filter((id: number) => id !== listingId)
        : [...data.list_of_listings, listingId];

      const { error: updateError } = await supabase
        .from("savedtable")
        .update({ list_of_listings: updatedList })
        .eq("user_id", user_id);

      if (updateError) throw updateError;

      // Toggle the visual state without waiting for another query
      setIsSaved(!isCurrentlySaved);
    } catch (error) {
      console.error("Error toggling saved status", error);
      alert("Could not update the saved status. Please sign in.");
    }
  };

  // Effect to initialize the saved state
  useEffect(() => {
    const fetchSavedStatus = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      } else {
        console.log("No user is currently signed in.");
      }

      // it will throw errors bc we are passing it null if not signed but it's ok for now

      try {
        const { data, error } = await supabase
          .from("savedtable")
          .select("list_of_listings")
          .eq("user_id", user_id)
          .maybeSingle(); // Use maybeSingle to handle 0 or 1 rows without throwing an error

        if (error) throw error;

        setIsSaved(data ? data.list_of_listings.includes(listingId) : false);
      } catch (error) {
        console.error("Error fetching saved status", error);
      }
    };
    fetchSavedStatus();
  }, [listingId, user_id]);

  return (
    <button onClick={toggleSave}>
      <img
        src={isSaved ? starYellow : starBlue}
        alt="Save"
        className="max-h-6"
      />
    </button>
  );
};

export default SaveBtn;
