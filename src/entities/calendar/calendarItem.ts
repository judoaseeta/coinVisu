export default class CalendarItem {
    private date: Date;
    constructor(date: Date) {
        this.date = date;
    }
    static isCalendarItem(item:  Date | CalendarItem): item is CalendarItem {
        return (item as CalendarItem).getDateObject !== undefined;
    }
    isSameDayWith(target: Date | CalendarItem) {
        // if target is typeof CalendarItem;
        if(CalendarItem.isCalendarItem(target)) {
            const date = target.getDateObject();
            // check if year and month and date are same
            return date.getFullYear() === this.date.getFullYear() &&
                date.getMonth() === this.date.getMonth() &&
                date.getDate() === this.date.getDate();
        } else {
            return target.getFullYear() === this.date.getFullYear() &&
            target.getMonth() === this.date.getMonth() &&
            target.getDate() === this.date.getDate();
        }
    }
    isEarlierOrSame(target: Date | CalendarItem) {
        return target.getTime() >= this.date.getTime();
    }
    isToday() {
        const today = new Date();
        const target = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999));        
        return target >= this.date;
    }
    isAfterToday() {
        const today = new Date();
        const target = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999));
        return target < this.date;
    }
    isAfterCurrentMonth() {
        const now = new Date();
        const nextMonth = new Date(Date.UTC(now.getFullYear(), now.getMonth()+1,0,0,0));
        return nextMonth <= this.date;
    }
    isInMonth(month: number, year: number = new Date().getFullYear()) {
        const currentYear = this.date.getFullYear();
        const currentMonth = this.date.getMonth();
        return currentMonth === month && currentYear === year;
    }
    getDateObject() {
        return new Date(this.date);
    }
    getDay() {
        return this.date.getDay ();
    }
    getDate() {
        return this.date.getDate();
    }
    getMonth() {
        return this.date.getMonth();
    }
    getYear() {
        return this.date.getFullYear();
    }
    getTime() {
        return this.date.getTime();
    }
    getDateBeforeXdays(xDays: number) {
        const oldDate = new Date(this.date.getTime());
        return new Date(oldDate.setDate(this.date.getDate()- xDays));
    }
    getDateAfterXdays(xDays: number) {
        const oldDate = new Date(this.date.getTime());
        return new Date(oldDate.setDate(this.date.getDate() + xDays));
    }
    getDateBeforeXhours(xHours: number) {
        return new Date( this.date.getTime() - (3600000 * xHours));
    }
    getDaysBetween(dest: Date | CalendarItem): number {
        const day = 1000 * 60 * 60 * 24;
        if(CalendarItem.isCalendarItem(dest)) {
            return Math.abs(Math.floor((this.date.getTime() - dest.getDateObject().getTime()) / day));
        } else {
            return Math.abs(Math.floor((this.date.getTime() - dest.getTime()) / day));
        }
    }
    getHoursBetween(dest: Date | CalendarItem): number {
        const hour = 1000 * 60 * 60;
        if(CalendarItem.isCalendarItem(dest)) {
            return Math.abs(Math.floor((this.date.getTime() - dest.getDateObject().getTime()) / hour));
        } else {
            return Math.abs(Math.floor((this.date.getTime() - dest.getTime()) / hour));
        }
    }
    isOutRangeOfDay(target: CalendarItem, range: number) {
        const day = 1000 * 60 * 60 * 24;
        return this.date.getTime() < target.getDateObject().getTime() - (day * range);
    }
}