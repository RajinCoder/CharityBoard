import { useEffect, useState } from "react";
import { supabase } from "../config/supabaseClient";

interface Props {
  org_uuid: string;
}
/**
 * Stores an organization in a user's following list
 * Invariant: An organization cannot follow itself
 * @returns
 */
const FollowingBtn = ({ org_uuid }: Props) => {
  const [user_id, setUserId] = useState<string | null>(null);
  const [isFollowed, setIsFollowed] = useState(false);

  /**
   * Toggles the following status of an organization.
   * @returns
   */
  const toggleFollowing = async () => {
    if (org_uuid == user_id) {
      alert("Can't follow yourself");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("followingtable")
        .select("list_of_followings")
        .eq("user_id", user_id)
        .single();

      if (error) {
        throw error;
      }

      const updatedList = isFollowed
        ? data.list_of_followings.filter((id: string) => id !== org_uuid)
        : [...data.list_of_followings, org_uuid];

      const { error: updateError } = await supabase
        .from("followingtable")
        .update({ list_of_followings: updatedList })
        .eq("user_id", user_id);

      if (updateError) throw updateError;

      // Toggle the visual state without waiting for another query
      setIsFollowed(!isFollowed);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    /**
     * Fetches the current following status of that organization.
     */
    const fetchFollowingStatus = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      } else {
        console.log("No user is currently signed in.");
      }

      const { data, error } = await supabase
        .from("followingtable")
        .select("list_of_followings")
        .eq("user_id", user_id)
        .maybeSingle();

      if (error) {
        console.log(error);
      }

      setIsFollowed(data ? data.list_of_followings.includes(org_uuid) : false);
    };

    fetchFollowingStatus();
  }, [org_uuid, user_id]);
  return (
    <div className="self-center bg-blue-700 rounded-md shadow-md hover:bg-blue-800 flex">
      <button
        onClick={toggleFollowing}
        className="text-white text-xl w-full h-full py-4 px-6"
      >
        {isFollowed ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default FollowingBtn;
