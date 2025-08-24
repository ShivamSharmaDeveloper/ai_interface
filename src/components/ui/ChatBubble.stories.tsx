import type { Meta, StoryObj } from '@storybook/react';
import ChatBubble from './ChatBubble';

const meta: Meta<typeof ChatBubble> = {
  title: 'UI/ChatBubble',
  component: ChatBubble,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ChatBubble>;

export const User: Story = {
  args: {
    message: {
      id: '1',
      role: 'user',
      content: 'How can I implement a dark mode toggle in my React application?',
      timestamp: new Date().toISOString(),
    },
  },
};

export const Assistant: Story = {
  args: {
    message: {
      id: '2',
      role: 'assistant',
      content: 'To implement a dark mode toggle in React, you can use the Context API to manage the theme state across your application. Here\'s a simple implementation:\n\n1. Create a ThemeContext\n2. Create a ThemeProvider component\n3. Use the useContext hook to access the theme\n4. Toggle between light and dark themes\n\nWould you like me to provide a code example?',
      timestamp: new Date().toISOString(),
    },
  },
};

export const System: Story = {
  args: {
    message: {
      id: '3',
      role: 'system',
      content: 'This conversation is being recorded for quality assurance purposes.',
      timestamp: new Date().toISOString(),
    },
  },
};

export const LongMessage: Story = {
  args: {
    message: {
      id: '4',
      role: 'assistant',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.\n\nNullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.',
      timestamp: new Date().toISOString(),
    },
  },
};

export const CodeSnippet: Story = {
  args: {
    message: {
      id: '5',
      role: 'assistant',
      content: 'Here\'s how you can implement a dark mode toggle:\n\n```jsx\nimport React, { createContext, useContext, useState, useEffect } from "react";\n\nconst ThemeContext = createContext();\n\nexport const ThemeProvider = ({ children }) => {\n  const [theme, setTheme] = useState("light");\n  \n  const toggleTheme = () => {\n    setTheme(theme === "light" ? "dark" : "light");\n  };\n  \n  useEffect(() => {\n    document.body.className = theme;\n  }, [theme]);\n  \n  return (\n    <ThemeContext.Provider value={{ theme, toggleTheme }}>\n      {children}\n    </ThemeContext.Provider>\n  );\n};\n\nexport const useTheme = () => useContext(ThemeContext);\n```',
      timestamp: new Date().toISOString(),
    },
  },
};