import type { Meta, StoryObj } from '@storybook/react';

import Rectangle from './Rectangle';

const meta: Meta<typeof Rectangle> = {
  component: Rectangle,
};

export default meta;
type Story = StoryObj<typeof Rectangle>;

export const Primary: Story = {
  args: {},
};
