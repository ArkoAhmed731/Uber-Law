import React from 'react';

interface FormStepperProps {
  steps: { key: string; label: string }[];
  currentIndex: number;
  onSelect: (index: number) => void;
}

const FormStepper: React.FC<FormStepperProps> = ({ steps, currentIndex, onSelect }) => {
  return (
    <div className="stepper">
      {steps.map((step, index) => (
        <button
          key={step.key}
          className={index === currentIndex ? 'active' : ''}
          onClick={() => onSelect(index)}
          type="button"
        >
          {index + 1}/ {steps.length}: {step.label}
        </button>
      ))}
    </div>
  );
};

export default FormStepper;
