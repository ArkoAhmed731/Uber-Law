import { FileType } from '@prisma/client';
import { Request, Response, Router } from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import prisma from '../prisma';

const uploadDir = path.join(process.cwd(), 'backend', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });
const router = Router();

const routeFileTypeMap: Record<string, FileType> = {
  'profile-photo': FileType.PROFILE_PHOTO,
  'nid-passport': FileType.IDENTITY,
  'biodata-doc': FileType.DOCUMENT,
};

async function handleUpload(req: Request, res: Response) {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const pathFromRoute = routeFileTypeMap[req.params.type] || undefined;
  const requestedType = (req.body.fileType as FileType | undefined) || pathFromRoute;
  const candidateId = req.body.candidateId ? Number(req.body.candidateId) : undefined;
  const storedRelativePath = path.join('uploads', req.file.filename);

  if (req.body.candidateId && Number.isNaN(candidateId)) {
    return res.status(400).json({ error: 'candidateId must be a number' });
  }

  try {
    let candidateFileId: number | undefined;

    if (candidateId && requestedType) {
      const created = await prisma.candidateFile.create({
        data: {
          candidateId,
          type: requestedType,
          filePath: storedRelativePath,
          originalName: req.file.originalname,
          mimeType: req.file.mimetype,
        },
      });
      candidateFileId = created.id;
    }

    return res.status(201).json({
      fileName: req.file.filename,
      path: storedRelativePath,
      candidateFileId,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'File saved but could not attach to candidate' });
  }
}

router.post('/api/uploads/:type(profile-photo|nid-passport|biodata-doc)', upload.single('file'), handleUpload);

export default router;
