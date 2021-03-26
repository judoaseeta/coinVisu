import React from 'react';

import { Story,Meta  } from '@storybook/react';

import PortFolio, { PortFolioProps} from '../portfolio';

export default {
    title: '포트폴리오 컴퍼넌트',
    args: {
        currentPrice: 24232.2,
        symbol: 'BTC',
        currentPortFolio : {
            avgPrice: 47000.33,
            amount: 88,
        },
        isLogin: true
    }
} as Meta;

const PortfolioTemplate:Story<PortFolioProps> = (args) => <PortFolio {...args} />;

export const 포트폴리오 = PortfolioTemplate.bind({});
export const 포트폴리오_상승 = PortfolioTemplate.bind({});
포트폴리오_상승.args = {
    currentPrice: 54232.2,
    symbol: 'BTC',
    currentPortFolio : {
        avgPrice: 47000.33,
        amount: 880000
    }
}
export const 포트폴리오_로그아웃시 = PortfolioTemplate.bind({});
포트폴리오_로그아웃시.args = {
    currentPrice: 54232.2,
    currentPortFolio :undefined,
    isLogin: false,
}
export const 포트폴리오_미보유시 = PortfolioTemplate.bind({});
포트폴리오_미보유시.args = {
    currentPortFolio :undefined,
    isLogin: true,
}