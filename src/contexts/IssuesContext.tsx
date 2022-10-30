import { AxiosError } from 'axios';
import React, { createContext, useReducer } from 'react';
import { Issue } from '../models/issue';

interface State {
  isLoading: boolean;
  data: Issue[];
  error: AxiosError | null;
}

const initialState = {
  isLoading: false,
  data: [],
  error: null,
};

const loadingState = {
  isLoading: true,
  error: null,
};

interface Action {
  type: string;
  data: Issue[];
  error: AxiosError;
}
const issuesReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'GET_ISSUES':
      return {
        ...state,
        ...loadingState,
      };
    case 'GET_ISSUES_SUCCESS':
      return {
        isLoading: false,
        data: [...state.data, ...action.data],
        error: null,
      };
    case 'GET_ISSUES_ERROR':
      return {
        ...state,
        error: action.error,
      };
    default:
      throw new Error('유효하지 않은 타입입니다.');
  }
};

export const IssuesStateContext = createContext<State>(initialState);
export const IssuesDispatchContext = createContext<React.Dispatch<any>>(
  () => {}
);

interface Props {
  children: React.ReactElement;
}

export function IssuesProvider({ children }: Props) {
  const [state, dispatch] = useReducer(issuesReducer, initialState);
  return (
    <IssuesStateContext.Provider value={state}>
      <IssuesDispatchContext.Provider value={dispatch}>
        {children}
      </IssuesDispatchContext.Provider>
    </IssuesStateContext.Provider>
  );
}
