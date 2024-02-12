// hooks
import { useFetchUsers } from 'utils/hooks';

// types
import { User } from 'types';

// components
import Spinner from 'components/UI/spinner';

function UserPicker() {
  const { data: users, isLoading } = useFetchUsers() as Partial<{
    data: User[];
    isLoading: boolean;
  }>;

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
