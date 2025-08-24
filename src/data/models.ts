import { AIModel } from '../types';

export const models: AIModel[] = [
  {
    id: 'gpt-3.5',
    name: 'GPT-3.5',
    provider: 'OpenAI',
    description: 'Fast and efficient for most tasks',
    maxTokens: 4096,
    defaultTemperature: 0.7
  },
  {
    id: 'gpt-4',
    name: 'GPT-4',
    provider: 'OpenAI',
    description: 'Advanced reasoning and comprehension',
    maxTokens: 8192,
    defaultTemperature: 0.7
  },
  {
    id: 'claude-2',
    name: 'Claude 2',
    provider: 'Anthropic',
    description: 'Balanced performance with nuanced understanding',
    maxTokens: 100000,
    defaultTemperature: 0.5
  },
  {
    id: 'llama-2',
    name: 'Llama 2',
    provider: 'Meta',
    description: 'Open-source model with strong capabilities',
    maxTokens: 4096,
    defaultTemperature: 0.6
  },
  {
    id: 'mistral-7b',
    name: 'Mistral 7B',
    provider: 'Mistral AI',
    description: 'Efficient open-source model with good performance',
    maxTokens: 8192,
    defaultTemperature: 0.7
  },
];