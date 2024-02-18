'use client';
import React, { useState, useEffect, useRef } from 'react';

export function Filters() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const dropdownRef = useRef<HTMLDivElement>(null); // Specify the element type

  const handleFilterSelect = (filter: string) => {
    if (!selectedFilters.includes(filter)) {
      setSelectedFilters((prevFilters) => [...prevFilters, filter]);
    }
  };

  const removeFilter = (filter: string, event: React.MouseEvent) => { // Specify the event type
    event.stopPropagation(); // Prevent the dropdown from toggling
    setSelectedFilters((prevFilters) => prevFilters.filter((f) => f !== filter));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => { // Specify the event type
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      // Cleanup the event listener
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]); // This effect depends on the `isOpen` state

  return (
    <div className="relative flex items-center space-x-2" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="px-3 py-1 text-black bg-white border border-black rounded-md text-sm flex items-center justify-start mt-10 mb-5"
      >
        <span className="font-semibold ml-[-2px]">Filters:</span>
      </button>
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
            <button className="block w-full px-4 py-2 text-left hover:bg-gray-100" onClick={() => handleFilterSelect('Clothing')}>Clothing</button>
            <button className="block w-full px-4 py-2 text-left hover:bg-gray-100" onClick={() => handleFilterSelect('Volunteers')}>Volunteers</button>
            <button className="block w-full px-4 py-2 text-left hover:bg-gray-100" onClick={() => handleFilterSelect('Blankets')}>Blankets</button>
            <button className="block w-full px-4 py-2 text-left hover:bg-gray-100" onClick={() => handleFilterSelect('Pillows')}>Pillows</button>
            <button className="block w-full px-4 py-2 text-left hover:bg-gray-100" onClick={() => handleFilterSelect('Toiletries')}>Toiletries</button>
            <button className="block w-full px-4 py-2 text-left hover:bg-gray-100" onClick={() => handleFilterSelect('Food')}>Food</button>
            <button className="block w-full px-4 py-2 text-left hover:bg-gray-100" onClick={() => handleFilterSelect('Water')}>Water</button>
          </div>
        </div>
      )}
    </div>
  );
}
