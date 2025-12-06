# Marriage Biodata App

This directory contains the full-stack marriage biodata project relocated so it can live in its own repository. Clone or copy only the contents of `marriage-biodata-app` into a fresh repo if you want to isolate it from the rest of this codebase.

## Structure
- `backend/`: Express + Prisma API, database schema, seeds, and tests.
- `frontend/`: Vite React multi-step biodata form.

## Usage in a new repository
1. Initialize a new git repository from inside this folder or copy its contents elsewhere:
   ```bash
   cd marriage-biodata-app
   git init
   ```
2. Follow the backend and frontend README/setup instructions from within their respective folders.

## Quick start from current workspace
- Backend: `cd marriage-biodata-app/backend && npm install && npm run dev`
- Frontend: `cd marriage-biodata-app/frontend && npm install && npm run dev`

Refer to `backend/README.md` for Prisma migrations, seeding, and testing, and to `frontend` for the React app entry point.
