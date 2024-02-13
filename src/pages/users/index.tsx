import { useState } from 'react';

import { User } from 'types';

import UsersList from 'components/users-list';
import UserDetails from 'components/user-details';

function UsersPage() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <main className="users-page">
      <UsersList user={user} setUser={setUser} />
      <UserDetails user={user} />
    </main>
  );
}

export default UsersPage;
