import { useReducer } from 'react';
import reducer from './reducer';
import { getWeek } from 'utils';
import { FaChevronLeft, FaCalendarDay, FaChevronRight } from 'react-icons/fa';

interface IProps {
  date: Date;
}

function WeekPicker({ date }: IProps) {
  const [week, dispatch] = useReducer(reducer, date, getWeek);

  return (
    <div>
      <p className="date-picker">
        <button className="btn" onClick={() => dispatch({ type: 'PREV_WEEK' })}>
          <FaChevronLeft />
          <span>Prev</span>
        </button>

        <button className="btn" onClick={() => dispatch({ type: 'TODAY' })}>
          <FaCalendarDay />
          <span>Today</span>
        </button>

        <button className="btn" onClick={() => dispatch({ type: 'NEXT_WEEK' })}>
          <span>Next</span>
          <FaChevronRight />
        </button>
      </p>
      <p>
        {week.start.toDateString()} - {week.end.toDateString()}
      </p>
    </div>
  );
}

export default WeekPicker;
