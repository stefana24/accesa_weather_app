import ThemeContext from "./ThemeContext";
import { useState } from "react";
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const themeCtx = {
    theme,
    setTheme: (name) => {
      setTheme(name);
    },
  };
  return (
    <ThemeContext.Provider value={themeCtx}> {children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
