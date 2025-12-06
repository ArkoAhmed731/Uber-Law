# Migrating the Marriage Biodata App into its own repository

Follow these steps if the project currently sits inside another repository and you want it fully detached.

## Option A: Copy into a brand-new folder
```bash
cp -R marriage-biodata-app ~/marriage-biodata-app
cd ~/marriage-biodata-app
git init
git add .
git commit -m "Initial commit: marriage biodata app"
git remote add origin <your-new-remote-url>
git push -u origin main
```

## Option B: Use git archive from the parent repo
If you prefer to preserve a clean snapshot without the parent repo's history:
```bash
# from the parent repo root
git archive --format=tar HEAD marriage-biodata-app | tar -x -C /tmp
cd /tmp/marriage-biodata-app
git init && git add .
git commit -m "Initial commit: marriage biodata app"
```
Then add your remote and push as usual.

## Option C: Split history with git subtree
To keep the subfolder's history while removing unrelated commits:
```bash
# from the parent repo root
SUBTREE_REF=$(git subtree split --prefix marriage-biodata-app main)
git clone --no-checkout . /tmp/marriage-biodata-app-history
cd /tmp/marriage-biodata-app-history
git checkout $SUBTREE_REF
```
You can then set a remote on `/tmp/marriage-biodata-app-history` and push it as an independent repository.

After migration, use the `.gitignore` inside `marriage-biodata-app` to keep node modules, env files, and build outputs out of version control.
