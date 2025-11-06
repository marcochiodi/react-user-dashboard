import React from "react";
import { useUsers } from "../../store/users.store"

function Search() {
    // Search input
    const searchString = useUsers(s => s.filters.searchString)
    const setFilters = useUsers(s => s.setFilters)
    return (
        <input
            aria-label="Search a user"
            className="form-control"
            placeholder="Search a user..."
            value={searchString}
            onChange={(e) => setFilters({ searchString: e.target.value })}
        />)

}
export default Search;




