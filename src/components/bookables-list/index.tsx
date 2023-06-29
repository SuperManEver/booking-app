import { useReducer, useRef, useEffect, Fragment } from 'react';

// components
import Spinner from 'components/UI/spinner';

// types
import { Bookable } from 'types';

// icons
import { FaArrowRight } from 'react-icons/fa';

// utils
import reducer, { IState } from './reducer';
import { getData } from 'utils';

// data
import data from 'data/static.json';

// constants
const initialState: IState = {
  group: 'Rooms',
  bookableIndex: 0,
  hasDetails: true,
  bookables: [],
  isLoading: true,
  error: null,
};

type Group = 'Kit' | 'Rooms';

function BookablesList() {
  const nextButtonRef = useRef<any>();

  const days = data['days'];
  const sessions = data['sessions'];

  const [state, dispatch] = useReducer(reducer, initialState);

  const { group, bookables, bookableIndex, hasDetails, error, isLoading } =
    state;

  const bookablesInGroup = bookables.filter((b) => b.group === group);

  const bookable = bookablesInGroup[bookableIndex];

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
  }, []);

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

  function toggleDetails() {
    dispatch({ type: 'TOGGLE_HAS_DETAILS' });
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

      {bookable && (
        <div className="bookable-details">
          <div className="item">
            <div className="item-header">
              <h2>{bookable.title}</h2>
              <span className="controls">
                <label>
                  <input
                    type="checkbox"
                    checked={hasDetails}
                    onChange={toggleDetails}
                  />
                  Show Details
                </label>
              </span>
            </div>

            <p>{bookable.notes}</p>

            {hasDetails && (
              <div className="item-details">
                <h3>Availability</h3>
                <div className="bookable-availability">
                  <ul>
                    {bookable.days.sort().map((d) => (
                      <li key={d}>{days[d]}</li>
                    ))}
                  </ul>
                  <ul>
                    {bookable.sessions.map((s) => (
                      <li key={s}>{sessions[s]}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default BookablesList;
