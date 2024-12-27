import { Category } from "./dashboard";

export type PickCategory = Exclude<Category, "ALL">;

export interface ParlayPick {
  id: string;
  playerId: number;
  playerName: string;
  team: string;
  opponent: string;
  category: PickCategory;
  threshold: number;
  hitRate: number;
  timestamp: string;
}

export interface ParlayBuilderState {
  picks: ParlayPick[];
  isOpen: boolean;
}

export type ParlayBuilderAction =
  | { type: "ADD_PICK"; pick: ParlayPick }
  | { type: "REMOVE_PICK"; id: string }
  | { type: "CLEAR_PICKS" }
  | { type: "TOGGLE_PANEL" };

export interface ParlayBuilderContextType {
  state: ParlayBuilderState;
  addPick: (pick: ParlayPick) => void;
  removePick: (id: string) => void;
  clearPicks: () => void;
  togglePanel: () => void;
}
