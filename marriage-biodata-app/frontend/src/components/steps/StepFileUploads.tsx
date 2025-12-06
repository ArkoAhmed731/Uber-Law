import React, { useState } from 'react';
import { StepProps } from '../../App';
import { useFormContext } from '../../context/FormContext';
import { CandidateFileInput } from '../../types';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

const StepFileUploads: React.FC<StepProps> = ({ onNext, onBack, errors, setErrors }) => {
  const { data, updateField } = useFormContext();
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const uploadFile = async (file: File, endpoint: string, fileType: CandidateFileInput['fileType']) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(`${API_BASE}/uploads/${endpoint}`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) throw new Error('Upload failed');
    const payload = await response.json();
    const newFile: CandidateFileInput = { fileType, path: payload.path || payload.filename };
    updateField('files', [...(data.files || []), newFile]);
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>, endpoint: string, type: CandidateFileInput['fileType']) => {
    if (!event.target.files?.length) return;
    setUploading(true);
    try {
      await uploadFile(event.target.files[0], endpoint, type);
    } finally {
      setUploading(false);
    }
  };

  const submitCandidate = async () => {
    setSubmitting(true);
    setStatus(null);
    const response = await fetch(`${API_BASE}/candidates`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const problem = await response.json();
      throw new Error(problem?.message || 'Candidate submission failed');
    }
    const created = await response.json();
    setStatus(`Submitted! Candidate ID: ${created.id}`);
  };

  const handleNext = async () => {
    const nextErrors: typeof errors = {};
    if (!data.files || data.files.length === 0) nextErrors.files = 'Please upload at least one file.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    try {
      await submitCandidate();
      onNext();
    } catch (err: any) {
      setStatus(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="field-group">
      <p className="helper" style={{ gridColumn: '1 / -1' }}>
        Upload profile and identity documents first. Uploaded paths are stored under the <code>files</code> array and
        sent with the main payload.
      </p>

      <label>
        <span className="tagged-label">
          <span>ENG</span>
          Profile Photo / প্রোফাইল ছবি
        </span>
        <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'profile-photo', 'PROFILE_PHOTO')} />
      </label>

      <label>
        <span className="tagged-label">
          <span>ENG</span>
          NID / Passport / পরিচয়পত্র
        </span>
        <input type="file" onChange={(e) => handleFileChange(e, 'nid-passport', 'IDENTITY')} />
      </label>

      <label>
        <span className="tagged-label">
          <span>ENG</span>
          Biodata Document / বায়োডাটা ডক
        </span>
        <input type="file" onChange={(e) => handleFileChange(e, 'biodata-doc', 'DOCUMENT')} />
      </label>

      {uploading && <span>Uploading...</span>}
      {errors.files && <span className="error">{errors.files}</span>}

      <div style={{ gridColumn: '1 / -1' }}>
        <h4>Queued Files</h4>
        <ul>
          {(data.files || []).map((file, idx) => (
            <li key={idx}>
              {file.fileType} - {file.path}
            </li>
          ))}
        </ul>
      </div>

      {status && <div className="helper" style={{ color: '#2563eb' }}>{status}</div>}

      <div className="actions" style={{ gridColumn: '1 / -1' }}>
        <button type="button" onClick={onBack} disabled={submitting}>
          Back
        </button>
        <button type="button" onClick={handleNext} disabled={uploading || submitting}>
          Submit Biodata
        </button>
      </div>
    </div>
  );
};

export default StepFileUploads;
