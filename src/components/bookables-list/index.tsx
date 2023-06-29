import { useRef, useEffect, Fragment } from 'react';

// components
import Spinner from 'components/UI/spinner';

// types
import { Bookable } from 'types';

// icons
import { FaArrowRight } from 'react-icons/fa';

// utils
import { IState } from 'pages/bookables/bookable-view/reducer';
import { getData } from 'utils';

// data
import data from 'data/static.json';

type Group = 'Kit' | 'Rooms';

interface IProps {
  state: IState;
  dispatch: (data: any) => void;
}

function BookablesList({ state, dispatch }: IProps) {
  const nextButtonRef = useRef<any>();

  const { group, bookables, bookableIndex, error, isLoading } = state;

  const bookablesInGroup = bookables.filter((b) => b.group === group);

  const groups = [...new Set(bookables.map((b) => b.group))];

  useEffect(() => {
    dispatch({ type: 'FETCH_BOOKABLES_REQUEST' });

    getData('http://localhost:3001/bookables')
      .then((bookables: Bookable[]) =>
        dispatch({
          type: 'FETCH_BOOKABLES_SUCCESS',
          payload: bookables,
        }),
      )
      .catch((error: Error) =>
        dispatch({
          type: 'FETCH_BOOKABLES_ERROR',
          payload: error,
        }),
      );
  }, [dispatch]);

  function changeBookable(selectedIndex: number) {
    dispatch({
      type: 'SET_BOOKABLE',
      payload: selectedIndex,
    });

    if (nextButtonRef && nextButtonRef.current) {
      nextButtonRef.current.focus();
    }
  }

  function handleNext() {
    dispatch({ type: 'NEXT_BOOKABLE' });
  }

  function handleGroupSelect(group: Group): void {
    dispatch({ type: 'SET_GROUP', payload: group });
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
    <Fragment>
      <div>
        <select
          value={group}
          onChange={(e) => handleGroupSelect(e.target.value as Group)}
        >
          {groups.map((g) => (
            <option value={g} key={g}>
              {g}
            </option>
          ))}
        </select>

        <ul className="bookables items-list-nav">
          {bookablesInGroup.map((b, i) => (
            <li key={b.id} className={i === bookableIndex ? 'selected' : ''}>
              <button className="btn" onClick={() => changeBookable(i)}>
                {b.title}
              </button>
            </li>
          ))}
        </ul>

        <footer>
          <button
            className="btn"
            onClick={handleNext}
            ref={nextButtonRef}
            autoFocus
          >
            <FaArrowRight />
            <span>Next</span>
          </button>
        </footer>
      </div>
    </Fragment>
  );
}

export default BookablesList;
