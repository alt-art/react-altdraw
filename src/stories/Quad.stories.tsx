import type { Meta, StoryObj } from '@storybook/react';

import Quad from './Quad';

const meta: Meta<typeof Quad> = {
  component: Quad,
};

export default meta;

type Story = StoryObj<typeof Quad>;

export const Primary: Story = {
  args: {
    color: 'red',
    stroke: true,
    strokeColor: 'black',
    strokeWeight: 2,
    fill: true,
  },
};
