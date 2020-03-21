import React, { useState, lazy, Suspense } from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import ThemeContext from "./ThemeContext";
import NavBar from "./NavBar";

const Details = lazy(() => import("./Details"));
const SearchParams = lazy(() => import("./SearchParams"));

// your code is here
const App = () => {
  const themeHook = useState("black");
  return (
    <React.StrictMode>
      <ThemeContext.Provider value={themeHook}>
        <div>
          <NavBar></NavBar>
          <Suspense fallback={<h1>Loading...</h1>}>
            <Router>
              <SearchParams path="/" />
              <Details path="/details/:id" />
            </Router>
          </Suspense>
        </div>
      </ThemeContext.Provider>
    </React.StrictMode>
  );
};

render(<App />, document.getElementById("root"));
