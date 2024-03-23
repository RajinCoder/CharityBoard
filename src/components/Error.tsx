interface Props {
  errorMessage: string;
}

/**
 * Displays an error on a timer along with a sound.
 * @param param0 the error message
 * @returns a component that displays an error
 */
const Error = ({ errorMessage }: Props) => {
  return (
    <div className="flex self-center justify-center shadow-sm bg-red-200 px-4 py-8 rounded-lg border border-red-700 text-red-600 w-[15vw]">
      {errorMessage}
    </div>
  );
};

export default Error;
