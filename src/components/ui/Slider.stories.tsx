import type { Meta, StoryObj } from '@storybook/react';
import Slider from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'UI/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    defaultValue: { control: 'number' },
    showValue: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {
    min: 0,
    max: 10,
    step: 0.1,
    defaultValue: 5,
    label: 'Default Slider',
    showValue: true,
  },
};

export const Temperature: Story = {
  args: {
    min: 0,
    max: 2,
    step: 0.01,
    defaultValue: 0.7,
    label: 'Temperature',
    showValue: true,
  },
};

export const MaxTokens: Story = {
  args: {
    min: 0,
    max: 4096,
    step: 1,
    defaultValue: 1024,
    label: 'Max Tokens',
    showValue: true,
  },
};

export const Disabled: Story = {
  args: {
    min: 0,
    max: 10,
    step: 0.1,
    defaultValue: 5,
    label: 'Disabled Slider',
    showValue: true,
    disabled: true,
  },
};

export const WithoutValue: Story = {
  args: {
    min: 0,
    max: 10,
    step: 0.1,
    defaultValue: 5,
    label: 'Without Value Display',
    showValue: false,
  },
};