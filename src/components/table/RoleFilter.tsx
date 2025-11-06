import React from "react";
import { useUsers } from "../../store/users.store";
export default function RoleFilter() {
  const roles = useUsers((s) => s.roles);
  const role = useUsers((s) => s.filters.role);
  const setFilters = useUsers((s) => s.setFilters);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilters({ role: value === "all" ? "" : value });
  };

  return (
    <select
      aria-label="Role selection"
      name="role"
      id="role"
      className="form-select"
      value={role || "all"}
      onChange={handleChange}
    >
      <option value="all">All</option>
      {roles.map((r) => (
        <option key={r} value={r}>
          {r}
        </option>
      ))}
    </select>
  )
}