import { User } from "./users.model";

export interface UsersState {
    isLoading: boolean;

    users: User[];
    filteredUsers: User[];
    roles: string[];
    userSelected: User | null;
    darktheme: boolean;
    filters: Filters;
    setFilters: (patch: Partial<Filters>) => void;
    setTheme: (theme: boolean) => void;
    setLoading: (v: boolean) => void;
    resetFilters: () => void;
    fetchUsers: () => Promise<void>;
    limit: number;
    bumpLimitAndRefetch: (step?: number) => void;
    selectUser: (user: User | null) => void;
    total: number;
}
export interface Filters {
    role: string;
    searchString: string;
}
