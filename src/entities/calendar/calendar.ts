import CalendarItem from './calendarItem';

export default class Calendar {
    private constructor() {
    }
    static getDaysInMonth( year:number, month: number){
        return 32 - new Date(year, month, 32).getDate();
    }
    static createCalendar(DateOrCalendarItem: Date | CalendarItem) {
        let firstCalendarItem: CalendarItem;
        if(CalendarItem.isCalendarItem(DateOrCalendarItem)) {
            firstCalendarItem = new CalendarItem(new Date(
                Date.UTC(
                    DateOrCalendarItem.getYear(),
                    DateOrCalendarItem.getMonth(),
                    1
                )
            ));
        } else {
            const firstDate =  new Date(
                Date.UTC(
                    DateOrCalendarItem.getFullYear(),
                    DateOrCalendarItem.getMonth(),
                    1
                ),
            );
            firstCalendarItem = new CalendarItem(firstDate);
        }
        // get the number of days in this month;
        const daysInThisMonth = this.getDaysInMonth(firstCalendarItem.getYear(), firstCalendarItem.getMonth());
        // the number of days in previous month in calendar
        const firstRowGap = firstCalendarItem.getDay();

        // 
        const calendarLength = firstRowGap + daysInThisMonth === 28 ? 28 :  firstRowGap + daysInThisMonth> 35 ? 42 : 35;
        let calendarItemList:CalendarItem[] = [];
        let startCalendarItem = new CalendarItem(firstCalendarItem.getDateBeforeXdays(firstRowGap));
        calendarItemList.push(startCalendarItem);
        for(let i = 1; i < calendarLength; i++) {
            calendarItemList.push(new CalendarItem(startCalendarItem.getDateAfterXdays(i)));
        }
        return calendarItemList;
    }
}