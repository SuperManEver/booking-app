import { useRef, useEffect, useState } from 'react';

// components
import Spinner from 'components/UI/spinner';

// types
import { Bookable } from 'types';

// icons
import { FaArrowRight } from 'react-icons/fa';

// utils
import { getData } from 'utils';

interface IProps {
  bookable: Bookable | null;
  setBookable: (bookable: Bookable) => void;
}

function BookablesList({ bookable, setBookable }: IProps) {
  const [bookables, setBookables] = useState<Bookable[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const group = bookable?.group;

  const bookablesInGroup = bookables.filter((b) => b.group === group);
  const groups = [...new Set(bookables.map((b) => b.group))];

  const nextButtonRef = useRef<any>();

  useEffect(() => {
    getData('http://localhost:3001/bookables')
      .then((bookables) => {
        setBookable(bookables[0]);
        setBookables(bookables);
        setIsLoading(false);
      })

      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [setBookable]);

  function changeGroup(e: any) {
    const bookablesInSelectedGroup = bookables.filter(
      (b) => b.group === e.target.value,
    );
    setBookable(bookablesInSelectedGroup[0]);
  }

  function changeBookable(selectedBookable: Bookable) {
    setBookable(selectedBookable);
    nextButtonRef?.current.focus();
  }

  function nextBookable() {
    const i = bookable ? bookablesInGroup.indexOf(bookable) : 0;
    const nextIndex = (i + 1) % bookablesInGroup.length;
    const nextBookable = bookablesInGroup[nextIndex];
    setBookable(nextBookable);
  }

  if (error) {
    return <p>Error</p>;
  }

  if (isLoading) {
    return (
      <p>
        <Spinner /> Loading bookables...
      </p>
    );
  }

  return (
    <div>
      <select value={group} onChange={changeGroup}>
        {groups.map((g) => (
          <option value={g} key={g}>
            {g}
          </option>
        ))}
      </select>

      <ul className="bookables items-list-nav">
        {bookablesInGroup.map((b) => (
          <li
            key={b.id}
            className={bookable && b.id === bookable.id ? 'selected' : ''}
          >
            <button className="btn" onClick={() => changeBookable(b)}>
              {b.title}
            </button>
          </li>
        ))}
      </ul>
      <p>
        <button
          className="btn"
          onClick={nextBookable}
          ref={nextButtonRef}
          autoFocus
        >
          <FaArrowRight />
          <span>Next</span>
        </button>
      </p>
    </div>
  );
}

export default BookablesList;
