import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../apis';
import type { AxiosResponse } from 'axios';
import type { AppThunk } from '.';
import type { Request } from '../services/types';

export interface RequestsState {
  data: Record<string, Request>;
  isLoading: boolean;
  error: string | null;
}

const initialState: RequestsState = {
  data: {},
  isLoading: false,
  error: null,
};

const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    updateRequestsStart: (state: RequestsState) => ({ ...state, error: null, isLoading: true }),
    updateRequestsSuccess: (
      state,
      action: PayloadAction<Record<string, Request>>,
    ): RequestsState => ({
      ...state,
      isLoading: false,
      error: null,
      data: action.payload,
    }),
    updateRequestsFail: (state: RequestsState, action: PayloadAction<string>) => ({
      ...state,
      error: action.payload,
      isLoading: false,
    }),
  },
});

export const {
  updateRequestsStart,
  updateRequestsSuccess,
  updateRequestsFail,
} = requestsSlice.actions;

export const fetchRequests = (): AppThunk => async (dispatch) => {
  try {
    dispatch(updateRequestsStart());
    const requests: AxiosResponse<Request[]> = await axios.get('/requests');
    const requestsRecord = requests.data.reduce((record, request) => {
      record[request.id] = request;
      return record;
    }, {} as Record<string, Request>);
    dispatch(updateRequestsSuccess(requestsRecord));
  } catch (e) {
    dispatch(updateRequestsFail(e.response.data.error));
  }
};

export const fetchRequest = (requestId: string): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(updateRequestsStart());
    const request: AxiosResponse<Request> = await axios.get(`/requests/${requestId}`);
    const requestsRecord = {
      ...getState().requests.data,
      [request.data.id]: request.data,
    };
    dispatch(updateRequestsSuccess(requestsRecord));
  } catch (e) {
    dispatch(updateRequestsFail(e.response.data.error));
  }
};

export default requestsSlice.reducer;
