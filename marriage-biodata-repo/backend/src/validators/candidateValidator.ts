import { FileType, Gender, MaritalStatus, RelativeType, SiblingPosition } from '@prisma/client';
import { z } from 'zod';

const childSchema = z.object({
  name: z.string().optional(),
  gender: z.nativeEnum(Gender).optional(),
  dateOfBirth: z.string().optional(),
  livesWithCandidate: z.boolean().optional(),
});

const siblingSchema = z.object({
  name: z.string().optional(),
  gender: z.nativeEnum(Gender).optional(),
  position: z.nativeEnum(SiblingPosition).optional(),
  occupationId: z.number().optional(),
  maritalStatus: z.nativeEnum(MaritalStatus).optional(),
  spouseOccupation: z.string().optional(),
  workplaceCountryId: z.number().optional(),
  workplaceCityId: z.number().optional(),
});

const relativeSchema = z.object({
  type: z.nativeEnum(RelativeType),
  occupationId: z.number().optional(),
  workplaceCountryId: z.number().optional(),
  workplaceCityId: z.number().optional(),
});

const educationEntrySchema = z.object({
  educationLevelId: z.number(),
  institution: z.string().optional(),
  fieldOfStudy: z.string().optional(),
  passingYear: z.number().optional(),
  result: z.string().optional(),
  countryId: z.number().optional(),
  cityId: z.number().optional(),
});

const hobbySchema = z.object({
  hobbyId: z.number(),
});

const fileSchema = z.object({
  type: z.nativeEnum(FileType),
  filePath: z.string().min(1, 'File path is required for uploads'),
  originalName: z.string().optional(),
  mimeType: z.string().optional(),
});

const partnerExpectationSchema = z.object({
  preferredMinAge: z.number().optional(),
  preferredMaxAge: z.number().optional(),
  preferredMinHeightCm: z.number().optional(),
  preferredMaxHeightCm: z.number().optional(),
  preferredEducationLevelId: z.number().optional(),
  preferredOccupationId: z.number().optional(),
  preferredCountryId: z.number().optional(),
  preferredCityId: z.number().optional(),
  preferredIncomeRangeId: z.number().optional(),
  preferredReligiousPracticeLevelId: z.number().optional(),
  preferredFamilyFinancialStatusId: z.number().optional(),
  preferredFamilyTypeId: z.number().optional(),
  smokingHabitId: z.number().optional(),
  drinkingHabitId: z.number().optional(),
  acceptDivorcedOrWidowed: z.boolean().optional(),
  expectations: z.string().optional(),
});

export const candidateSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  banglaName: z.string().optional(),
  gender: z.nativeEnum(Gender, { required_error: 'Gender is required' }),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  heightCm: z.number().optional(),
  weightKg: z.number().optional(),
  bloodGroup: z.string().optional(),
  maritalStatus: z.nativeEnum(MaritalStatus, { required_error: 'Marital status is required' }),
  religionId: z.number({ required_error: 'Religion is required' }),
  casteId: z.number().optional(),
  religiousPracticeLevelId: z.number().optional(),
  numberOfChildren: z.number().optional(),
  willingToMarryAgain: z.boolean().optional(),
  birthCountryId: z.number().optional(),
  birthCityId: z.number().optional(),
  currentCountryId: z.number({ required_error: 'Current country is required' }),
  currentCityId: z.number({ required_error: 'Current city is required' }),
  residencyStatus: z.string().optional(),
  occupationId: z.number({ required_error: 'Occupation is required' }),
  workplaceCountryId: z.number().optional(),
  workplaceCityId: z.number().optional(),
  incomeRangeId: z.number().optional(),
  highestEducationLevelId: z.number({ required_error: 'Highest education level is required' }),
  motherName: z.string().optional(),
  isMotherAlive: z.boolean().optional(),
  motherOccupationId: z.number().optional(),
  motherBirthCountryId: z.number().optional(),
  motherBirthCityId: z.number().optional(),
  fatherName: z.string().optional(),
  isFatherAlive: z.boolean().optional(),
  fatherOccupationId: z.number().optional(),
  fatherBirthCountryId: z.number().optional(),
  fatherBirthCityId: z.number().optional(),
  numberOfSiblings: z.number().optional(),
  numberOfBrothers: z.number().optional(),
  numberOfSisters: z.number().optional(),
  numberOfElderBrothers: z.number().optional(),
  numberOfYoungerBrothers: z.number().optional(),
  numberOfElderSisters: z.number().optional(),
  numberOfYoungerSisters: z.number().optional(),
  familyFinancialStatusId: z.number().optional(),
  familyTypeId: z.number().optional(),
  smokingHabitId: z.number().optional(),
  drinkingHabitId: z.number().optional(),
  whatsappNumber: z.string().min(5, 'WhatsApp number is required'),
  selfDescription: z.string().optional(),
  children: z.array(childSchema).optional(),
  siblings: z.array(siblingSchema).optional(),
  maternalRelatives: z.array(relativeSchema).optional(),
  paternalRelatives: z.array(relativeSchema).optional(),
  educationEntries: z.array(educationEntrySchema).optional(),
  hobbies: z.array(hobbySchema).optional(),
  partnerExpectation: partnerExpectationSchema.optional(),
  files: z.array(fileSchema).optional(),
}).superRefine((value, ctx) => {
  if (value.numberOfChildren !== undefined && value.children && value.children.length !== value.numberOfChildren) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Number of children must match children array length',
      path: ['children'],
    });
  }

  if (value.numberOfSiblings !== undefined && value.siblings && value.siblings.length !== value.numberOfSiblings) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Number of siblings must match siblings array length',
      path: ['siblings'],
    });
  }

  if (value.highestEducationLevelId && (!value.educationEntries || value.educationEntries.length === 0)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'At least one education entry is required for the highest education level',
      path: ['educationEntries'],
    });
  }
});

export function validateCandidatePayload(data: unknown) {
  return candidateSchema.safeParse(data);
}
