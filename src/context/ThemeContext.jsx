import { createContext, useEffect, useReducer } from "react";

export const ThemeContext = createContext();

const themeReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_MODE":
      return { ...state, mode: action.payload };

    default:
      return state;
  }
};

// eslint-disable-next-line react/prop-types
export function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, {
    mode: localStorage.getItem("mode") || "dark",
  });

  useEffect(() => {
    localStorage.setItem("mode", state.mode);
  }, [state.mode]);
  const changeMode = (mode) => {
    dispatch({ type: "CHANGE_MODE", payload: mode });
  };
  return (
    <ThemeContext.Provider value={{ ...state, changeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
