import { useState } from 'react';
import { days, sessions } from 'data/static.json';

// interfaces
import { Bookable } from 'types';

interface IProps {
  bookable: Bookable;
}

function BookableDetails({ bookable }: IProps) {
  const [hasDetails, setHasDetails] = useState(true);

  function toggleDetails() {
    setHasDetails((has) => !has);
  }

  return bookable ? (
    <div className="bookable-details item">
      <div className="item-header">
        <h2>{bookable.title}</h2>
        <span className="controls">
          <label>
            <input
              type="checkbox"
              onChange={toggleDetails}
              checked={hasDetails}
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
  ) : null;
}

export default BookableDetails;
