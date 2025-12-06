import React from 'react';
import { StepProps } from '../../App';
import { useFormContext } from '../../context/FormContext';

const StepPersonalInfo: React.FC<StepProps> = ({ onNext, onBack, errors, setErrors }) => {
  const { data, updateField } = useFormContext();

  const handleNext = () => {
    const nextErrors: typeof errors = {};
    if (!data.fullName) nextErrors.fullName = 'Full name is required.';
    if (!data.gender) nextErrors.gender = 'Gender is required.';
    if (!data.dateOfBirth) nextErrors.dateOfBirth = 'Date of birth is required.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) onNext();
  };

  return (
    <form className="field-group" onSubmit={(e) => e.preventDefault()}>
      <label>
        <span className="tagged-label">
          <span>ENG</span>
          Full Name / পূর্ণ নাম
        </span>
        <input
          type="text"
          value={data.fullName}
          onChange={(e) => updateField('fullName', e.target.value)}
          placeholder="Mohammad Rahim"
        />
        {errors.fullName && <span className="error">{errors.fullName}</span>}
      </label>

      <label>
        <span className="tagged-label">
          <span>BN</span>
          Name in Bangla / নাম (বাংলা)
        </span>
        <input
          type="text"
          value={data.banglaName || ''}
          onChange={(e) => updateField('banglaName', e.target.value)}
          placeholder="মোহাম্মদ রহিম"
        />
      </label>

      <label>
        <span className="tagged-label">
          <span>ENG</span>
          Gender / লিঙ্গ
        </span>
        <select value={data.gender} onChange={(e) => updateField('gender', e.target.value as any)}>
          <option value="MALE">Male / পুরুষ</option>
          <option value="FEMALE">Female / নারী</option>
          <option value="OTHER">Other / অন্যান্য</option>
        </select>
        {errors.gender && <span className="error">{errors.gender}</span>}
      </label>

      <label>
        <span className="tagged-label">
          <span>ENG</span>
          Date of Birth / জন্ম তারিখ
        </span>
        <input
          type="date"
          value={data.dateOfBirth || ''}
          onChange={(e) => updateField('dateOfBirth', e.target.value)}
        />
        {errors.dateOfBirth && <span className="error">{errors.dateOfBirth}</span>}
      </label>

      <label>
        <span className="tagged-label">
          <span>ENG</span>
          Height (cm) / উচ্চতা
        </span>
        <input
          type="number"
          value={data.heightCm ?? ''}
          onChange={(e) => updateField('heightCm', Number(e.target.value))}
          placeholder="170"
        />
      </label>

      <label>
        <span className="tagged-label">
          <span>ENG</span>
          Weight (kg) / ওজন
        </span>
        <input
          type="number"
          value={data.weightKg ?? ''}
          onChange={(e) => updateField('weightKg', Number(e.target.value))}
          placeholder="65"
        />
      </label>

      <label>
        <span className="tagged-label">
          <span>ENG</span>
          Blood Group / রক্তের গ্রুপ
        </span>
        <input
          type="text"
          value={data.bloodGroup || ''}
          onChange={(e) => updateField('bloodGroup', e.target.value)}
          placeholder="A+"
        />
      </label>

      <div className="actions" style={{ gridColumn: '1 / -1' }}>
        <button type="button" onClick={onBack}>
          Back
        </button>
        <button type="button" onClick={handleNext}>
          Next
        </button>
      </div>
    </form>
  );
};

export default StepPersonalInfo;
