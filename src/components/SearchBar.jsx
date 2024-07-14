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
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="relative">
        <input
          className="w-full bg-gray-800 text-white border border-gray-700 rounded-full py-2 px-4 pl-10 focus:outline-none focus:border-purple-500"
          type="text"
          placeholder="Search for tracks..."
          value={query}
          onChange={handleInputChange}
        />
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
      </div>
    </form>
  );
}

export default SearchBar;
