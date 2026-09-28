
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  CreateDirectionPayload,
  Direction,
  DirectionListResponse,
  DirectionQueryParams,
  UpdateDirectionPayload,
} from "./types";

// Axios sozlamasi
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const DIRECTIONS_URL = "/directions";

export const directionKeys = {
  all: ["directions"] as const,
  list: (params: DirectionQueryParams) => [...directionKeys.all, "list", params] as const,
  detail: (id: string) => [...directionKeys.all, "detail", id] as const,
};

// API so'rovlari
const getDirections = async (params: DirectionQueryParams): Promise<DirectionListResponse> => {
  const { data } = await api.get<DirectionListResponse>(DIRECTIONS_URL, { params });
  return data;
};

const getDirectionById = async (id: string): Promise<Direction> => {
  const { data } = await api.get<Direction>(`${DIRECTIONS_URL}/${id}`);
  return data;
};

const createDirection = async (payload: CreateDirectionPayload): Promise<Direction> => {
  const { data } = await api.post<Direction>(DIRECTIONS_URL, payload);
  return data;
};

const updateDirection = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateDirectionPayload;
}): Promise<Direction> => {
  const { data } = await api.patch<Direction>(`${DIRECTIONS_URL}/${id}`, payload);
  return data;
};

const deleteDirection = async (id: string): Promise<string> => {
  await api.delete(`${DIRECTIONS_URL}/${id}`);
  return id;
};

// React Query hooklari
export const useDirections = (params: DirectionQueryParams) =>
  useQuery({
    queryKey: directionKeys.list(params),
    queryFn: () => getDirections(params),
  });

export const useDirection = (id: string) =>
  useQuery({
    queryKey: directionKeys.detail(id),
    queryFn: () => getDirectionById(id),
    enabled: !!id,
  });

export const useCreateDirection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDirection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: directionKeys.all });
    },
  });
};

export const useUpdateDirection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateDirection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: directionKeys.all });
    },
  });
};

export const useDeleteDirection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDirection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: directionKeys.all });
    },
  });
};
