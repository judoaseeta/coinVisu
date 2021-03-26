import React from 'react';
import { Story,Meta  } from '@storybook/react';
import TopBar, { TopBarProps} from '../';
export default {
    title: '탑 바',
    args: {
        isLogin: false
    },
    argTypes :{
        onSignUpHandler: {
            action: '회원가입'
        },
        onLoginHandler : {
            action: '로그인'
        },
        onLogoutHandler : {
            action: '로그아웃'
        }
    }
} as Meta;

const TopBarTemplate: Story<TopBarProps> = (args) => <TopBar {...args} />;

export const 탑바 = TopBarTemplate.bind({});