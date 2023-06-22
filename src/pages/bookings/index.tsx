import WeekPicker from 'components/week-picker';

function BookablesPage() {
  return (
    <main className="bookings-page">
      <p>Bookings!</p>
      <WeekPicker date={new Date()} />
    </main>
  );
}

export default BookablesPage;
