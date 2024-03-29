import Forms from './Forms'

import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Forms',
  component: Forms,
} as ComponentMeta<typeof Forms>;

export const Primary: ComponentStory<typeof Forms> = () => <Forms />;