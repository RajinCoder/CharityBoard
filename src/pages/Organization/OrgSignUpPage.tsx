import React, { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/nav-bar-login";
import { supabase } from "../../config/supabaseClient";
import { useNavigate } from "react-router-dom";

interface SignUpFormData {
  email: string;
  password: string;
  organizationName: string;
  address: string;
  phoneNumber: string;
}

const OrgSignUpPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SignUpFormData>({
    email: "",
    password: "",
    organizationName: "",
    address: "",
    phoneNumber: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      console.error("Error with sign in information: ", error);
    }

    if (data) {
      updateOrg(formData);
    }
    console.log("Form data submitted:", formData);
  };

  const updateOrg = async (data: SignUpFormData) => {
    const { data: insertedData, error } = await supabase
      .from("OrganizationTable")
      .insert({
        email: data.email,
        password: data.password,
        address: data.address,
        contact: data.phoneNumber,
        orgName: data.organizationName,
      });

    if (error) {
      console.log("error updating");
    }

    if (insertedData) {
      console.log("inserted data");
      navigate("/");
    }
  };

  return (
    <div className="relative bg-gray-100 min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center py-16">
        {/* Add padding top to create space */}
        <form
          onSubmit={handleSubmit}
          className="w-full px-8 py-8 bg-white rounded shadow-md"
        >
          <div>
            <h1 className="text-2xl font-bold text-center">
              Sign Up for New Organization
            </h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Organization Email:
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
            <div>
              <label
                htmlFor="organizationName"
                className="block text-sm font-medium text-gray-700"
              >
                Organization Name:
              </label>
              <input
                type="text"
                id="organizationName"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address:
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number:
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Sign Up
          </button>
          <div className="mt-4">
            <p className="mb-4">Already have an account?</p>
            <Link
              to="/organization-login"
              className="w-full px-4 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Log In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrgSignUpPage;
