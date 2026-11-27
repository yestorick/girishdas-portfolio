export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function parseCommaList(text: string): string[] {
  return text
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

export function parseLineList(text: string): string[] {
  return text
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
}

export interface ActionFeedback {
  type: 'ok' | 'err';
  text: string;
}

export type AdminTable =
  | 'site_profile'
  | 'right_now'
  | 'experiences'
  | 'education'
  | 'tech_stack'
  | 'projects'
  | 'posts';

export async function adminUpsert<T>(
  table: AdminTable,
  payload: Record<string, unknown>,
  id?: string
): Promise<{ data?: T; error?: string }> {
  const res = await fetch('/api/admin/content', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ table, action: 'upsert', id, payload }),
  });
  const json = (await res.json()) as { data?: T; error?: string };
  if (!res.ok) {
    return { error: json.error || `Save failed (HTTP ${res.status})` };
  }
  return { data: json.data };
}

export async function adminDelete(
  table: AdminTable,
  id: string
): Promise<{ error?: string }> {
  const res = await fetch('/api/admin/content', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ table, action: 'delete', id }),
  });
  const json = (await res.json()) as { error?: string };
  if (!res.ok) {
    return { error: json.error || `Delete failed (HTTP ${res.status})` };
  }
  return {};
}

export async function adminUploadFile(
  file: File,
  folder: string
): Promise<{ url?: string; error?: string }> {
  const fd = new FormData();
  fd.append('file', file);
  fd.append('folder', folder);

  const res = await fetch('/api/admin/upload', {
    method: 'POST',
    body: fd,
  });
  const json = (await res.json()) as { url?: string; error?: string };
  if (!res.ok) {
    return { error: json.error || `Upload failed (HTTP ${res.status})` };
  }
  return { url: json.url };
}
