import { useMutation, UseMutationResult, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteData, getData, patchData, postData, postFormData, patchFormData } from "../services/api-service";
import { showErrorToast, showSuccessToast } from "../utils/toast-utils";

interface ApiResponse<T> {
    data: T;
    statusCode: number;
    message: string;
}

interface PaginateApiResponse<T> {
    statusCode: number;
    message: string;
    data: {
        data: T[];         
        total: number;     
        page: number;      
        limit: number;     
        pageCount: number; 
    };
}

interface ErrorResponse {
    error: boolean;
    message: string;
}

interface MutationProps {
    url: string;
    body?: Record<string, unknown>;
}

interface HandleMutationProps<T> {
    mutation: UseMutationResult<T, ErrorResponse, { url: string; body: Record<string, unknown> }>;
    url: string;
    body: Record<string, unknown>;
    invalidateQueryKey?: string[];
    showSuccessMessage?: boolean;
    showErrorMessage?: boolean;
    requiredFields: Array<{ key: string; value: string; label: string; }>;
}

interface GetResponseProps {
    queryKey: string[];
    url: string;
    enabled?: boolean;
    refetchOnWindowFocus?: boolean;
    refetchOnMount?: boolean;
    refetchInterval?: number;
    showToast?: boolean;
    staleTime?: number;
}

interface ValidationProps {
    body: Record<string, unknown>;
    requiredFields: Array<{ key: string; value: string; label: string; }>;
}

interface HandleDeleteProps {
    url: string;
    invalidateQueryKey?: string[];
    showSuccessMessage?: boolean;
}

interface FetchDataProps {
    apiUrl: string;
}

const isSuccessfulResponse = <T extends { statusCode: number }>(response: T): boolean => {
    return response.statusCode === 200 || response.statusCode === 201;
};

const handleErrorMessage = (error: unknown) => {
    if (error && typeof error === 'object') {
        const errorObj = error as { 
            response?: { data?: { message?: string | string[] } }; 
            data?: { message?: string | string[] }; 
            message?: string | string[]; 
        };
        const errorMessage = errorObj.response?.data?.message || errorObj.data?.message || errorObj.message;
        if (errorMessage) {
            Array.isArray(errorMessage) ? errorMessage.forEach(showErrorToast) : showErrorToast(errorMessage);
        }
    }
};

export const useAPI = () => {
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    const token = user?.token || '';
    const queryClient = useQueryClient();

    const getMutation = useMutation({
        mutationFn: ({ url }: MutationProps) => getData({ url, token })
    });

    const deleteMutation = useMutation({
        mutationFn: ({ url }: MutationProps) => deleteData({ url, token })
    });

    // const postMutation = useMutation({
    //     mutationFn: ({ url, body }: MutationProps) => postData({ url, body: (body as Record<string, unknown>), token })
    // });

    const postMutation = useMutation<unknown, ErrorResponse, { url: string; body: Record<string, unknown> }>({
        mutationFn: ({ url, body }) => postData({ url, body, token })
    });

    const patchMutation = useMutation({
        mutationFn: ({ url, body }: MutationProps) => patchData({ url, body: (body as Record<string, unknown>), token })
    });

    const postFormMutation = useMutation({
        mutationFn: ({ url, body }: MutationProps) => {
            if (!body || typeof body !== "object") {
                throw new Error("Invalid request body.");
            }
            const formData = new FormData();
            for (const [key, value] of Object.entries(body)) {
                if (Array.isArray(value)) {
                    value.forEach((item) => {
                        formData.append(key, item);
                    });
                } else {
                    formData.append(key, value as any);
                }
            } 
            return postFormData({ url, token, body: formData })
        }
    });

    const patchFormMutation = useMutation({
        mutationFn: ({ url, body }: MutationProps) => {
            if (!body || typeof body !== "object") {
                throw new Error("Invalid request body.");
            }
            const formData = new FormData();
            for (const [key, value] of Object.entries(body)) {
                if (Array.isArray(value)) {
                    value.forEach((item) => {
                        formData.append(key, item);
                    });
                } else {
                    formData.append(key, value as any);
                }
            }
            return patchFormData({ url, token, body: formData }); 
        }
    });

    const fetchData = async ({ apiUrl }: FetchDataProps) => {
        try {
            const response = await getMutation.mutateAsync({ url: apiUrl }) as ApiResponse<any>;
            return response.data;
        } catch (e: any) {
            showErrorToast(e?.response?.data?.message || e?.data?.message || e?.message);
        }
    };

    const usePaginatedQuery = <T>({
        queryKey,
        url,
        enabled = true,
        refetchOnWindowFocus = false,
        refetchOnMount = false,
        refetchInterval,
        showToast = true,
        staleTime = 0
    }: GetResponseProps) => {
        const {
            data: response,
            error,
            isLoading,
            isFetching,
            ...queryProps
        } = useQuery<PaginateApiResponse<T> | ErrorResponse, Error, PaginateApiResponse<T>>({
            queryKey,
            queryFn: () => getData({ url, token }),
            refetchOnWindowFocus,
            refetchOnMount,
            staleTime,
            refetchInterval,
            enabled
        });

        let data: T[] = [];
        let totalItems = 0;
        let pageCount = 1;

        if (response?.statusCode === 200 && response?.data) {
            const { data: apiData, total, pageCount: apiPageCount } = response?.data;
            data = apiData as T[];
            totalItems = total ?? 0;
            pageCount = apiPageCount ?? 1;
        } else if (error) {
            const errorMessage = error?.message;
            if (showToast) {
                showErrorToast(errorMessage);
            } else {
                console.error(errorMessage);
            }
        }

        return { data, totalItems, pageCount, response: response?.data, isLoading, isFetching, ...queryProps };
    };

    const validateFormData = ({
        body,
        requiredFields
    }: ValidationProps): boolean => {
        if (requiredFields?.length > 0) {
            for (const { key: fieldKey, value: fieldValue, label: fieldLabel } of requiredFields) {
                const fieldName = fieldValue || fieldKey;
                const fieldVariable = body[fieldKey];

                if (!fieldVariable || (typeof fieldVariable === 'string' && fieldVariable.length === 0) || (Array.isArray(fieldVariable) && fieldVariable.length === 0)) {
                    const action = fieldLabel === "image" ? "upload" : fieldLabel === "dropdown" ? "select" : "enter";
                    showErrorToast(`Please ${action} ${fieldName}.`);
                    return false;
                }
            }
        }
        return true;
    };

    const handleApiMutation = async <T>({
        mutation,
        url,
        body = {},
        invalidateQueryKey = [],
        showSuccessMessage = true,
        showErrorMessage = true,
        requiredFields = []
    }: HandleMutationProps<T>) => {
        try {
            if (validateFormData({ body, requiredFields })) {
                const response = await mutation.mutateAsync({ url, body }) as ApiResponse<T>;
                if (isSuccessfulResponse(response)) {
                    if (showSuccessMessage) showSuccessToast(response?.message);
                    if (invalidateQueryKey) {
                        await queryClient.invalidateQueries({ queryKey: invalidateQueryKey });
                    }
                    return { success: true, data: response };
                } else if (response?.message && showErrorMessage) {
                    handleErrorMessage(response);
                }
            }
        } catch (e: any) {
            if (showErrorMessage) handleErrorMessage(e);
            return { success: false, error: e };
        }
    };

    const handleDeleteAPI = async <T>({
        url,
        invalidateQueryKey,
        showSuccessMessage = true
    }: HandleDeleteProps) => {
        try {
            const response = await deleteMutation.mutateAsync({ url }) as ApiResponse<T>;
            if (isSuccessfulResponse(response)) {
                if (showSuccessMessage) {
                    showSuccessToast(response.message);
                }
                if (invalidateQueryKey) {
                    await queryClient.invalidateQueries({ queryKey: invalidateQueryKey });
                }
                return response;
            } else {
                handleErrorMessage(response);
            }
        } catch (e: any) {
            handleErrorMessage(e);
        }
    };    

    return {
        getMutation,
        deleteMutation,
        postMutation,
        patchMutation,
        postFormMutation,
        patchFormMutation,
        fetchData,
        usePaginatedQuery,
        handleApiMutation,
        handleDeleteAPI
    };
}