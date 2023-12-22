import { useMutation, useQueryClient } from "@tanstack/react-query";
import http from "../../lib/http"



export const useCreateRole = () => {
    const queryClient = useQueryClient()
    const { mutate, mutateAsync, isLoading } = useMutation({
        mutationFn: (payload) => {
            return http.post("/create-role", payload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['apps'] })
        },
    });
    return { mutate, mutateAsync, isLoading };
};