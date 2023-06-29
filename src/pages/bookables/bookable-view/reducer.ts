import { Bookable } from 'types';

export type IState = {
  group: string;
  bookableIndex: number;
  bookables: Bookable[];
  isLoading: boolean;
  error: boolean;
};

type Action = {
  type: string;
  payload?: any;
};

export default function reducer(state: IState, action: Action): IState {
  switch (action.type) {
    case 'SET_GROUP':
      return {
        ...state,
        group: action.payload,
        bookableIndex: 0,
      };

    case 'SET_BOOKABLE':
      return {
        ...state,
        bookableIndex: action.payload,
      };

    case 'NEXT_BOOKABLE':
      const count = state.bookables.filter(
        (b) => b.group === state.group,
      ).length;

      return {
        ...state,
        bookableIndex: (state.bookableIndex + 1) % count,
      };

    case 'FETCH_BOOKABLES_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        bookables: [],
      };

    case 'FETCH_BOOKABLES_SUCCESS':
      return {
        ...state,
        isLoading: false,
        bookables: action.payload,
      };

    case 'FETCH_BOOKABLES_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
