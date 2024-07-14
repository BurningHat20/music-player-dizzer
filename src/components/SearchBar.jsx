import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { searchTracks } from "../store/playerSlice";
import { FaSearch } from "react-icons/fa";
import debounce from "lodash/debounce";

function SearchBar() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  // Debounce the search function
  const debouncedSearch = useCallback(
    debounce((searchQuery) => {
      if (searchQuery.trim() !== "") {
        dispatch(searchTracks(searchQuery));
      }
    }, 300),
    [dispatch]
  );

  useEffect(() => {
    debouncedSearch(query);
    // Cancel the debounce on useEffect cleanup.
    return debouncedSearch.cancel;
  }, [query, debouncedSearch]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // We'll keep the form submission for users who prefer to hit enter
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      dispatch(searchTracks(query));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex items-center bg-transparent-dark rounded-full p-2">
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-100 mr-3 py-1 px-2 leading-tight focus:outline-none placeholder-gray-400"
          type="text"
          placeholder="Search for tracks..."
          value={query}
          onChange={handleInputChange}
        />
        <button
          className="flex-shrink-0 bg-light-purple hover:bg-purple-700 border-light-purple hover:border-purple-700 text-sm border-4 text-white py-1 px-2 rounded-full"
          type="submit"
        >
          <FaSearch />
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
