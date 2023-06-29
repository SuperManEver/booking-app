import { useState, useEffect } from 'react';

// components
import Spinner from 'components/UI/spinner';

function UserPicker() {
  const [users, setUsers] = useState<any[] | null>(null);

  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then((resp) => resp.json())
      .then((data) => setUsers(data));
  }, []);

  if (!users) {
    return <Spinner />;
  }

  return (
    <select>
      {users.map((user) => (
        <option key={user.id}>{user.name}</option>
      ))}
    </select>
  );
}

export default UserPicker;
