import React from 'react';
import { StepProps } from '../../App';

const StepPlaceholder: React.FC<StepProps> = ({ onNext, onBack }) => {
  return (
    <div>
      <p className="helper">
        This step will mirror the backend payload shape (arrays for siblings/relatives, dropdowns for lookup tables,
        and bilingual labels). Use this placeholder as a guide to duplicate the pattern from the completed steps.
      </p>
      <div className="actions">
        <button type="button" onClick={onBack}>
          Back
        </button>
        <button type="button" onClick={onNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default StepPlaceholder;
