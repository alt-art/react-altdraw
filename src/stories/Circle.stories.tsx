import type { Meta, StoryObj } from '@storybook/react';

import Circle from './Circle';

const meta: Meta<typeof Circle> = {
  component: Circle,
  argTypes: {
    color: { control: 'color' },
    strokeColor: { control: 'color' },
    strokeWeight: {
      control: 'number',
      type: 'number',
      min: 1,
      max: 10,
      step: 1,
    },
  },
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
  },
};
