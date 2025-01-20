import { ReactNode, useReducer } from "react";
import { ParlayBuilderContext } from "./parlay-builder-context";
import { ParlayPick } from "../types/parlay";

type ParlayBuilderAction =
  | { type: "ADD_PICK"; pick: ParlayPick }
  | { type: "REMOVE_PICK"; id: string }
  | { type: "CLEAR_PICKS" }
  | { type: "TOGGLE_PANEL" };

const parlayBuilderReducer = (
  state: { picks: ParlayPick[]; isOpen: boolean },
  action: ParlayBuilderAction
) => {
  switch (action.type) {
    case "ADD_PICK":
      return { ...state, picks: [...state.picks, action.pick] };
    case "REMOVE_PICK":
      return {
        ...state,
        picks: state.picks.filter((pick) => pick.id !== action.id),
      };
    case "CLEAR_PICKS":
      return { ...state, picks: [] };
    case "TOGGLE_PANEL":
      return { ...state, isOpen: !state.isOpen };
    default:
      return state;
  }
};

interface ParlayBuilderProviderProps {
  children: ReactNode;
}

export const ParlayBuilderProvider = ({
  children,
}: ParlayBuilderProviderProps) => {
  const [state, dispatch] = useReducer(parlayBuilderReducer, {
    picks: [],
    isOpen: false,
  });

  const value = {
    state,
    addPick: (pick: ParlayPick) => dispatch({ type: "ADD_PICK", pick }),
    removePick: (id: string) => dispatch({ type: "REMOVE_PICK", id }),
    clearPicks: () => dispatch({ type: "CLEAR_PICKS" }),
    togglePanel: () => dispatch({ type: "TOGGLE_PANEL" }),
  };

  return (
    <ParlayBuilderContext.Provider value={value}>
      {children}
    </ParlayBuilderContext.Provider>
  );
};
