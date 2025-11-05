// src/store/users.store.ts
import { create } from 'zustand'
import axios from 'axios'
import { User } from '../models/users.model'
import { Filters, UsersState } from '../models/appstate.model'



function applyFilters(users: User[], filters: Filters): User[] {
    const { role, searchString } = filters
    const q = searchString.trim().toLowerCase()

    return users.filter(u => {
        const matchesRole = role ? (u.role?.toLowerCase?.() === role.toLowerCase()) : true
        const fullName = `${u.firstName ?? ''} ${u.lastName ?? ''}`.toLowerCase()
        const matchesQuery = q ? fullName.includes(q) : true
        return matchesRole && matchesQuery
    })
}


const extractRoles = (users: User[]) =>
    Array.from(new Set(users.map(u => u.role).filter(Boolean))) as string[];
const initialFilters: Filters = { role: '', searchString: '' }

export const useUsers = create<UsersState>((set, get) => ({
    isLoading: false,
    setLoading: (v) => set({ isLoading: v }),
    users: [],
    filteredUsers: [],
    roles: [],
    userSelected: null,
    darktheme: false,
    filters: initialFilters,

    bumpLimitAndRefetch(step = 20) {
        const { isLoading, users, total, limit } = get();
        if (isLoading) return;
        if (users.length >= total && total > 0) return; // niente altro da caricare
        set({ limit: limit + step });
        void get().fetchUsers();
    },
    limit: 20,
    total: 0,

    async fetchUsers() {
        const { limit, filters } = get();
        set({ isLoading: true });
        try {
            const { data } = await axios.get<{ users: User[]; total: number }>(
                "https://dummyjson.com/users",
                { params: { limit } }
            );
            const users = data.users ?? [];
            set({
                users,
                filteredUsers: applyFilters(users, filters),
                roles: extractRoles(users),
                total: data.total ?? users.length,
                isLoading: false,
            });
        } catch {
            set({ isLoading: false });
        }
    },

    setFilters(patch) {
        const filters = { ...get().filters, ...patch }
        const filteredUsers = applyFilters(get().users, filters)
        set({ filters, filteredUsers })
    },

    resetFilters() {
        const filters = initialFilters
        const filteredUsers = applyFilters(get().users, filters)
        set({ filters, filteredUsers })
    },
    selectUser(user) {
        set({ userSelected: user })
    },
    setTheme: (theme: boolean) => {
        set({ darktheme: theme });
    }
}))
