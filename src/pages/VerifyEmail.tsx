import { useEffect } from "react";
import { supabase } from "../config/supabaseClient";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/nav-bar-login";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkVerification = async () => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: location.state.org_email,
        password: location.state.org_password,
      });
      if (data) {
        console.log("data", data);
      }
      if (error) {
        console.log("Error", error);
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log(location.state.org_email);
      if (user) {
        updateSaved(user.id);
        navigate(location.state.user_or_not ? "/" : "/org-extra-details", {
          state: {
            org_email: location.state.org_email,
            org_password: location.state.org_password,
            org_uuid: user.id,
          },
        });
      } else {
        console.log("Not working");
      }
    };

    const intervalId = setInterval(checkVerification, 5000);
    return () => {
      clearInterval(intervalId);
    };
  });

  const updateSaved = async (userId: string) => {
    const { data, error } = await supabase.from("savedtable").insert({
      user_id: userId,
      list_of_listings: [],
    });

    if (error) {
      console.log("error", error);
    }

    if (data) {
      console.log(data);
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
