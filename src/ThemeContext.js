import { createContext } from "react";

const ThemeContext = createContext("blue"); // Note: if you use createContext("blue", () => {}); here () => {} will throw warning like 31 bit integer value

export default ThemeContext;
