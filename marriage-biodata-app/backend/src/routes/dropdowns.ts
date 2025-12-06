import { Request, Response, Router } from 'express';
import prisma from '../prisma';

const router = Router();

const dropdownQueries = {
  countries: () =>
    prisma.country.findMany({
      orderBy: { name: 'asc' },
      select: { id: true, name: true, nameBangla: true },
    }),
  cities: (countryId?: number) =>
    prisma.city.findMany({
      where: countryId ? { countryId } : undefined,
      orderBy: { name: 'asc' },
      select: { id: true, name: true, nameBangla: true },
    }),
  occupations: () =>
    prisma.occupation.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true, nameBangla: true } }),
  incomeRanges: () =>
    prisma.incomeRange.findMany({ orderBy: { id: 'asc' }, select: { id: true, name: true, nameBangla: true } }),
  religions: () =>
    prisma.religion.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true, nameBangla: true } }),
  castes: () => prisma.caste.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true, nameBangla: true } }),
  religiousPracticeLevels: () =>
    prisma.religiousPracticeLevel.findMany({ orderBy: { id: 'asc' }, select: { id: true, name: true, nameBangla: true } }),
  familyFinancialStatuses: () =>
    prisma.familyFinancialStatus.findMany({ orderBy: { id: 'asc' }, select: { id: true, name: true, nameBangla: true } }),
  familyTypes: () =>
    prisma.familyType.findMany({ orderBy: { id: 'asc' }, select: { id: true, name: true, nameBangla: true } }),
  smokingHabits: () =>
    prisma.smokingHabit.findMany({ orderBy: { id: 'asc' }, select: { id: true, name: true, nameBangla: true } }),
  drinkingHabits: () =>
    prisma.drinkingHabit.findMany({ orderBy: { id: 'asc' }, select: { id: true, name: true, nameBangla: true } }),
  educationLevels: () =>
    prisma.educationLevel.findMany({ orderBy: { id: 'asc' }, select: { id: true, name: true, nameBangla: true } }),
  hobbies: () => prisma.hobby.findMany({ orderBy: { id: 'asc' }, select: { id: true, name: true, nameBangla: true } }),
};

type DropdownType = keyof typeof dropdownQueries;

function buildLabel(name?: string | null, nameBangla?: string | null) {
  if (!name) return '';
  return nameBangla ? `${name} / ${nameBangla}` : name;
}

router.get('/api/dropdowns/:type', async (req: Request, res: Response) => {
  const { type } = req.params;
  const countryId = req.query.countryId ? Number(req.query.countryId) : undefined;

  if (!(type in dropdownQueries)) {
    return res.status(400).json({ error: 'Unsupported dropdown type' });
  }

  try {
    const typed = type as DropdownType;
    const data = typed === 'cities' ? await dropdownQueries.cities(countryId) : await dropdownQueries[typed]!();
    return res.json(
      data.map((item) => {
        const { name, nameBangla, id } = item as { id: number; name: string; nameBangla?: string | null };
        return {
          id,
          label: buildLabel(name, nameBangla),
        };
      }),
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to load dropdown data' });
  }
});

export default router;
