import React, { useState, FormEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";
import Error from "./Error";

interface LoginFormData {
  email: string;
  password: string;
}

interface Props {
  userOrOrg: boolean;
}

/**
 * Renders a page for anyone to login.
 * @returns
 */
const LogIn = ({ userOrOrg }: Props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  /**
   * Fills the form data with the new changes.
   * @param e the change event
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Attempts to sign in.
   * @param e submitting event
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { data } = await supabase
      .from("OrganizationTable")
      .select()
      .eq("email", formData.email)
      .single();
    /**
     * User Page: Case 1 -> A user signs in with correct info => home page
     *            Case 2 -> A non-org signs in with incorrect info => error message
     *            Case 3 -> A organization signs in, as longs as email fits => error message
     * Organization Page: Case 1 -> A organization signs in with correct info => home page
     *                    Case 2 -> A organization signs in with incorrect info => error message
     *                    Case 3 -> A user signs in with correct info => error message
     */

    if (data && userOrOrg) {
      // User Page: Case 3
      setError("An Organization may not sign in as a user");
      setShowError(true);
      setFormData({
        email: "",
        password: "",
      });
    } else if (data && !userOrOrg) {
      // Organization Page: Case 1 & 2
      const { data, error } = await supabase.auth.signInWithPassword(formData);
      if (error) {
        setError(error.message);
        setShowError(true);
        setFormData({
          email: "",
          password: "",
        });
      } else if (data) {
        navigate("/");
      }
    } else if (!data && userOrOrg) {
      // User Page: Case 1 & 2
      const { data, error } = await supabase.auth.signInWithPassword(formData);
      if (error) {
        setError(error.message);
        setShowError(true);
        setFormData({
          email: "",
          password: "",
        });
      } else if (data) {
        navigate("/");
      }
    } else if (!userOrOrg && !data) {
      const { data } = await supabase
        .from("UserTable")
        .select()
        .eq("email", formData.email)
        .single();

      if (data) {
        setError("A User may not sign in as a organization.");
        setShowError(true);
      }
    }
  };

  useEffect(() => {
    const timer1 = setTimeout(() => setShowError(false), 3000);

    return () => {
      clearTimeout(timer1);
    };
  }, [error]);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm p-8 space-y-6 bg-white rounded shadow-md"
        >
          <div>
            <h1 className="text-2xl font-bold text-center">
              Login for Returning {userOrOrg ? "User" : "Organizations"}
            </h1>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Login
          </button>
          <div className="mt-4">
            <p className="text-center mb-4">Don't have an account?</p>
            <Link
              to={userOrOrg ? "/user-signup" : "/organization-signup"}
              className="w-full px-4 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Sign Up!
            </Link>
          </div>
        </form>
      </div>
      <div className="fixed bottom-1 right-1">
        {showError && <Error errorMessage={error} />}
      </div>
    </>
  );
};

export default LogIn;
