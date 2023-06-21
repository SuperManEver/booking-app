// data
import data from 'data/static.json';

function UserPicker() {
  const users = data['users'];

  return (
    <select>
      {users.map((user) => (
        <option key={user.id}>{user.name}</option>
      ))}
    </select>
  );
}

export default UserPicker;
