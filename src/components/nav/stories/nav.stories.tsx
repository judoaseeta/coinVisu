import React from 'react';
import { StaticRouter } from 'react-router-dom';
// components
import Nav,{ NavProps } from '../';
import ExtendedSearch, { ExtendedSearchProps } from '../extendedSearch';
// mocks
import {
    mockResults,
    mockResultsUnder10
} from '../mocks';
// 
import { 
    Story,
    Meta  
} from '@storybook/react';

export default {
    title: '메인 네비게이션 컴퍼넌트',
    args: {
        results: mockResults.slice(0,10),
        searchKeyword: 'btc',
        totalResultsLength: mockResults.length - 10,
        on: true
    },
    argTypes :{
        onChange: {
            action: '검색어 입력중..'
        },
        onFocus: {
            action: '포커싱'
        },
        onKeyDown: {
            action: '키보드 입력중'
        }
    },
    decorators: [
        (story) => <StaticRouter>{story()}</StaticRouter>
    ]
} as Meta;

const NavTemplate:Story<NavProps> = (args) => <Nav {...args} />;

export const 검색_결과_있는_경우 = NavTemplate.bind({});
export const 검색_결과가_10개_미만 = NavTemplate.bind({});
검색_결과가_10개_미만.args = {
    results: mockResultsUnder10,
    totalResultsLength: 6,
    searchKeyword: 'moner',
}
export const 검색_결과_없는상태 = NavTemplate.bind({});
검색_결과_없는상태.args = {
    results: [],
    totalResultsLength: 0,
}

const ExSearchTemplate:Story<ExtendedSearchProps> = (args) => <ExtendedSearch {...args} />;

export const 확장된_검색_결과 = ExSearchTemplate.bind({});

확장된_검색_결과.args = {
    datas: mockResults,
    searchKeyword: 'btc'
}