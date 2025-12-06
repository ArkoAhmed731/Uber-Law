import React, { useMemo } from 'react';
import { StepProps } from '../../App';
import { useFormContext } from '../../context/FormContext';
import { useDropdown } from '../../hooks/useDropdown';
import { CandidateEducationEntryInput } from '../../types';

const StepEducation: React.FC<StepProps> = ({ onNext, onBack, errors, setErrors }) => {
  const { data, updateField, upsertEducationEntry, removeEducationEntry } = useFormContext();
  const { options: educationLevels } = useDropdown('educationLevels');
  const { options: countries } = useDropdown('countries');
  const { options: cities } = useDropdown('cities', { countryId: data.currentCountryId });

  const handleEntryChange = (index: number, entry: Partial<CandidateEducationEntryInput>) => {
    const existing = data.educationEntries?.[index] || { educationLevelId: 0 };
    upsertEducationEntry({ ...existing, ...entry }, index);
  };

  const addEntry = () => {
    const defaultLevel = educationLevels[0]?.id ?? 0;
    upsertEducationEntry({ educationLevelId: defaultLevel }, (data.educationEntries || []).length);
  };

  const handleNext = () => {
    const nextErrors: typeof errors = {};
    if (!data.highestEducationLevelId) nextErrors.highestEducationLevelId = 'Select a level.';
    if (!data.educationEntries || data.educationEntries.length === 0) {
      nextErrors.educationEntries = 'Add at least one education record.';
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) onNext();
  };

  const levelMap = useMemo(
    () => Object.fromEntries(educationLevels.map((lvl) => [lvl.id, lvl.label])),
    [educationLevels]
  );

  return (
    <div className="field-group">
      <label>
        <span className="tagged-label">
          <span>ENG</span>
          Highest Education / সর্বোচ্চ শিক্ষাগত যোগ্যতা
        </span>
        <select
          value={data.highestEducationLevelId ?? ''}
          onChange={(e) => updateField('highestEducationLevelId', Number(e.target.value))}
        >
          <option value="">Select level</option>
          {educationLevels.map((lvl) => (
            <option key={lvl.id} value={lvl.id}>
              {lvl.label}
            </option>
          ))}
        </select>
        {errors.highestEducationLevelId && <span className="error">{errors.highestEducationLevelId}</span>}
      </label>

      <div style={{ gridColumn: '1 / -1' }}>
        <div className="actions" style={{ justifyContent: 'flex-end', marginBottom: 12 }}>
          <button type="button" onClick={addEntry}>
            + Add Education Entry
          </button>
        </div>
        {(data.educationEntries || []).map((entry, index) => (
          <div key={index} className="card" style={{ marginBottom: 12 }}>
            <div className="field-group">
              <label>
                <span className="tagged-label">
                  <span>ENG</span>
                  Level / ডিগ্রি
                </span>
                <select
                  value={entry.educationLevelId}
                  onChange={(e) => handleEntryChange(index, { educationLevelId: Number(e.target.value) })}
                >
                  {educationLevels.map((lvl) => (
                    <option key={lvl.id} value={lvl.id}>
                      {lvl.label}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span className="tagged-label">
                  <span>ENG</span>
                  Institution / ইনস্টিটিউশন
                </span>
                <input
                  type="text"
                  value={entry.institution || ''}
                  onChange={(e) => handleEntryChange(index, { institution: e.target.value })}
                />
              </label>

              <label>
                <span className="tagged-label">
                  <span>ENG</span>
                  Major/Group / বিষয়
                </span>
                <input
                  type="text"
                  value={entry.fieldOfStudy || ''}
                  onChange={(e) => handleEntryChange(index, { fieldOfStudy: e.target.value })}
                />
              </label>

              <label>
                <span className="tagged-label">
                  <span>ENG</span>
                  Passing Year / পাশের বছর
                </span>
                <input
                  type="number"
                  value={entry.passingYear ?? ''}
                  onChange={(e) => handleEntryChange(index, { passingYear: Number(e.target.value) })}
                />
              </label>

              <label>
                <span className="tagged-label">
                  <span>ENG</span>
                  Result / ফলাফল
                </span>
                <input
                  type="text"
                  value={entry.result || ''}
                  onChange={(e) => handleEntryChange(index, { result: e.target.value })}
                />
              </label>

              <label>
                <span className="tagged-label">
                  <span>ENG</span>
                  Country / দেশ
                </span>
                <select
                  value={entry.countryId ?? ''}
                  onChange={(e) => handleEntryChange(index, { countryId: Number(e.target.value) })}
                >
                  <option value="">Select country</option>
                  {countries.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span className="tagged-label">
                  <span>ENG</span>
                  City / শহর
                </span>
                <select
                  value={entry.cityId ?? ''}
                  onChange={(e) => handleEntryChange(index, { cityId: Number(e.target.value) })}
                >
                  <option value="">Select city</option>
                  {cities.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </label>

              <div className="actions" style={{ gridColumn: '1 / -1' }}>
                <button type="button" onClick={() => removeEducationEntry(index)}>
                  Remove
                </button>
                <div className="helper">{levelMap[entry.educationLevelId]}</div>
              </div>
            </div>
          </div>
        ))}

        {errors.educationEntries && <span className="error">{errors.educationEntries}</span>}
      </div>

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

export default StepEducation;
