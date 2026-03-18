import { UploadedFile } from '../types/uploaded-file.type';

export function isUploadedFile(value: unknown): value is UploadedFile {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    Buffer.isBuffer(candidate.buffer) &&
    typeof candidate.originalname === 'string' &&
    typeof candidate.mimetype === 'string' &&
    typeof candidate.size === 'number'
  );
}
