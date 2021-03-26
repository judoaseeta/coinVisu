import React from 'react';

import { 
    Story,
    Meta  
} from '@storybook/react';

import Footer from '../';

export default {
    title: '푸터'
} as Meta;

const Template:Story = () => <Footer />;

export const 푸터 =  Template.bind({});