import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AUTH_STORAGE_KEY } from "../../constants/data";
import { api, IS_MOCK_AUTH } from "../../service/api";
import type { RootState } from "../../store";
import type { AuthState, LoginCredentials, LoginResponse } from "../../types";
import { getErrorMessage } from "../../utils/helper";
import { mockLoginRequest } from "./mockAuth";

/** Boshlang'ich (login qilinmagan) holat */
const emptyAuthState: AuthState = {
  token: null,
  user: null,
  status: "idle",
  error: null,
};

/** localStorage'dagi saqlangan auth holati (store preloadedState uchun) */
export const loadAuthState = (): AuthState => {
  try {
    const saved = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!saved) return emptyAuthState;

    const parsed = JSON.parse(saved) as Partial<AuthState>;
    return {
      ...emptyAuthState,
      token: parsed.token ?? null,
      user: parsed.user ?? null,
    };
  } catch {
    return emptyAuthState;
  }
};

/** Auth holatini localStorage'ga yozadi (token yo'q bo'lsa - tozalaydi) */
export const saveAuthState = ({ token, user }: AuthState): void => {
  if (!token || !user) {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return;
  }

  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ token, user }));
};

/**
 * Tizimga kirish: `POST {VITE_API_URL}/auth/login` ({ login, password }).
 * Demo rejimda (IS_MOCK_AUTH) backend o'rniga mock ishlatiladi.
 */
export const loginUser = createAsyncThunk<LoginResponse, LoginCredentials, { rejectValue: string }>(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      if (IS_MOCK_AUTH) return await mockLoginRequest(credentials);

      const { data } = await api.post<LoginResponse>("/auth/login", credentials);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: emptyAuthState,
  reducers: {
    /** Chiqish: token va user tozalanadi (localStorage ham store.subscribe orqali yangilanadi) */
    logout: () => emptyAuthState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.token = payload.token;
        state.user = payload.user;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload ?? "Kirishda xatolik yuz berdi";
      });
  },
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;

/* ---------------------------- Selectors ---------------------------- */

export const selectToken = (state: RootState) => state.auth.token;
export const selectUser = (state: RootState) => state.auth.user;
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthError = (state: RootState) => state.auth.error;

