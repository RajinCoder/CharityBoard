interface Props {
  name: string;
  onClick?: () => void;
}
const Tags = ({ name, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="inline-block rounded-3xl border-2 border-neutral-50 py-1 px-2 text-xs uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out bg-blue-700 hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-blue-600 "
    >
      {name}
    </button>
  );
};

export default Tags;
