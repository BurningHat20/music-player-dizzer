import React, { useRef, useEffect } from "react";
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
    const currentIndex = playlist.findIndex(
      (track) => track.id === currentTrack.id
    );
    const nextIndex = (currentIndex + 1) % playlist.length;
    dispatch(setCurrentTrack(playlist[nextIndex]));
  };

  const handlePrevious = () => {
    const currentIndex = playlist.findIndex(
      (track) => track.id === currentTrack.id
    );
    const previousIndex =
      (currentIndex - 1 + playlist.length) % playlist.length;
    dispatch(setCurrentTrack(playlist[previousIndex]));
  };

  if (!currentTrack) return null;

  return (
    <div className="bg-gray-800 border-t border-gray-700 p-2 sm:p-4">
      <div className="flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center w-full sm:w-1/3 mb-2 sm:mb-0">
          <img
            src={currentTrack.album.cover_small}
            alt={currentTrack.title}
            className="w-10 h-10 sm:w-12 sm:h-12 mr-2 sm:mr-4 rounded"
          />
          <div className="truncate">
            <h3 className="font-semibold text-purple-300 text-sm">
              {currentTrack.title}
            </h3>
            <p className="text-gray-400 text-xs">{currentTrack.artist.name}</p>
          </div>
        </div>
        <div className="w-full sm:w-1/3 mb-2 sm:mb-0">
          <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-2">
            <button
              onClick={handlePrevious}
              className="text-gray-400 hover:text-white"
            >
              <FaStepBackward />
            </button>
            <button
              onClick={togglePlay}
              className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full"
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button
              onClick={handleNext}
              className="text-gray-400 hover:text-white"
            >
              <FaStepForward />
            </button>
          </div>
          <input
            type="range"
            min="0"
            max={duration}
            value={progress}
            onChange={handleProgressChange}
            className="w-full"
          />
        </div>
        <div className="w-full sm:w-1/3 flex justify-center sm:justify-end">
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
