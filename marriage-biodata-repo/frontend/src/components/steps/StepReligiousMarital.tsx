import React, { useEffect, useState } from 'react';
import { StepProps } from '../../App';
import { useFormContext } from '../../context/FormContext';
import { useDropdown } from '../../hooks/useDropdown';

const StepReligiousMarital: React.FC<StepProps> = ({ onNext, onBack, errors, setErrors }) => {
  const { data, updateField } = useFormContext();
  const { options: religions } = useDropdown('religions');
  const { options: castes, loading: castesLoading } = useDropdown('castes', { religionId: data.religionId });
  const { options: practiceLevels } = useDropdown('religiousPracticeLevels');
  const [localChildren, setLocalChildren] = useState<number>(data.numberOfChildren ?? 0);

  useEffect(() => {
    updateField('numberOfChildren', localChildren);
  }, [localChildren]);

  const handleNext = () => {
    const nextErrors: typeof errors = {};
    if (!data.maritalStatus) nextErrors.maritalStatus = 'Marital status is required.';
    if (!data.religionId) nextErrors.religionId = 'Religion is required.';
    if (['DIVORCED', 'WIDOWED', 'SEPARATED'].includes(data.maritalStatus) && localChildren === undefined) {
      nextErrors.numberOfChildren = 'Please add child count.';
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) onNext();
  };

  const showChildrenSelector = ['DIVORCED', 'WIDOWED', 'SEPARATED'].includes(data.maritalStatus);

  return (
    <div className="field-group">
      <label>
        <span className="tagged-label">
          <span>ENG</span>
          Marital Status / বৈবাহিক অবস্থা
        </span>
        <select
          value={data.maritalStatus}
          onChange={(e) => updateField('maritalStatus', e.target.value as any)}
        >
          <option value="NEVER_MARRIED">Never Married / অবিবাহিত</option>
          <option value="DIVORCED">Divorced / তালাকপ্রাপ্ত</option>
          <option value="WIDOWED">Widowed / বিধবা/বিপত্নীক</option>
          <option value="SEPARATED">Separated / আলাদা থাকা</option>
        </select>
        {errors.maritalStatus && <span className="error">{errors.maritalStatus}</span>}
      </label>

      <label>
        <span className="tagged-label">
          <span>ENG</span>
          Religion / ধর্ম
        </span>
        <select
          value={data.religionId ?? ''}
          onChange={(e) => updateField('religionId', Number(e.target.value))}
        >
          <option value="">Select religion</option>
          {religions.map((r) => (
            <option key={r.id} value={r.id}>
              {r.label}
            </option>
          ))}
        </select>
        {errors.religionId && <span className="error">{errors.religionId}</span>}
      </label>

      <label>
        <span className="tagged-label">
          <span>ENG</span>
          Caste / বর্ণ
        </span>
        <select
          value={data.casteId ?? ''}
          onChange={(e) => updateField('casteId', Number(e.target.value))}
          disabled={castesLoading || !data.religionId}
        >
          <option value="">Select caste</option>
          {castes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span className="tagged-label">
          <span>ENG</span>
          Religious Practice Level / ধার্মিকতার মাত্রা
        </span>
        <select
          value={data.religiousPracticeLevelId ?? ''}
          onChange={(e) => updateField('religiousPracticeLevelId', Number(e.target.value))}
        >
          <option value="">Select level</option>
          {practiceLevels.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </select>
      </label>

      {showChildrenSelector && (
        <label>
          <span className="tagged-label">
            <span>ENG</span>
            Number of Children / সন্তান সংখ্যা
          </span>
          <input
            type="number"
            min={0}
            value={localChildren}
            onChange={(e) => setLocalChildren(Number(e.target.value))}
          />
          {errors.numberOfChildren && <span className="error">{errors.numberOfChildren}</span>}
        </label>
      )}

      <label>
        <span className="tagged-label">
          <span>ENG</span>
          Willing to Marry Again? / পুনরায় বিয়ে করবেন?
        </span>
        <select
          value={data.willingToMarryAgain === undefined ? '' : data.willingToMarryAgain ? 'yes' : 'no'}
          onChange={(e) => updateField('willingToMarryAgain', e.target.value === 'yes')}
        >
          <option value="">Select</option>
          <option value="yes">Yes / হ্যাঁ</option>
          <option value="no">No / না</option>
        </select>
      </label>

      <div className="actions" style={{ gridColumn: '1 / -1' }}>
        <button type="button" onClick={onBack}>
          Back
        </button>
        <button type="button" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default StepReligiousMarital;
