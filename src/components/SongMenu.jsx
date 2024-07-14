// SongMenu.jsx
import React, { useRef, useEffect } from "react";
import { FaPlay, FaPause, FaPlus, FaHeart, FaTimes } from "react-icons/fa";

function SongMenu({
  track,
  isPlaying,
  onPlay,
  onPause,
  onAddToPlaylist,
  onClose,
}) {
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-8 md:p-12 lg:p-16">
      <div
        ref={menuRef}
        className="bg-gray-800 rounded-lg p-6 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          <FaTimes size={24} />
        </button>
        <img
          src={track.album.cover_medium}
          alt={track.title}
          className="w-full h-40 sm:h-64 md:h-72 lg:h-80 object-cover rounded-lg mb-4"
        />
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
          {track.title}
        </h2>
        <p className="text-gray-400 mb-4">{track.artist.name}</p>
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={isPlaying ? onPause : onPlay}
            className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2 sm:p-3"
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button
            onClick={onAddToPlaylist}
            className="bg-gray-700 hover:bg-gray-600 text-white rounded-full p-2 sm:p-3"
          >
            <FaPlus />
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white rounded-full p-2 sm:p-3">
            <FaHeart />
          </button>
        </div>
        <div className="text-gray-400">
          <p>Album: {track.album.title}</p>
          <p>
            Duration: {Math.floor(track.duration / 60)}:
            {(track.duration % 60).toString().padStart(2, "0")}
          </p>
          <p>
            Release Date: {new Date(track.release_date).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SongMenu;
