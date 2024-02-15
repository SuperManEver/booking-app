import { Fragment } from 'react';

import { useFetchUsers } from 'utils/hooks';

import { User } from 'types';

// components
import Spinner from 'components/UI/spinner';

interface IProps {
  user: User | null;
  setUser(user: User): void;
}

function UsersList({ user, setUser }: IProps) {
  const { data: users, isLoading, isError } = useFetchUsers();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || !users) {
    return <div>Error is occured</div>;
  }

  return (
    <Fragment>
      <ul className="bookables items-list-nav">
        {users.map((u, idx) => (
          <li key={u.id} className={idx === u.id ? 'selected' : ''}>
            <button className="btn" onClick={() => setUser(u)}>
              {u.name}
            </button>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export default UsersList;
