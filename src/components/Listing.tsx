import Tags from "./Tags";

interface Props {
  orgName: string;
  orgNumber: string;
  orgLoc: string;
  orgNeeds: string[];
}
export const Listing = ({ orgName, orgNumber, orgLoc, orgNeeds }: Props) => {
  return (
    <div className="flex flex-col rounded-lg bg-white border-blue-700 border-2 max-w-sm mt-28">
      <div className="flex flex-col justify-start p-4">
        <h4 className="mb-2 text-xl font-medium self-center text-black">
          {orgName}
        </h4>
        <div className="mb-2 text-black flex">
          <p className="font-medium pr-2">Contact: </p> <p>{orgNumber}</p>
        </div>
        <div className="mb-2 text-black flex">
          <p className="font-medium pr-2">Location: </p> <p>{orgLoc}</p>
        </div>
        <div className="mb-6 text-black flex items-center flex-wrap">
          <p className="font-medium pr-2">Need:</p>
          {orgNeeds.map((need, index) => (
            <Tags key={index} name={need} />
          ))}
        </div>
        <p className="text-xs text-neutral-500 dark:text-neutral-800">
          Last updated 3 mins ago
        </p>
      </div>
    </div>
  );
};
