# Backend

## Setup

```bash
cd backend
npm install
npm run prisma:migrate
npm run db:seed
npm run dev
```

Environment variables are defined in `.env.example`.

### Running tests

```bash
npm test
```

### Frontend

```bash
cd ../frontend
npm install
npm run dev
```

### Updating dropdown datasets

Sample seed data for dropdowns (countries, cities, occupations, etc.) lives in `prisma/seed.ts`. Replace the sample arrays there with real datasets, then run `npm run prisma:migrate && npm run db:seed` to reload.

## API routes

- `GET /api/health` – health check.
- `GET /api/dropdowns/:type` – fetch dropdown values (e.g., `countries`, `cities?countryId=1`, `occupations`, `incomeRanges`, `religions`, `castes`, `religiousPracticeLevels`, `familyFinancialStatuses`, `familyTypes`, `smokingHabits`, `drinkingHabits`, `educationLevels`, `hobbies`). Returns `{ id, label }[]`.
- `POST /api/candidates` – submit the 12-step biodata payload.
- File uploads: `POST /api/uploads/profile-photo`, `/api/uploads/nid-passport`, `/api/uploads/biodata-doc` with `file` form field.

Upload endpoints accept optional `candidateId` and `fileType` fields to immediately attach the upload to a `CandidateFile` record. Otherwise, include the returned `{ path, fileName }` in the `files` array when posting a candidate.

## Candidate payload shape

A TypeScript reference for the payload lives in `src/types/candidate.ts`. A sample JSON for `POST /api/candidates` is shown below:

```json
{
  "fullName": "John Doe",
  "banglaName": "জন ডো",
  "gender": "MALE",
  "dateOfBirth": "1990-05-10",
  "maritalStatus": "NEVER_MARRIED",
  "religionId": 1,
  "highestEducationLevelId": 3,
  "occupationId": 1,
  "currentCountryId": 1,
  "currentCityId": 1,
  "residencyStatus": "Citizen",
  "incomeRangeId": 2,
  "whatsappNumber": "+8801700000000",
  "children": [],
  "siblings": [],
  "educationEntries": [
    {
      "educationLevelId": 3,
      "institution": "ABC University",
      "fieldOfStudy": "Computer Science",
      "passingYear": 2012,
      "result": "3.5 GPA"
    }
  ],
  "hobbies": [
    { "hobbyId": 1 }
  ],
  "partnerExpectation": {
    "preferredMinAge": 20,
    "preferredMaxAge": 30,
    "preferredEducationLevelId": 3,
    "preferredOccupationId": 1,
    "preferredCountryId": 1,
    "preferredCityId": 1,
    "preferredIncomeRangeId": 2,
    "preferredReligiousPracticeLevelId": 2,
    "preferredFamilyFinancialStatusId": 2,
    "preferredFamilyTypeId": 1,
    "smokingHabitId": 1,
    "drinkingHabitId": 1,
    "acceptDivorcedOrWidowed": false,
    "expectations": "Looking for a kind partner."
  }
}
```
