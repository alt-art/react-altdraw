import type { Meta, StoryObj } from '@storybook/react';

import Triangle from './Triangle';

const meta: Meta<typeof Triangle> = {
  component: Triangle,
};

export default meta;
type Story = StoryObj<typeof Triangle>;

export const Primary: Story = {
  args: {
    color: 'red',
    stroke: true,
    strokeColor: 'black',
    strokeWeight: 2,
    fill: true,
  },
};
