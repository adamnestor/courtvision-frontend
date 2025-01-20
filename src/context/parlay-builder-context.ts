import { createContext } from "react";
import { ParlayPick } from "../types/parlay";

export interface ParlayBuilderState {
  picks: ParlayPick[];
  isOpen: boolean;
}

export interface ParlayBuilderContextType {
  state: ParlayBuilderState;
  addPick: (pick: ParlayPick) => void;
  removePick: (id: string) => void;
  clearPicks: () => void;
  togglePanel: () => void;
}

export const ParlayBuilderContext =
  createContext<ParlayBuilderContextType | null>(null);
