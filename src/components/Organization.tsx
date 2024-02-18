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
                <h4 className="mb-2 text-xl flex flex-row justify-between font-medium text-black">
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
            </div>
        </div>
    );
};
