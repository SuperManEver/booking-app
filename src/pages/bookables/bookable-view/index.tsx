import { useReducer, Fragment } from 'react';

// components
import Details from 'components/bookables-details';
import List from 'components/bookables-list';

import reducer from './reducer';

const initialState = {
  group: 'Rooms',
  bookableIndex: 0,
  bookables: [],
  isLoading: false,
  error: false,
};

function BookableView() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const bookablesInGroup = state.bookables.filter(
    (b) => b.group === state.group,
  );
  const bookable = bookablesInGroup[state.bookableIndex];

  return (
    <Fragment>
      <List state={state} dispatch={dispatch} />
      <Details bookable={bookable} />
    </Fragment>
  );
}

export default BookableView;
