import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import http from "../../lib/http"
import { apiKey } from "../../lib/util";
import axios from "axios";
import { useState } from 'react';

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
        // keepPreviousData: false,
        // getNextPageParam: (lastPage, pages) => {
        //     const maxPage = lastPage.data.total / pageSize;
        //     const nextPage = pages.length + 1;
        //     return nextPage <= maxPage ? nextPage : undefined;

        // },
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


// const getPropety = ({ pageParam = 1, queryKey }) => {
//   const location = queryKey[1]?.location;
//   const type = queryKey[2]?.type ;
//   const price = queryKey[3]?.price ;
//   const isFilter = queryKey[4]?.isFilter
//   if (!!location && !!type && !!price && isFilter) {
//     return http.get(
//       `/all?pageNumber=${pageParam}&pageSize=${page_size}&country=${location}&type=${type}&price=${price}`,
//     )
//   } else {
//     return http.get(
//       `/all?pageNumber=${pageParam}&pageSize=${page_size}`,
//     )
//   }


// }
// export const useGetPropertyQuery = ({ location, type, price,isFilter }) => {
//   const { data, isSuccess, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage ,isError} = useInfiniteQuery(
//     ['properties', { location }, { type }, { price },{ isFilter }],
//     getPropety,
//     {
//       getNextPageParam: (lastPage, pages) => {
//         const maxPage = lastPage.data.total_count / page_size;
//         const nextPage = pages.length + 1;
//         return nextPage <= maxPage ? nextPage : undefined;

//       },
//     }
//   );
//   return { data, isSuccess, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage ,isError};
// };








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