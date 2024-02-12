import { useQuery } from 'react-query';

import { ROOT_URL } from 'utils/api';

export function useFetchUsers() {
  return useQuery('allUsers', async () => {
    const url = ROOT_URL + 'users';

    const res = await fetch(url);
    const data = await res.json();

    return data;
  });
}
