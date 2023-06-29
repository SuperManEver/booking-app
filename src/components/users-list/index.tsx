import { useState, useEffect, Fragment } from 'react';

// components
import Spinner from 'components/UI/spinner';

function UsersList() {
  const [users, setUsers] = useState<any[] | null>(null);
  const [selectedUserIdx, setUser] = useState(1);

  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then((resp) => resp.json())
      .then((data) => setUsers(data));
  }, []);

  if (!users) {
    return <Spinner />;
  }

  const currentUser = users[selectedUserIdx];

  return (
    <Fragment>
      <ul className="bookables items-list-nav">
        {users.map((user, i) => (
          <li key={user.id} className={i === selectedUserIdx ? 'selected' : ''}>
            <button className="btn" onClick={() => setUser(i)}>
              {user.name}
            </button>
          </li>
        ))}
      </ul>

      {currentUser && (
        <div className="bookable-details">
          <div className="item">
            <div className="item-header">
              <h2>{currentUser.name}</h2>
            </div>

            <div className="item-details">
              <h3>{currentUser.title}</h3>
              <div className="bookable-availability">
                <p>{currentUser.notes}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default UsersList;
