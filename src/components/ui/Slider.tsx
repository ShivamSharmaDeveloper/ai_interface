import React, { useState } from 'react';

export interface SliderProps {
  min: number;
  max: number;
  step?: number;
  defaultValue?: number;
  value?: number;
  onChange?: (value: number) => void;
  label?: string;
  showValue?: boolean;
  id?: string;
  className?: string;
  disabled?: boolean;
}

const Slider = ({
  min,
  max,
  step = 0.1,
  defaultValue,
  value: controlledValue,
  onChange,
  label,
  showValue = true,
  id,
  className = '',
  disabled = false,
}: SliderProps) => {
  const [internalValue, setInternalValue] = useState<number>(defaultValue || min);
  
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const percentage = ((currentValue - min) / (max - min)) * 100;
  // Use a stable ID based on the label to avoid hydration mismatches
  const sliderID = id || `slider-${label ? label.toLowerCase().replace(/\s+/g, '-') : 'default'}`;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between mb-2">
          <label htmlFor={sliderID} className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
          {showValue && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {currentValue.toFixed(step < 1 ? String(step).split('.')[1].length : 0)}
            </span>
          )}
        </div>
      )}
      <div className="relative">
        {/* Background track */}
        <div className="absolute w-full h-2 bg-gray-200 rounded-lg dark:bg-gray-700" style={{ top: 0, zIndex: 0 }} />
        {/* Filled progress bar */}
        <div 
          className="absolute h-2 bg-blue-600 rounded-l-lg pointer-events-none dark:bg-blue-500" 
          style={{ width: `${percentage}%`, top: 0, zIndex: 1 }}
        />
        {/* Slider input on top */}
        <input
          type="range"
          id={sliderID}
          min={min}
          max={max}
          step={step}
          value={currentValue}
          onChange={handleChange}
          disabled={disabled}
          className="relative w-full h-2 bg-transparent rounded-lg appearance-none cursor-pointer z-50 slider-thumb"
          style={{ 
            background: 'transparent',
            WebkitAppearance: 'none',
            appearance: 'none',
            position: 'relative'
          }}
          aria-label={label || 'Slider'}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={currentValue}
        />
      </div>
    </div>
  );
};

export default Slider;