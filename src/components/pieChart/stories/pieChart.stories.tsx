import React from 'react';
import { 
    schemeCategory10,
    schemeSet2
} from 'd3-scale-chromatic';

import { Story,Meta  } from '@storybook/react';
//mock
import { 
    mockExchangeData, 
    mockDimensions,
    mockPairData
} from '../mocks';
import PieChart, { PieChartProps } from '../index';

export default {
    title: '파이 차트 컴퍼넌트',
    args : {
        dimensions: mockDimensions,
    }
} as Meta;

const PieChartTemplate: Story<PieChartProps> = (args) => <PieChart {...args} />;

export const 거래소_정보_파이차트 = PieChartTemplate.bind({});
거래소_정보_파이차트.args = {
    datas: mockExchangeData,
    pieKey: 'volume24h',
    colorScheme: schemeCategory10,
    coreKey: 'exchange',
    title: '가장 많이 거래된 거래소',
    symbol: 'BTC'
}
export const 거래쌍_정보_파이차트 = PieChartTemplate.bind({});

거래쌍_정보_파이차트.args = {
    datas: mockPairData,
    colorScheme: schemeSet2,
    pieKey: 'VOLUME24HOURTO',
    coreKey: 'FULLNAME',
    title: '가장 많이 거래된 가상화폐',
    symbol: 'BTC'
}