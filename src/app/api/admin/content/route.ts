import { NextResponse } from 'next/server';
import {
  ADMIN_SECURITY_HEADERS,
  requireAuthenticatedAdminApi,
} from '@/lib/admin-auth';
import {
  fetchAllAdminContent,
  getSupabaseAdminClient,
} from '@/lib/supabase-admin';

type AllowedTable =
  | 'site_profile'
  | 'right_now'
  | 'experiences'
  | 'education'
  | 'tech_stack'
  | 'projects'
  | 'posts';

const ALLOWED_TABLES = new Set<AllowedTable>([
  'site_profile',
  'right_now',
  'experiences',
  'education',
  'tech_stack',
  'projects',
  'posts',
]);

function str(v: unknown, fallback = ''): string {
  return typeof v === 'string' ? v.trim() : fallback;
}

function strArr(v: unknown): string[] {
  return Array.isArray(v)
    ? v.map((item) => String(item).trim()).filter(Boolean)
    : [];
}

function sanitizePayload(
  table: AllowedTable,
  raw: Record<string, unknown>
): Record<string, unknown> {
  switch (table) {
    case 'site_profile':
      return {
        name: str(raw.name, 'Girish Das'),
        nickname: str(raw.nickname),
        avatar_url: str(raw.avatar_url),
        nav_logo: str(raw.nav_logo || raw.name, 'Girish Das'),
        status_badge: str(raw.status_badge),
        headline_intro: str(raw.headline_intro, "Hi, I'm Girish Das."),
        headline_highlight: str(raw.headline_highlight),
        bio: str(raw.bio),
        email: str(raw.email, 'hellorick73@gmail.com'),
        phone: str(raw.phone),
        location: str(raw.location),
        website_url: str(raw.website_url),
        resume_url: str(raw.resume_url, '#') || '#',
        github_url: str(raw.github_url),
        linkedin_url: str(raw.linkedin_url),
        twitter_url: str(raw.twitter_url),
        hero_primary_cta: str(raw.hero_primary_cta, 'Contact me'),
        hero_secondary_cta: str(raw.hero_secondary_cta, 'My project & works'),
        experience_heading: str(raw.experience_heading, 'Experience'),
        projects_heading: str(raw.projects_heading, 'My projects'),
        projects_subtitle: str(raw.projects_subtitle),
        stack_heading: str(raw.stack_heading, 'Tech & marketing stacks'),
        blog_heading: str(raw.blog_heading, 'From my blog'),
        blog_subtitle: str(raw.blog_subtitle),
        footer_heading: str(raw.footer_heading, "Let's connect."),
        footer_tagline: str(raw.footer_tagline),
        updated_at: new Date().toISOString(),
      };
    case 'right_now':
      return {
        card_title: str(raw.card_title, 'Right now'),
        building_title: str(raw.building_title),
        building_desc: str(raw.building_desc),
        learning: str(raw.learning),
        current_projects: str(raw.current_projects),
        based_in: str(raw.based_in),
        updated_at: new Date().toISOString(),
      };
    case 'experiences':
      return {
        role: str(raw.role),
        company: str(raw.company),
        description:
          typeof raw.description === 'string' ? raw.description.trim() : '',
        period: str(raw.period),
        order_index: Number(raw.order_index) || 0,
      };
    case 'education':
      return {
        degree: str(raw.degree),
        institution: str(raw.institution),
        period: str(raw.period),
        description: str(raw.description),
        order_index: Number(raw.order_index) || 0,
      };
    case 'tech_stack':
      return {
        category: str(raw.category),
        color: str(raw.color, 'blue'),
        skills: strArr(raw.skills),
        order_index: Number(raw.order_index) || 0,
      };
    case 'projects':
      return {
        slug: str(raw.slug),
        title: str(raw.title),
        category: str(raw.category, 'marketing'),
        description: str(raw.description),
        content: typeof raw.content === 'string' ? raw.content.trim() : '',
        client: str(raw.client),
        role: str(raw.role),
        duration: str(raw.duration || raw.completion_date),
        completion_date: str(raw.completion_date),
        made_by: str(raw.made_by, 'Made by me'),
        image_url: str(raw.image_url),
        screenshots: strArr(raw.screenshots),
        metrics: strArr(raw.metrics),
        tags: strArr(raw.tags),
        color: str(raw.color, 'yellow'),
        live_url: str(raw.live_url),
        featured: raw.featured !== false,
        order_index: Number(raw.order_index) || 0,
      };
    case 'posts':
      return {
        title: str(raw.title),
        slug: str(raw.slug),
        excerpt: str(raw.excerpt),
        content: typeof raw.content === 'string' ? raw.content.trim() : '',
        read_time: str(raw.read_time, '4 min read'),
        published_at:
          str(raw.published_at) || new Date().toISOString().slice(0, 10),
        published: Boolean(raw.published),
        cover_image: str(raw.cover_image),
        updated_at: new Date().toISOString(),
      };
  }
}

export async function GET(req: Request) {
  const authError = await requireAuthenticatedAdminApi(req);
  if (authError) return authError;

  const content = await fetchAllAdminContent();
  return NextResponse.json(content, {
    status: 200,
    headers: ADMIN_SECURITY_HEADERS,
  });
}

export async function POST(req: Request) {
  const authError = await requireAuthenticatedAdminApi(req);
  if (authError) return authError;

  const adminSb = getSupabaseAdminClient();
  if (!adminSb) {
    return NextResponse.json(
      {
        error:
          'SUPABASE_SERVICE_ROLE_KEY is not configured on the server. Add it in Vercel Environment Variables to save edits.',
      },
      { status: 503, headers: ADMIN_SECURITY_HEADERS }
    );
  }

  let body: {
    table?: unknown;
    action?: unknown;
    id?: unknown;
    payload?: Record<string, unknown>;
  };

  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body.' },
      { status: 400, headers: ADMIN_SECURITY_HEADERS }
    );
  }

  const table = body.table as AllowedTable;
  if (!ALLOWED_TABLES.has(table)) {
    return NextResponse.json(
      { error: 'Invalid target table.' },
      { status: 400, headers: ADMIN_SECURITY_HEADERS }
    );
  }

  if (body.action === 'delete') {
    const id = typeof body.id === 'string' ? body.id.trim() : '';
    if (!id) {
      return NextResponse.json(
        { error: 'Record id is required for delete.' },
        { status: 400, headers: ADMIN_SECURITY_HEADERS }
      );
    }
    const { error } = await adminSb.from(table).delete().eq('id', id);
    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400, headers: ADMIN_SECURITY_HEADERS }
      );
    }
    return NextResponse.json(
      { ok: true, id },
      { status: 200, headers: ADMIN_SECURITY_HEADERS }
    );
  }

  if (
    body.action !== 'upsert' ||
    !body.payload ||
    typeof body.payload !== 'object'
  ) {
    return NextResponse.json(
      { error: 'Invalid action or payload.' },
      { status: 400, headers: ADMIN_SECURITY_HEADERS }
    );
  }

  const sanitized = sanitizePayload(table, body.payload);
  const recordId = typeof body.id === 'string' ? body.id.trim() : '';

  const { data, error } = recordId
    ? await adminSb
        .from(table)
        .update(sanitized)
        .eq('id', recordId)
        .select()
        .single()
    : await adminSb.from(table).insert(sanitized).select().single();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400, headers: ADMIN_SECURITY_HEADERS }
    );
  }

  return NextResponse.json(
    { ok: true, data },
    { status: 200, headers: ADMIN_SECURITY_HEADERS }
  );
}
