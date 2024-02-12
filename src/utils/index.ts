export function addDays(date: Date, daysToAdd: number) {
  const clone = new Date(date.getTime());
  clone.setDate(clone.getDate() + daysToAdd);
  return clone;
}

export function getWeek(forDate: Date, daysOffset = 0) {
  const date = addDays(forDate, daysOffset);
  const day = date.getDay();

  return {
    date,
    start: addDays(date, -day),
    end: addDays(date, 6 - day),
  };
}

export function getData(url: string) {
  return fetch(url).then((resp) => {
    if (!resp.ok) {
      throw Error('There was a problem fetching data.');
    }

    return resp.json();
  });
}
