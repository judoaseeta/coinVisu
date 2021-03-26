import React from 'react';

import { 
    Story,
    Meta  
} from '@storybook/react';
// chart components
import CandleChart from '../candleChart';
import LineChart from '../lineChart';
// type
import { ChartProps } from '../types';
// mock
import {
    mockHistoData,
    mockHistoData50,
    mockHistoData100,
    mockHistoData157,
    mockMinuteHistoData,
    mockHourlyData,
    mockDimensions,
    xScale,
    yScale,
    xScale157,
    xScaleHourly,
    yScale157,
    xScale50,
    yScaleHourly,
    xScaleMinute,
    yScaleMinute,
    volumeMinute,
    yScale50,
    xScale100,
    yScale100,
    volumeScale,
    volumeScale50,
    volumeScale100,
    volumeScale157,
    volumeHourly
} from '../mocks';


export default {
    title: '챠트 컴퍼넌트들',
    args: {
        dimensions: mockDimensions,
        datas: mockHistoData,
        xScale,
        yScale,
        volumeScale,
        selectedIndex: 1,
        symbol: 'BTC',
        timeType: 'daily'
    },
    argTypes: {
        onMouseMove: {
            action: 'mouse-moved on panel'
        }
    }
} as Meta;

const CandleChartTemplate: Story<ChartProps> = (args) => <CandleChart {...args} />;

export const 캔들차트_10개의_히스토데이터와 = CandleChartTemplate.bind({});
export const 캔들차트_50개의_히스토데이터와 = CandleChartTemplate.bind({});


캔들차트_50개의_히스토데이터와.args = {
    datas: mockHistoData50,
    xScale: xScale50,
    yScale: yScale50,
    volumeScale: volumeScale50,
    selectedIndex: 18
}
export const 캔들차트_100개의_히스토데이터와 = CandleChartTemplate.bind({});


캔들차트_100개의_히스토데이터와.args = {
    datas: mockHistoData100,
    xScale: xScale100,
    yScale: yScale100,
    volumeScale: volumeScale100,
    selectedIndex: 97
}
export const 캔들차트_157개의_히스토데이터와 = CandleChartTemplate.bind({});


캔들차트_157개의_히스토데이터와.args = {
    datas: mockHistoData157,
    xScale: xScale157,
    yScale: yScale157,
    volumeScale: volumeScale157
}

export const 캔들차트_200개의_분당_히스토데이터와 = CandleChartTemplate.bind({});


캔들차트_200개의_분당_히스토데이터와.args = {
    datas: mockMinuteHistoData,
    xScale: xScaleMinute,
    yScale: yScaleMinute,
    volumeScale: volumeMinute,
    timeType: 'minute'
}
// line chart stories go here..

const LineChartTemplate: Story<ChartProps> = (args) => <LineChart {...args} />;
export const 선형차트_10개의_히스토데이터와 = LineChartTemplate.bind({});

export const 선형차트_50개의_히스토데이터와 = LineChartTemplate.bind({});


선형차트_50개의_히스토데이터와.args = {
    datas: mockHistoData50,
    xScale: xScale50,
    yScale: yScale50,
    volumeScale: volumeScale50
}
export const 선형차트_100개의_히스토데이터와 = LineChartTemplate.bind({});


선형차트_100개의_히스토데이터와.args = {
    datas: mockHistoData100,
    xScale: xScale100,
    yScale: yScale100,
    volumeScale: volumeScale100,
    selectedIndex:95
}
export const 선형차트_157개의_히스토데이터와 = LineChartTemplate.bind({});


선형차트_157개의_히스토데이터와.args = {
    datas: mockHistoData157,
    xScale: xScale157,
    yScale: yScale157,
    volumeScale: volumeScale157,
    selectedIndex:95
}

export const 선형차트_157개의_시간별_히스토데이터와 = LineChartTemplate.bind({});


선형차트_157개의_시간별_히스토데이터와.args = {
    datas: mockHourlyData,
    xScale: xScaleHourly,
    yScale: yScaleHourly,
    volumeScale: volumeHourly,
    selectedIndex:65,
    timeType: 'hourly'
}