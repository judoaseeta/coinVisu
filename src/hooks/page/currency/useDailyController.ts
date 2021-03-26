import { 
    useCallback,
    useState
} from 'react';
import useCalendar from '../../useCalendar';
import CalendarItem from '../../../entities/calendar/calendarItem';

interface UseDailyControllerProps {
    startDays: number;
    limit: number; 
}
const UseDailyController = ({
    startDays,
    limit
}:UseDailyControllerProps) => {
    // calendar parts
    const endCalendar = useCalendar({
        // should set hour of the date to am12 because of api issues.
        fromDate: new Date(
            Date.UTC(
                new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate(),
            11
            )
        ),
        notUseAfterToday: true
    });
    const startCalendar = useCalendar({
        fromDate: endCalendar.currentDate.getDateBeforeXdays(startDays)
    });
    // calendar toggle handlers
    const [ isStartCalendarOn, setOnStartCalendar ] = useState(false);
    const [ isEndCalendarOn, setOnEndCalendar] = useState(false);
    const toggleStartCalendar = useCallback((toggle: boolean) => {
        setOnStartCalendar( toggle);
    },[]);
    const toggleEndCalendar = useCallback((toggle: boolean) => {
        setOnEndCalendar(toggle);
    },[]);
    // calendar set date wrapper
    
    // distances between two calendar current dates
    const getDistances = useCallback(() =>{
        const startDate= startCalendar.currentDate;
        const endDate= endCalendar.currentDate;
        const pureDayDistance = startDate.getDaysBetween(endDate);
        return pureDayDistance + 1;
    }, [
       startCalendar.currentDate,
       endCalendar.currentDate 
    ]);
    const prevSetDate = useCallback((item: CalendarItem) => {
        const endDate = endCalendar.currentDate;
        const isStartEarlier = item.isEarlierOrSame(endDate);
        const gapBetween = item.getDaysBetween(endDate);
        if(isStartEarlier && gapBetween > 6) {
            startCalendar.setDate(item);
        } else if(gapBetween > limit) {
            const endItemInLimit = startCalendar.currentDate.getDateAfterXdays(limit);
            startCalendar.setDate(item);
            endCalendar.setDate(new CalendarItem(endItemInLimit));
        
        }
    },[
        startCalendar,
        endCalendar,
        limit
    ]);

    const nextSetDate = useCallback((item: CalendarItem) => {
        const startDate = startCalendar.currentDate
        const isEndEarlier = item.isEarlierOrSame(startDate);
        const gapBetween = item.getDaysBetween(startDate);
        // check if the end calendar item is earlier than the current start calendar item
        if(!isEndEarlier && gapBetween > 6) {
            endCalendar.setDate(item);
        } else if(isEndEarlier) {
            endCalendar.setDate(item);
            startCalendar.setDate(new CalendarItem(item.getDateBeforeXdays(getDistances())));
        } else if(gapBetween > limit) {
            const startItemInLimit = item.getDateBeforeXdays(limit);
            endCalendar.setDate(item);
            startCalendar.setDate(new CalendarItem(startItemInLimit));
        }
    },[
        endCalendar,
        startCalendar,
        getDistances,
        limit
    ]);
 
    // proxy methods for keeping distances between the two calendars.

    const startPrevMonth = useCallback(() => {
        const startPrevMonthItem = startCalendar.getPrevMonthItem();
        // keep distance between the two calendars in limit.
        if(startPrevMonthItem.getDaysBetween(endCalendar.currentDate) > limit) {
            const newEndCalendarItem =startPrevMonthItem.getDateAfterXdays(limit);
            startCalendar.setDate(startPrevMonthItem);
            endCalendar.setDate(new CalendarItem(newEndCalendarItem));
        } else {
            startCalendar.setDate(startPrevMonthItem);
        }
    },[
        limit,
        startCalendar,
        endCalendar,
    ]);
    const startNextMonth = useCallback(() => {
        const startNextMonthItem = startCalendar.getNextMonthItem();
        // keep distance between two calendars at least 7days.
        if(startNextMonthItem.getDaysBetween(endCalendar.currentDate) < 7) {
            const newStartItem = endCalendar.currentDate.getDateBeforeXdays(7);
            startCalendar.setDate(new CalendarItem(newStartItem));
        } else {
            startCalendar.setDate(startNextMonthItem);
        }
        
    },[
        endCalendar,
        startCalendar,
    ]);
    const nextPrevMonth = useCallback(() => {
        const endPrevMonthItem = endCalendar.getPrevMonthItem();
        // keep distance between two calendars at least 7days.
        if(endPrevMonthItem.getDaysBetween(startCalendar.currentDate) < 7) {
            const newStartItem = endPrevMonthItem.getDateBeforeXdays(7);
            startCalendar.setDate(new CalendarItem(newStartItem));
            endCalendar.setDate(endPrevMonthItem);
        } else {
            endCalendar.setDate(endPrevMonthItem);
        }
    },[
        endCalendar,
        startCalendar,
    ]);
   
    return {
        startCalendar: {
            ...startCalendar,
            setDate: prevSetDate,
            prevMonth: startPrevMonth,
            nextMonth: startNextMonth
        },
        endCalendar: {
            ...endCalendar,
            setDate: nextSetDate,
            prevMonth: nextPrevMonth
        },
        isStartCalendarOn,
        isEndCalendarOn,
        toggleStartCalendar,
        toggleEndCalendar,
        getDistances,
    }
}

export default UseDailyController;
