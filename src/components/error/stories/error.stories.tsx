import React from 'react';

import { 
    Story,
    Meta  
} from '@storybook/react';

import ErrorComponent, {ErrorComponentProps} from '../';

export default {
    title: '에러표시 컴퍼넌트',
    args: {
        message: '로그인시 에라가 발생했습니다'
    },
    argTypes : {
        onErrorClose : {
            action: 'click-error-close'
        }
    }
} as Meta;

const Template: Story<ErrorComponentProps> = (args) => <ErrorComponent {...args} />;

export const 에러표시 = Template.bind({});