import Calendar from '../calendar';
import CalendarItem from '../calendarItem';

describe('Calendar',() => {
    it('static createCalendar with Date', () => {
        // January 2021
        const date1 = new Date(2021,0,20);
        const calendar1 = Calendar.createCalendar(date1);

        expect(calendar1.length).toEqual(42);
        expect(calendar1[0].getMonth()).toEqual(11);
        expect(calendar1[0].getDate()).toEqual(27);
        // February 2021
        const date2 = new Date(2021,1,13);
        const calendar2 = Calendar.createCalendar(date2);

        expect(calendar2.length).toEqual(35);
        expect(calendar2[0].getMonth()).toEqual(0);
        expect(calendar2[0].getDate()).toEqual(31);
        // March 2021
        const date3 = new Date(2021,2,21);
        const calendar3 = Calendar.createCalendar(date3);
        expect(calendar3.length).toEqual(35);
        expect(calendar3[0].getMonth()).toEqual(1);
        expect(calendar3[0].getDate()).toEqual(28);
        // April 2021
        const date4 = new Date(2021,3,5);
        const calendar4 = Calendar.createCalendar(date4);
        expect(calendar4.length).toEqual(35);
        expect(calendar4[0].getMonth()).toEqual(2);
        expect(calendar4[0].getDate()).toEqual(28);
        // May 2021
        const date5 = new Date(2021,4,8);
        const calendar5 = Calendar.createCalendar(date5);
        expect(calendar5.length).toEqual(42);
        expect(calendar5[0].getMonth()).toEqual(3);
        expect(calendar5[0].getDate()).toEqual(25);
        // June 2021
        const date6 = new Date(2021,5,6);
        const calendar6 = Calendar.createCalendar(date6);
        expect(calendar6.length).toEqual(35);
        expect(calendar6[0].getMonth()).toEqual(4);
        expect(calendar6[0].getDate()).toEqual(30);
        // July 2021
        const date7 = new Date(2021,6,19);
        const calendar7 = Calendar.createCalendar(date7);
        expect(calendar7.length).toEqual(35);
        expect(calendar7[0].getMonth()).toEqual(5);
        expect(calendar7[0].getDate()).toEqual(27);
        // August 2021
        const date8 = new Date(2021,7,25);
        const calendar8 = Calendar.createCalendar(date8);
        expect(calendar8.length).toEqual(35);
        expect(calendar8[0].getMonth()).toEqual(7);
        expect(calendar8[0].getDate()).toEqual(1);
        // September 2021
        const date9 = new Date(2021,8,30);
        const calendar9 = Calendar.createCalendar(date9);
        expect(calendar9.length).toEqual(35);
        expect(calendar9[0].getMonth()).toEqual(7);
        expect(calendar9[0].getDate()).toEqual(29);
        // October 2021
        const date10 = new Date(2021,9,2);
        const calendar10 = Calendar.createCalendar(date10);
        expect(calendar10.length).toEqual(42);
        expect(calendar10[0].getMonth()).toEqual(8);
        expect(calendar10[0].getDate()).toEqual(26);
        // November 2021
        const date11 = new Date(2021,10,4);
        const calendar11 = Calendar.createCalendar(date11);
        expect(calendar11.length).toEqual(35);
        expect(calendar11[0].getMonth()).toEqual(9);
        expect(calendar11[0].getDate()).toEqual(31);
    });
    it('static createCalendar with CalendarItem', () => {
        // January 2016
        const date1 = new CalendarItem(new Date(2016,0,20));
        const calendar1 = Calendar.createCalendar(date1);
        expect(calendar1.length).toEqual(42);
        expect(calendar1[0].getMonth()).toEqual(11);
        expect(calendar1[0].getDate()).toEqual(27);
        // February 2016
        const date2 = new CalendarItem(new Date(2016,1,15));
        const calendar2 = Calendar.createCalendar(date2);
        expect(calendar2.length).toEqual(35);
        expect(calendar2[0].getMonth()).toEqual(0);
        expect(calendar2[0].getDate()).toEqual(31);
        // March 2016
        const date3 = new CalendarItem(new Date(2016,2,29));
        const calendar3 = Calendar.createCalendar(date3);
        expect(calendar3.length).toEqual(35);
        expect(calendar3[0].getMonth()).toEqual(1);
        expect(calendar3[0].getDate()).toEqual(28);
        // April 2016
        const date4 = new CalendarItem(new Date(2016,3,1));
        const calendar4 = Calendar.createCalendar(date4);
        expect(calendar4.length).toEqual(35);
        expect(calendar4[0].getMonth()).toEqual(2);
        expect(calendar4[0].getDate()).toEqual(27);
         // May 2016
         const date5 = new CalendarItem(new Date(2016,4,5));
         const calendar5 = Calendar.createCalendar(date5);
         expect(calendar5.length).toEqual(35);
         expect(calendar5[0].getMonth()).toEqual(4);
         expect(calendar5[0].getDate()).toEqual(1);
    });
});