export interface Pick {
  id: string; // Temporary ID for pending picks
  playerId: number;
  playerName: string;
  team: string;
  opponent: string;
  category: "POINTS" | "ASSISTS" | "REBOUNDS";
  threshold: number;
  hitRate: number;
  timestamp: string;
}

export interface ParlayBuilderState {
  picks: Pick[];
  isOpen: boolean;
}

export type ParlayBuilderAction =
  | { type: "ADD_PICK"; pick: Pick }
  | { type: "REMOVE_PICK"; id: string }
  | { type: "CLEAR_PICKS" }
  | { type: "TOGGLE_PANEL" };

export interface ParlayBuilderContextType {
  state: ParlayBuilderState;
  addPick: (pick: Pick) => void;
  removePick: (id: string) => void;
  clearPicks: () => void;
  togglePanel: () => void;
}
