import { NextResponse } from 'next/server';
import {
  ADMIN_SECURITY_HEADERS,
  checkLoginRateLimit,
  clearLoginAttempts,
  createSessionToken,
  getAdminCookieConfig,
  getClientIp,
  isAdminPasswordConfigured,
  isHttpsFromHeaders,
  recordFailedLoginAttempt,
  validateSameOriginRequest,
  verifyPassword,
} from '@/lib/admin-auth';

export async function POST(req: Request) {
  const originError = validateSameOriginRequest(req);
  if (originError) return originError;

  if (!isAdminPasswordConfigured()) {
    return NextResponse.json(
      {
        error:
          'Admin password is not configured on the server. Set ADMIN_PASSWORD in Vercel Environment Variables.',
      },
      { status: 503, headers: ADMIN_SECURITY_HEADERS }
    );
  }

  const ip = getClientIp(req);
  const rate = checkLoginRateLimit(ip);
  if (!rate.allowed) {
    return NextResponse.json(
      {
        error: `Too many failed attempts. Please wait ${Math.ceil(rate.retryAfterSeconds / 60)} minute(s) and try again.`,
      },
      {
        status: 429,
        headers: {
          ...ADMIN_SECURITY_HEADERS,
          'Retry-After': String(rate.retryAfterSeconds),
        },
      }
    );
  }

  let submittedPassword = '';
  try {
    const body = (await req.json()) as { password?: unknown };
    if (typeof body?.password === 'string') {
      submittedPassword = body.password;
    }
  } catch {
    return NextResponse.json(
      { error: 'Invalid request payload.' },
      { status: 400, headers: ADMIN_SECURITY_HEADERS }
    );
  }

  if (!verifyPassword(submittedPassword)) {
    recordFailedLoginAttempt(ip);
    // Fixed small delay limits rapid password guessing and masks comparison latency
    await new Promise((resolve) => setTimeout(resolve, 250));
    return NextResponse.json(
      { error: 'Incorrect password.' },
      { status: 401, headers: ADMIN_SECURITY_HEADERS }
    );
  }

  clearLoginAttempts(ip);
  const token = createSessionToken();
  if (!token) {
    return NextResponse.json(
      { error: 'Unable to initialize session signing key.' },
      { status: 500, headers: ADMIN_SECURITY_HEADERS }
    );
  }

  const isHttps = isHttpsFromHeaders(req.headers);
  const cookieCfg = getAdminCookieConfig(isHttps);

  const res = NextResponse.json(
    { ok: true },
    { status: 200, headers: ADMIN_SECURITY_HEADERS }
  );
  res.cookies.set(cookieCfg.name, token, cookieCfg.options);
  return res;
}
