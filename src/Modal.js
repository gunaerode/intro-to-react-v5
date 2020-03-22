import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// No reference should be there for ssr
let modalRoot;

const Modal = ({ children }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    modalRoot = modalRoot ? modalRoot : document.getElementById("modal");
    modalRoot.appendChild(elRef.current);
    return () => modalRoot.removeChild(elRef.current); // Only run when modal close kind of unmound function in this moment
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
