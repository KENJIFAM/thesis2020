import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../apis';
import type { AxiosResponse } from 'axios';
import type { AppThunk } from '.';
import type { Request } from '../services/types';

export interface RequestsState {
  requests: Record<string, Request>;
  isLoading: boolean;
  error: string | null;
}

const initialState: RequestsState = {
  requests: {},
  isLoading: false,
  error: null,
};

const loadingStart = (state: RequestsState) => ({ ...state, error: null, isLoading: true });

const loadingFail = (state: RequestsState, action: PayloadAction<string>) => ({
  ...state,
  error: action.payload,
  isLoading: false,
});

const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    getRequestsStart: loadingStart,
    getRequestStart: loadingStart,
    getRequestsSuccess: (state, action: PayloadAction<Request[]>): RequestsState => ({
      ...state,
      isLoading: false,
      error: null,
      requests: action.payload.reduce((record, request) => {
        record[request.id] = request;
        return record;
      }, {} as Record<string, Request>),
    }),
    getRequestSuccess: (state, action: PayloadAction<Request>): RequestsState => ({
      ...state,
      isLoading: false,
      error: null,
      requests: {
        ...state.requests,
        [action.payload.id]: action.payload,
      },
    }),
    getRequestsFail: loadingFail,
    getRequestFail: loadingFail,
  },
});

export const {
  getRequestsStart,
  getRequestStart,
  getRequestsSuccess,
  getRequestSuccess,
  getRequestsFail,
  getRequestFail,
} = requestsSlice.actions;

export default requestsSlice.reducer;
