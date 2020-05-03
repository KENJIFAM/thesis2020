import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../apis';
import type { AxiosResponse } from 'axios';
import type { AppThunk } from '.';
import { Chat, ChatResponse } from '../services/types';

export interface ChatsState {
  activeChat: Chat | null;
  data: Record<Chat['to']['id'], Chat>;
  isLoading: boolean;
  error: string | null;
}

const initialState: ChatsState = {
  activeChat: null,
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
    updateActiveChat: (state: ChatsState, action: PayloadAction<Chat | null>) => ({
      ...state,
      activeChat: action.payload,
    }),
  },
});

export const {
  updateChatsStart,
  updateChatsSuccess,
  updateChatsFail,
  updateActiveChat,
} = chatsSlice.actions;

export const getChatFromChatResponse = (chatResponse: ChatResponse, userId: string): Chat => {
  const [to] = chatResponse.users.filter((user) => user.id !== userId);
  return {
    id: chatResponse.id,
    to,
    lastMessage: chatResponse.lastMessage,
    createdAt: chatResponse.createdAt,
  };
};

export const fetchChats = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(updateChatsStart());
    const chats: AxiosResponse<ChatResponse[]> = await axios.get('/chats');
    const chatsRecord = chats.data.reduce((record, { id, users, lastMessage, createdAt }) => {
      const [to] = users.filter((user) => user.id !== getState().auth.user?.id);
      record[to.id] = { id, to, lastMessage, createdAt };
      return record;
    }, {} as Record<Chat['to']['id'], Chat>);
    dispatch(updateChatsSuccess(chatsRecord));
  } catch (e) {
    dispatch(updateChatsFail(e.response?.data?.error ?? e.message ?? ''));
  }
};

export const createChat = (from: string, to: string): AppThunk => async (dispatch, getState) => {
  try {
    const userId = getState().auth.user?.id;
    if (!userId) {
      throw new Error('Please login first!');
    }
    dispatch(updateChatsStart());
    const chatResponse: AxiosResponse<ChatResponse> = await axios.post('/chats', { from, to });
    const chat = getChatFromChatResponse(chatResponse.data, userId);
    const chatsRecord = {
      ...getState().chats.data,
      [to]: chat,
    };
    dispatch(updateActiveChat(chat));
    dispatch(updateChatsSuccess(chatsRecord));
  } catch (e) {
    dispatch(updateChatsFail(e.response?.data?.error ?? e.message ?? ''));
  }
};

export const updateChatFromChatResponse = (chatResponse: ChatResponse): AppThunk => async (
  dispatch,
  getState,
) => {
  try {
    const userId = getState().auth.user?.id;
    if (!userId) {
      throw new Error('Please login first!');
    }
    const chat = getChatFromChatResponse(chatResponse, userId);
    const chatsRecord = {
      ...getState().chats.data,
      [chat.to.id]: chat,
    };
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
