import type { Meta, StoryObj } from '@storybook/react';

import Arc from './Arc';

const meta: Meta<typeof Arc> = {
  component: Arc,
};

export default meta;
type Story = StoryObj<typeof Arc>;

export const Primary: Story = {
  args: {
    color: 'red',
    stroke: true,
    strokeColor: 'black',
    strokeWeight: 2,
    fill: true,
  },
};
