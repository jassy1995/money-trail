import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "../../lib/http"
import axios from "axios";

export const useGetUsers = ({ page, limit }) => {
    const { data, isLoading, isError, error, isFetching, isPreviousData } = useQuery({
        queryKey: ["users", page],
        queryFn: () => http.get(`/users?page=${page}&limit=${limit}`),
        keepPreviousData: true,
        staleTime: Infinity,
    });
    return { data, isLoading, isError, error, isFetching, isPreviousData };
};

export const useGetActiveUsers = ({ page, limit }) => {
    const { data, isLoading, isError, error, isFetching, isPreviousData } = useQuery({
        queryKey: ["users-active", page],
        queryFn: () => http.get(`/users-active?page=${page}&limit=${limit}`),
        keepPreviousData: true,
        staleTime: Infinity
    });
    return { data, isLoading, isError, error, isFetching, isPreviousData };
};

export const useGetUserById = (id) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["user"], queryFn: () =>
            http.get(`/users?user_id=${id}`)
    });
    return { data, isLoading, isError };
};

export const useCreateUser = () => {
    const queryClient = useQueryClient()
    const { mutate, mutateAsync, isLoading } = useMutation({
        mutationFn: (payload) => {
            return http.post("/create-user", payload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
        },
    });
    return { mutate, mutateAsync, isLoading };
};

export const useAddUser = () => {
    const queryClient = useQueryClient()
    const { mutate, mutateAsync, isLoading } = useMutation({
        mutationFn: (payload) => {
            return http.post("/add-user", payload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] })
        },
    });
    return { mutate, mutateAsync, isLoading };
};

export const useResetPassword = () => {
    const { mutate, mutateAsync, isLoading } = useMutation({
        mutationFn: (payload) => {
            return http.post("/reset-password", payload);
        },
    });
    return { mutate, mutateAsync, isLoading };
};

export const useDeactiveUser = () => {
    const { mutate, mutateAsync, isLoading } = useMutation({
        mutationFn: (payload) => {
            return http.post("/change-status", payload);
        },
    });
    return { mutate, mutateAsync, isLoading };
};

export const useSignUpAsMerchant = () => {
    const { mutate, mutateAsync, isLoading } = useMutation({
        mutationFn: (payload) => {
            return axios.post("https://sellbackend.creditclan.com/merchantclan/public/index.php/api/register", payload);
        },
    });
    return { mutate, mutateAsync, isLoading };
};