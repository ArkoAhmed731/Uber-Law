import request from 'supertest';
import app from '../src/app';

jest.mock('../src/prisma', () => ({
  __esModule: true,
  default: {
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
    $transaction: jest.fn(),
  },
}));

const prisma = require('../src/prisma').default as any;

describe('GET /api/dropdowns/:type', () => {
  beforeEach(() => {
    prisma.country.findMany.mockResolvedValue([
      { id: 1, name: 'Bangladesh', nameBangla: 'বাংলাদেশ' },
    ]);
  });

  it('returns mapped labels for countries', async () => {
    const res = await request(app).get('/api/dropdowns/countries');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([{ id: 1, label: 'Bangladesh / বাংলাদেশ' }]);
    expect(prisma.country.findMany).toHaveBeenCalled();
  });

  it('returns 400 for unsupported dropdown type', async () => {
    const res = await request(app).get('/api/dropdowns/unknown');
    expect(res.status).toBe(400);
  });
});
