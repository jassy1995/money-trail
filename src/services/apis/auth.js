import { useMutation } from "@tanstack/react-query";
import http from "../../lib/http"

export const useLogin = () => {
    const { mutate, mutateAsync, isLoading } = useMutation({
        mutationFn: (payload) => {
            return http.post("/auth", payload);
        }
    });
    return { mutate, mutateAsync, isLoading };
}