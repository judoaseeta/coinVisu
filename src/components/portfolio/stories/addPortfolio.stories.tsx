import React from 'react';

import { Story,Meta  } from '@storybook/react';
import AddPortFolio, { AddPortFolioProps } from '../addPortfolio';

export default {
    title: '포트폴리오 추가창',
    args: {
        isLogin: false,
        on: false,
        purchasePrice: 'few',
        purchaseAmount: 0.000033,
        priceError: '매입가는 100이하의 소수 혹은 숫자여야 합니다 ㅠㅠ',
        amountError: '',
        symbol: 'BTC'
    },
    argTypes :{
        onPriceChange : {
            action: 'purchasePrice-change'
        },
        onAmountChange : {
            action: 'purchaseAmount-change'
        },
        onLoginClick: {
            action: 'loginClick'
        }
    }
} as Meta;

const Template:Story<AddPortFolioProps> = (args) => <AddPortFolio {...args} />;

export const 포트폴리오_추가_화면_OFF_로그아웃시 = Template.bind({});

export const 포트폴리오_추가_화면_ON = Template.bind({});
포트폴리오_추가_화면_ON.args = {
    on: true,
    isLogin: true
}
export const 포트폴리오_추가_화면_OFF_로그인시 = Template.bind({});

포트폴리오_추가_화면_OFF_로그인시.args = {
    on: false,
    isLogin: true
}