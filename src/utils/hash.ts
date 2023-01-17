import * as crypto from 'crypto';

export const hash = (str: string) => {
  return crypto.createHash('sha256').update(str).copy().digest('base64');
}