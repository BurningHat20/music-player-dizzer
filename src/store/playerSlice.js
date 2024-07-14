import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// This creates and exports the searchTracks action
export const searchTracks = createAsyncThunk(
  'player/searchTracks',
  async (query) => {
    const options = {
      method: 'GET',
      url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
      params: { q: query },
      headers: {
        'x-rapidapi-key': '23a7220c4amsh52a0161f427213bp1916a8jsn14b62565071e',
        'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);
    return response.data.data;
  }
);

const initialState = {
  currentTrack: null,
  isPlaying: false,
  volume: 0.5,
  progress: 0,
  duration: 0,
  searchResults: [],
  playlist: [],
  loading: false,
  error: null,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setCurrentTrack: (state, action) => {
      state.currentTrack = action.payload;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setVolume: (state, action) => {
      state.volume = action.payload;
    },
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    addToPlaylist: (state, action) => {
      state.playlist.push(action.payload);
    },
    removeFromPlaylist: (state, action) => {
      state.playlist = state.playlist.filter(track => track.id !== action.payload.id);
    },
    clearPlaylist: (state) => {
      state.playlist = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchTracks.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchTracks.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchTracks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setCurrentTrack,
  setIsPlaying,
  setVolume,
  setProgress,
  setDuration,
  addToPlaylist,
  removeFromPlaylist,
  clearPlaylist,
} = playerSlice.actions;

// No need to export searchTracks here, as it's already exported at the top

export default playerSlice.reducer;