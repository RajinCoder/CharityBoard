import { useState, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../config/supabaseClient";
import { OrgFormData } from "../types/types";

const OrgSignUpDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState<OrgFormData>({
    email: location.state.org_email,
    password: location.state.org_password,
    organizationName: "",
    address: "",
    phoneNumber: "",
  });

  /**
   * Changes the state variable everytime the form fields are changed.
   * @param e form change event
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /**
   * Updates the org data with fields.
   * @param e submitting event
   */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateOrg(formData);
    // Validate orginization address before allowing for submit and also maybe swap this screen with the other signup
    // so people can't create an account and not finish first.
  };

  // need to insert a row into the saved table
  /**
   * Creates a new entry in the organization table.
   * @param data the organizations form data
   * @returns
   */
  const updateOrg = async (data: OrgFormData) => {
    const { data: insertedData, error } = await supabase
      .from("OrganizationTable")
      .insert({
        email: data.email,
        address: data.address,
        contact: data.phoneNumber,
        orgname: data.organizationName,
        org_uuid: location.state.org_uuid,
      });

    if (error) {
      console.log("error updating", error);
      return;
    }

    if (insertedData) {
      console.log("inserted data");
    }
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-8 space-y-6 bg-white rounded shadow-md"
      >
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
        <button
          type="submit"
          className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default OrgSignUpDetails;
