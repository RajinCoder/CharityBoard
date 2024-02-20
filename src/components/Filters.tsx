"use client";
import React, { useState, useEffect, useRef } from "react";
import Tags from "./Tags";

export function Filters() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const tags = [
    "Clothing",
    "Volunteers",
    "Blankets",
    "Pillows",
    "Toiletries",
    "Food",
    "Water",
  ];
  const toggleDropdown = () => setIsOpen(!isOpen);
  const dropdownRef = useRef<HTMLDivElement>(null); // Specify the element type

  const handleFilterSelect = (filter: string) => {
    if (!selectedFilters.includes(filter)) {
      setSelectedFilters((prevFilters) => [...prevFilters, filter]);
    }
  };

  const removeFilter = (filter: string, event: React.MouseEvent) => {
    // Specify the event type
    event.stopPropagation(); // Prevent the dropdown from toggling
    setSelectedFilters((prevFilters) =>
      prevFilters.filter((f) => f !== filter)
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Specify the event type
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      // Cleanup the event listener
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]); // This effect depends on the `isOpen` state

  return (
    <div className="relative  flex items-center space-x-2" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="px-3 py-1 text-black bg-white border border-black rounded-md text-sm flex items-center justify-start mt-10 mb-5"
      >
        <span className="font-semibold ml-[-2px]">Filters:</span>
      </button>
      {selectedFilters.map((filter, index) => (
        <div
          key={index}
          className="flex rounded-3xl border-2 border-neutral-50 mt-4 py-1 px-2 text-xs uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out bg-blue-700 hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-blue-600"
        >
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
            {tags.map((need, index) => (
              <Tags
                key={index}
                onClick={() => handleFilterSelect(need)}
                name={need}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
