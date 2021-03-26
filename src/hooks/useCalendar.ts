import CalendarItem from '../entities/calendar/calendarItem';
import Calendar from '../entities/calendar/calendar';
import { useCallback ,useState, useMemo } from 'react';

interface UseCalendarProps {
    fromDate?: Date;
    notUseAfterToday?: boolean;
}
const useCalendar = ({ fromDate = new Date(), notUseAfterToday = false}: UseCalendarProps = {}) => {
    const [ currentDate, setCurrentDate ] = useState<CalendarItem>(new CalendarItem(fromDate));
    // current calendar year
    const currentYear = useMemo(() => ( currentDate.getYear()),[ currentDate ]);
    // current calendar month
    const currentMonth = useMemo(() => ( currentDate.getMonth() + 1),[ currentDate ]);
    // current Calendar
    const currentCalendar = useMemo(() => (Calendar.createCalendar(currentDate)),[ currentDate ]);

    // helper function for calculating prev and next month
    const getPrevMonthItem = useCallback(() => {
        const date = currentDate.getDateObject();
        return new CalendarItem(new Date(
            date.getFullYear(),
            date.getMonth(),
            0
        ));
    },[
        currentDate
    ]);

    const getNextMonthItem = useCallback(() => {
        const date = currentDate.getDateObject();
        return new CalendarItem(new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            1
        ));
    },[
        currentDate
    ]);
    // set Calendar to previous month
    const prevMonth = useCallback(() => {
        setCurrentDate(getPrevMonthItem());
    },[ getPrevMonthItem ]);
    // set Calendar to next month.
    const nextMonth = useCallback(() => {
       
        const newDate = getNextMonthItem();
        if(!notUseAfterToday) {

            setCurrentDate(newDate);
        }
        if(notUseAfterToday&& !newDate.isAfterToday()) {

            setCurrentDate(newDate);
        }
    },[ 
        notUseAfterToday,
        getNextMonthItem
    ]);
    // set date
    const setDate = useCallback((item: CalendarItem) => {
        if(!item.isAfterToday() && !item.isSameDayWith(currentDate)) {
            setCurrentDate(item)
        }
    },[
        currentDate
    ]);
    return {
        prevMonth,
        nextMonth,
        setDate,
        getPrevMonthItem,
        getNextMonthItem,
        currentCalendar,
        currentDate,
        currentYear,
        currentMonth
    }
};
export type ReturnTypeUseCalendar = ReturnType<typeof useCalendar>;
export default useCalendar;
