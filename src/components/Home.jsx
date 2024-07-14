import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentTrack,
  setIsPlaying,
  addToPlaylist,
  searchTracks,
} from "../store/playerSlice";
import { FaPlay, FaPlus } from "react-icons/fa";
import SongMenu from "./SongMenu";

const getRandomColor = () => {
  const colors = [
    "bg-purple-600",
    "bg-blue-600",
    "bg-green-600",
    "bg-red-600",
    "bg-yellow-600",
    "bg-pink-600",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

function SongCard({ track, onPlay, onAddToPlaylist, onOpenMenu }) {
  const bgColor = getRandomColor();

  return (
    <div
      className={`relative group overflow-hidden rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-2 ${bgColor}`}
    >
      <img
        src={track.album.cover_medium}
        alt={track.title}
        className="w-full h-40 sm:h-48 object-cover cursor-pointer"
        onClick={() => onOpenMenu(track)}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={() => onPlay(track)}
          className="p-2 sm:p-3 bg-green-500 rounded-full text-white mr-2 transform transition-transform duration-300 hover:scale-110"
          aria-label="Play"
        >
          <FaPlay className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
        <button
          onClick={() => onAddToPlaylist(track)}
          className="p-2 sm:p-3 bg-white text-black rounded-full transform transition-transform duration-300 hover:scale-110"
          aria-label="Add to playlist"
        >
          <FaPlus className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
      </div>
      <div className="p-3 sm:p-4">
        <h3 className="text-sm sm:text-lg font-semibold text-white truncate">
          {track.title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-300">{track.artist.name}</p>
      </div>
    </div>
  );
}

function Home() {
  const dispatch = useDispatch();
  const { currentTrack, isPlaying } = useSelector((state) => state.player);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);

  useEffect(() => {
    const fetchTracks = async () => {
      setLoading(true);
      try {
        const result = await dispatch(searchTracks("top charts")).unwrap();
        setTracks(result);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch tracks. Please try again later.");
        setLoading(false);
      }
    };

    fetchTracks();
  }, [dispatch]);

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
    <div className="px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-purple-300 mb-8">
        Discover Top Tracks
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {tracks.slice(0, 10).map((track) => (
          <SongCard
            key={track.id}
            track={track}
            onPlay={handlePlayTrack}
            onAddToPlaylist={handleAddToPlaylist}
            onOpenMenu={handleOpenMenu}
          />
        ))}
      </div>
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

export default Home;
