import {createHash} from 'crypto';

export function generateCodeChallenge(codeVerifier: string): string {
  return createHash('sha256')
    .update(Buffer.from(codeVerifier, 'utf8'))
    .digest()
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}
