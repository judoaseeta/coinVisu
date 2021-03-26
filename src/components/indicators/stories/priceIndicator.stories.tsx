import React from 'react';

import { 
    Story,
    Meta  
} from '@storybook/react';

import Container from '../';
import PriceIndicator, { PriceIndicatorProps } from '../priceIndicator';
import { 
    mockDownCurrent,
    mockUpCurrent,
    mockSameCurrent
} from '../mocks';

export default {
    title: '가격 표시 컴퍼넌트',
} as Meta;

const PriceIndiTemplate: Story<PriceIndicatorProps> = (args) => <Container><PriceIndicator {...args} /></Container>;

export const 가격_상승중 =  PriceIndiTemplate.bind({});

가격_상승중.args ={
    data: mockUpCurrent
}
export const 가격_하락중 =  PriceIndiTemplate.bind({});

가격_하락중.args ={
    data: mockDownCurrent
}
export const 가격_보합 =  PriceIndiTemplate.bind({});

가격_보합.args ={
    data: mockSameCurrent
}