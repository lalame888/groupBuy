import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Action, Dispatch, applyMiddleware, createStore } from 'redux';
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk';

import { userInfoReducer } from '../reducer/index';

export const groupBuyStore = createStore(
  userInfoReducer,
  applyMiddleware(thunkMiddleware),
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof groupBuyStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type ReduxDispatch = Dispatch<Action> &
  ThunkDispatch<RootState, null, Action>;

export const useReduxDispatch: () => ReduxDispatch = useDispatch;
export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector;
