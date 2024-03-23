import { useEffect } from "react";
import { supabase } from "../config/supabaseClient";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/nav-bar-login";

/**
 * Ensures the user that signs up verifies email before continuing.
 * @returns a page that asks for verification
 */
const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Checks for verification every 5 seconds.
   */
  useEffect(() => {
    /**
     * Checks for verification by attempting to sign in with credentials.
     */
    const checkVerification = async () => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: location.state.org_email,
        password: location.state.org_password,
      });

      if (data) {
        console.log("Success");
      }
      if (error) {
        console.log("Not Verified");
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        updateSaved(user.id);
        updateFollowed(user.id);
        if (location.state.user_or_not == true) {
          updateUser(user.id, user.email);
          navigate("/");
        } else {
          // not working when verifying in browser
          navigate("/org-extra-details", {
            state: {
              org_email: location.state.org_email,
              org_password: location.state.org_password, // should not be passing the password
              org_uuid: user.id,
            },
          });
        }
      } else {
        console.log("No User");
      }
    };

    const intervalId = setInterval(checkVerification, 5000);
    return () => {
      clearInterval(intervalId);
    };
  });

  /**
   * Creates a new entry in the saved table.
   * @param userId the userId of the newly verified user
   */
  const updateSaved = async (userId: string) => {
    const { data, error } = await supabase.from("savedtable").insert({
      user_id: userId,
      list_of_listings: [],
    });

    if (error) {
      console.log("Error inserting data into saved table.");
    }

    if (data) {
      console.log("Inserted data into saved table.");
    }
  };

  /**
   * Creates a new entry in the followed table.
   * @param userId the userId of the newly verified user
   */
  const updateFollowed = async (userId: string) => {
    const { data, error } = await supabase.from("followingtable").insert({
      user_id: userId,
      list_of_followings: [],
    });

    if (error) {
      console.log("Error inserting data into following table.");
    }

    if (data) {
      console.log("Inserted data into following table.");
    }
  };

  /**
   * If the created is a user and not an org insert into table.
   * @param userId the uuid of the newly created
   * @param email the email of the newly created
   */
  const updateUser = async (userId: string, email: string | undefined) => {
    console.log(userId);
    console.log(email);
    const { data, error } = await supabase.from("UserTable").insert({
      user_id: userId,
      email: email,
    });

    if (error) {
      console.log("Error inserting data into user table.");
    }

    if (data) {
      console.log("Inserted data into user table.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col space-y-20 mt-40 px-5">
        <h1 className="text-blue-700 text-7xl">CharityConnect</h1>
        <p className="text-2xl">
          Please verify your email before continuing. <br /> Refresh page to
          continue filling out your information
        </p>
      </div>
    </>
  );
};

export default VerifyEmail;
