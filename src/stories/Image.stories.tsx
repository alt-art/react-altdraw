import type { Meta, StoryObj } from '@storybook/react';

import Image from './Image';

const meta: Meta<typeof Image> = {
  component: Image,
};

export default meta;

type Story = StoryObj<typeof Image>;

export const Primary: Story = {
  args: {},
};
