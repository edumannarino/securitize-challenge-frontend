import { configureStore } from "@reduxjs/toolkit"
import { reducer } from './reducer';
import { Action, State } from "./types";

export const store = configureStore<State, Action>({ reducer })
export type RootState = ReturnType<typeof store.getState>