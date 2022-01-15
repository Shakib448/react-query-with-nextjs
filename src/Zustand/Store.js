import create from "zustand";
import { devtools, redux } from "zustand/middleware";

const initialState = { character: [] };

function reducer(state, action) {
  if (action.type === "add/character") {
    return { ...state, character: [...state.character, action.payload] };
  }
  if (action.type === "remove/character") {
    return {
      ...state,
      character: state.character.filter((x) => x.id !== action.payload.id),
    };
  }
}

const useStore = create(
  // Use when Devtools need
  // devtools(redux(reducer, initialState), { name: "zustand" })
  redux(reducer, initialState)
);

export default useStore;
