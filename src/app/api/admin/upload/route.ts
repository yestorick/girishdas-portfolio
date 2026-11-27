import { NextResponse } from 'next/server';
import {
  ADMIN_SECURITY_HEADERS,
  requireAuthenticatedAdminApi,
} from '@/lib/admin-auth';
import { getSupabaseAdminClient } from '@/lib/supabase-admin';

const ALLOWED_FOLDERS = new Set([
  'avatars',
  'projects',
  'projects/screenshots',
  'posts',
  'posts/inline',
  'documents',
]);

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif',
  'application/pdf',
]);

const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5MB

export async function POST(req: Request) {
  const authError = await requireAuthenticatedAdminApi(req);
  if (authError) return authError;

  const adminSb = getSupabaseAdminClient();
  if (!adminSb) {
    return NextResponse.json(
      {
        error:
          'SUPABASE_SERVICE_ROLE_KEY is not configured on the server. Add it in Vercel Environment Variables to upload media.',
      },
      { status: 503, headers: ADMIN_SECURITY_HEADERS }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const folderRaw = formData.get('folder');
    const folder = typeof folderRaw === 'string' ? folderRaw.trim() : '';

    if (!ALLOWED_FOLDERS.has(folder)) {
      return NextResponse.json(
        { error: 'Invalid upload destination.' },
        { status: 400, headers: ADMIN_SECURITY_HEADERS }
      );
    }

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: 'File is required.' },
        { status: 400, headers: ADMIN_SECURITY_HEADERS }
      );
    }

    if (file.size <= 0 || file.size > MAX_FILE_BYTES) {
      return NextResponse.json(
        { error: 'File must be between 1 byte and 5 MB.' },
        { status: 400, headers: ADMIN_SECURITY_HEADERS }
      );
    }

    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      return NextResponse.json(
        {
          error:
            'Unsupported file type. Upload PNG, JPG, WebP, GIF, AVIF, or PDF only.',
        },
        { status: 400, headers: ADMIN_SECURITY_HEADERS }
      );
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const filePath = `${folder}/${Date.now()}-${safeName}`;
    const bytes = await file.arrayBuffer();

    const { error } = await adminSb.storage
      .from('portfolio-media')
      .upload(filePath, bytes, {
        contentType: file.type,
        upsert: true,
      });

    if (error) {
      return NextResponse.json(
        { error: `Upload failed: ${error.message}` },
        { status: 400, headers: ADMIN_SECURITY_HEADERS }
      );
    }

    const { data } = adminSb.storage
      .from('portfolio-media')
      .getPublicUrl(filePath);

    return NextResponse.json(
      { ok: true, url: data.publicUrl },
      { status: 200, headers: ADMIN_SECURITY_HEADERS }
    );
  } catch (err) {
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : 'Unable to upload file.',
      },
      { status: 500, headers: ADMIN_SECURITY_HEADERS }
    );
  }
}
