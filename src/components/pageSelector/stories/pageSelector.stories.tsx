import React from 'react';

import { Story,Meta  } from '@storybook/react';

// components 
import Pages, { PagesProps } from '..';

export default {
    title: '페이지 선택 컴퍼넌트',
    args: {
        currentPage: 1,
    },
    argTypes: {
        onPage: {
            action: 'page'
        }
    }
} as Meta;

const PagesTemplate: Story<PagesProps> = (args) => <Pages {...args} />;

export const 페이지_선택_컴퍼넌트 = PagesTemplate.bind({});
