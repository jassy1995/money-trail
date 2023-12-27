import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
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
    return http.get(`/payment-records?cursor=${+pageParam}&page_size=${queryKey[1]?.pageSize}`);
}
export const useGetPaymentRecords = ({ pageSize }) => {
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ['payment-records', { pageSize }],
        queryFn: fetchPaymentRecords,
        initialPageParam: 0,
        keepPreviousData: true,
        // getNextPageParam: (lastPage, pages) => lastPage.data.cursor,
        getNextPageParam: (lastPage, pages) => {
            const maxPage = lastPage.data.total / pageSize;
            const nextPage = pages.length + 1;
            return nextPage <= maxPage ? nextPage : undefined;

        },
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