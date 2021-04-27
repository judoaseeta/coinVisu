import CalendarItem from '../calendarItem';

describe('Testing CalendarItem',() => {
    it('isCalendarItem should check type',() => {
         // when type: CalendarItem is given
        const calendarItem = new CalendarItem(new Date());
        expect(CalendarItem.isCalendarItem(calendarItem)).toBe(true);
        // when nonCalendarItem(type: Date) is given
        const nonCalendarItem = new Date();
        expect(CalendarItem.isCalendarItem(nonCalendarItem)).toBe(false);
    });
    it('isSameDayWith', () => {
        const calendarItem = new CalendarItem(new Date(1988,0,15));
        //when type: Date with same date is given
        const sameDate = new Date(1988,0,15);
        expect(calendarItem.isSameDayWith(sameDate)).toBe(true);
        //when type: Date with different date is given
        const differDate = new Date(1988,0,18);
        expect(calendarItem.isSameDayWith(differDate)).toBe(false);
        //when type: CalendarItem with same date is given
        const sameDateCalendarItem = new CalendarItem(new Date(1988,0,15));
        expect(calendarItem.isSameDayWith(sameDateCalendarItem)).toBe(true);
        //when type: CalendarItem with different date is given
        const differDateCalendarItem = new CalendarItem(new Date(1988,0,20));
        expect(calendarItem.isSameDayWith(differDateCalendarItem)).toBe(false);
    });
    it('isEarlierthanTarget', () => {
        const calendarItem = new CalendarItem(new Date(1988,0,15));
        // when type: Date with a earlier date should return false
        const earlierDate = new Date(1987,0,12);
        expect(calendarItem.isEarlierOrSame(earlierDate)).toBe(false);
          // when type: Date with a earlier date should return true
        const laterDate = new Date(1997,3,23);
        expect(calendarItem.isEarlierOrSame(laterDate)).toBe(true);
    });
    it('isAfterToday',() => {
        const oldDay = new CalendarItem(new Date(1988,0,15));
        const future = new CalendarItem(new Date(2022,2,11));
        // oldDay should return false;
        expect(oldDay.isAfterToday()).toBe(false);
        // future should return true;
        expect(future.isAfterToday()).toBe(true);
    });
    it('isAfterCurrentMonth', () => {
        const current = new Date();
        const oneMonthLater = new CalendarItem(new Date(current.setMonth(current.getMonth() + 1)));
        expect(oneMonthLater.isAfterCurrentMonth()).toBe(true);
    });
    it('getDateBeforeXdays', () => {
        const current = new CalendarItem(new Date());
        const currentDate = current.getDateObject();
        const sevenDaysBefore = new Date( currentDate.setDate(currentDate.getDate()-7));
        expect(current.getDateBeforeXdays(7).getDate()).toEqual(sevenDaysBefore.getDate());
    });
    it('getDateBeforeXhours', () => {
        const current = new CalendarItem(new Date());
        const currentTime = current.getDateObject();
        const before17Hours = new Date(currentTime.setHours(currentTime.getHours( )- 25));
        expect(current.getDateBeforeXhours(25).getHours()).toEqual(before17Hours.getHours());
    });
    it('getDaysBetween', () => {
        const current = new CalendarItem(new Date());
        // when destination is type: Date;
        const currentDate = current.getDateObject();
        const dateBefore32days = new Date( currentDate.setDate( currentDate.getDate() - 32));
        expect(current.getDaysBetween(dateBefore32days)).toEqual(32);
        // when destination is type: CalendarItem;
        const currentDate2 = current.getDateObject();
        const calendarItem47daysAgo = new CalendarItem(new Date( currentDate2.setDate(currentDate2.getDate() -47)));
        expect(current.getDaysBetween(calendarItem47daysAgo)).toEqual(47);
    });
    it('getHoursBetween',() => {
        const current = new CalendarItem(new Date());
        // when destination is type : Date;
        const currentDate = current.getDateObject();
        const dateBefore18Hours = new Date(currentDate.setHours( currentDate.getHours() - 18));
        expect(current.getHoursBetween(dateBefore18Hours)).toEqual(18);
        // when destination is type: CalendarItem;  
        const currentDate2 = current.getDateObject();
        const calendarItem3HoursAgo = new CalendarItem(new Date(currentDate2.setHours(currentDate2.getHours() -3)));
        expect(current.getHoursBetween(calendarItem3HoursAgo)).toEqual(3);
    }); 
});