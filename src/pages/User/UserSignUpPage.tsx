import React, { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/nav-bar-login";
import { supabase } from "../../config/supabaseClient";

interface SignUpFormData {
  email: string;
  password: string;
}

const UserSignUpPage: React.FC = () => {
  const [formData, setFormData] = useState<SignUpFormData>({
    email: "",
    password: "",
  });
  const [showVerificationPopup, setShowVerificationPopup] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      console.error("Error signing up: ", error);
      return;
    }

    if (data) {
      setShowVerificationPopup(true);
      setFormData({ // Clear the form after successful signup
        email: "",
        password: "",
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm p-8 space-y-6 bg-white rounded shadow-md"
        >
          <div>
            <h1 className="text-2xl font-bold text-center">
              Sign Up for New Users
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
              to="/user-login"
              className="w-full px-4 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Log In
            </Link>
          </div>
        </form>
      </div>
      {showVerificationPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded shadow-md">
            <p className="text-lg font-semibold mb-4">Please verify your email! Then click sign up again.</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={
                () => {
                  setShowVerificationPopup(false)
                }
              }
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSignUpPage;
