import React from "react";
import { render } from "react-dom";
import Pet from "./Pet";

// your code is here
const App = () => {
  return (
    <div>
      <h1></h1>
      <Pet name="Luna" animal="Dog" breed="Havanese"></Pet>
      <Pet name="Pepper" animal="Bird" breed="Cockatiel"></Pet>
      <Pet name="Doink" animal="Cat" breed="Mixed"></Pet>
    </div>
  );
};

render(<App />, document.getElementById("root"));
