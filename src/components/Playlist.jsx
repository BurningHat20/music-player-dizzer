import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentTrack,
  setIsPlaying,
  removeFromPlaylist,
  clearPlaylist,
} from "../store/playerSlice";
import { FaPlay, FaTimes, FaTrash } from "react-icons/fa";

function Playlist() {
  const { playlist } = useSelector((state) => state.player);
  const dispatch = useDispatch();

  const handlePlayTrack = (track) => {
    dispatch(setCurrentTrack(track));
    dispatch(setIsPlaying(true));
  };

  const handleRemoveFromPlaylist = (track) => {
    dispatch(removeFromPlaylist(track));
  };

  const handleClearPlaylist = () => {
    dispatch(clearPlaylist());
  };

  return (
    <div className="bg-transparent-dark bg-opacity-50 p-4 rounded-lg backdrop-filter backdrop-blur-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-shadow text-purple-300">
          Playlist
        </h2>
        <button
          onClick={handleClearPlaylist}
          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors duration-200"
        >
          <FaTrash />
        </button>
      </div>
      <div className="max-h-96 overflow-y-auto custom-scrollbar">
        {playlist.map((track) => (
          <div
            key={track.id}
            className="flex items-center justify-between bg-gray-700 bg-opacity-50 p-2 rounded mb-2 hover:bg-opacity-75 transition-all duration-200"
          >
            <div className="flex items-center">
              <img
                src={track.album.cover_small}
                alt={track.title}
                className="w-10 h-10 mr-2 rounded"
              />
              <div>
                <h3 className="font-semibold text-sm text-purple-300">
                  {track.title}
                </h3>
                <p className="text-gray-400 text-xs">{track.artist.name}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handlePlayTrack(track)}
                className="bg-green-500 hover:bg-green-600 text-white p-1 rounded-full transition-colors duration-200"
              >
                <FaPlay size={12} />
              </button>
              <button
                onClick={() => handleRemoveFromPlaylist(track)}
                className="bg-red-500 hover:bg-red-600 text-white p-1 rounded-full transition-colors duration-200"
              >
                <FaTimes size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Playlist;
