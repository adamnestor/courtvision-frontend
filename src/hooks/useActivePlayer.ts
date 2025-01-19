import { create } from "zustand";
import { PlayerDetailStats } from "../types/player";

interface ActivePlayerState {
  playerId: number | null;
  playerStats: PlayerDetailStats | null;
  isLoading: boolean;
  error: string | null;
  setPlayerId: (id: number | null) => void;
  setPlayerStats: (stats: PlayerDetailStats | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useActivePlayer = create<ActivePlayerState>((set) => ({
  playerId: null,
  playerStats: null,
  isLoading: false,
  error: null,
  setPlayerId: (id) => set({ playerId: id }),
  setPlayerStats: (stats) => set({ playerStats: stats }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));
