import { useState, useCallback } from 'react';
import data from 'data/static.json';

// interfaces
import { Bookable } from 'types';

interface IProps {
  bookable: Bookable | null;
}

function BookableDetails({ bookable }: IProps) {
  const { days, sessions } = data;

  const [hasDetails, setHasDetails] = useState(true);

  const toggleDetails = useCallback(() => {
    setHasDetails((has) => !has);
  }, []);

  if (!bookable) {
    return null;
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
