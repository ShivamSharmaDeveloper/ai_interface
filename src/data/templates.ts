import { PromptTemplate } from '../types';

export const templates: PromptTemplate[] = [
  {
    id: '1',
    name: 'General Assistant',
    content: 'You are a helpful, friendly AI assistant. Answer the following question: {{input}}',
    description: 'Default assistant template for general questions',
    createdAt: '2023-01-15T10:30:00Z',
    updatedAt: '2023-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Code Explainer',
    content: 'Explain the following code in simple terms:\n```\n{{input}}\n```',
    description: 'Helps understand code snippets with clear explanations',
    createdAt: '2023-02-20T14:15:00Z',
    updatedAt: '2023-03-05T09:45:00Z'
  },
  {
    id: '3',
    name: 'Creative Writer',
    content: 'Write a creative short story about {{input}}. Make it engaging and approximately 300 words.',
    description: 'Generates creative short stories based on a topic',
    createdAt: '2023-03-10T16:20:00Z',
    updatedAt: '2023-03-10T16:20:00Z'
  },
  {
    id: '4',
    name: 'Data Analyst',
    content: 'Analyze the following data and provide insights:\n{{input}}',
    description: 'Helps analyze data and extract meaningful insights',
    createdAt: '2023-04-05T11:10:00Z',
    updatedAt: '2023-04-25T13:40:00Z'
  },
  {
    id: '5',
    name: 'Email Composer',
    content: 'Write a professional email for the following purpose:\n{{input}}',
    description: 'Creates professional email drafts for various purposes',
    createdAt: '2023-05-12T08:30:00Z',
    updatedAt: '2023-05-12T08:30:00Z'
  },
];