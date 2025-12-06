import React, { useMemo, useState } from 'react';
import FormStepper from './components/FormStepper';
import { DropdownProvider } from './context/DropdownContext';
import { FormProvider, useFormContext } from './context/FormContext';
import StepPersonalInfo from './components/steps/StepPersonalInfo';
import StepReligiousMarital from './components/steps/StepReligiousMarital';
import StepEducation from './components/steps/StepEducation';
import StepPlaceholder from './components/steps/StepPlaceholder';
import StepFileUploads from './components/steps/StepFileUploads';
import { CandidateInput } from './types';

export type StepKey =
  | 'authentication'
  | 'personal'
  | 'religious'
  | 'residency'
  | 'education'
  | 'occupation'
  | 'family'
  | 'extendedFamily'
  | 'habits'
  | 'partner'
  | 'about'
  | 'uploads';

interface ValidationErrors {
  [key: string]: string;
}

const steps: { key: StepKey; label: string; component: React.FC<StepProps> }[] = [
  { key: 'authentication', label: 'Authentication', component: StepPlaceholder },
  { key: 'personal', label: 'Personal Info', component: StepPersonalInfo },
  { key: 'religious', label: 'Religious & Marital', component: StepReligiousMarital },
  { key: 'residency', label: 'Residency', component: StepPlaceholder },
  { key: 'education', label: 'Education', component: StepEducation },
  { key: 'occupation', label: 'Occupation', component: StepPlaceholder },
  { key: 'family', label: 'Family Info', component: StepPlaceholder },
  { key: 'extendedFamily', label: 'Extended Family', component: StepPlaceholder },
  { key: 'habits', label: 'Habits', component: StepPlaceholder },
  { key: 'partner', label: 'Partner Expectations', component: StepPlaceholder },
  { key: 'about', label: 'About Me', component: StepPlaceholder },
  { key: 'uploads', label: 'File Uploads', component: StepFileUploads },
];

export interface StepProps {
  onNext: () => void;
  onBack: () => void;
  errors: ValidationErrors;
  setErrors: React.Dispatch<React.SetStateAction<ValidationErrors>>;
}

const StepRouter: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data } = useFormContext();
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateStep = (key: StepKey, payload: CandidateInput): boolean => {
    const stepErrors: ValidationErrors = {};

    if (key === 'personal') {
      if (!payload.fullName) stepErrors.fullName = 'Full name is required.';
      if (!payload.gender) stepErrors.gender = 'Gender is required.';
      if (!payload.dateOfBirth) stepErrors.dateOfBirth = 'Date of birth is required.';
    }

    if (key === 'religious') {
      if (!payload.maritalStatus) stepErrors.maritalStatus = 'Marital status is required.';
      if (!payload.religionId) stepErrors.religionId = 'Religion is required for submission.';
      if (
        ['DIVORCED', 'WIDOWED', 'SEPARATED'].includes(payload.maritalStatus) &&
        (payload.numberOfChildren === undefined || payload.numberOfChildren === null)
      ) {
        stepErrors.numberOfChildren = 'Please specify the number of children.';
      }
    }

    if (key === 'education') {
      if (!payload.highestEducationLevelId) {
        stepErrors.highestEducationLevelId = 'Highest education is required.';
      }
      if (!payload.educationEntries || payload.educationEntries.length === 0) {
        stepErrors.educationEntries = 'Add at least one education entry.';
      }
    }

    if (key === 'uploads') {
      if (!payload.files || payload.files.length === 0) {
        stepErrors.files = 'Attach at least one file before submitting.';
      }
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const goNext = () => {
    const current = steps[currentIndex];
    if (validateStep(current.key, data)) {
      setCurrentIndex((prev) => Math.min(prev + 1, steps.length - 1));
      setErrors({});
    }
  };

  const goBack = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  const StepComponent = useMemo(() => steps[currentIndex].component, [currentIndex]);

  return (
    <div className="card">
      <FormStepper
        steps={steps.map(({ key, label }) => ({ key, label }))}
        currentIndex={currentIndex}
        onSelect={(index) => setCurrentIndex(index)}
      />
      <StepComponent onNext={goNext} onBack={goBack} errors={errors} setErrors={setErrors} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="app-shell">
      <h1>Marriage Biodata Form</h1>
      <p className="helper">Enter bilingual data where available (English / বাংলা).</p>
      <DropdownProvider>
        <FormProvider>
          <StepRouter />
        </FormProvider>
      </DropdownProvider>
    </div>
  );
};

export default App;
