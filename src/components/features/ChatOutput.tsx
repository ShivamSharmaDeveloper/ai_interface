'use client';

import React, { useState } from 'react';
import ChatBubble from '../ui/ChatBubble';
import Button from '../ui/Button';
import { ChatMessage } from '../../types';

export interface ChatOutputProps {
  messages: ChatMessage[];
  className?: string;
  loading?: boolean;
  onClear?: () => void;
}

const ChatOutput: React.FC<ChatOutputProps> = ({
  messages,
  className = '',
  loading = false,
  onClear = () => {},
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const downloadConversation = () => {
    // Format the conversation as text
    const conversationText = messages
      .map((msg) => `${msg.role.toUpperCase()}: ${msg.content}`)
      .join('\n\n');

    // Create a blob and download link
    const blob = new Blob([conversationText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `conversation-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`flex flex-col h-full ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Conversation</h3>
        {messages.length > 0 && (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onClear}
              icon={(
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              )}
            >
              Clear
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={downloadConversation}
              icon={(
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              )}
            >
              Download
            </Button>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-1">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 dark:text-gray-400 text-center">
              No messages yet. Start a conversation to see responses here.
            </p>
          </div>
        ) : (
          messages.map((message, index) => (
            <ChatBubble
              key={index}
              message={message}
              onCopy={(text) => handleCopy(text, index)}
              className={copiedIndex === index ? 'border-blue-500 dark:border-blue-400' : ''}
            />
          ))
        )}
        
        {loading && (
          <div className="flex items-center space-x-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="animate-pulse flex space-x-2">
              <div className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
              <div className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
              <div className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">AI is thinking...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatOutput;