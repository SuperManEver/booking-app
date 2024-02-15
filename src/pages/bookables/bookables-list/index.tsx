import { useState, useEffect, useRef } from 'react';
import { FaArrowRight } from 'react-icons/fa';

// types
import { Bookable } from 'types';

// components
import Spinner from 'components/UI/spinner';

// utils
import { getData } from 'utils';

interface IProps {
  bookable: Bookable;
  setBookable(bookable: Bookable): void;
}

export default function BookablesList({ bookable, setBookable }: IProps) {
  const [bookables, setBookables] = useState<Bookable[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const group = bookable?.group;

  const bookablesInGroup = bookables.filter((b) => b.group === group);
  const groups = [...new Set(bookables.map((b) => b.group))];

  const nextButtonRef = useRef<HTMLButtonElement>(null);

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

  function changeGroup(e: React.ChangeEvent<HTMLSelectElement>) {
    const bookablesInSelectedGroup = bookables.filter(
      (b) => b.group === e.target.value,
    );
    setBookable(bookablesInSelectedGroup[0]);
  }

  function changeBookable(selectedBookable: Bookable) {
    setBookable(selectedBookable);
    nextButtonRef && nextButtonRef.current?.focus();
  }

  function nextBookable() {
    const i = bookablesInGroup.indexOf(bookable);
    const nextIndex = (i + 1) % bookablesInGroup.length;
    const nextBookable = bookablesInGroup[nextIndex];
    setBookable(nextBookable);
  }

  if (error) {
    return <p>{error.message}</p>;
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
          <li key={b.id} className={b.id === bookable.id ? 'selected' : void 0}>
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
