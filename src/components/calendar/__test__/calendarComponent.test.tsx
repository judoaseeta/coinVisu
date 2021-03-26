import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Calendar from '../../../entities/calendar/calendar';
//components
import CalendarCompo from '../calendar';

describe('<Calendar />',() => {
    it('should render proper number of items, pass CalendarItem by click', async() => {
        const mockOnCalendarClick = jest.fn();
        const calendar = Calendar.createCalendar(new Date(2021,1,15));
        const { container } = render(
            <CalendarCompo 
                onCalendarItemClick={mockOnCalendarClick}
                calendar={calendar}
                currentItem={calendar[15]}
                currentMonth={2}
            />
        );
        // The calendar of February 2021 should return 35days.
        expect( container.getElementsByClassName('calendar_td').length).toEqual(35);
        // click 23-February 2021
        const twentyThird = screen.getByTestId("1-23");
        fireEvent.click(twentyThird);
        expect(mockOnCalendarClick).toHaveBeenCalled();
        // should pass 24th CalendarItem on Calendar
        expect(mockOnCalendarClick.mock.calls[0][0]).toEqual(calendar[23]);

        const thirtyOne = screen.getByTestId("0-31");
        // 31-January 2021 should have 'isNotCurrentMonth' in classList
        expect(thirtyOne.classList.contains('isNotCurrentMonth')).toBe(true);
        // 01-March 2021 should have isNotCurrentMonth' in classList
        const marchOne = screen.getByTestId("2-1");
        expect(marchOne.classList.contains('isNotCurrentMonth')).toBe(true);
    });
});