# Marriage Biodata App

This directory contains the full-stack marriage biodata project and is intended to be the **root of its own Git repository**. If you cloned this from another project, initialize a new repo from here so commits land in the correct location instead of the parent repo.

## Structure
- `backend/`: Express + Prisma API, database schema, seeds, and tests.
- `frontend/`: Vite React multi-step biodata form.

## Move into a fresh repository (recommended)
1. Copy or move this folder out of the old project (e.g., `cp -R marriage-biodata-app ~/marriage-biodata-app`).
2. Re-initialize Git inside the copied folder:
   ```bash
   cd ~/marriage-biodata-app
   git init
   git add .
   git commit -m "Initial commit: marriage biodata app"
   ```
3. Add your new remote (e.g., GitHub) and push:
   ```bash
   git remote add origin <your-new-repo-url>
   git push -u origin main
   ```

## Using this folder in-place
If you cannot move it yet, still run `git init` inside `marriage-biodata-app` to keep its history separate from the parent repo.

## Quick start (after creating the new repo)
- Backend: `cd backend && npm install && npm run dev`
- Frontend: `cd frontend && npm install && npm run dev`

Refer to `backend/README.md` for Prisma migrations, seeding, and testing, and to `frontend` for the React app entry point.
