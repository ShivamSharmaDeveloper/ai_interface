import type { Meta, StoryObj } from '@storybook/react';
import ParametersPanel from './ParametersPanel';
import { AIModel } from '../../types';

const meta: Meta<typeof ParametersPanel> = {
  title: 'Features/ParametersPanel',
  component: ParametersPanel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ParametersPanel>;

const mockModel: AIModel = {
  id: 'gpt-4',
  name: 'GPT-4',
  provider: 'OpenAI',
  description: 'Most powerful model for complex tasks',
  maxTokens: 8192,
  defaultTemperature: 0.7,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const Default: Story = {
  args: {
    className: 'w-96',
  },
};

export const WithModel: Story = {
  args: {
    model: mockModel,
    className: 'w-96',
  },
};

export const WithCustomInitialParameters: Story = {
  args: {
    initialParameters: {
      temperature: 0.3,
      maxTokens: 1024,
      topP: 0.8,
      frequencyPenalty: 0.5,
      presencePenalty: 0.5,
    },
    className: 'w-96',
  },
};

export const WithOnChangeHandler: Story = {
  args: {
    model: mockModel,
    className: 'w-96',
    onChange: (parameters) => console.log('Parameters changed:', parameters),
  },
};