import type { Meta, StoryObj } from '@storybook/react';

import Ellipse from './Ellipse';

const meta: Meta<typeof Ellipse> = {
  component: Ellipse,
};

export default meta;

type Story = StoryObj<typeof Ellipse>;

export const Primary: Story = {
  args: {},
};
