import { useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import http from "../../lib/http"
import { apiKey } from "../../lib/util";
import axios from "axios";


export const useCreatePaymentRecord = () => {
    const queryClient = useQueryClient()
    const { mutate, mutateAsync, isLoading } = useMutation({
        mutationFn: (payload) => {
            return http.post("/create-record", payload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['payment-records'] })
        },
    });
    return { mutate, mutateAsync, isLoading };
};
const fetchPaymentRecords = async ({ pageParam = 0, queryKey }) => {
    const limit = queryKey[1]?.pageSize;
    const searchParam = queryKey[2]?.searchParam;
    const isSearched = queryKey[3]?.isSearched;
    if (!!searchParam && isSearched) {
        return http.get(`/search?query=${searchParam}`);
    } else {
        return http.get(`/payment-records?cursor=${+pageParam}&page_size=${limit}`);
    }

}
export const useGetPaymentRecords = ({ pageSize, searchParam, isSearched }) => {
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ['payment-records', { pageSize }, { searchParam }, { isSearched }],
        queryFn: fetchPaymentRecords,
        initialPageParam: 0,
        keepPreviousData: true,
        staleTime: Infinity,
        getNextPageParam: (lastPage, pages) => lastPage.data.cursor,
    });
    return {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    };
};
export const useApprove = () => {
    const { mutate, mutateAsync, isLoading } = useMutation({
        mutationFn: (payload) => {
            return http.post("/approve", payload);
        },
    });
    return { mutate, mutateAsync, isLoading };
};
export const useReject = () => {
    const { mutate, mutateAsync, isLoading } = useMutation({
        mutationFn: (payload) => {
            return http.post("/reject", payload);
        },
    });
    return { mutate, mutateAsync, isLoading };
};
export const uploadDocumentToServer = async (formData) => {
    try {
        const { data: { status, fullpath } } = await axios.post(`https://mobile.creditclan.com/api/v3/file/upload`, formData, { headers: { "x-api-key": apiKey } });
        if (status) return { status, file_url: fullpath }
        else return { status: false, file_url: '' };
    } catch (error) {
        console.log(error)
        return { status: false, file_url: '' }
    }
}
export const getRequestById = async (request_id) => {
    try {
        const { data: { data: request } } = await http.get(`https://lendnode.creditclan.com/request_by_id/${request_id}`);
        return request
    } catch (error) {
        console.log(error)
        return null;
    }
}