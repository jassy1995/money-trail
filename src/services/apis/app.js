import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "../../lib/http"



export const useGetApps = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["apps"], queryFn: () =>
            http.get(`/app-list`)
    });
    return { data, isLoading, isError };
};

export const useGetAppById = (id) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["app"], queryFn: () =>
            http.get(`/app-list?app_id=${id}`)
    });
    return { data, isLoading, isError };
};

export const useCreateApp = () => {
    const queryClient = useQueryClient()
    const { mutate, mutateAsync, isLoading } = useMutation({
        mutationFn: (payload) => {
            return http.post("/create-app", payload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['apps'] })
        },
    });
    return { mutate, mutateAsync, isLoading };
};

export const useGenearetPasswordResetLink = () => {
    const { mutate, mutateAsync, isLoading } = useMutation({
        mutationFn: (payload) => {
            return http.post("/reset-token-password", payload);
        },
    });
    return { mutate, mutateAsync, isLoading };
};