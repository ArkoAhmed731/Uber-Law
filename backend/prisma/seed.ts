import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const countries = [
    { name: 'Bangladesh', nameBangla: 'বাংলাদেশ' },
    { name: 'United States', nameBangla: 'যুক্তরাষ্ট্র' },
  ];

  const cities = [
    { name: 'Dhaka', nameBangla: 'ঢাকা', countryName: 'Bangladesh' },
    { name: 'Chattogram', nameBangla: 'চট্টগ্রাম', countryName: 'Bangladesh' },
    { name: 'New York', nameBangla: 'নিউ ইয়র্ক', countryName: 'United States' },
  ];

  const occupations = [
    { name: 'Software Engineer', nameBangla: 'সফটওয়্যার ইঞ্জিনিয়ার' },
    { name: 'Doctor', nameBangla: 'ডাক্তার' },
    { name: 'Teacher', nameBangla: 'শিক্ষক' },
  ];

  const incomeRanges = [
    { name: 'Below 25k', nameBangla: '২৫ হাজারের নিচে' },
    { name: '25k - 50k', nameBangla: '২৫-৫০ হাজার' },
    { name: '50k - 100k', nameBangla: '৫০-১০০ হাজার' },
  ];

  const religions = [
    { name: 'Islam', nameBangla: 'ইসলাম' },
    { name: 'Hinduism', nameBangla: 'হিন্দু' },
  ];

  const castes = [
    { name: 'Sunni', nameBangla: 'সুন্নি', religion: 'Islam' },
    { name: 'Shia', nameBangla: 'শিয়া', religion: 'Islam' },
    { name: 'Brahmin', nameBangla: 'ব্রাহ্মণ', religion: 'Hinduism' },
  ];

  const religiousPracticeLevels = [
    { name: 'Conservative', nameBangla: 'রক্ষণশীল' },
    { name: 'Moderate', nameBangla: 'মধ্যম' },
    { name: 'Liberal', nameBangla: 'উদার' },
  ];

  const familyFinancialStatuses = [
    { name: 'Upper Class', nameBangla: 'উচ্চবিত্ত' },
    { name: 'Middle Class', nameBangla: 'মধ্যবিত্ত' },
    { name: 'Lower Middle Class', nameBangla: 'নিম্ন মধ্যবিত্ত' },
  ];

  const familyTypes = [
    { name: 'Joint', nameBangla: 'যৌথ' },
    { name: 'Nuclear', nameBangla: 'স্বতন্ত্র' },
  ];

  const smokingHabits = [
    { name: 'Non-smoker', nameBangla: 'ধূমপান করে না' },
    { name: 'Occasional', nameBangla: 'মাঝে মাঝে' },
  ];

  const drinkingHabits = [
    { name: 'Never', nameBangla: 'কখনো না' },
    { name: 'Occasional', nameBangla: 'মাঝে মাঝে' },
  ];

  const educationLevels = [
    { name: 'SSC', nameBangla: 'এসএসসি' },
    { name: 'HSC', nameBangla: 'এইচএসসি' },
    { name: 'Bachelor', nameBangla: 'স্নাতক' },
    { name: 'Masters', nameBangla: 'স্নাতকোত্তর' },
    { name: 'PhD', nameBangla: 'পিএইচডি' },
  ];

  const hobbies = [
    { name: 'Reading', nameBangla: 'পড়া' },
    { name: 'Traveling', nameBangla: 'ভ্রমণ' },
    { name: 'Cooking', nameBangla: 'রান্না' },
  ];

  for (const country of countries) {
    await prisma.country.upsert({
      where: { name: country.name },
      update: country,
      create: country,
    });
  }

  for (const city of cities) {
    const country = await prisma.country.findUnique({ where: { name: city.countryName } });
    if (!country) continue;
    await prisma.city.upsert({
      where: { name_countryId: { name: city.name, countryId: country.id } },
      update: { nameBangla: city.nameBangla, countryId: country.id },
      create: { name: city.name, nameBangla: city.nameBangla, countryId: country.id },
    });
  }

  for (const occupation of occupations) {
    await prisma.occupation.upsert({
      where: { name: occupation.name },
      update: occupation,
      create: occupation,
    });
  }

  for (const income of incomeRanges) {
    await prisma.incomeRange.upsert({
      where: { name: income.name },
      update: income,
      create: income,
    });
  }

  for (const religion of religions) {
    await prisma.religion.upsert({
      where: { name: religion.name },
      update: religion,
      create: religion,
    });
  }

  for (const caste of castes) {
    const religion = await prisma.religion.findUnique({ where: { name: caste.religion } });
    if (!religion) continue;
    await prisma.caste.upsert({
      where: { name_religionId: { name: caste.name, religionId: religion.id } },
      update: { nameBangla: caste.nameBangla, religionId: religion.id },
      create: { name: caste.name, nameBangla: caste.nameBangla, religionId: religion.id },
    });
  }

  for (const level of religiousPracticeLevels) {
    await prisma.religiousPracticeLevel.upsert({
      where: { name: level.name },
      update: level,
      create: level,
    });
  }

  for (const status of familyFinancialStatuses) {
    await prisma.familyFinancialStatus.upsert({
      where: { name: status.name },
      update: status,
      create: status,
    });
  }

  for (const type of familyTypes) {
    await prisma.familyType.upsert({
      where: { name: type.name },
      update: type,
      create: type,
    });
  }

  for (const habit of smokingHabits) {
    await prisma.smokingHabit.upsert({
      where: { name: habit.name },
      update: habit,
      create: habit,
    });
  }

  for (const habit of drinkingHabits) {
    await prisma.drinkingHabit.upsert({
      where: { name: habit.name },
      update: habit,
      create: habit,
    });
  }

  for (const level of educationLevels) {
    await prisma.educationLevel.upsert({
      where: { name: level.name },
      update: level,
      create: level,
    });
  }

  for (const hobby of hobbies) {
    await prisma.hobby.upsert({
      where: { name: hobby.name },
      update: hobby,
      create: hobby,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
