import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../apis';
import type { AxiosResponse } from 'axios';
import type { AppThunk } from '.';
import { Chat, ChatResponse } from '../services/types';

export interface ChatsState {
  activeChatId: Chat['id'] | null;
  data: Record<Chat['to']['id'], Chat>;
  isLoading: boolean;
  error: string | null;
}

const initialState: ChatsState = {
  activeChatId: null,
  data: {},
  isLoading: false,
  error: null,
};

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    updateChatsStart: (state: ChatsState) => ({ ...state, error: null, isLoading: true }),
    updateChatsSuccess: (
      state,
      action: PayloadAction<Record<Chat['to']['id'], Chat>>,
    ): ChatsState => ({
      ...state,
      isLoading: false,
      error: null,
      data: action.payload,
    }),
    updateChatsFail: (state: ChatsState, action: PayloadAction<string>) => ({
      ...state,
      error: action.payload,
      isLoading: false,
    }),
    updateActiveChatId: (state: ChatsState, action: PayloadAction<Chat['id'] | null>) => ({
      ...state,
      activeChatId: action.payload,
    }),
  },
});

export const {
  updateChatsStart,
  updateChatsSuccess,
  updateChatsFail,
  updateActiveChatId,
} = chatsSlice.actions;

export const fetchChats = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(updateChatsStart());
    const chats: AxiosResponse<ChatResponse[]> = await axios.get('/chats');
    const chatsRecord = chats.data.reduce((record, { id, users, lastMessage }) => {
      const [to] = users.filter((user) => user.id !== getState().auth.user?.id);
      record[to.id] = { id, to, lastMessage };
      return record;
    }, {} as Record<Chat['to']['id'], Chat>);
    dispatch(updateChatsSuccess(chatsRecord));
  } catch (e) {
    dispatch(updateChatsFail(e.response?.data?.error ?? e.message ?? ''));
  }
};

// export const fetchChat = (chatId: string): AppThunk => async (dispatch, getState) => {
//   try {
//     dispatch(updateChatsStart());
//     const chat: AxiosResponse<ChatResponse> = await axios.get(`/chats/${chatId}`);
//     const [to] = chat.data.users.filter((user) => user.id !== getState().auth.user?.id);
//     const chatsRecord = {
//       ...getState().chats.data,
//       [to.id]: {
//         id: chat.data.id,
//         to,
//         lastMessage: chat.data.lastMessage,
//       },
//     };
//     dispatch(updateChatsSuccess(chatsRecord));
//   } catch (e) {
//     dispatch(updateChatsFail(e.response?.data?.error ?? e.message ?? ''));
//   }
// };

export default chatsSlice.reducer;
