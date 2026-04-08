"use client";
import { ReactNode, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

import css from "./Modal.module.css";

interface ModalProps {
  children: ReactNode;
}

function Modal({ children }: ModalProps) {
  const router = useRouter();

  const close = useCallback(() => router.back(), [router]);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [close]);

  if (typeof document === "undefined") return null;

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  console.log("MODAL RENDERED");

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={close}
    >
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    modalRoot,
  );
}

export default Modal;
