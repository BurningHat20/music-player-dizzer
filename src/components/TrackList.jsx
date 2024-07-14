// TrackList.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentTrack,
  setIsPlaying,
  addToPlaylist,
} from "../store/playerSlice";
import { FaPlay, FaPlus } from "react-icons/fa";
import SongMenu from "./SongMenu";

function TrackListItem({ track, onPlay, onAddToPlaylist, onOpenMenu }) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg mb-2 hover:bg-gray-700 transition-colors duration-200">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => onOpenMenu(track)}
      >
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
          onClick={() => onAddToPlaylist(track)}
          className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors duration-200"
          aria-label="Add to playlist"
        >
          <FaPlus className="text-white" />
        </button>
      </div>
    </div>
  );
}

function TrackList() {
  const { searchResults, loading, error, currentTrack, isPlaying } =
    useSelector((state) => state.player);
  const dispatch = useDispatch();
  const [selectedTrack, setSelectedTrack] = useState(null);

  const handlePlayTrack = (track) => {
    dispatch(setCurrentTrack(track));
    dispatch(setIsPlaying(true));
  };

  const handlePauseTrack = () => {
    dispatch(setIsPlaying(false));
  };

  const handleAddToPlaylist = (track) => {
    dispatch(addToPlaylist(track));
  };

  const handleOpenMenu = (track) => {
    setSelectedTrack(track);
  };

  const handleCloseMenu = () => {
    setSelectedTrack(null);
  };

  if (loading)
    return <div className="text-center text-purple-300">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-purple-300 mb-4">
        Search Results
      </h2>
      {searchResults.length === 0 ? (
        <p className="text-gray-400">
          No tracks found. Try searching for something!
        </p>
      ) : (
        <div className="space-y-2">
          {searchResults.map((track) => (
            <TrackListItem
              key={track.id}
              track={track}
              onPlay={handlePlayTrack}
              onAddToPlaylist={handleAddToPlaylist}
              onOpenMenu={handleOpenMenu}
            />
          ))}
        </div>
      )}
      {selectedTrack && (
        <SongMenu
          track={selectedTrack}
          isPlaying={isPlaying && currentTrack.id === selectedTrack.id}
          onPlay={() => handlePlayTrack(selectedTrack)}
          onPause={handlePauseTrack}
          onAddToPlaylist={() => handleAddToPlaylist(selectedTrack)}
          onClose={handleCloseMenu}
        />
      )}
    </div>
  );
}

export default TrackList;
