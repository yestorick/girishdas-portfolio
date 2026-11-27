import { NextResponse } from 'next/server';
import {
  ADMIN_SECURITY_HEADERS,
  isHttpsFromHeaders,
  validateSameOriginRequest,
} from '@/lib/admin-auth';

export async function POST(req: Request) {
  const originError = validateSameOriginRequest(req);
  if (originError) return originError;

  const isHttps = isHttpsFromHeaders(req.headers);

  const res = NextResponse.json(
    { ok: true },
    {
      status: 200,
      headers: {
        ...ADMIN_SECURITY_HEADERS,
        'Clear-Site-Data': '"cookies", "storage", "cache"',
      },
    }
  );

  res.cookies.set('__Host-girish_admin', '', {
    httpOnly: true,
    secure: isHttps,
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  });
  res.cookies.set('girish_admin', '', {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  });

  return res;
}
