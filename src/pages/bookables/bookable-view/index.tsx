import { useState, Fragment } from 'react';

import BookablesList from 'components/bookables-list';
import BookableDetails from 'components/bookables-details';

// types
import { Bookable } from 'types';

export default function BookablesView() {
  const [bookable, setBookable] = useState<Bookable | null>(null);

  return (
    <Fragment>
      <BookablesList bookable={bookable} setBookable={setBookable} />
      <BookableDetails bookable={bookable} />
    </Fragment>
  );
}
