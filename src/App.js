import React from "react";
import { render } from "react-dom";
import SearchParams from "./SearchParams";

// your code is here
const App = () => {
  return (
    <div>
      <h1>Adopt me!</h1>
      <SearchParams />
    </div>
  );
};

render(<App />, document.getElementById("root"));
