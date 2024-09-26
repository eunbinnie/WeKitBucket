"use client";

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from "react";

import Portal from "./Portal";

export interface IModal {
  active: boolean;
  children?: React.ReactNode;
  close: () => void;
  callbackClose?: () => void;
}

function Modal({ active, children, close, callbackClose }: IModal) {
  const [visible, setVisible] = useState<boolean>(active);

  const closeEvent = () => {
    close();
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null;

    if (active) {
      setVisible(true);
    } else {
      timer = setTimeout(() => {
        setVisible(false);
        if (callbackClose) {
          callbackClose();
        }
      }, 250);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [active]);

  return (
    <>
      {visible && (
        <Portal>
          <div
            className={`fill-mode-forwards fixed inset-0 z-[9999] flex items-center justify-center ${active ? "animate-fade-in" : "animate-fade-out"}`}
          >
            <div onClick={closeEvent} className="fixed -z-[1] h-full w-full bg-primary-gray-500/30" />
            {children}
          </div>
        </Portal>
      )}
    </>
  );
}

export default Modal;
