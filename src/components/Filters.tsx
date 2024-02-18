'use client';
import React, { useState } from 'react';
export function Filters() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // Explicitly type selectedFilters as string[]
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleFilterSelect = (filter: string) => {
    if (!selectedFilters.includes(filter)) {
      setSelectedFilters(prevFilters => [...prevFilters, filter]);
    }
  };
  const removeFilter = (filter: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent the dropdown from toggling
    setSelectedFilters(prevFilters => prevFilters.filter(f => f !== filter));
  };
  return (
    <div className="relative flex items-center space-x-2">
      <button
        onClick={toggleDropdown}
        className="px-3 py-1 text-black bg-white border border-black rounded-md text-sm flex items-center justify-start mt-10 mb-5"
      >
        <span className="font-semibold ml-[-2px]">Filters:</span>
      </button>
      {/* Render selected filters next to the button with an "X" icon for removal */}
      {selectedFilters.map((filter, index) => (
        <div key={index} className="flex items-center px-2 py-1 text-sm text-black bg-gray-200 rounded-md mt-10 mb-5">
          {filter}
          <span
            onClick={(event) => removeFilter(filter, event)}
            className="ml-2 cursor-pointer"
          >
            X
          </span>
        </div>
      ))}
    {isOpen && (
    <div className="absolute left-0 w-48 bg-white border rounded-md shadow-lg z-10 top-[calc(110%-1.5rem)] -mt-">
        <div className="py-1">
            {/* Dropdown items */}
            <button className="block w-full px-4 py-2 text-left hover:bg-gray-100" onClick={() => handleFilterSelect('Clothing')}>Clothing</button>
            <button className="block w-full px-4 py-2 text-left hover:bg-gray-100" onClick={() => handleFilterSelect('Volunteers')}>Volunteers</button>
            <button className="block w-full px-4 py-2 text-left hover:bg-gray-100" onClick={() => handleFilterSelect('Blankets')}>Blankets</button>
            <button className="block w-full px-4 py-2 text-left hover:bg-gray-100" onClick={() => handleFilterSelect('Pillows')}>Pillows</button>
            <button className="block w-full px-4 py-2 text-left hover:bg-gray-100" onClick={() => handleFilterSelect('Toiletries')}>Toiletries</button>
            <button className="block w-full px-4 py-2 text-left hover:bg-gray-100" onClick={() => handleFilterSelect('Food')}>Food</button>
            <button className="block w-full px-4 py-2 text-left hover:bg-gray-100" onClick={() => handleFilterSelect('Water')}>Water</button>
            {/* Repeat for other buttons */}
            </div>
            </div>
            )}
            </div>
            );
        }