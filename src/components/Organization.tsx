import React from "react";

interface Props {
  orgID: string;
  orgName: string;
  email: string;
  address: string;
}

export const Organization = ({
  orgID,
  orgName,
  email,
  address,
}: Props) => {
  return (
    <div className="flex flex-col rounded-lg bg-white border-blue-700 border-2 max-w-sm mt-18">
      <div className="flex flex-col justify-start p-4">
        <h4 className="mb-4 text-2xl font-bold text-blue-700">
          {orgName}
        </h4>
        <div className="mb-2 text-black flex">
          <p className="font-medium pr-2">OrgID:</p> <p>{orgID}</p>
        </div>
        <div className="mb-2 text-black flex">
          <p className="font-medium pr-2">Email:</p> <p>{email}</p>
        </div>
        <div className="mb-6 text-black">
          <p className="font-medium pr-2">Address:</p> <p>{address}</p>
        </div>
        <button
          onClick={() => {
            window.location.href = `/organization/${orgID}`;
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Learn more about {orgName}
        </button>
      </div>
    </div>
  );
};
