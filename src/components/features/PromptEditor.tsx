'use client';

import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { PromptTemplate } from '../../types';

export interface PromptEditorProps {
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const PromptEditor = ({ defaultValue = '', value, onChange, className = '' }: PromptEditorProps) => {
  const [internalValue, setValue] = useState(value || defaultValue);
  const [templates, setTemplates] = useState<PromptTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState('');
  const [newTemplateDescription, setNewTemplateDescription] = useState('');

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        setLoading(true);
        // Import templates directly instead of fetching from API
        const { templates } = await import('../../data/templates');
        setTemplates(templates);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadTemplates();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange?.(newValue);
  };

  // Update internal value when value prop changes
  useEffect(() => {
    if (value !== undefined) {
      setValue(value);
    }
  }, [value]);

  const handleTemplateSelect = (template: PromptTemplate) => {
    setValue(template.content);
    onChange?.(template.content);
    setIsTemplateModalOpen(false);
  };

  const handleSaveTemplate = () => {
    // In a real app, this would make an API call to save the template
    const newTemplate: PromptTemplate = {
      id: `temp-${Date.now()}`,
      name: newTemplateName,
      content: internalValue,
      description: newTemplateDescription,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTemplates([...templates, newTemplate]);
    setIsSaveModalOpen(false);
    setNewTemplateName('');
    setNewTemplateDescription('');
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <label htmlFor="prompt-editor" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Prompt Editor
        </label>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsTemplateModalOpen(true)}
            disabled={loading}
          >
            Load Template
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSaveModalOpen(true)}
            disabled={!internalValue.trim()}
          >
            Save Template
          </Button>
        </div>
      </div>

      <textarea
        id="prompt-editor"
        className="w-full h-64 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white resize-none font-mono"
        value={internalValue}
        onChange={handleChange}
        placeholder="Enter your prompt here..."
        aria-label="Prompt editor"
      />

      {/* Load Template Modal */}
      <Modal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        title="Load Template"
        size="lg"
      >
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="grid gap-4 max-h-96 overflow-y-auto">
            {templates.map((template) => (
              <div
                key={template.id}
                className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer dark:border-gray-700 dark:hover:bg-gray-800"
                onClick={() => handleTemplateSelect(template)}
              >
                <h3 className="font-medium">{template.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{template.description}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                  Last updated: {new Date(template.updatedAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </Modal>

      {/* Save Template Modal */}
      <Modal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        title="Save Template"
        size="md"
        footer={
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsSaveModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveTemplate}
              disabled={!newTemplateName.trim()}
            >
              Save
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="template-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Template Name
            </label>
            <input
              type="text"
              id="template-name"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              value={newTemplateName}
              onChange={(e) => setNewTemplateName(e.target.value)}
              placeholder="Enter template name"
            />
          </div>
          <div>
            <label htmlFor="template-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              id="template-description"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white resize-none"
              value={newTemplateDescription}
              onChange={(e) => setNewTemplateDescription(e.target.value)}
              placeholder="Enter template description"
              rows={3}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PromptEditor;