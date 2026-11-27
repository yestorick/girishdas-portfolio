import crypto from 'node:crypto';
import { cookies, headers } from 'next/headers';
import { NextResponse } from 'next/server';

const PROD_COOKIE_NAME = '__Host-girish_admin';
const LOCAL_COOKIE_NAME = 'girish_admin';
const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

// In-memory brute-force protection per client IP
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;
const LOCKOUT_MS = 15 * 60 * 1000;

interface AttemptRecord {
  count: number;
  firstAt: number;
  lockedUntil: number;
}

const attemptStore = new Map<string, AttemptRecord>();

export const ADMIN_SECURITY_HEADERS: Record<string, string> = {
  'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet, noimageindex',
  'Cache-Control': 'no-store, no-cache, must-revalidate, private',
  Pragma: 'no-cache',
  'X-Frame-Options': 'DENY',
  'Content-Security-Policy': "frame-ancestors 'none'",
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer',
  'Cross-Origin-Resource-Policy': 'same-origin',
  Vary: 'Sec-Fetch-Dest, Sec-Fetch-Mode, Sec-Fetch-Site',
};

export function isAdminPasswordConfigured(): boolean {
  const hash = (process.env.ADMIN_PASSWORD_HASH || '').trim();
  const plain = (process.env.ADMIN_PASSWORD || '').trim();
  return Boolean(hash || plain);
}

function getSigningKey(): Buffer | null {
  const explicitSecret = (process.env.ADMIN_SESSION_SECRET || '').trim();
  if (explicitSecret.length >= 16) {
    return crypto.createHash('sha256').update(explicitSecret).digest();
  }

  const material =
    (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim() ||
    (process.env.ADMIN_PASSWORD_HASH || '').trim() ||
    (process.env.ADMIN_PASSWORD || '').trim() ||
    explicitSecret;

  if (!material) return null;

  return crypto
    .createHmac('sha256', 'girishdas-admin-session-kdf-v1')
    .update(material)
    .digest();
}

export function verifyPassword(submittedPassword: string): boolean {
  if (!submittedPassword) return false;

  const scryptSpec = (process.env.ADMIN_PASSWORD_HASH || '').trim();
  if (scryptSpec.startsWith('scrypt$')) {
    const parts = scryptSpec.split('$');
    if (parts.length !== 3) return false;
    const [, saltHex, expectedHex] = parts;
    try {
      const derived = crypto.scryptSync(submittedPassword, saltHex, 64);
      const expected = Buffer.from(expectedHex, 'hex');
      if (derived.length !== expected.length) return false;
      return crypto.timingSafeEqual(derived, expected);
    } catch {
      return false;
    }
  }

  const configuredPassword = (process.env.ADMIN_PASSWORD || '').trim();
  if (!configuredPassword) return false;

  const submittedDigest = crypto
    .createHash('sha256')
    .update(submittedPassword, 'utf8')
    .digest();
  const configuredDigest = crypto
    .createHash('sha256')
    .update(configuredPassword, 'utf8')
    .digest();

  return crypto.timingSafeEqual(submittedDigest, configuredDigest);
}

export function createSessionToken(): string | null {
  const key = getSigningKey();
  if (!key) return null;

  const now = Date.now();
  const payload = {
    v: 1,
    iat: now,
    exp: now + SESSION_TTL_MS,
    jti: crypto.randomBytes(16).toString('hex'),
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload), 'utf8').toString(
    'base64url'
  );
  const sig = crypto
    .createHmac('sha256', key)
    .update(encodedPayload)
    .digest('base64url');

  return `${encodedPayload}.${sig}`;
}

export function verifySessionToken(token?: string | null): boolean {
  if (!token) return false;
  const key = getSigningKey();
  if (!key) return false;

  const dotIdx = token.indexOf('.');
  if (dotIdx <= 0 || dotIdx === token.length - 1) return false;

  const encodedPayload = token.slice(0, dotIdx);
  const providedSig = token.slice(dotIdx + 1);
  const expectedSig = crypto
    .createHmac('sha256', key)
    .update(encodedPayload)
    .digest('base64url');

  const a = Buffer.from(providedSig, 'utf8');
  const b = Buffer.from(expectedSig, 'utf8');
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return false;
  }

  try {
    const parsed = JSON.parse(
      Buffer.from(encodedPayload, 'base64url').toString('utf8')
    ) as { v?: number; exp?: number };
    return (
      parsed.v === 1 &&
      typeof parsed.exp === 'number' &&
      parsed.exp > Date.now()
    );
  } catch {
    return false;
  }
}

export function isHttpsFromHeaders(hdrs: Headers): boolean {
  const proto = hdrs.get('x-forwarded-proto');
  if (proto) {
    return proto.split(',')[0].trim().toLowerCase() === 'https';
  }
  const host = (hdrs.get('host') || '').toLowerCase();
  if (host.startsWith('localhost') || host.startsWith('127.0.0.1')) {
    return false;
  }
  return process.env.NODE_ENV === 'production';
}

export function getAdminCookieConfig(isHttps: boolean) {
  return {
    name: isHttps ? PROD_COOKIE_NAME : LOCAL_COOKIE_NAME,
    options: {
      httpOnly: true,
      secure: isHttps,
      sameSite: 'strict' as const,
      path: '/',
      maxAge: Math.floor(SESSION_TTL_MS / 1000),
    },
  };
}

export async function verifyAdminSession(): Promise<boolean> {
  if (!isAdminPasswordConfigured()) return false;
  const cookieStore = await cookies();
  const hdrs = await headers();
  const isHttps = isHttpsFromHeaders(hdrs);
  const cookieName = isHttps ? PROD_COOKIE_NAME : LOCAL_COOKIE_NAME;
  const token = cookieStore.get(cookieName)?.value;
  return verifySessionToken(token);
}

export function getClientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  return 'unknown';
}

export function checkLoginRateLimit(ip: string): {
  allowed: boolean;
  retryAfterSeconds: number;
} {
  const now = Date.now();
  const rec = attemptStore.get(ip);
  if (!rec) return { allowed: true, retryAfterSeconds: 0 };

  if (rec.lockedUntil > now) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((rec.lockedUntil - now) / 1000)),
    };
  }

  if (now - rec.firstAt > WINDOW_MS) {
    attemptStore.delete(ip);
    return { allowed: true, retryAfterSeconds: 0 };
  }

  return { allowed: true, retryAfterSeconds: 0 };
}

export function recordFailedLoginAttempt(ip: string): void {
  const now = Date.now();
  const existing = attemptStore.get(ip);
  if (!existing || now - existing.firstAt > WINDOW_MS) {
    attemptStore.set(ip, { count: 1, firstAt: now, lockedUntil: 0 });
    return;
  }

  const nextCount = existing.count + 1;
  attemptStore.set(ip, {
    count: nextCount,
    firstAt: existing.firstAt,
    lockedUntil: nextCount >= MAX_ATTEMPTS ? now + LOCKOUT_MS : 0,
  });
}

export function clearLoginAttempts(ip: string): void {
  attemptStore.delete(ip);
}

export function validateSameOriginRequest(req: Request): NextResponse | null {
  const secFetchSite = req.headers.get('sec-fetch-site');
  if (secFetchSite && secFetchSite === 'cross-site') {
    return NextResponse.json(
      { error: 'Cross-site request blocked.' },
      { status: 403, headers: ADMIN_SECURITY_HEADERS }
    );
  }

  const origin = req.headers.get('origin');
  const host =
    req.headers.get('x-forwarded-host') || req.headers.get('host') || '';
  if (origin && host) {
    try {
      const originHost = new URL(origin).host.toLowerCase();
      if (originHost !== host.toLowerCase()) {
        return NextResponse.json(
          { error: 'Origin mismatch.' },
          { status: 403, headers: ADMIN_SECURITY_HEADERS }
        );
      }
    } catch {
      return NextResponse.json(
        { error: 'Invalid Origin header.' },
        { status: 403, headers: ADMIN_SECURITY_HEADERS }
      );
    }
  }

  return null;
}

export async function requireAuthenticatedAdminApi(
  req: Request
): Promise<NextResponse | null> {
  const csrfError = validateSameOriginRequest(req);
  if (csrfError) return csrfError;

  const authed = await verifyAdminSession();
  if (!authed) {
    return NextResponse.json(
      { error: 'Authentication required.' },
      { status: 401, headers: ADMIN_SECURITY_HEADERS }
    );
  }

  return null;
}
