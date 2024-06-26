// Original source: https://github.com/ai/nanoid/blob/main/index.js
// License: MIT, Modification/Distribution is allowed

const CHARS = 'abcdefghijklmnopqrstuvwxyz123456789';

let pool: Buffer, poolOffset: number;

function random(bytes: number) {
  if (!pool || pool.length < bytes) {
    pool = Buffer.allocUnsafe(bytes * 128);
    crypto.getRandomValues(pool);
    poolOffset = 0;
  } else if (poolOffset + bytes > pool.length) {
    crypto.getRandomValues(pool);
    poolOffset = 0;
  }
  poolOffset += bytes;

  return pool.subarray(poolOffset - bytes, poolOffset);
}

export function createRandomKey(size = 16) {
  const mask = (2 << (31 - Math.clz32((CHARS.length - 1) | 1))) - 1;
  const step = Math.ceil((1.6 * mask * size) / CHARS.length);

  let id = '';

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const bytes = random(step);
    let i = step;

    while (i--) {
      id += CHARS[bytes[i]! & mask] || '';
      if (id.length === size) return id;
    }
  }
}
