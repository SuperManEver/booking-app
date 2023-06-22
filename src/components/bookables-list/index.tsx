import { useReducer, Fragment } from 'react';
import uniq from 'lodash/uniq';

// icons
import { FaArrowRight } from 'react-icons/fa';

// utils
import reducer from './reducer';

// data
import data from 'data/static.json';

// constants
const BOOKABLES = data['bookables'];
const initialState = {
  group: 'Rooms',
  bookableIndex: 0,
  hasDetails: true,
  bookables: BOOKABLES,
};

type Group = 'Kit' | 'Rooms';

function BookablesList() {
  const days = data['days'];
  const sessions = data['sessions'];

  const groups = uniq(BOOKABLES.map((bookable) => bookable.group));

  const [state, dispatch] = useReducer(reducer, initialState);

  const { group, bookables, bookableIndex, hasDetails } = state;

  const bookablesInGroup = bookables.filter((b) => b.group === group);

  const bookable = bookablesInGroup[bookableIndex];

  function changeBookable(selectedIndex: number) {
    dispatch({
      type: 'SET_BOOKABLE',
      payload: selectedIndex,
    });
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
          <button className="btn" onClick={handleNext} autoFocus>
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
