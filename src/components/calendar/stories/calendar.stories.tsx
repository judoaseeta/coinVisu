import React from 'react';

import { Story,Meta  } from '@storybook/react';

import Calendar from '../../../entities/calendar/calendar';
import CalendarComponent, { CalendarProps } from '../calendar';
import CalendarNav, { CalendarNavProps } from '../calendarNav';
import CombinedCalendar , { CalendarCombinedProps } from '../';

const CombinedTemplate: Story<CalendarCombinedProps> = (args) => <CombinedCalendar {...args} />
const Template: Story<CalendarProps> = (args) => <CalendarComponent {...args} />;
const NavTemplate: Story<CalendarNavProps> = (args) => <CalendarNav {...args} />;


const mockCalendar = Calendar.createCalendar(new Date(2021,1,15));
export default {
    title: '달력 컴퍼넌트',
    argTypes: {
        onCalendarItemClick: {
            action: '달력 아이템 클릭'
        },
        onPrevMonth: {
            action: '이전 달'
        },
        onNextMonth: {
            action: '다음 달'
        },
        onToggle: {
            action: '달력 토글'
        }
    },
    args: {
        calendar:mockCalendar,
        currentMonth: 2,
        currentItem: mockCalendar[15],
        currentYear: 2021,
        isCalendarOn: false
    }
} as Meta;

export const 달력_열려있는_상태 = CombinedTemplate.bind({});
달력_열려있는_상태.args = {
    isCalendarOn: true
}
export const 달력_날짜_테이블 = Template.bind({});


export const 달력헤드 = NavTemplate.bind({});
