import React, { useEffect, useRef } from "react";

import UserDetail from "../table/UserDetail";
import { User } from "../../models/users.model";

interface Props {
  user: User | null;
  onClose?: () => void;
}

export default function UserModal({ user, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!user) return;

    lastFocusedRef.current = document.activeElement as HTMLElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const dialog = dialogRef.current!;
    const focusables = getFocusable(dialog);
    (focusables[0] ?? dialog).focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        return;
      }
      if (e.key === "Tab") {
        const list = getFocusable(dialog);
        if (list.length === 0) {
          e.preventDefault();
          dialog.focus();
          return;
        }
        const current = document.activeElement as HTMLElement;
        const idx = list.indexOf(current);
        const goingBack = e.shiftKey;
        let nextIdx = idx;

        if (goingBack) {
          nextIdx = idx <= 0 ? list.length - 1 : idx - 1;
        } else {
          nextIdx = idx === list.length - 1 ? 0 : idx + 1;
        }
        e.preventDefault();
        list[nextIdx].focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      lastFocusedRef.current?.focus();
    };
  }, [user, onClose]);

  if (!user) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,.5)" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="user-modal-title"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        className="modal-dialog modal-lg modal-dialog-centered"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        <div className="modal-content shadow-lg">
          <div className="modal-header">
            <h5 id="user-modal-title" className="modal-title">
              {user.firstName} {user.lastName}
            </h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose} />
          </div>

          <div className="modal-body">
            <UserDetail user={user} />
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Chiudi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helpers
function getFocusable(root: HTMLElement): HTMLElement[] {
  const selectors = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "[tabindex]:not([tabindex='-1'])",
  ];
  return Array.from(root.querySelectorAll<HTMLElement>(selectors.join(","))).filter(
    (el) => el.offsetParent !== null || el === document.activeElement
  );
}
