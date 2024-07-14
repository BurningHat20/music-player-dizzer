import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentTrack,
  setIsPlaying,
  addToPlaylist,
} from "../store/playerSlice";
import { FaPlay, FaPlus } from "react-icons/fa";

function TrackList() {
  const { searchResults, loading, error } = useSelector(
    (state) => state.player
  );
  const dispatch = useDispatch();

  const handlePlayTrack = (track) => {
    dispatch(setCurrentTrack(track));
    dispatch(setIsPlaying(true));
  };

  const handleAddToPlaylist = (track) => {
    dispatch(addToPlaylist(track));
  };

  if (loading)
    return <div className="text-center text-purple-300">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="mb-8">
      {searchResults.map((track) => (
        <div
          key={track.id}
          className="flex items-center justify-between bg-transparent-dark bg-opacity-50 p-4 rounded-lg shadow mb-4 hover:bg-opacity-75 transition-all duration-200"
        >
          <div className="flex items-center">
            <img
              src={track.album.cover_small}
              alt={track.title}
              className="w-12 h-12 mr-4 rounded"
            />
            <div>
              <h3 className="font-semibold text-purple-300">{track.title}</h3>
              <p className="text-gray-400">{track.artist.name}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handlePlayTrack(track)}
              className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors duration-200"
            >
              <FaPlay />
            </button>
            <button
              onClick={() => handleAddToPlaylist(track)}
              className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-full transition-colors duration-200"
            >
              <FaPlus />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TrackList;
