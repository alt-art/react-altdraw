import type { Meta, StoryObj } from '@storybook/react';

import LoadFont from './LoadFont';

const meta: Meta<typeof LoadFont> = {
  component: LoadFont,
};

export default meta;

type Story = StoryObj<typeof LoadFont>;

export const Primary: Story = {
  args: {
    color: 'white',
  },
};
