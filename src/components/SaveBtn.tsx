import { useEffect, useState } from "react";
import { supabase } from "../config/supabaseClient";
import svg1 from "../assets/starBlue.svg";
import svg2 from "../assets/starYellow.svg";
import { useNavigate } from "react-router-dom";

interface Props {
  uid: string;
  listingId: number;
}

const SaveBtn = ({ uid, listingId }: Props) => {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const getSavedStatus = async () => {
      const { data, error } = await supabase
        .from("savedtable")
        .select("*")
        .eq("user_id", uid)
        .single();

      if (error) {
        console.log("Error fetching the saved status", error);
      }

      if (
        data &&
        data.list_of_listings &&
        data.list_of_listings.includes(listingId)
      ) {
        setSaved(true);
      }
    };
    getSavedStatus();
  }, [listingId, uid]);

  const save = async () => {
    const { data, error } = await supabase
      .from("savedtable")
      .select("*")
      .eq("user_id", uid)
      .single();

    if (error) {
      console.log("Error fetching saved status", error);
      return;
    }

    if (data) {
      const updatedList = data.list_of_listings.includes(listingId)
        ? data.list_of_listings.filter((id: number) => id !== listingId)
        : [...data.list_of_listings, listingId];

      const { data: updatedData, error: updatedError } = await supabase
        .from("savedtable")
        .update({ list_of_listings: updatedList })
        .eq("user_id", uid);

      if (updatedError) {
        console.log("Error updating saved status", updatedError);
        return;
      }

      if (updatedData) {
        console.log("Successfully updated saved status", updatedData);
        setSaved((prevSaved) => !prevSaved); // Toggle the saved state based on previous value
      }
      navigate("/");
    }
  };

  return (
    <button onClick={save}>
      <img src={saved ? svg2 : svg1} alt="" className="max-h-6 " />
    </button>
  );
};

export default SaveBtn;
