import { createContext } from "react";

const ThemeContext = createContext<[string, (theme: string) => void]>([
  "blue",
  () => {}
]); // Note: for javascript - without array - if you use createContext("blue", () => {}); here () => {} will throw warning like 31 bit integer value

export default ThemeContext;
