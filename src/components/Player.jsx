import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsPlaying,
  setProgress,
  setDuration,
  setCurrentTrack,
} from "../store/playerSlice";
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from "react-icons/fa";
import VolumeControl from "./VolumeControl";

function Player() {
  const { currentTrack, isPlaying, volume, progress, duration, playlist } =
    useSelector((state) => state.player);
  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (currentTrack) {
      const index = playlist.findIndex((track) => track.id === currentTrack.id);
      if (index !== -1) {
        setCurrentTrackIndex(index);
      }
    }
  }, [currentTrack, playlist]);

  const togglePlay = () => {
    dispatch(setIsPlaying(!isPlaying));
  };

  const handleTimeUpdate = () => {
    dispatch(setProgress(audioRef.current.currentTime));
  };

  const handleLoadedMetadata = () => {
    dispatch(setDuration(audioRef.current.duration));
  };

  const handleProgressChange = (e) => {
    const time = parseFloat(e.target.value);
    dispatch(setProgress(time));
    audioRef.current.currentTime = time;
  };

  const handleNext = () => {
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    dispatch(setCurrentTrack(playlist[nextIndex]));
  };

  const handlePrevious = () => {
    const previousIndex =
      (currentTrackIndex - 1 + playlist.length) % playlist.length;
    dispatch(setCurrentTrack(playlist[previousIndex]));
  };

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-deep-purple z-10 bg-opacity-90 backdrop-filter backdrop-blur-lg shadow-lg p-2 sm:p-4 transition-all duration-300 ease-in-out transform hover:translate-y-0 translate-y-1">
      <div className="flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center w-full sm:w-1/4 mb-2 sm:mb-0">
          <img
            src={currentTrack.album.cover_small}
            alt={currentTrack.title}
            className="w-12 h-12 sm:w-16 sm:h-16 mr-2 sm:mr-4 rounded animate-pulse"
          />
          <div className="truncate">
            <h3 className="font-semibold text-purple-300 text-sm sm:text-base">
              {currentTrack.title}
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm">
              {currentTrack.artist.name}
            </p>
          </div>
        </div>
        <div className="w-full sm:w-1/2 mb-2 sm:mb-0">
          <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-2">
            <button
              onClick={handlePrevious}
              className="bg-purple-600 hover:bg-purple-700 text-white p-1 sm:p-2 rounded-full transition-colors duration-200 transform hover:scale-110"
            >
              <FaStepBackward className="text-xs sm:text-base" />
            </button>
            <button
              onClick={togglePlay}
              className="bg-green-500 hover:bg-green-600 text-white p-2 sm:p-3 rounded-full transition-colors duration-200 transform hover:scale-110"
            >
              {isPlaying ? (
                <FaPause className="text-sm sm:text-base" />
              ) : (
                <FaPlay className="text-sm sm:text-base" />
              )}
            </button>
            <button
              onClick={handleNext}
              className="bg-purple-600 hover:bg-purple-700 text-white p-1 sm:p-2 rounded-full transition-colors duration-200 transform hover:scale-110"
            >
              <FaStepForward className="text-xs sm:text-base" />
            </button>
          </div>
          <div>
            <input
              type="range"
              min="0"
              max={duration}
              value={progress}
              onChange={handleProgressChange}
              className="w-full accent-purple-500"
            />
          </div>
        </div>
        <div className="w-full sm:w-1/4 flex justify-center sm:justify-end mt-2 sm:mt-0">
          <VolumeControl />
        </div>
      </div>
      <audio
        ref={audioRef}
        src={currentTrack.preview}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
    </div>
  );
}

export default Player;
