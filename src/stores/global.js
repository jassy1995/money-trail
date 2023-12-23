import { create } from "zustand";

const useGlobalStore = create((set) => ({
    data: {
        isUserFormOpen: false,
        isAppFormOpen: false,
        auth_user: localStorage.getItem('money_trail_user') ? JSON.parse(localStorage.getItem('money_trail_user')) : null,
    },

    setOpenAddUser: (payload) =>
        set((state) => ({
            ...state,
            data: { ...state.data, isUserFormOpen: payload },
        })),
    setOpenAddApp: (payload) =>
        set((state) => ({
            ...state,
            data: { ...state.data, isAppFormOpen: payload },
        })),
    setAuthUser: (payload) =>
        set((state) => ({
            ...state,
            data: { ...state.data, auth_user: payload },
        })),
}));

export default useGlobalStore;
