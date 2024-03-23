import { useEffect, useState } from "react";
import { supabase } from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";

type Need =
  | "CLOTHING"
  | "VOLUNTEERS"
  | "BLANKETS"
  | "PILLOWS"
  | "TOILETRIES"
  | "FOOD"
  | "WATER";
const needsOptions: Need[] = [
  "CLOTHING",
  "VOLUNTEERS",
  "BLANKETS",
  "PILLOWS",
  "TOILETRIES",
  "FOOD",
  "WATER",
];

const AddListing = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");
  const [userId, setUserId] = useState("");
  const [selectedNeeds, setSelectedNeeds] = useState<Need[]>([]);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const toggleNeed = (need: Need) => {
    setSelectedNeeds((currentNeeds) =>
      currentNeeds.includes(need)
        ? currentNeeds.filter((n) => n !== need)
        : [...currentNeeds, need]
    );
  };

  useEffect(() => {
    /**
     * Auto sets certain fields of posting from the database.
     * @returns
     */
    const setFields = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("User must be logged in to add a listing.");
        return;
      } else {
        const { data: org, error } = await supabase
          .from("OrganizationTable")
          .select()
          .eq("org_uuid", user.id)
          .single();

        if (error) {
          console.log(error);
        }

        if (org) {
          setName(org.orgname);
          setContact(org.contact);
          setLocation(org.address);
          setUserId(user.id);
        }
      }
    };
    setFields();
  }, []);

  /**
   * Handles the submitting of the posting details.
   * @param e the event of submitting the form
   * @returns
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedNeeds.length === 0) {
      setSubmitAttempted(true);
      return;
    }

    setSubmitAttempted(false);
    const date = new Date();

    const { data, error } = await supabase.from("ListingTable").insert([
      {
        name: name,
        contact: contact,
        address: location,
        tags: { needs: selectedNeeds },
        created_at: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
        user_id: userId,
      },
    ]);

    if (error) {
      console.error("Error adding listing", error);
    } else {
      console.log("Added listing", data);
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white p-6 border border-gray-300 shadow-sm rounded-md">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  readOnly={true}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500
                // ...continuing from the previous input element
                text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Name"
                  value={name}
                />
              </div>
              <div>
                <label htmlFor="contact" className="sr-only">
                  Contact
                </label>
                <input
                  id="contact"
                  name="contact"
                  type="text"
                  autoComplete="contact"
                  readOnly={true}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Contact"
                  value={contact}
                />
              </div>
              <div>
                <label htmlFor="location" className="sr-only">
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  autoComplete="location"
                  readOnly={true}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Location"
                  value={location}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {needsOptions.map((need) => (
                <button
                  key={need}
                  type="button"
                  onClick={() => toggleNeed(need)}
                  className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
                    selectedNeeds.includes(need)
                      ? "bg-blue-500 text-white"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {need}
                </button>
              ))}
              {/* Display error message if no needs are selected and submit was attempted */}
              {submitAttempted && selectedNeeds.length === 0 && (
                <p className="text-red-500 text-xs italic">
                  Please select at least one need.
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add Listing
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddListing;
