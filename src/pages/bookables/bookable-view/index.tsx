import { useReducer, useState, Fragment } from 'react';

// components
import Details from 'components/bookables-details';
import List from 'components/bookables-list';

// interfaces
import { Bookable } from 'types';

import reducer from './reducer';

const initialState = {
  group: 'Rooms',
  bookableIndex: 0,
  bookables: [],
  isLoading: false,
  error: false,
};

function BookableView() {
  const [bookable, setBookable] = useState<Bookable | null>(null);

  // const bookablesInGroup = state.bookables.filter(
  //   (b) => b.group === state.group,
  // );
  // const bookable = bookablesInGroup[state.bookableIndex];

  return (
    <Fragment>
      <List bookable={bookable} setBookable={setBookable} />
      {bookable && <Details bookable={bookable} />}
    </Fragment>
  );
}

export default BookableView;
