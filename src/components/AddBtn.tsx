// AddBtn.tsx
import { useNavigate } from 'react-router-dom';

const AddBtn = () => {
  let navigate = useNavigate();

  const navigateToAddPage = () => {
    navigate('/add-listing'); 
  };

  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={navigateToAddPage}
        className="p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out flex items-center justify-center"
        aria-label="Add"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </div>
  );
};

export default AddBtn;

