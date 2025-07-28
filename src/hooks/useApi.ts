// ✅ Your updated and ESLint-safe useAPI hook

import { useEffect, useState } from "react";
import { useMutation, UseMutationResult, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteData, getData, patchData, postData, postFormData, patchFormData } from "../services/api-service";
import { showErrorToast, showSuccessToast } from "../utils/toast-utils";

// ✅ Token hook
const useClientToken = (): string => {
  const [token, setToken] = useState("");
  useEffect(() => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user") || "{}");
      setToken(user?.token || "");
    } catch {
      setToken("");
    }
  }, []);
  return token;
};

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
  mutation: UseMutationResult<T, ErrorResponse, MutationProps>;
  url: string;
  body: Record<string, unknown>;
  invalidateQueryKey?: string[];
  showSuccessMessage?: boolean;
  showErrorMessage?: boolean;
  requiredFields: Array<{ key: string; value: string; label: string }>;
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
  requiredFields: Array<{ key: string; value: string; label: string }>;
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
  if (error && typeof error === "object") {
    const errorObj = error as {
      response?: { data?: { message?: string | string[] } };
      data?: { message?: string | string[] };
      message?: string | string[];
    };
    const errorMessage = errorObj.response?.data?.message || errorObj.data?.message || errorObj.message;
    if (errorMessage) {
      if (Array.isArray(errorMessage)) {
        errorMessage.forEach(showErrorToast);
      } else {
        showErrorToast(errorMessage);
      }
    }
  }
};

export const useAPI = () => {
  const token = useClientToken();
  const queryClient = useQueryClient();

  const getMutation = useMutation({
    mutationFn: ({ url }: MutationProps) => getData({ url, token })
  });

  const deleteMutation = useMutation({
    mutationFn: ({ url }: MutationProps) => deleteData({ url, token })
  });

  const postMutation = useMutation<unknown, ErrorResponse, MutationProps>({
    mutationFn: ({ url, body }) => postData({ url, body: body ?? {}, token })
  });

  const patchMutation = useMutation({
    mutationFn: ({ url, body }: MutationProps) => patchData({ url, body: body ?? {}, token })
  });

  const postFormMutation = useMutation({
    mutationFn: ({ url, body }: MutationProps) => {
      if (!body || typeof body !== "object") throw new Error("Invalid request body.");
      const formData = new FormData();
      for (const [key, value] of Object.entries(body)) {
        if (Array.isArray(value)) {
          for (const item of value) {
            formData.append(key, item as string | Blob);
          }
        } else {
          formData.append(key, value as string | Blob);
        }
      }
      return postFormData({ url, token, body: formData });
    }
  });

  const patchFormMutation = useMutation({
    mutationFn: ({ url, body }: MutationProps) => {
      if (!body || typeof body !== "object") throw new Error("Invalid request body.");
      const formData = new FormData();
      for (const [key, value] of Object.entries(body)) {
        if (Array.isArray(value)) {
          for (const item of value) {
            formData.append(key, item as string | Blob);
          }
        } else {
          formData.append(key, value as string | Blob);
        }
      }
      return patchFormData({ url, token, body: formData });
    }
  });

  const fetchData = async <T>({ apiUrl }: FetchDataProps): Promise<T | undefined> => {
    try {
      const response = (await getMutation.mutateAsync({ url: apiUrl })) as ApiResponse<T>;
      return response.data;
    } catch (e: unknown) {
      handleErrorMessage(e);
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
      enabled: enabled && !!token
    });

    let data: T[] = [];
    let totalItems = 0;
    let pageCount = 1;

    if ("statusCode" in (response || {}) && response?.statusCode === 200 && "data" in response) {
      const { data: apiData, total, pageCount: apiPageCount } = response.data;
      data = apiData;
      totalItems = total ?? 0;
      pageCount = apiPageCount ?? 1;
    } else if (error) {
      if (showToast) {
        showErrorToast(error.message);
      } else {
        console.error(error.message);
      }
    }

    return { data, totalItems, pageCount, response: response?.data, isLoading, isFetching, ...queryProps };
  };

  const validateFormData = ({ body, requiredFields }: ValidationProps): boolean => {
    if (requiredFields?.length > 0) {
      for (const { key: fieldKey, value: fieldValue, label: fieldLabel } of requiredFields) {
        const fieldName = fieldValue || fieldKey;
        const fieldVariable = body[fieldKey];

        if (
          !fieldVariable ||
          (typeof fieldVariable === "string" && fieldVariable.length === 0) ||
          (Array.isArray(fieldVariable) && fieldVariable.length === 0)
        ) {
          const action =
            fieldLabel === "image" ? "upload" : fieldLabel === "dropdown" ? "select" : "enter";
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
        const response = (await mutation.mutateAsync({ url, body })) as ApiResponse<T>;
        if (isSuccessfulResponse(response)) {
          if (showSuccessMessage) showSuccessToast(response.message);
          if (invalidateQueryKey?.length) {
            await queryClient.invalidateQueries({ queryKey: invalidateQueryKey });
          }
          return { success: true, data: response };
        } else if (response?.message && showErrorMessage) {
          handleErrorMessage(response);
        }
      }
    } catch (e: unknown) {
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
      const response = (await deleteMutation.mutateAsync({ url })) as ApiResponse<T>;
      if (isSuccessfulResponse(response)) {
        if (showSuccessMessage) showSuccessToast(response.message);
        if (invalidateQueryKey?.length) {
          await queryClient.invalidateQueries({ queryKey: invalidateQueryKey });
        }
        return response;
      } else {
        handleErrorMessage(response);
      }
    } catch (e: unknown) {
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
};
