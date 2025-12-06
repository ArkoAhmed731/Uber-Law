import request from 'supertest';
import { FileType, Gender, MaritalStatus } from '@prisma/client';
import app from '../src/app';

jest.mock('../src/prisma', () => {
  const tx = {
    candidate: { create: jest.fn() },
    candidatePartnerExpectation: { create: jest.fn() },
    candidateFile: { createMany: jest.fn() },
  };

  return {
    __esModule: true,
    default: {
      __tx: tx,
      $transaction: jest.fn((cb: (client: typeof tx) => Promise<any>) => cb(tx)),
      country: { findMany: jest.fn() },
      city: { findMany: jest.fn() },
      occupation: { findMany: jest.fn() },
      incomeRange: { findMany: jest.fn() },
      religion: { findMany: jest.fn() },
      caste: { findMany: jest.fn() },
      religiousPracticeLevel: { findMany: jest.fn() },
      familyFinancialStatus: { findMany: jest.fn() },
      familyType: { findMany: jest.fn() },
      smokingHabit: { findMany: jest.fn() },
      drinkingHabit: { findMany: jest.fn() },
      educationLevel: { findMany: jest.fn() },
      hobby: { findMany: jest.fn() },
    },
  };
});

const prisma = require('../src/prisma').default as any;

describe('POST /api/candidates', () => {
  beforeEach(() => {
    prisma.__tx.candidate.create.mockResolvedValue({ id: 123 });
    prisma.__tx.candidatePartnerExpectation.create.mockResolvedValue({ id: 1 });
    prisma.__tx.candidateFile.createMany.mockResolvedValue({ count: 1 });
  });

  it('creates a candidate with nested relations and files', async () => {
    const payload = {
      fullName: 'Test User',
      gender: Gender.MALE,
      dateOfBirth: '1990-01-01',
      maritalStatus: MaritalStatus.NEVER_MARRIED,
      religionId: 1,
      currentCountryId: 1,
      currentCityId: 2,
      occupationId: 1,
      highestEducationLevelId: 1,
      whatsappNumber: '+8801700000000',
      numberOfChildren: 0,
      educationEntries: [
        {
          educationLevelId: 1,
          institution: 'Test College',
          passingYear: 2008,
        },
      ],
      siblings: [
        {
          name: 'Sister',
          gender: Gender.FEMALE,
        },
      ],
      children: [],
      partnerExpectation: {
        preferredMinAge: 20,
        preferredMaxAge: 30,
      },
      files: [
        {
          type: FileType.PROFILE_PHOTO,
          filePath: 'uploads/photo.jpg',
          originalName: 'photo.jpg',
        },
      ],
    };

    const response = await request(app).post('/api/candidates').send(payload);

    expect(response.status).toBe(201);
    expect(response.body.id).toBe(123);
    expect(prisma.__tx.candidate.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          numberOfChildren: 0,
          numberOfSiblings: 1,
          siblings: expect.any(Object),
          educationEntries: expect.any(Object),
        }),
      }),
    );
    expect(prisma.__tx.candidateFile.createMany).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.arrayContaining([
          expect.objectContaining({
            candidateId: 123,
            type: FileType.PROFILE_PHOTO,
            filePath: 'uploads/photo.jpg',
          }),
        ]),
      }),
    );
  });

  it('rejects payloads with mismatched counts', async () => {
    const response = await request(app)
      .post('/api/candidates')
      .send({
        fullName: 'Test User',
        gender: Gender.MALE,
        dateOfBirth: '1990-01-01',
        maritalStatus: MaritalStatus.NEVER_MARRIED,
        religionId: 1,
        currentCountryId: 1,
        currentCityId: 2,
        occupationId: 1,
        highestEducationLevelId: 1,
        whatsappNumber: '+8801700000000',
        numberOfChildren: 2,
        children: [],
        educationEntries: [
          { educationLevelId: 1, institution: 'Test College' },
        ],
      });

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining(['Number of children must match children array length']),
    );
  });
});
