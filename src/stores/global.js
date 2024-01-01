import { create } from "zustand";

const useGlobalStore = create((set) => ({
    data: {
        auth_user: localStorage.getItem('money_trail_user') ? JSON.parse(localStorage.getItem('money_trail_user')) : null,
    },
    setAuthUser: (payload) =>
        set((state) => ({
            ...state,
            data: { ...state.data, auth_user: payload },
        })),
}));

export default useGlobalStore;
