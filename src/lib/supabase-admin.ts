import { createClient } from '@supabase/supabase-js';
import {
  getEducation,
  getExperiences,
  getPosts,
  getProfile,
  getProjects,
  getRightNow,
  getSupabaseDiagnostics,
  getTechStack,
  normalizePost,
  normalizeProfile,
  normalizeProject,
} from './data';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  '';

const serviceRoleKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();

export function isServiceRoleConfigured(): boolean {
  return Boolean(
    supabaseUrl &&
      supabaseUrl.startsWith('http') &&
      serviceRoleKey
  );
}

export function getSupabaseAdminClient() {
  if (!isServiceRoleConfigured()) return null;
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      fetch: (input, init) =>
        fetch(input, {
          ...init,
          cache: 'no-store',
        }),
    },
  });
}

export async function getProtectedAdminDiagnostics() {
  const base = await getSupabaseDiagnostics();
  return {
    ...base,
    hasServiceRoleKey: isServiceRoleConfigured(),
    hasSessionSecret: Boolean((process.env.ADMIN_SESSION_SECRET || '').trim()),
  };
}

export async function fetchAllAdminContent() {
  const [fbProfile, fbRightNow, fbExps, fbEdu, fbStack, fbProjects, fbPosts] =
    await Promise.all([
      getProfile(),
      getRightNow(),
      getExperiences(),
      getEducation(),
      getTechStack(),
      getProjects(),
      getPosts(),
    ]);

  const adminSb = getSupabaseAdminClient();
  if (!adminSb) {
    return {
      profile: fbProfile,
      rightNow: fbRightNow,
      experiences: fbExps,
      education: fbEdu,
      techStack: fbStack,
      projects: fbProjects,
      posts: fbPosts,
    };
  }

  const [pRes, rnRes, expRes, eduRes, stackRes, projRes, postRes] =
    await Promise.all([
      adminSb
        .from('site_profile')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle(),
      adminSb
        .from('right_now')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle(),
      adminSb
        .from('experiences')
        .select('*')
        .order('order_index', { ascending: true }),
      adminSb
        .from('education')
        .select('*')
        .order('order_index', { ascending: true }),
      adminSb
        .from('tech_stack')
        .select('*')
        .order('order_index', { ascending: true }),
      adminSb
        .from('projects')
        .select('*')
        .order('order_index', { ascending: true }),
      adminSb
        .from('posts')
        .select('*')
        .order('published_at', { ascending: false }),
    ]);

  return {
    profile: pRes.data
      ? normalizeProfile(pRes.data as Record<string, unknown>)
      : fbProfile,
    rightNow: rnRes.data || fbRightNow,
    experiences: expRes.data && expRes.data.length > 0 ? expRes.data : fbExps,
    education: eduRes.data && eduRes.data.length > 0 ? eduRes.data : fbEdu,
    techStack:
      stackRes.data && stackRes.data.length > 0 ? stackRes.data : fbStack,
    projects:
      projRes.data && projRes.data.length > 0
        ? projRes.data.map((r) => normalizeProject(r as Record<string, unknown>))
        : fbProjects,
    posts:
      postRes.data && postRes.data.length > 0
        ? postRes.data.map((r) => normalizePost(r as Record<string, unknown>))
        : fbPosts,
  };
}
