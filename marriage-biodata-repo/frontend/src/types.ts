export type Gender = 'MALE' | 'FEMALE' | 'OTHER';
export type MaritalStatus = 'NEVER_MARRIED' | 'DIVORCED' | 'WIDOWED' | 'SEPARATED';

export interface CandidateChildInput {
  name?: string;
  gender?: Gender;
  dateOfBirth?: string;
  livesWithCandidate?: boolean;
}

export interface CandidateSiblingInput {
  name?: string;
  gender?: Gender;
  position?: 'ELDER' | 'YOUNGER';
  occupationId?: number;
  maritalStatus?: MaritalStatus;
  spouseOccupation?: string;
  workplaceCountryId?: number;
  workplaceCityId?: number;
}

export interface CandidateRelativeInput {
  type: 'UNCLE' | 'AUNT';
  occupationId?: number;
  workplaceCountryId?: number;
  workplaceCityId?: number;
}

export interface CandidateEducationEntryInput {
  educationLevelId: number;
  institution?: string;
  fieldOfStudy?: string;
  passingYear?: number;
  result?: string;
  countryId?: number;
  cityId?: number;
}

export interface CandidateHobbyInput {
  hobbyId: number;
}

export interface CandidatePartnerExpectationInput {
  preferredMinAge?: number;
  preferredMaxAge?: number;
  preferredMinHeightCm?: number;
  preferredMaxHeightCm?: number;
  preferredEducationLevelId?: number;
  preferredOccupationId?: number;
  preferredCountryId?: number;
  preferredCityId?: number;
  preferredIncomeRangeId?: number;
  preferredReligiousPracticeLevelId?: number;
  preferredFamilyFinancialStatusId?: number;
  preferredFamilyTypeId?: number;
  smokingHabitId?: number;
  drinkingHabitId?: number;
  acceptDivorcedOrWidowed?: boolean;
  expectations?: string;
}

export interface CandidateFileInput {
  fileType: 'PROFILE_PHOTO' | 'FULL_PHOTO' | 'DOCUMENT' | 'IDENTITY';
  path: string;
}

export interface CandidateInput {
  fullName: string;
  banglaName?: string;
  gender: Gender;
  dateOfBirth?: string;
  heightCm?: number;
  weightKg?: number;
  bloodGroup?: string;
  maritalStatus: MaritalStatus;
  religionId?: number;
  casteId?: number;
  religiousPracticeLevelId?: number;
  numberOfChildren?: number;
  willingToMarryAgain?: boolean;
  birthCountryId?: number;
  birthCityId?: number;
  currentCountryId: number;
  currentCityId: number;
  residencyStatus?: string;
  occupationId?: number;
  workplaceCountryId?: number;
  workplaceCityId?: number;
  incomeRangeId?: number;
  highestEducationLevelId?: number;
  motherName?: string;
  isMotherAlive?: boolean;
  motherOccupationId?: number;
  motherBirthCountryId?: number;
  motherBirthCityId?: number;
  fatherName?: string;
  isFatherAlive?: boolean;
  fatherOccupationId?: number;
  fatherBirthCountryId?: number;
  fatherBirthCityId?: number;
  numberOfSiblings?: number;
  numberOfBrothers?: number;
  numberOfSisters?: number;
  numberOfElderBrothers?: number;
  numberOfYoungerBrothers?: number;
  numberOfElderSisters?: number;
  numberOfYoungerSisters?: number;
  familyFinancialStatusId?: number;
  familyTypeId?: number;
  smokingHabitId?: number;
  drinkingHabitId?: number;
  whatsappNumber: string;
  selfDescription?: string;
  children?: CandidateChildInput[];
  siblings?: CandidateSiblingInput[];
  maternalRelatives?: CandidateRelativeInput[];
  paternalRelatives?: CandidateRelativeInput[];
  educationEntries?: CandidateEducationEntryInput[];
  hobbies?: CandidateHobbyInput[];
  partnerExpectation?: CandidatePartnerExpectationInput;
  files?: CandidateFileInput[];
}

export interface DropdownOption {
  id: number;
  label: string;
}
