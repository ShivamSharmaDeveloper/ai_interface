import React from 'react';
import { ChatMessage } from '../../types';

export interface ChatBubbleProps {
  message: ChatMessage;
  onCopy?: (content: string) => void;
  className?: string;
}

const ChatBubble = ({ message, onCopy, className = '' }: ChatBubbleProps) => {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';

  const handleCopy = () => {
    if (onCopy) {
      onCopy(message.content);
    } else {
      navigator.clipboard.writeText(message.content);
    }
  };

  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 ${className}`}
    >
      <div
        className={`max-w-[80%] rounded-lg p-4 ${isUser
          ? 'bg-blue-600 text-white'
          : isSystem
            ? 'bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
            : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
          }`}
      >
        <div className="flex items-start justify-between">
          <div className="font-medium text-sm mb-1">
            {isUser ? 'You' : isSystem ? 'System' : 'AI Assistant'}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 ml-2">
            {new Date(message.timestamp).toLocaleTimeString()}
          </div>
        </div>
        <div className="whitespace-pre-wrap">{message.content}</div>
        <div className="flex justify-end mt-2">
          <button
            onClick={handleCopy}
            className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 flex items-center"
            aria-label="Copy message"
          >
            <svg
              className="w-3.5 h-3.5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;