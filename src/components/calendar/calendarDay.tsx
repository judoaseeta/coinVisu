import React from 'react';
import classname from 'classnames/bind';
// entity
import CalendarItem from '../../entities/calendar/calendarItem';

// styles
import styles from './styles/calendarComponent.module.scss';
const cx = classname.bind(styles);

interface CalendarDayProps {
    currentItem: CalendarItem;
    currentMonth: number;
    item: CalendarItem;
    onClick: (item: CalendarItem) => void;
}
const CalendarDay: React.FC<CalendarDayProps> = ({
    currentItem,
    item,
    currentMonth,
    onClick
}) =>
<td
    className={cx('calendar_td', {
        isNotCurrentMonth: !item.isInMonth(currentItem.getMonth(), currentItem.getYear()),
        isAfterToday: item.isAfterToday(),
        isSameDay: item.isSameDayWith(currentItem)
    })}
    onClick={() => onClick(item)}
    data-testid={`${item.getMonth()}-${item.getDate()}`}
>
    {item.getDate()}
</td>

export default CalendarDay;
