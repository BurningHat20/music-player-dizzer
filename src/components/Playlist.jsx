import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentTrack,
  setIsPlaying,
  removeFromPlaylist,
  clearPlaylist,
} from "../store/playerSlice";
import { FaPlay, FaTimes, FaTrash } from "react-icons/fa";

function PlaylistItem({ track, onPlay, onRemove }) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg mb-2 hover:bg-gray-700 transition-colors duration-200">
      <div className="flex items-center">
        <img
          src={track.album.cover_small}
          alt={track.title}
          className="w-12 h-12 rounded-md mr-4"
        />
        <div>
          <h3 className="font-semibold text-gray-100">{track.title}</h3>
          <p className="text-sm text-gray-400">{track.artist.name}</p>
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onPlay(track)}
          className="p-2 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors duration-200"
          aria-label="Play track"
        >
          <FaPlay className="text-white" />
        </button>
        <button
          onClick={() => onRemove(track)}
          className="p-2 rounded-full bg-red-600 hover:bg-red-700 transition-colors duration-200"
          aria-label="Remove from playlist"
        >
          <FaTimes className="text-white" />
        </button>
      </div>
    </div>
  );
}

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
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-purple-300">Playlist</h2>
        <button
          onClick={handleClearPlaylist}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full transition-colors duration-200 flex items-center space-x-2"
          aria-label="Clear playlist"
        >
          <FaTrash />
          <span className="hidden sm:inline">Clear Playlist</span>
        </button>
      </div>
      {playlist.length === 0 ? (
        <p className="text-gray-400">
          Your playlist is empty. Add some tracks!
        </p>
      ) : (
        <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
          {playlist.map((track) => (
            <PlaylistItem
              key={track.id}
              track={track}
              onPlay={handlePlayTrack}
              onRemove={handleRemoveFromPlaylist}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Playlist;
