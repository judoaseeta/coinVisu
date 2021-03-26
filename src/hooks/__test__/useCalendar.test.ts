import { renderHook, act } from '@testing-library/react-hooks';
import UseCalendar from '../useCalendar';
import Calendar from '../../entities/calendar/calendar';
describe('UseCalendar', () => {
   it('Without arguments', () => {
    const { result } = renderHook(() => UseCalendar());
    
    // by default,it should return calendarItems of current year and month.
    const now = new Date();
    const nowYear = now.getFullYear();
    const nowMonth = now.getMonth();
    const daysOfTheMonth = Calendar.getDaysInMonth(nowYear, nowMonth);
    expect(result.current.currentYear).toEqual(nowYear);
    expect(result.current.currentMonth).toEqual(nowMonth + 1);
    // get length of days in current month in calendar
    expect(result.current.currentCalendar.filter( day => day.isInMonth(nowMonth,nowYear)).length).toEqual(daysOfTheMonth);


    // excute prevMonth
    act(() => result.current.prevMonth());
    const prevDate = new Date( nowYear, nowMonth -1);

    const daysOfThePrevMonth = Calendar.getDaysInMonth(prevDate.getFullYear(), prevDate.getMonth());

    expect(result.current.currentYear).toEqual(prevDate.getFullYear());
    expect(result.current.currentMonth).toEqual(prevDate.getMonth() + 1);
    expect(result.current.currentCalendar.filter( item => item.isInMonth(
        prevDate.getMonth()
    )).length).toEqual(daysOfThePrevMonth);

    // excute nextMonth double times
    act(() => {
        result.current.nextMonth();
    });
    act(() => {
        result.current.nextMonth();
    })
    const nextDate = new Date( nowYear, nowMonth + 1); 
    const daysOfTheNextMonth = Calendar.getDaysInMonth(nextDate.getFullYear(), nextDate.getMonth());
    expect(result.current.currentYear).toEqual(nextDate.getFullYear());
    expect(result.current.currentMonth).toEqual(nextDate.getMonth() + 1);

    // length of days in Calendar should equal to the length of days in the next month.
    expect(result.current.currentCalendar.filter( item => item.isInMonth(
        nextDate.getMonth()
    )).length).toEqual(daysOfTheNextMonth);

   });
   it('With arguments(initial Date)',() => {
    const fromDate= new Date(2002,0,15);
    const { result } = renderHook(() => UseCalendar({
        fromDate
    }));
    const fromDateYear = fromDate.getFullYear();
    const fromDateMonth = fromDate.getMonth();
    const daysInfromDateMonth = Calendar.getDaysInMonth(fromDateYear, fromDateMonth);

    expect(result.current.currentYear).toEqual(fromDateYear);
    expect(result.current.currentMonth).toEqual(fromDateMonth + 1);
    expect(result.current.currentCalendar.filter( day => day.isInMonth(fromDateMonth,fromDateYear)).length).toEqual(daysInfromDateMonth);
    // 2001.12.30 should be the first item of calendar;
    expect(result.current.currentCalendar[0].getMonth()).toEqual(11);
    expect(result.current.currentCalendar[0].getDate()).toEqual(30);
    // 2002.02.02 should be the last item of calendar;
    expect(result.current.currentCalendar[result.current.currentCalendar.length - 1].getMonth()).toEqual(1);
    expect(result.current.currentCalendar[result.current.currentCalendar.length - 1].getDate()).toEqual(2);
   });
});