import { getWeek } from 'utils';

type State = {
  date: Date;
  start: Date;
  end: Date;
};

type Action = {
  type: string;
  payload?: any;
};

export default function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'NEXT_WEEK':
      return getWeek(state.date, 7);
    case 'PREV_WEEK':
      return getWeek(state.date, -7);
    case 'TODAY':
      return getWeek(new Date());
    case 'SET_DATE':
      return getWeek(new Date(action.payload));
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}
