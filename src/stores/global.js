import { create } from "zustand";

const useGlobalStore = create((set) => ({
    data: {
        isUserFormOpen: false,
        isAppFormOpen: false,
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
}));

export default useGlobalStore;
