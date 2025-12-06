import React, { createContext, useContext, useMemo, useState } from 'react';
import { CandidateEducationEntryInput, CandidateInput } from '../types';

interface FormContextValue {
  data: CandidateInput;
  updateField: <K extends keyof CandidateInput>(field: K, value: CandidateInput[K]) => void;
  upsertEducationEntry: (entry: CandidateEducationEntryInput, index: number) => void;
  removeEducationEntry: (index: number) => void;
  reset: () => void;
}

const FormContext = createContext<FormContextValue | undefined>(undefined);

const initialState: CandidateInput = {
  fullName: '',
  banglaName: '',
  gender: 'MALE',
  dateOfBirth: '',
  heightCm: undefined,
  weightKg: undefined,
  bloodGroup: '',
  maritalStatus: 'NEVER_MARRIED',
  religionId: undefined,
  casteId: undefined,
  religiousPracticeLevelId: undefined,
  numberOfChildren: undefined,
  willingToMarryAgain: undefined,
  birthCountryId: undefined,
  birthCityId: undefined,
  currentCountryId: 0,
  currentCityId: 0,
  residencyStatus: '',
  occupationId: undefined,
  workplaceCountryId: undefined,
  workplaceCityId: undefined,
  incomeRangeId: undefined,
  highestEducationLevelId: undefined,
  motherName: '',
  isMotherAlive: undefined,
  motherOccupationId: undefined,
  motherBirthCountryId: undefined,
  motherBirthCityId: undefined,
  fatherName: '',
  isFatherAlive: undefined,
  fatherOccupationId: undefined,
  fatherBirthCountryId: undefined,
  fatherBirthCityId: undefined,
  numberOfSiblings: undefined,
  numberOfBrothers: undefined,
  numberOfSisters: undefined,
  numberOfElderBrothers: undefined,
  numberOfYoungerBrothers: undefined,
  numberOfElderSisters: undefined,
  numberOfYoungerSisters: undefined,
  familyFinancialStatusId: undefined,
  familyTypeId: undefined,
  smokingHabitId: undefined,
  drinkingHabitId: undefined,
  whatsappNumber: '',
  selfDescription: '',
  children: [],
  siblings: [],
  maternalRelatives: [],
  paternalRelatives: [],
  educationEntries: [],
  hobbies: [],
  partnerExpectation: {},
  files: [],
};

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<CandidateInput>(initialState);

  const updateField: FormContextValue['updateField'] = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const upsertEducationEntry: FormContextValue['upsertEducationEntry'] = (entry, index) => {
    setData((prev) => {
      const clone = [...(prev.educationEntries || [])];
      clone[index] = entry;
      return { ...prev, educationEntries: clone };
    });
  };

  const removeEducationEntry: FormContextValue['removeEducationEntry'] = (index) => {
    setData((prev) => {
      const clone = [...(prev.educationEntries || [])];
      clone.splice(index, 1);
      return { ...prev, educationEntries: clone };
    });
  };

  const reset = () => setData(initialState);

  const value = useMemo(
    () => ({ data, updateField, upsertEducationEntry, removeEducationEntry, reset }),
    [data]
  );

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export const useFormContext = () => {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error('useFormContext must be used inside FormProvider');
  return ctx;
};
