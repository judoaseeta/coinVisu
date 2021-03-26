import React from 'react';

import { 
    Story,
    Meta  
} from '@storybook/react';

import Container from '..';
import DataIndicator, { DataIndicatorProps } from '../dataIndicator';
import {
    mockDownHistoData,
    mockUpHistoData
} from '../mocks';

export default {
    title: '데이터 표시 컴퍼넌트'
} as Meta;

const DataIndicatorTemplate:Story<DataIndicatorProps> = (args) => 
<Container><DataIndicator {...args} /></Container>;

export const 하락중인_히스토데이터의_경우 = DataIndicatorTemplate.bind({});

하락중인_히스토데이터의_경우.args = {
    data: mockDownHistoData,
    timeType: 'hourly'
}

export const 상승중인_히스토데이터의_경우 = DataIndicatorTemplate.bind({});
상승중인_히스토데이터의_경우.args = {
    data: mockUpHistoData,
    timeType: 'daily'
}