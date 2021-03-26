import React from 'react';
// entity
import CalendarItem from '../../entities/calendar/calendarItem';
// styles
import styles from './styles/calendarNav.module.scss';

export interface CalendarNavProps {
    currentItem: CalendarItem;
    currentYear: number;
    currentMonth: number;
    isCalendarOn: boolean;
    onPrevMonth: React.MouseEventHandler;
    onNextMonth: React.MouseEventHandler;
    onToggle: (toggle: boolean) => void;
}
const CalendarNav = React.forwardRef<HTMLDivElement, CalendarNavProps>(({
    currentItem,
    currentYear,
    currentMonth,
    isCalendarOn,
    onPrevMonth,
    onNextMonth,
    onToggle
},ref) =>
<div
    className={styles.container}
    ref={ref}
>
    <span
        className={styles.direction}
        onClick={onPrevMonth}
    >ᐊ</span>
    <div
        className={styles.date}
    >
        <h2
            className={styles.navDate}
            onClick={() => onToggle(!isCalendarOn)}
        >
        {currentItem.getYear()}년 {currentItem.getMonth()+1}월 {currentItem.getDate()}일
        </h2>
    </div>
    <span
        className={styles.direction}
        onClick={onNextMonth}
    >ᐅ</span>
</div>);


export default CalendarNav;
