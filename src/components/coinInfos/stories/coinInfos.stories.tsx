import React from 'react';
import {
    StaticRouter
} from 'react-router-dom';
// components
import CoinInfos, { CoinInfosProps } from '../';
// 
import { 
    Story,
    Meta  
} from '@storybook/react';

// mocks
import { 
    mockCoinInfo,  
    mockChartData
} from '../mocks';

export default {
    title: '가상화폐 정보 컴퍼넌트',
    args: {
        infos: mockCoinInfo,
        histoDatas:mockChartData,
        priviewSrc: '/noload.png'
    },
    decorators: [
        (story) => <StaticRouter>{story()}</StaticRouter> 
    ]
} as Meta;

const CoinInfosTemplate:Story<CoinInfosProps> = (args) => <CoinInfos {...args} />;

export const 가상화폐_정보_컴퍼넌트_데이터와 = CoinInfosTemplate.bind({});