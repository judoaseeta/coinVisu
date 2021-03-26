import React from 'react';
import CalendarItem from '../../entities/calendar/calendarItem';

import CalendarBody from './calendarBody';
// styles 
import styles from './styles/calendarComponent.module.scss';
const days = ['일','월','화','수','목','금','토'];

export interface CalendarProps {
    calendar: CalendarItem[];
    currentItem: CalendarItem;
    currentMonth: number;
    onCalendarItemClick: (item: CalendarItem) => void;
}
const Calendar:React.FC<CalendarProps> = ({
    calendar,
    currentItem,
    currentMonth,
    onCalendarItemClick
}) =>
<table
    className={styles.container}
>
    <thead>
        <tr>
            {
                days.map(day => <th className={styles.calendar_th} key={day}>{day}</th>)
            }
        </tr>
    </thead>
    <CalendarBody 
        calendar={calendar}
        currentItem={currentItem}
        currentMonth={currentMonth}
        onClick={onCalendarItemClick}
    />
</table>;

export default Calendar;
