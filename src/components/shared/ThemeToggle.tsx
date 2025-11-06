import React from "react";
import { useUsers } from "../../store/users.store";
export default function ThemeToggle() {
    const store = useUsers();

return (
  <div className="w-25">
    <button
      className="btn btn-primary bg-purple"
      onClick={() => store.setTheme(!store.darktheme)}
    >
      {!store.darktheme ? (
        <>
          <i className="bi bi-moon-fill" aria-label="Dark theme"></i> Dark Theme
        </>
      ) : (
        <>
          <i className="bi bi-brightness-high-fill" aria-label="Light theme"></i> Light Theme
        </>
      )}
    </button>
  </div>
);}