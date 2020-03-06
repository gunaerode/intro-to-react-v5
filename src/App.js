import React from "react";
import { render } from "react-dom";
import Pet from "./Pet";

// your code is here
const App = () => {
  return React.createElement("div", { id: "app-component-id" }, [
    React.createElement("h1", {}, "Adopt me!"),
    React.createElement(Pet, {
      name: "Luna",
      animal: "dog",
      breed: "Havanese"
    }),
    React.createElement(Pet, { name: "Pepper", animal: "bird", breed: "" }),
    React.createElement(Pet, { name: "Doink", animal: "cat", breed: "stray" })
  ]);
};

render(React.createElement(App), document.getElementById("root"));
