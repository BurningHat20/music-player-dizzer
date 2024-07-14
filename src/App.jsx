import React from "react";
import SearchBar from "./components/SearchBar";
import TrackList from "./components/TrackList";
import Player from "./components/Player";
import Playlist from "./components/Playlist";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-black text-gray-100 relative">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80')",
          backgroundBlendMode: "multiply",
        }}
      ></div>
      <div className="relative z-10 max-w-6xl mx-auto p-8">
        <h1 className="text-5xl font-bold mb-8 text-center text-shadow text-purple-300">
          Deezer Music Player
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <SearchBar />
            <TrackList />
          </div>
          <div>
            <Playlist />
          </div>
        </div>
      </div>
      <Player />
    </div>
  );
}

export default App;
