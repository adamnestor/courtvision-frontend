import React, { createContext, useContext, useReducer } from "react";
import {
  ParlayPick,
  ParlayBuilderState,
  ParlayBuilderAction,
  ParlayBuilderContextType,
} from "../types/parlay";

const initialState: ParlayBuilderState = {
  picks: [],
  isOpen: false,
};

const reducer = (
  state: ParlayBuilderState,
  action: ParlayBuilderAction
): ParlayBuilderState => {
  switch (action.type) {
    case "ADD_PICK":
      return {
        ...state,
        picks: [...state.picks, action.pick],
        isOpen: true, // Auto-open panel when adding
      };
    case "REMOVE_PICK":
      return {
        ...state,
        picks: state.picks.filter((pick) => pick.id !== action.id),
      };
    case "CLEAR_PICKS":
      return {
        ...state,
        picks: [],
      };
    case "TOGGLE_PANEL":
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    default:
      return state;
  }
};

export const ParlayBuilderContext = createContext<
  ParlayBuilderContextType | undefined
>(undefined);

export const ParlayBuilderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addPick = (pick: ParlayPick) => {
    dispatch({ type: "ADD_PICK", pick });
  };

  const removePick = (id: string) => {
    dispatch({ type: "REMOVE_PICK", id });
  };

  const clearPicks = () => {
    dispatch({ type: "CLEAR_PICKS" });
  };

  const togglePanel = () => {
    dispatch({ type: "TOGGLE_PANEL" });
  };

  return (
    <ParlayBuilderContext.Provider
      value={{ state, addPick, removePick, clearPicks, togglePanel }}
    >
      {children}
    </ParlayBuilderContext.Provider>
  );
};

// Custom hook for using the context
export const useParlayBuilder = () => {
  const context = useContext(ParlayBuilderContext);
  if (context === undefined) {
    throw new Error(
      "useParlayBuilder must be used within a ParlayBuilderProvider"
    );
  }
  return context;
};
