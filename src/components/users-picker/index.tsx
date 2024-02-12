// hooks
import { useFetchUsers } from 'utils/hooks';

// components
import Spinner from 'components/UI/spinner';

function UserPicker() {
  const { data: users, isLoading } = useFetchUsers();

  if (isLoading) {
    return <Spinner />;
  }

  if (!users) {
    return null;
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
