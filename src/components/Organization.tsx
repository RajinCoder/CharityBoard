import { Link } from "react-router-dom";

interface Props {
  uuid: string;
  orgName: string;
  email: string;
  address: string;
}

/**
 * Creates an organization card for following.
 * @param param0 the details of the organization
 * @returns
 */
export const OrganizationListing = ({
  uuid,
  orgName,
  email,
  address,
}: Props) => {
  return (
    <div className="flex flex-col rounded-lg bg-white border-blue-700 border-2 max-w-sm mt-18">
      <div className="flex flex-col justify-start p-4">
        <h4 className="mb-4 text-2xl font-bold text-blue-700">{orgName}</h4>
        <div className="mb-2 text-black flex">
          <p className="font-medium pr-2">Email:</p> <p>{email}</p>
        </div>
        <div className="mb-6 text-black flex">
          <p className="font-medium pr-2">Address:</p> <p>{address}</p>
        </div>
        <Link
          to="/organization"
          state={{ owner_id: uuid }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Learn more about {orgName}
        </Link>
      </div>
    </div>
  );
};
