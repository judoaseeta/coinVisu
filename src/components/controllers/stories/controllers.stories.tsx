import React from 'react';
import { 
    Story,
    Meta,
} from '@storybook/react';
import { action } from '@storybook/addon-actions';
//components
import DailyController, { DailyControllerProps } from '../daily';
import ValueInput, { ValueInputProps } from '../valueInput';
import HourlyController, { HourlyControllerProps } from '../hourly';
import MinuteController, { MinuteControllerProps } from '../minute';
import Selector, { SelectorProps } from '../selector';
// mock
import {
    mockStartCalendar,
    mockEndCalendar
} from '../mocks';
export default {
    title: '메인차트 데이터 시간타입 선택 컴퍼넌트',
} as Meta;

const Template: Story<ValueInputProps> = (args) => <ValueInput  {...args} />;

export const 시간선택인풋 = Template.bind({});
시간선택인풋.args = {
    value: 10,
};
시간선택인풋.argTypes = {
    onSubmit: {
        action: 'submit'
    },
    onChange: {
        action: 'change'
    },
    onIncrease: {
        action: 'increase'
    },
    onDecrease: {
        action: 'decrease'
    }
}

const CalendarsTemplate:Story<DailyControllerProps> = (args) => <DailyController {...args} />;

export const 일간데이터_컨트롤러 = CalendarsTemplate.bind({});


일간데이터_컨트롤러.args = {
    startCalendar: {
        currentCalendar: mockStartCalendar,
        currentDate: mockStartCalendar[15],
        currentMonth: 1,
        currentYear: 2021,
        setDate: action('startCalendar_setDate'),
        prevMonth: action('startCalendar_prevMonth'),
        nextMonth: action('startCalendar_nextMonth'),
        getNextMonthItem: () => mockEndCalendar[15],
        getPrevMonthItem: () => mockEndCalendar[15]
    },
    endCalendar: {
        currentCalendar: mockEndCalendar,
        currentDate: mockEndCalendar[15],
        currentMonth: 2,
        currentYear: 2021,
        setDate: action('endCalendar_setDate'),
        prevMonth: action('endCalendar_prevMonth'),
        nextMonth: action('endCalendar_nextMonth'),
        getNextMonthItem: () => mockEndCalendar[15],
        getPrevMonthItem: () => mockEndCalendar[15]
    },
    isEndCalendarOn: false,
    isStartCalendarOn: true,
    getDistances: () => mockEndCalendar[15].getDaysBetween(mockStartCalendar[15])
}
일간데이터_컨트롤러.argTypes = {
    toggleStartCalendar: {
        action: 'toggle_startCalendar'
    },
    toggleEndCalendar : {
        action: 'toggle_endCalendar'
    },
    request: {
        action: 'request_histoDatas'
    }
}

const HourlyTemplate:Story<HourlyControllerProps> = (args) => <HourlyController {...args} />;

export const 시간별데이터_컨트롤러 = HourlyTemplate.bind({});

시간별데이터_컨트롤러.args = {
    ...시간선택인풋.args,
    calendar: mockEndCalendar,
    currentItem: mockEndCalendar[15],
    currentMonth: 2,
    currentYear: 2021,
    isCalendarOn: true
}

시간별데이터_컨트롤러.argTypes = {
    onToggle : {
        action: 'toggle_calendar'
    },
    onPrevMonth : {
        action: 'prev_month'
    },
    onNextMonth : {
        action: 'next_month'
    },
    onCalendarItemClick : {
        action: 'calendar_item_click'
    },
    ...시간선택인풋.argTypes
}
const MinuteTemplate:Story<MinuteControllerProps> = (args) => <MinuteController {...args} />;
export const 분당_데이터_컨트롤러 = MinuteTemplate.bind({});
분당_데이터_컨트롤러.args = {
    ...시간선택인풋.args
}
분당_데이터_컨트롤러.argTypes = {
    ...시간선택인풋.argTypes
}
const SelecterTemplate:Story<SelectorProps> = (args) => <Selector {...args} />;
export const 시간유형_선택자 = SelecterTemplate.bind({});
시간유형_선택자.args = {
    timeType: 'hourly'
}
시간유형_선택자.argTypes = {
    setTime :{ 
        action: 'set_time'
    }
}
