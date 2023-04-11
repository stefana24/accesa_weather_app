import { createContext } from "react";
const ThemeContext = createContext({
  theme: "",
  handleChange: () => {},
});
export default ThemeContext;
