import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import TrackList from "./components/TrackList";
import Player from "./components/Player";
import Playlist from "./components/Playlist";
import Home from "./components/Home";
import { FaSearch, FaListUl, FaHome, FaMusic, FaBars } from "react-icons/fa";

function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
      {/* Mobile header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-gray-800">
        <FaMusic className="text-purple-400 text-2xl" />
        <button onClick={toggleSidebar} className="text-white">
          <FaBars size={24} />
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 fixed md:relative z-30 w-64 bg-gray-800 h-full transition-transform duration-300 ease-in-out`}
        >
          <div className="p-4 text-center">
            <FaMusic className="text-purple-400 text-2xl mx-auto mb-2" />
            <h1 className="text-xl font-bold text-purple-400">BurningHat</h1>
            <h2 className="text-xs text-gray-400 mt-1">Music Player</h2>
          </div>
          <nav className="mt-8">
            <ul className="space-y-2">
              {[
                { id: "home", icon: FaHome, label: "Home" },
                { id: "search", icon: FaSearch, label: "Search" },
                { id: "playlist", icon: FaListUl, label: "Playlist" },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center p-2 text-base font-normal rounded-lg ${
                      activeTab === item.id
                        ? "bg-gray-700"
                        : "hover:bg-gray-700"
                    }`}
                  >
                    <item.icon className="w-6 h-6" />
                    <span className="ml-3">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-4">
            {activeTab === "home" && <Home />}
            {activeTab === "search" && (
              <div>
                <SearchBar />
                <TrackList />
              </div>
            )}
            {activeTab === "playlist" && <Playlist />}
          </main>
        </div>
      </div>

      {/* Player */}
      <Player />
    </div>
  );
}

export default App;
