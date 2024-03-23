import { Link } from "react-router-dom";
import { useState, FormEvent } from "react";
import { supabase } from "../config/supabaseClient";
import { SignUpFormData } from "../types/types";
import { useNavigate } from "react-router-dom";
import Error from "./Error";

interface Props {
  userOrOrg: boolean;
  route: string;
}

/**
 * Page for signing up for Charity Connect.
 * @param param0 whether the user is an orginization or not and the resulting page to redirect to based on that
 * @returns
 */
const SignUp = ({ userOrOrg, route }: Props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignUpFormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  /**
   * Signs the user up in the database.
   * @param e event of submitting the form
   * @returns
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });
    if (error) {
      setError(error.message);
      setShowError(true);
      return;
    }

    if (data) {
      navigate("/verify-email", {
        state: {
          org_email: formData.email,
          org_password: formData.password,
          user_or_not: userOrOrg,
        },
      });

      setFormData({
        email: "",
        password: "",
      });
    }
  };

  /**
   * Changes the state variable everytime the form fields are changed.
   * @param e form change event
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm p-8 space-y-6 bg-white rounded shadow-md"
        >
          <div>
            <h1 className="text-2xl font-bold text-center">
              Sign Up for New {userOrOrg ? "User" : "Organizations"}
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
            Sign Up
          </button>
          <div className="mt-4">
            <p className="text-center mb-4">Already have an account?</p>
            <Link
              to={`/${route}`}
              className="w-full px-4 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Log In
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

export default SignUp;
