import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { authReducer, loadAuthState, saveAuthState } from "../features/auth";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  // Sahifa yangilanganda sessiya saqlanib qoladi
  preloadedState: {
    auth: loadAuthState(),
  },
});

// Auth holati o'zgarganda (login/logout) localStorage yangilanadi
store.subscribe(() => {
  saveAuthState(store.getState().auth);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/** Type'li hooklar - komponentlarda shular ishlatiladi */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

