import React from 'react';
import { 
    Story,
    Meta  
} from '@storybook/react';
// components
import Loading, { LoadingProps } from '../';

export default {
    title: '로딩 컴퍼넌트',
    args: {
        loadingMessage: 'BTC에 대해서 불러오고 있습니다!'
    }
} as Meta;

const LoadingTemplate: Story<LoadingProps> = (args) => <Loading {...args} />;

export const 메시지_표시중인_상태 = LoadingTemplate.bind({});