import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setVolume } from "../store/playerSlice";
import { FaVolumeDown, FaVolumeUp } from "react-icons/fa";

function VolumeControl() {
  const volume = useSelector((state) => state.player.volume);
  const dispatch = useDispatch();

  const handleVolumeChange = (e) => {
    dispatch(setVolume(parseFloat(e.target.value)));
  };

  return (
    <div className="flex items-center space-x-2">
      <FaVolumeDown className="text-gray-400" />
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
        className="w-24 accent-purple-500"
      />
      <FaVolumeUp className="text-gray-400" />
    </div>
  );
}

export default VolumeControl;
