import SaveBtn from "./SaveBtn";
import Tags from "./Tags";
import { Link } from "react-router-dom"; // Import the Link component
import { listing } from "../types/types";

export const Listing = ({
  listingId,
  created_at,
  name,
  address,
  contact,
  tags,
}: listing) => {
  return (
    <div className="flex flex-col rounded-lg bg-white border-blue-700 border-2 max-w-sm mt-18">
      <div className="flex flex-col justify-start p-4">
        <h4 className="mb-2 text-xl flex flex-row justify-between font-medium  text-black">
          <Link to={`/organization/${listingId}`} className="hover:underline">
            {name}
          </Link>
          <SaveBtn listingId={listingId} />
        </h4>
        <div className="mb-2 text-black flex">
          <p className="font-medium pr-2">Contact: </p> <p>{contact}</p>
        </div>
        <div className="mb-2 text-black flex">
          <p className="font-medium pr-2">Location: </p> <p>{address}</p>
        </div>
        <div className="mb-6 text-black flex items-center flex-wrap">
          <p className="font-medium pr-2">Need:</p>
          {tags.needs.map((need, index) => (
            <Tags key={index} name={need} />
          ))}
        </div>
        <p className="text-xs text-neutral-500 dark:text-neutral-800">
          Last updated {created_at}
        </p>
      </div>
    </div>
  );
};
