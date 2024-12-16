import { PropsWithChildren, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }: PropsWithChildren) => {
  const elRef = useRef<HTMLDivElement | null>(null);

  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");

    if (!modalRoot) {
      console.error("Modal root element with id 'modal' not found.");
      return;
    }

    modalRoot.appendChild(elRef.current!);

    return () => {
      modalRoot.removeChild(elRef.current!);
    };
  }, []);

  return createPortal(<>{children}</>, elRef.current);
};

export default Modal;
