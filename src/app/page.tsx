'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import ModelSelector from '../components/features/ModelSelector';
import PromptEditor from '../components/features/PromptEditor';
import ParametersPanel from '../components/features/ParametersPanel';
import ChatOutput from '../components/features/ChatOutput';
import Button from '../components/ui/Button';
import { AIModel, ChatMessage, ModelParameters } from '../types';

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [parameters, setParameters] = useState<ModelParameters>({
    temperature: 0.7,
    maxTokens: 2048,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
  });
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleClearChat = () => {
    setMessages([]);
  };

  const handleSubmit = async () => {
    if (!prompt.trim() || !selectedModel) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: prompt,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    // Simulate AI response with a delay
    setTimeout(() => {
      // Mock AI response
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `This is a simulated response from ${selectedModel.name} with temperature ${parameters.temperature} and max tokens ${parameters.maxTokens}.\n\nYour prompt was: "${prompt}"\n\nIn a real implementation, this would connect to the actual AI model API and return a genuine response based on your prompt and the selected parameters.`,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setLoading(false);
    }, 1500);

    // Clear the prompt after sending
    setPrompt('');
  };

  return (
    <main className="flex min-h-screen flex-col p-4 md:p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">AI Interface Prototype</h1>
        <Button
          variant="outline"
          onClick={toggleTheme}
          icon={
            theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )
          }
        >
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <ModelSelector onSelect={setSelectedModel} />
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <PromptEditor
              value={prompt}
              onChange={setPrompt}
              className="h-64"
            />
            <div className="mt-4 flex justify-end">
              <Button
                onClick={handleSubmit}
                disabled={!prompt.trim() || !selectedModel || loading}
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                }
              >
                Send
              </Button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 h-96">
            <ChatOutput
              messages={messages}
              loading={loading}
              className="h-full"
              onClear={handleClearChat}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <ParametersPanel
            model={selectedModel || undefined}
            onChange={setParameters}
            initialParameters={parameters}
          />
        </div>
      </div>

      <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>AI Interface Prototype - Built with Next.js and Tailwind CSS</p>
      </footer>
    </main>
  );
}
