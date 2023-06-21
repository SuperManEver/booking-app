import { useState, Fragment } from 'react';
import uniq from 'lodash/uniq';

// icons
import { FaArrowRight } from 'react-icons/fa';

// data
import data from 'data/static.json';

type Group = 'Kit' | 'Rooms';

function BookablesList() {
  const bookables = data['bookables'];
  const days = data['days'];
  const sessions = data['sessions'];

  const groups = uniq(bookables.map((bookable) => bookable.group));

  const [group, setGroup] = useState<Group>('Kit');
  const [selectedBookable, setBookable] = useState(1);

  const bookablesInGroup = bookables.filter((b) => b.group === group);

  const bookable = bookablesInGroup[selectedBookable];

  const [hasDetails, setHasDetails] = useState(false);

  function handleNext() {
    setBookable((i) => (i + 1) % bookablesInGroup.length);
  }

  return (
    <Fragment>
      <div>
        <select
          value={group}
          onChange={(e) => setGroup(e.target.value as Group)}
        >
          {groups.map((g) => (
            <option value={g} key={g}>
              {g}
            </option>
          ))}
        </select>

        <ul className="bookables items-list-nav">
          {bookablesInGroup.map((b, i) => (
            <li key={b.id} className={i === selectedBookable ? 'selected' : ''}>
              <button className="btn" onClick={() => setBookable(i)}>
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
                    onChange={() => setHasDetails((has) => !has)}
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
