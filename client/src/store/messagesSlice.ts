import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../apis';
import type { AxiosResponse } from 'axios';
import type { AppThunk } from '.';
import type { Message, Chat } from '../services/types';

export interface MessagesState {
  data: Record<Chat['id'], Message[]>;
  isLoading: boolean;
  error: string | null;
}

const initialState: MessagesState = {
  data: {},
  isLoading: false,
  error: null,
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    updateMessagesStart: (state: MessagesState) => ({ ...state, error: null, isLoading: true }),
    updateMessagesSuccess: (
      state,
      action: PayloadAction<Record<Chat['id'], Message[]>>,
    ): MessagesState => ({
      ...state,
      isLoading: false,
      error: null,
      data: action.payload,
    }),
    updateMessagesFail: (state: MessagesState, action: PayloadAction<string>) => ({
      ...state,
      error: action.payload,
      isLoading: false,
    }),
  },
});

export const {
  updateMessagesStart,
  updateMessagesSuccess,
  updateMessagesFail,
} = messagesSlice.actions;

export const fetchMessages = (chatId: string): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(updateMessagesStart());
    const messages: AxiosResponse<Message[]> = await axios.get(`/chats/${chatId}`);
    const messagesRecord = {
      ...getState().messages.data,
      [chatId]: messages.data,
    };
    dispatch(updateMessagesSuccess(messagesRecord));
  } catch (e) {
    dispatch(updateMessagesFail(e.response?.data?.error ?? e.message ?? ''));
  }
};

export const updateMessage = (message: Message): AppThunk => async (dispatch, getState) => {
  try {
    const messagesRecord = getState().messages.data;
    const foundMessage = messagesRecord[message.chatId].find((m) => m.id === message.id);
    if (foundMessage) {
      return;
    }
    const updatedMessagesWithChatId: Message[] = [...messagesRecord[message.chatId], message];
    const updatedMessagesRecord = {
      ...messagesRecord,
      [message.chatId]: updatedMessagesWithChatId,
    };
    dispatch(updateMessagesSuccess(updatedMessagesRecord));
  } catch (e) {
    dispatch(updateMessagesFail(e.response?.data?.error ?? e.message ?? ''));
  }
};

export default messagesSlice.reducer;
