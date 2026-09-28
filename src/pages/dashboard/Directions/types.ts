
export type DirectionStatus = "active" | "inactive";

export interface Direction {
  id: string;
  name: string;
  description: string;
  status: DirectionStatus;
  createdAt: string;
  updatedAt: string;
}

export interface DirectionListResponse {
  data: Direction[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface DirectionQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: DirectionStatus;
}

export interface CreateDirectionPayload {
  name: string;
  description: string;
  status: DirectionStatus;
}

export type UpdateDirectionPayload = Partial<CreateDirectionPayload>;
