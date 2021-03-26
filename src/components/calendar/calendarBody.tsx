import React from 'react';
// entity
import CalendarItem from '../../entities/calendar/calendarItem';
// component
import CalendarDay from './calendarDay';

interface CalendarBodyProps {
    calendar:CalendarItem[];
    currentItem: CalendarItem;
    currentMonth: number;
    onClick: (item: CalendarItem) => void;
}

const renderCalendarItems = (
    calendar: CalendarItem[],
    currentItem: CalendarItem,
    currentMonth: number,
    onClick:(item: CalendarItem) => void 
) => {
    const list = [];
    for(let i = 0; i < calendar.length / 7; i++){
        const row = [];
        for(let j = i * 7; j < i * 7 + 7 ; j++) {
            row.push(
                <CalendarDay 
                    currentItem={currentItem}
                    currentMonth={currentMonth}
                    item={calendar[j]}
                    key={calendar[j].getTime()}
                    onClick={onClick}
                />
            )
        }
        list.push(
            <tr key={'row' + i}>{row}</tr>
        )
    }
    return list;
}
const CalendarBody: React.FC<CalendarBodyProps> = ({ 
    calendar,
    currentItem,
    currentMonth, 
    onClick  
}) => 
<tbody>
    {renderCalendarItems(calendar,currentItem,currentMonth,onClick)}
</tbody>;

export default CalendarBody;
