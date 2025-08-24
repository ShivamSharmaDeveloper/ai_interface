'use client';

import React, { useState, useEffect } from 'react';
import Slider from '../ui/Slider';
import { ModelParameters, AIModel } from '../../types';

export interface ParametersPanelProps {
  model?: AIModel;
  onChange?: (parameters: ModelParameters) => void;
  className?: string;
  initialParameters?: Partial<ModelParameters>;
}

const ParametersPanel = ({
  model,
  onChange,
  className = '',
  initialParameters,
}: ParametersPanelProps) => {
  const [parameters, setParameters] = useState<ModelParameters>({
    temperature: initialParameters?.temperature ?? 0.7,
    maxTokens: initialParameters?.maxTokens ?? (model?.maxTokens ?? 2048),
    topP: initialParameters?.topP ?? 1,
    frequencyPenalty: initialParameters?.frequencyPenalty ?? 0,
    presencePenalty: initialParameters?.presencePenalty ?? 0,
  });

  // Update parameters when model changes
  useEffect(() => {
    if (model) {
      setParameters(prev => ({
        ...prev,
        temperature: model.defaultTemperature,
        maxTokens: Math.min(prev.maxTokens, model.maxTokens),
      }));
    }
  }, [model]);

  // Notify parent component when parameters change
  useEffect(() => {
    onChange?.(parameters);
  }, [parameters, onChange]);

  const handleParameterChange = (key: keyof ModelParameters, value: number) => {
    setParameters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Model Parameters</h3>
      
      <div className="space-y-6">
        <Slider
          label="Temperature"
          min={0}
          max={2}
          step={0.01}
          value={parameters.temperature}
          onChange={(value) => handleParameterChange('temperature', value)}
        />
        
        <Slider
          label="Max Tokens"
          min={1}
          max={model?.maxTokens ?? 4096}
          step={1}
          value={parameters.maxTokens}
          onChange={(value) => handleParameterChange('maxTokens', value)}
        />
        
        <Slider
          label="Top P"
          min={0}
          max={1}
          step={0.01}
          value={parameters.topP}
          onChange={(value) => handleParameterChange('topP', value)}
        />
        
        <Slider
          label="Frequency Penalty"
          min={0}
          max={2}
          step={0.01}
          value={parameters.frequencyPenalty}
          onChange={(value) => handleParameterChange('frequencyPenalty', value)}
        />
        
        <Slider
          label="Presence Penalty"
          min={0}
          max={2}
          step={0.01}
          value={parameters.presencePenalty}
          onChange={(value) => handleParameterChange('presencePenalty', value)}
        />
      </div>
      
      <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Parameter Descriptions</h4>
        <ul className="text-xs space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>Temperature:</strong> Controls randomness. Lower values make responses more focused and deterministic.</li>
          <li><strong>Max Tokens:</strong> Maximum length of the generated response.</li>
          <li><strong>Top P:</strong> Controls diversity via nucleus sampling. Lower values make responses more focused.</li>
          <li><strong>Frequency Penalty:</strong> Reduces repetition of token sequences by penalizing based on frequency.</li>
          <li><strong>Presence Penalty:</strong> Reduces repetition by penalizing tokens that have already appeared.</li>
        </ul>
      </div>
    </div>
  );
};

export default ParametersPanel;