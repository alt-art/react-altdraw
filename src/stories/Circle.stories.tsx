import type { Meta, StoryObj } from '@storybook/react';

import Circle from './Circle';

const meta: Meta<typeof Circle> = {
  component: Circle,
};

export default meta;
type Story = StoryObj<typeof Circle>;

export const Primary: Story = {
  args: {
    color: 'red',
    radius: 50,
    stroke: true,
    strokeColor: 'black',
    strokeWeight: 2,
    fill: true,
  },
};
