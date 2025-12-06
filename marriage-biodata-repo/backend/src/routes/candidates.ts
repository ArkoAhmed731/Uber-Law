import { FileType, Gender } from '@prisma/client';
import { Request, Response, Router } from 'express';
import fs from 'fs';
import path from 'path';
import prisma from '../prisma';
import { validateCandidatePayload } from '../validators/candidateValidator';

const router = Router();

router.post('/api/candidates', async (req: Request, res: Response) => {
  const validation = validateCandidatePayload(req.body);

  if (!validation.success) {
    const errors = validation.error.errors.map((err) => err.message);
    return res.status(400).json({ errors });
  }

  const data = validation.data;
  const children = data.children ?? [];
  const siblings = data.siblings ?? [];
  const educationEntries = data.educationEntries ?? [];
  const maternalRelatives = data.maternalRelatives ?? [];
  const paternalRelatives = data.paternalRelatives ?? [];
  const files = data.files ?? [];

  const numberOfChildren = data.numberOfChildren ?? children.length ?? 0;
  const numberOfSiblings = data.numberOfSiblings ?? siblings.length ?? 0;
  const numberOfBrothers =
    data.numberOfBrothers ?? siblings.filter((sibling) => sibling.gender === Gender.MALE).length ?? 0;
  const numberOfSisters =
    data.numberOfSisters ?? siblings.filter((sibling) => sibling.gender === Gender.FEMALE).length ?? 0;
  const numberOfElderBrothers = data.numberOfElderBrothers ?? 0;
  const numberOfYoungerBrothers = data.numberOfYoungerBrothers ?? 0;
  const numberOfElderSisters = data.numberOfElderSisters ?? 0;
  const numberOfYoungerSisters = data.numberOfYoungerSisters ?? 0;

  try {
    const candidateId = await prisma.$transaction(async (tx) => {
      const candidate = await tx.candidate.create({
        data: {
          fullName: data.fullName,
          banglaName: data.banglaName,
          gender: data.gender,
          dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
          heightCm: data.heightCm,
          weightKg: data.weightKg,
          bloodGroup: data.bloodGroup,
          maritalStatus: data.maritalStatus,
          religionId: data.religionId,
          casteId: data.casteId,
          religiousPracticeLevelId: data.religiousPracticeLevelId,
          numberOfChildren,
          willingToMarryAgain: data.willingToMarryAgain,
          birthCountryId: data.birthCountryId,
          birthCityId: data.birthCityId,
          currentCountryId: data.currentCountryId,
          currentCityId: data.currentCityId,
          residencyStatus: data.residencyStatus,
          occupationId: data.occupationId,
          workplaceCountryId: data.workplaceCountryId,
          workplaceCityId: data.workplaceCityId,
          incomeRangeId: data.incomeRangeId,
          highestEducationLevelId: data.highestEducationLevelId,
          motherName: data.motherName,
          isMotherAlive: data.isMotherAlive,
          motherOccupationId: data.motherOccupationId,
          motherBirthCountryId: data.motherBirthCountryId,
          motherBirthCityId: data.motherBirthCityId,
          fatherName: data.fatherName,
          isFatherAlive: data.isFatherAlive,
          fatherOccupationId: data.fatherOccupationId,
          fatherBirthCountryId: data.fatherBirthCountryId,
          fatherBirthCityId: data.fatherBirthCityId,
          numberOfSiblings,
          numberOfBrothers,
          numberOfSisters,
          numberOfElderBrothers,
          numberOfYoungerBrothers,
          numberOfElderSisters,
          numberOfYoungerSisters,
          familyFinancialStatusId: data.familyFinancialStatusId,
          familyTypeId: data.familyTypeId,
          smokingHabitId: data.smokingHabitId,
          drinkingHabitId: data.drinkingHabitId,
          whatsappNumber: data.whatsappNumber,
          selfDescription: data.selfDescription,
          children: children.length
            ? {
                create: children.map((child) => ({
                  name: child.name,
                  gender: child.gender,
                  dateOfBirth: child.dateOfBirth ? new Date(child.dateOfBirth) : undefined,
                  livesWithCandidate: child.livesWithCandidate,
                })),
              }
            : undefined,
          siblings: siblings.length
            ? {
                create: siblings.map((sibling) => ({
                  name: sibling.name,
                  gender: sibling.gender,
                  position: sibling.position,
                  occupationId: sibling.occupationId,
                  maritalStatus: sibling.maritalStatus,
                  spouseOccupation: sibling.spouseOccupation,
                  workplaceCountryId: sibling.workplaceCountryId,
                  workplaceCityId: sibling.workplaceCityId,
                })),
              }
            : undefined,
          maternalRelatives: maternalRelatives.length
            ? {
                create: maternalRelatives.map((relative) => ({
                  type: relative.type,
                  occupationId: relative.occupationId,
                  workplaceCountryId: relative.workplaceCountryId,
                  workplaceCityId: relative.workplaceCityId,
                })),
              }
            : undefined,
          paternalRelatives: paternalRelatives.length
            ? {
                create: paternalRelatives.map((relative) => ({
                  type: relative.type,
                  occupationId: relative.occupationId,
                  workplaceCountryId: relative.workplaceCountryId,
                  workplaceCityId: relative.workplaceCityId,
                })),
              }
            : undefined,
          educationEntries: educationEntries.length
            ? {
                create: educationEntries.map((entry) => ({
                  educationLevelId: entry.educationLevelId,
                  institution: entry.institution,
                  fieldOfStudy: entry.fieldOfStudy,
                  passingYear: entry.passingYear,
                  result: entry.result,
                  countryId: entry.countryId,
                  cityId: entry.cityId,
                })),
              }
            : undefined,
          hobbies: data.hobbies?.length
            ? { create: data.hobbies.map((hobby) => ({ hobbyId: hobby.hobbyId })) }
            : undefined,
        },
      });

      if (data.partnerExpectation) {
        await tx.candidatePartnerExpectation.create({
          data: {
            candidateId: candidate.id,
            preferredMinAge: data.partnerExpectation.preferredMinAge,
            preferredMaxAge: data.partnerExpectation.preferredMaxAge,
            preferredMinHeightCm: data.partnerExpectation.preferredMinHeightCm,
            preferredMaxHeightCm: data.partnerExpectation.preferredMaxHeightCm,
            preferredEducationLevelId: data.partnerExpectation.preferredEducationLevelId,
            preferredOccupationId: data.partnerExpectation.preferredOccupationId,
            preferredCountryId: data.partnerExpectation.preferredCountryId,
            preferredCityId: data.partnerExpectation.preferredCityId,
            preferredIncomeRangeId: data.partnerExpectation.preferredIncomeRangeId,
            preferredReligiousPracticeLevelId: data.partnerExpectation.preferredReligiousPracticeLevelId,
            preferredFamilyFinancialStatusId: data.partnerExpectation.preferredFamilyFinancialStatusId,
            preferredFamilyTypeId: data.partnerExpectation.preferredFamilyTypeId,
            smokingHabitId: data.partnerExpectation.smokingHabitId,
            drinkingHabitId: data.partnerExpectation.drinkingHabitId,
            acceptDivorcedOrWidowed: data.partnerExpectation.acceptDivorcedOrWidowed,
            expectations: data.partnerExpectation.expectations,
          },
        });
      }

      if (files.length) {
        await tx.candidateFile.createMany({
          data: files.map((file) => ({
            candidateId: candidate.id,
            type: file.type as FileType,
            filePath: file.filePath,
            originalName: file.originalName,
            mimeType: file.mimeType,
          })),
        });
      }

      return candidate.id;
    });

    return res.status(201).json({ id: candidateId });
  } catch (error) {
    console.error(error);
    if (files.length) {
      const cleaned: string[] = [];
      files.forEach((file) => {
        const absolutePath = path.isAbsolute(file.filePath)
          ? file.filePath
          : path.join(process.cwd(), 'backend', file.filePath);
        if (fs.existsSync(absolutePath)) {
          try {
            fs.unlinkSync(absolutePath);
            cleaned.push(file.filePath);
          } catch (unlinkError) {
            console.error('Failed to cleanup uploaded file', unlinkError);
          }
        }
      });
      return res.status(500).json({ error: 'Failed to create candidate', cleanedFiles: cleaned });
    }

    return res.status(500).json({ error: 'Failed to create candidate' });
  }
});

export default router;
