import React, { useState } from "react";
import { Link } from "@reach/router";
import { css, keyframes } from "@emotion/core";
import color from "./colors.js";

const spin = keyframes`
    to {
        transform: rotate(360deg);
    }
`;

const NavBar = () => {
  const [padding, setPadding] = useState(15);
  return (
    <header
      onClick={() => setPadding(padding + 4)}
      css={css`
        background-color: ${color.dark};
        padding: ${padding}px;
        position: sticky;
        top: 0;
        z-index: 10;
      `}
      role="presentation"
    >
      <Link to="/">Adopte Me!</Link>
      <span
        css={css`
          font-size: 60px;
          animation: 0.1s ${spin} linear infinite;
          &:hover {
            font-size: 60px;
            animation: 1s ${spin} linear infinite;
          }
        `}
        aria-label="logo"
        role="img"
      >
        🦁
      </span>
    </header>
  );
};

export default NavBar;
