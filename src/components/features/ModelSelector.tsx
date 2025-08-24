'use client';

import React, { useState, useEffect } from 'react';
import { AIModel } from '../../types';

export interface ModelSelectorProps {
  onSelect: (model: AIModel) => void;
  selectedModelId?: string;
  className?: string;
}

const ModelSelector = ({ onSelect, selectedModelId, className = '' }: ModelSelectorProps) => {
  const [models, setModels] = useState<AIModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/models');
        
        if (!response.ok) {
          throw new Error('Failed to fetch models');
        }
        
        const data = await response.json();
        setModels(data);
        
        // Set initial selected model
        if (selectedModelId) {
          const model = data.find((m: AIModel) => m.id === selectedModelId);
          if (model) setSelectedModel(model);
        } else if (data.length > 0) {
          setSelectedModel(data[0]);
          onSelect(data[0]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, [selectedModelId, onSelect]);

  const handleSelect = (model: AIModel) => {
    setSelectedModel(model);
    onSelect(model);
    setIsOpen(false);
  };

  if (loading) {
    return (
      <div className={`relative ${className}`}>
        <div className="w-full p-2.5 border border-gray-300 rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 animate-pulse">
          <div className="h-5 bg-gray-200 dark:bg-gray-600 rounded w-24"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`relative ${className}`}>
        <div className="w-full p-2.5 border border-red-300 rounded-md bg-red-50 text-red-800 dark:bg-red-900 dark:border-red-800 dark:text-red-200">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        className="flex items-center justify-between w-full p-2.5 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center">
          {selectedModel && (
            <>
              <span className="font-medium">{selectedModel.name}</span>
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">{selectedModel.provider}</span>
            </>
          )}
        </div>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <ul
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto dark:bg-gray-800 dark:border-gray-600"
          role="listbox"
        >
          {models.map((model) => (
            <li
              key={model.id}
              className={`p-2.5 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${selectedModel?.id === model.id ? 'bg-blue-50 dark:bg-blue-900' : ''}`}
              onClick={() => handleSelect(model)}
              role="option"
              aria-selected={selectedModel?.id === model.id}
            >
              <div className="flex flex-col">
                <span className="font-medium">{model.name}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{model.provider}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{model.description}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ModelSelector;