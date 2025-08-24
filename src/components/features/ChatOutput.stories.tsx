import type { Meta, StoryObj } from '@storybook/react';
import ChatOutput from './ChatOutput';
import { ChatMessage } from '../../types';

const meta: Meta<typeof ChatOutput> = {
  title: 'Features/ChatOutput',
  component: ChatOutput,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ChatOutput>;

const mockMessages: ChatMessage[] = [
  {
    id: '1',
    role: 'system',
    content: 'You are a helpful AI assistant.',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '2',
    role: 'user',
    content: 'Can you explain how transformers work in machine learning?',
    timestamp: new Date(Date.now() - 3000000).toISOString(),
  },
  {
    id: '3',
    role: 'assistant',
    content: 'Transformers are a type of neural network architecture that revolutionized natural language processing. They use a mechanism called "attention" to weigh the importance of different words in a sentence relative to each other, allowing the model to capture contextual relationships regardless of how far apart words are in the text. This was a significant improvement over previous sequential models like RNNs and LSTMs.\n\nThe key components of transformers include:\n\n1. **Self-attention mechanism**: Allows the model to focus on relevant parts of the input sequence\n2. **Multi-head attention**: Enables the model to focus on different aspects of the input simultaneously\n3. **Positional encoding**: Adds information about word position since transformers process all words in parallel\n4. **Feed-forward neural networks**: Process the attention output\n\nTransformers form the foundation of models like BERT, GPT, and T5, which have achieved state-of-the-art results across many NLP tasks.',
    timestamp: new Date(Date.now() - 2400000).toISOString(),
  },
  {
    id: '4',
    role: 'user',
    content: 'Can you show me some Python code for implementing a simple attention mechanism?',
    timestamp: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: '5',
    role: 'assistant',
    content: 'Here\'s a simplified implementation of a self-attention mechanism in PyTorch:\n\n```python\nimport torch\nimport torch.nn as nn\nimport torch.nn.functional as F\n\nclass SelfAttention(nn.Module):\n    def __init__(self, embed_size, heads):\n        super(SelfAttention, self).__init__()\n        self.embed_size = embed_size\n        self.heads = heads\n        self.head_dim = embed_size // heads\n        \n        assert (self.head_dim * heads == embed_size), "Embed size needs to be divisible by heads"\n        \n        # Linear projections\n        self.values = nn.Linear(self.head_dim, self.head_dim, bias=False)\n        self.keys = nn.Linear(self.head_dim, self.head_dim, bias=False)\n        self.queries = nn.Linear(self.head_dim, self.head_dim, bias=False)\n        self.fc_out = nn.Linear(heads * self.head_dim, embed_size)\n    \n    def forward(self, values, keys, query, mask=None):\n        N = query.shape[0]  # Batch size\n        value_len, key_len, query_len = values.shape[1], keys.shape[1], query.shape[1]\n        \n        # Split embedding into self.heads pieces\n        values = values.reshape(N, value_len, self.heads, self.head_dim)\n        keys = keys.reshape(N, key_len, self.heads, self.head_dim)\n        queries = query.reshape(N, query_len, self.heads, self.head_dim)\n        \n        # Linear projections\n        values = self.values(values)\n        keys = self.keys(keys)\n        queries = self.queries(queries)\n        \n        # Attention\n        energy = torch.einsum("nqhd,nkhd->nhqk", [queries, keys])\n        # queries shape: (N, query_len, heads, head_dim)\n        # keys shape: (N, key_len, heads, head_dim)\n        # energy shape: (N, heads, query_len, key_len)\n        \n        if mask is not None:\n            energy = energy.masked_fill(mask == 0, float("-1e20"))\n        \n        attention = F.softmax(energy / (self.embed_size ** (1/2)), dim=3)\n        \n        out = torch.einsum("nhql,nlhd->nqhd", [attention, values])\n        # attention shape: (N, heads, query_len, key_len)\n        # values shape: (N, value_len, heads, head_dim)\n        # out shape: (N, query_len, heads, head_dim)\n        \n        out = out.reshape(N, query_len, self.heads * self.head_dim)\n        out = self.fc_out(out)\n        return out\n```\n\nThis implementation includes:\n\n1. Splitting the input into multiple attention heads\n2. Computing the attention scores using scaled dot-product attention\n3. Applying a mask (if provided) to prevent attending to certain positions\n4. Computing the weighted sum of values based on attention scores\n5. Concatenating and projecting the outputs from all heads\n\nTo use this in a transformer model, you would combine it with positional encodings, layer normalization, and feed-forward networks.',
    timestamp: new Date(Date.now() - 1200000).toISOString(),
  },
];

export const Empty: Story = {
  args: {
    messages: [],
    className: 'h-[500px] w-[600px]',
  },
};

export const WithMessages: Story = {
  args: {
    messages: mockMessages,
    className: 'h-[500px] w-[600px]',
    onClear: () => alert('Clear chat clicked'),
  },
};

export const Loading: Story = {
  args: {
    messages: mockMessages,
    loading: true,
    className: 'h-[500px] w-[600px]',
  },
};

export const SingleMessage: Story = {
  args: {
    messages: [mockMessages[2]],
    className: 'h-[500px] w-[600px]',
  },
};