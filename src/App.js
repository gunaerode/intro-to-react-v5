import React, { useState } from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import { Provider } from "react-redux"; // Added
import SearchParams from "./SearchParams";
import Details from "./Details";
import store from "./store"; // Added
// Note: we are going to use redux instead of context hook
// import ThemeContext from "./ThemeContext";

// your code is here
const App = () => {
  // const themeHook = useState("black");
  return (
    <React.StrictMode>
      {/* <ThemeContext.Provider value={themeHook}> */}
      <Provider store={store}>
        <div>
          <header>
            <Link to="/">Adopt me!</Link>
          </header>
          <Router>
            <SearchParams path="/" />
            <Details path="/details/:id" />
          </Router>
        </div>
      </Provider>
      {/* </ThemeContext.Provider> */}
    </React.StrictMode>
  );
};

render(<App />, document.getElementById("root"));
