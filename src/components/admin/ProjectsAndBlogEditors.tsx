'use client';

import { useState, useRef, FormEvent, ChangeEvent } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import { Project, BlogPost } from '@/lib/types';
import MediaUploadField from './MediaUploadField';
import {
  ActionFeedback,
  slugify,
  parseCommaList,
  parseLineList,
} from './helpers';
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  CheckCircle2,
  AlertCircle,
  X,
  ImagePlus,
  ExternalLink,
} from 'lucide-react';

interface ProjectsEditorProps {
  projects: Project[];
  supabaseClient: SupabaseClient | null;
  canEdit: boolean;
  onChange: (next: Project[]) => void;
}

const EMPTY_PROJECT: Project = {
  slug: '',
  title: '',
  description: '',
  content: '',
  client: '',
  role: '',
  duration: '',
  completion_date: '',
  made_by: 'Made by me',
  image_url: '',
  screenshots: [],
  metrics: [],
  tags: [],
  color: 'yellow',
  live_url: '',
  featured: true,
  order_index: 1,
};

const PROJECT_COLORS = [
  { id: 'yellow', label: 'Warm Cream' },
  { id: 'mint', label: 'Muted Sage' },
  { id: 'purple', label: 'Soft Lavender' },
];

export function ProjectsEditor({
  projects,
  supabaseClient,
  canEdit,
  onChange,
}: ProjectsEditorProps) {
  const [editing, setEditing] = useState<Project | null>(null);
  const [tagsText, setTagsText] = useState('');
  const [metricsText, setMetricsText] = useState('');
  const [screenshotsText, setScreenshotsText] = useState('');
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<ActionFeedback | null>(null);
  const inlineShotInputRef = useRef<HTMLInputElement | null>(null);

  const openEditor = (p: Project) => {
    setEditing(p);
    setTagsText((p.tags || []).join(', '));
    setMetricsText((p.metrics || []).join(', '));
    setScreenshotsText((p.screenshots || []).join('\n'));
  };

  const handleUploadInlineScreenshot = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !supabaseClient || !editing) return;
    setFeedback(null);
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const path = `projects/screenshots/${Date.now()}-${safeName}`;
    const { error } = await supabaseClient.storage
      .from('portfolio-media')
      .upload(path, file, { upsert: true });

    if (error) {
      setFeedback({ type: 'err', text: `Upload failed: ${error.message}` });
    } else {
      const { data } = supabaseClient.storage
        .from('portfolio-media')
        .getPublicUrl(path);
      const url = data.publicUrl;
      setScreenshotsText((prev) => (prev.trim() ? `${prev.trim()}\n${url}` : url));
      setEditing((prev) =>
        prev
          ? {
              ...prev,
              content: `${prev.content.trimEnd()}\n\n![Project screenshot](${url})\n`,
            }
          : prev
      );
      setFeedback({
        type: 'ok',
        text: 'Screenshot uploaded and added to gallery + Markdown content.',
      });
    }
    if (inlineShotInputRef.current) inlineShotInputRef.current.value = '';
  };

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!supabaseClient || !canEdit || !editing) return;
    setSaving(true);
    setFeedback(null);

    try {
      const cleanSlug =
        editing.slug.trim() || slugify(editing.title) || `project-${Date.now()}`;
      const payload = {
        title: editing.title.trim(),
        slug: cleanSlug,
        description: editing.description.trim(),
        content: editing.content.trim() || `# ${editing.title.trim()}\n`,
        client: (editing.client || '').trim(),
        role: (editing.role || '').trim(),
        duration: (editing.duration || editing.completion_date || '').trim(),
        completion_date: (editing.completion_date || '').trim(),
        made_by: (editing.made_by || 'Made by me').trim(),
        image_url: (editing.image_url || '').trim(),
        screenshots: parseLineList(screenshotsText),
        metrics: parseCommaList(metricsText),
        tags: parseCommaList(tagsText),
        color: editing.color || 'yellow',
        live_url: (editing.live_url || '').trim(),
        featured: editing.featured ?? true,
        order_index: Number(editing.order_index) || 0,
      };

      const { data, error } = editing.id
        ? await supabaseClient
            .from('projects')
            .update(payload)
            .eq('id', editing.id)
            .select()
            .single()
        : await supabaseClient
            .from('projects')
            .insert(payload)
            .select()
            .single();

      if (error) {
        setFeedback({ type: 'err', text: error.message });
      } else if (data) {
        const saved = data as Project;
        const nextList = editing.id
          ? projects.map((item) => (item.id === saved.id ? saved : item))
          : [...projects.filter((item) => item.id), saved];
        nextList.sort((a, b) => a.order_index - b.order_index);
        onChange(nextList);
        setEditing(null);
        setFeedback({
          type: 'ok',
          text: `Project "${saved.title}" saved cleanly.`,
        });
      }
    } catch (err) {
      setFeedback({
        type: 'err',
        text: err instanceof Error ? err.message : 'Save failed.',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!supabaseClient || !canEdit || !id) return;
    if (!window.confirm('Delete this project?')) return;
    const { error } = await supabaseClient.from('projects').delete().eq('id', id);
    if (error) {
      setFeedback({ type: 'err', text: error.message });
    } else {
      onChange(projects.filter((p) => p.id !== id));
      setFeedback({ type: 'ok', text: 'Project deleted.' });
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#1C1917] font-display">
            My Projects &amp; Write-Ups
          </h2>
          <p className="text-xs text-[#57534E]">
            Manage project name, completion date, &quot;Made by me&quot; tag, thumbnail, screenshots gallery, and Markdown story.
          </p>
        </div>
        <button
          type="button"
          disabled={!canEdit}
          onClick={() =>
            openEditor({
              ...EMPTY_PROJECT,
              order_index: projects.length + 1,
            })
          }
          className="neo-btn inline-flex items-center gap-1.5 bg-[#C84B31] hover:bg-[#B03E26] disabled:opacity-50 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-semibold min-h-[44px]"
        >
          <Plus className="w-4 h-4" aria-hidden="true" />
          <span>Add Project</span>
        </button>
      </div>

      {feedback && (
        <div
          role="status"
          aria-live="polite"
          className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium ${
            feedback.type === 'ok'
              ? 'bg-[#EDF4EF] border-[#1E5631]/30 text-[#1E5631]'
              : 'bg-red-50 border-red-300 text-red-900'
          }`}
        >
          {feedback.type === 'ok' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      {editing && (
        <form
          onSubmit={handleSave}
          className="neo-card-static bg-[#FBF9F5] rounded-2xl p-5 sm:p-6 space-y-5"
        >
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-bold text-base sm:text-lg text-[#1C1917]">
              {editing.id ? `Editing: ${editing.title}` : 'New Project'}
            </h3>
            <button
              type="button"
              onClick={() => setEditing(null)}
              aria-label="Cancel editing project"
              className="p-2 rounded-lg hover:bg-white text-[#57534E]"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="proj-title"
                className="block text-sm font-semibold text-[#1C1917] mb-1.5"
              >
                Project name <span aria-hidden="true">*</span>
              </label>
              <input
                id="proj-title"
                name="title"
                type="text"
                required
                value={editing.title}
                onChange={(e) => {
                  const val = e.target.value;
                  setEditing((prev) =>
                    prev
                      ? {
                          ...prev,
                          title: val,
                          slug: prev.id ? prev.slug : slugify(val),
                        }
                      : prev
                  );
                }}
                className="admin-input"
              />
            </div>

            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <label
                  htmlFor="proj-slug"
                  className="block text-sm font-semibold text-[#1C1917]"
                >
                  URL slug <span aria-hidden="true">*</span>
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setEditing({ ...editing, slug: slugify(editing.title) })
                  }
                  className="text-xs font-semibold text-[#A93B24] hover:underline"
                >
                  Generate from title
                </button>
              </div>
              <input
                id="proj-slug"
                name="slug"
                type="text"
                required
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                value={editing.slug}
                onChange={(e) =>
                  setEditing({ ...editing, slug: slugify(e.target.value) })
                }
                className="admin-input"
              />
            </div>

            <div>
              <label
                htmlFor="proj-date"
                className="block text-sm font-semibold text-[#1C1917] mb-1.5"
              >
                Completion date
              </label>
              <input
                id="proj-date"
                name="completion_date"
                type="text"
                placeholder="Nov 2026"
                value={editing.completion_date || ''}
                onChange={(e) =>
                  setEditing({ ...editing, completion_date: e.target.value })
                }
                className="admin-input"
              />
            </div>

            <div>
              <label
                htmlFor="proj-madeby"
                className="block text-sm font-semibold text-[#1C1917] mb-1.5"
              >
                Attribution tag (e.g. Made by me)
              </label>
              <input
                id="proj-madeby"
                name="made_by"
                type="text"
                value={editing.made_by || 'Made by me'}
                onChange={(e) =>
                  setEditing({ ...editing, made_by: e.target.value })
                }
                className="admin-input"
              />
            </div>

            <div>
              <label
                htmlFor="proj-client"
                className="block text-sm font-semibold text-[#1C1917] mb-1.5"
              >
                Client / Label (shown on card header)
              </label>
              <input
                id="proj-client"
                name="client"
                type="text"
                value={editing.client || ''}
                onChange={(e) =>
                  setEditing({ ...editing, client: e.target.value })
                }
                className="admin-input"
              />
            </div>

            <div>
              <label
                htmlFor="proj-order"
                className="block text-sm font-semibold text-[#1C1917] mb-1.5"
              >
                Display order
              </label>
              <input
                id="proj-order"
                name="order_index"
                type="text"
                inputMode="numeric"
                value={String(editing.order_index)}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    order_index: parseInt(e.target.value || '0', 10) || 0,
                  })
                }
                className="admin-input"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="proj-desc"
              className="block text-sm font-semibold text-[#1C1917] mb-1.5"
            >
              Short card summary <span aria-hidden="true">*</span>
            </label>
            <textarea
              id="proj-desc"
              name="description"
              required
              rows={2}
              value={editing.description}
              onChange={(e) =>
                setEditing({ ...editing, description: e.target.value })
              }
              className="admin-input"
            />
          </div>

          <MediaUploadField
            id="proj-image-url"
            label="Thumbnail image URL"
            value={editing.image_url || ''}
            onChange={(url) => setEditing({ ...editing, image_url: url })}
            supabaseClient={supabaseClient}
            canUpload={canEdit}
            folder="projects"
            helpText="Appears on the project card and right below the project title."
          />

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <label
                htmlFor="proj-content"
                className="block text-sm font-semibold text-[#1C1917]"
              >
                How I completed this project (Markdown write-up){' '}
                <span aria-hidden="true">*</span>
              </label>
              {canEdit && supabaseClient && (
                <>
                  <input
                    ref={inlineShotInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleUploadInlineScreenshot}
                    className="sr-only"
                    tabIndex={-1}
                    aria-hidden="true"
                  />
                  <button
                    type="button"
                    onClick={() => inlineShotInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EDF4EF] border border-[#1E5631]/25 text-xs font-semibold text-[#1E5631] hover:bg-[#E1EFE4]"
                  >
                    <ImagePlus className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Upload &amp; Add Screenshot</span>
                  </button>
                </>
              )}
            </div>
            <textarea
              id="proj-content"
              name="content"
              required
              rows={9}
              value={editing.content}
              onChange={(e) =>
                setEditing({ ...editing, content: e.target.value })
              }
              className="admin-input font-mono text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="proj-screenshots"
              className="block text-sm font-semibold text-[#1C1917] mb-1.5"
            >
              Screenshots gallery URLs (one URL per line)
            </label>
            <textarea
              id="proj-screenshots"
              name="screenshots"
              rows={3}
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              value={screenshotsText}
              onChange={(e) => setScreenshotsText(e.target.value)}
              placeholder="https://.../screenshot-1.png"
              className="admin-input"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="proj-tags"
                className="block text-sm font-semibold text-[#1C1917] mb-1.5"
              >
                Tools &amp; tags (comma-separated)
              </label>
              <input
                id="proj-tags"
                name="tags"
                type="text"
                value={tagsText}
                onChange={(e) => setTagsText(e.target.value)}
                placeholder="Google Ads, Meta Ads, GA4"
                className="admin-input"
              />
            </div>

            <div>
              <label
                htmlFor="proj-metrics"
                className="block text-sm font-semibold text-[#1C1917] mb-1.5"
              >
                Card highlight badges (comma-separated, max 2 shown)
              </label>
              <input
                id="proj-metrics"
                name="metrics"
                type="text"
                value={metricsText}
                onChange={(e) => setMetricsText(e.target.value)}
                placeholder="3x ROAS, 30% Lower CPC"
                className="admin-input"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div>
              <label
                htmlFor="proj-live-url"
                className="block text-sm font-semibold text-[#1C1917] mb-1.5"
              >
                Optional external live link URL
              </label>
              <input
                id="proj-live-url"
                name="live_url"
                type="url"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                value={editing.live_url || ''}
                onChange={(e) =>
                  setEditing({ ...editing, live_url: e.target.value })
                }
                className="admin-input"
              />
            </div>

            <fieldset className="space-y-1.5">
              <legend className="text-sm font-semibold text-[#1C1917]">
                Card banner accent
              </legend>
              <div className="flex flex-wrap gap-4 pt-1">
                {PROJECT_COLORS.map((c) => (
                  <label
                    key={c.id}
                    className="inline-flex items-center gap-2 text-sm text-[#1C1917] cursor-pointer py-1"
                  >
                    <input
                      type="radio"
                      name="project_color"
                      value={c.id}
                      checked={editing.color === c.id}
                      onChange={() => setEditing({ ...editing, color: c.id })}
                      className="w-4 h-4 accent-[#C84B31]"
                    />
                    <span>{c.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="neo-btn inline-flex items-center gap-2 bg-[#C84B31] hover:bg-[#B03E26] text-white px-6 py-2.5 rounded-full text-sm font-semibold min-h-[48px]"
          >
            <Save className="w-4 h-4" aria-hidden="true" />
            <span>{saving ? 'Saving…' : 'Save Project'}</span>
          </button>
        </form>
      )}

      <div className="space-y-3">
        {projects.map((p, idx) => (
          <div
            key={p.id || p.slug || idx}
            className="neo-card-static bg-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1 min-w-0">
              <p className="font-bold text-sm sm:text-base text-[#1C1917]">
                {p.title}{' '}
                <span className="font-normal text-xs text-[#78716C]">
                  (#{p.order_index})
                </span>
              </p>
              <p className="text-xs text-[#57534E]">
                {p.completion_date || p.duration || 'Completed'} •{' '}
                {p.made_by || 'Made by me'} • <code>/projects/{p.slug}</code>
              </p>
              <p className="text-xs text-[#57534E]">{p.description}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={`/projects/${p.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Preview ${p.title}`}
                className="inline-flex items-center justify-center p-2 rounded-lg border border-[#1C1917]/20 bg-white hover:bg-[#F5F2EB] text-[#57534E] min-h-[40px] min-w-[40px]"
              >
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
              <button
                type="button"
                disabled={!canEdit}
                onClick={() => openEditor(p)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#1C1917]/20 bg-[#FBF9F5] hover:bg-[#F5F2EB] text-xs font-semibold text-[#1C1917] disabled:opacity-50 min-h-[40px]"
              >
                <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Edit</span>
              </button>
              {p.id && (
                <button
                  type="button"
                  disabled={!canEdit}
                  onClick={() => handleDelete(p.id)}
                  aria-label={`Delete ${p.title}`}
                  className="inline-flex items-center justify-center p-2 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 disabled:opacity-50 min-h-[40px] min-w-[40px]"
                >
                  <Trash2 className="w-4 h-4" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface BlogEditorProps {
  posts: BlogPost[];
  supabaseClient: SupabaseClient | null;
  canEdit: boolean;
  onChange: (next: BlogPost[]) => void;
}

const getTodayIso = () => new Date().toISOString().slice(0, 10);

export function BlogEditor({
  posts,
  supabaseClient,
  canEdit,
  onChange,
}: BlogEditorProps) {
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<ActionFeedback | null>(null);
  const inlineImgRef = useRef<HTMLInputElement | null>(null);

  const handleUploadInlineImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !supabaseClient || !editing) return;
    setFeedback(null);
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const path = `posts/inline/${Date.now()}-${safeName}`;
    const { error } = await supabaseClient.storage
      .from('portfolio-media')
      .upload(path, file, { upsert: true });
    if (error) {
      setFeedback({ type: 'err', text: `Upload failed: ${error.message}` });
    } else {
      const { data } = supabaseClient.storage
        .from('portfolio-media')
        .getPublicUrl(path);
      setEditing((prev) =>
        prev
          ? {
              ...prev,
              content: `${prev.content.trimEnd()}\n\n![Article image](${data.publicUrl})\n`,
            }
          : prev
      );
      setFeedback({
        type: 'ok',
        text: 'Image uploaded and inserted into article Markdown.',
      });
    }
    if (inlineImgRef.current) inlineImgRef.current.value = '';
  };

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!supabaseClient || !canEdit || !editing) return;
    setSaving(true);
    setFeedback(null);

    try {
      const cleanSlug =
        editing.slug.trim() || slugify(editing.title) || `post-${Date.now()}`;
      const payload = {
        title: editing.title.trim(),
        slug: cleanSlug,
        excerpt: editing.excerpt.trim(),
        content: editing.content.trim() || `# ${editing.title.trim()}\n`,
        read_time: editing.read_time.trim() || '4 min read',
        published_at: editing.published_at || getTodayIso(),
        published: Boolean(editing.published),
        cover_image: (editing.cover_image || '').trim(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = editing.id
        ? await supabaseClient
            .from('posts')
            .update(payload)
            .eq('id', editing.id)
            .select()
            .single()
        : await supabaseClient
            .from('posts')
            .insert(payload)
            .select()
            .single();

      if (error) {
        setFeedback({ type: 'err', text: error.message });
      } else if (data) {
        const saved = data as BlogPost;
        const nextList = editing.id
          ? posts.map((item) => (item.id === saved.id ? saved : item))
          : [saved, ...posts.filter((item) => item.id)];
        nextList.sort((a, b) =>
          (b.published_at || '').localeCompare(a.published_at || '')
        );
        onChange(nextList);
        setEditing(null);
        setFeedback({
          type: 'ok',
          text: `Blog post "${saved.title}" saved.`,
        });
      }
    } catch (err) {
      setFeedback({
        type: 'err',
        text: err instanceof Error ? err.message : 'Save failed.',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!supabaseClient || !canEdit || !id) return;
    if (!window.confirm('Delete this blog post?')) return;
    const { error } = await supabaseClient.from('posts').delete().eq('id', id);
    if (error) {
      setFeedback({ type: 'err', text: error.message });
    } else {
      onChange(posts.filter((p) => p.id !== id));
      setFeedback({ type: 'ok', text: 'Blog post deleted.' });
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#1C1917] font-display">
            Blog Posts &amp; Drafts
          </h2>
          <p className="text-xs text-[#57534E]">
            Write Markdown articles, attach cover images, or save drafts (`published = false`) before going live.
          </p>
        </div>
        <button
          type="button"
          disabled={!canEdit}
          onClick={() =>
            setEditing({
              title: '',
              slug: '',
              excerpt: '',
              content: '',
              read_time: '4 min read',
              published_at: getTodayIso(),
              published: true,
              cover_image: '',
            })
          }
          className="neo-btn inline-flex items-center gap-1.5 bg-[#C84B31] hover:bg-[#B03E26] disabled:opacity-50 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-semibold min-h-[44px]"
        >
          <Plus className="w-4 h-4" aria-hidden="true" />
          <span>New Blog Post</span>
        </button>
      </div>

      {feedback && (
        <div
          role="status"
          aria-live="polite"
          className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium ${
            feedback.type === 'ok'
              ? 'bg-[#EDF4EF] border-[#1E5631]/30 text-[#1E5631]'
              : 'bg-red-50 border-red-300 text-red-900'
          }`}
        >
          {feedback.type === 'ok' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      {editing && (
        <form
          onSubmit={handleSave}
          className="neo-card-static bg-[#FBF9F5] rounded-2xl p-5 sm:p-6 space-y-5"
        >
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-bold text-base sm:text-lg text-[#1C1917]">
              {editing.id ? `Editing: ${editing.title}` : 'New Blog Post'}
            </h3>
            <button
              type="button"
              onClick={() => setEditing(null)}
              aria-label="Cancel editing blog post"
              className="p-2 rounded-lg hover:bg-white text-[#57534E]"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="post-title"
                className="block text-sm font-semibold text-[#1C1917] mb-1.5"
              >
                Article title <span aria-hidden="true">*</span>
              </label>
              <input
                id="post-title"
                name="title"
                type="text"
                required
                value={editing.title}
                onChange={(e) => {
                  const val = e.target.value;
                  setEditing((prev) =>
                    prev
                      ? {
                          ...prev,
                          title: val,
                          slug: prev.id ? prev.slug : slugify(val),
                        }
                      : prev
                  );
                }}
                className="admin-input"
              />
            </div>

            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <label
                  htmlFor="post-slug"
                  className="block text-sm font-semibold text-[#1C1917]"
                >
                  URL slug <span aria-hidden="true">*</span>
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setEditing({ ...editing, slug: slugify(editing.title) })
                  }
                  className="text-xs font-semibold text-[#A93B24] hover:underline"
                >
                  Generate from title
                </button>
              </div>
              <input
                id="post-slug"
                name="slug"
                type="text"
                required
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                value={editing.slug}
                onChange={(e) =>
                  setEditing({ ...editing, slug: slugify(e.target.value) })
                }
                className="admin-input"
              />
            </div>

            <div>
              <label
                htmlFor="post-date"
                className="block text-sm font-semibold text-[#1C1917] mb-1.5"
              >
                Publish date <span aria-hidden="true">*</span>
              </label>
              <input
                id="post-date"
                name="published_at"
                type="date"
                required
                value={editing.published_at}
                onChange={(e) =>
                  setEditing({ ...editing, published_at: e.target.value })
                }
                className="admin-input"
              />
            </div>

            <div>
              <label
                htmlFor="post-readtime"
                className="block text-sm font-semibold text-[#1C1917] mb-1.5"
              >
                Read time
              </label>
              <input
                id="post-readtime"
                name="read_time"
                type="text"
                value={editing.read_time}
                onChange={(e) =>
                  setEditing({ ...editing, read_time: e.target.value })
                }
                placeholder="4 min read"
                className="admin-input"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="post-excerpt"
              className="block text-sm font-semibold text-[#1C1917] mb-1.5"
            >
              Short excerpt <span aria-hidden="true">*</span>
            </label>
            <textarea
              id="post-excerpt"
              name="excerpt"
              required
              rows={2}
              value={editing.excerpt}
              onChange={(e) =>
                setEditing({ ...editing, excerpt: e.target.value })
              }
              className="admin-input"
            />
          </div>

          <MediaUploadField
            id="post-cover-image"
            label="Cover image URL (optional)"
            value={editing.cover_image || ''}
            onChange={(url) => setEditing({ ...editing, cover_image: url })}
            supabaseClient={supabaseClient}
            canUpload={canEdit}
            folder="posts"
          />

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <label
                htmlFor="post-content"
                className="block text-sm font-semibold text-[#1C1917]"
              >
                Article body (Markdown) <span aria-hidden="true">*</span>
              </label>
              {canEdit && supabaseClient && (
                <>
                  <input
                    ref={inlineImgRef}
                    type="file"
                    accept="image/*"
                    onChange={handleUploadInlineImage}
                    className="sr-only"
                    tabIndex={-1}
                    aria-hidden="true"
                  />
                  <button
                    type="button"
                    onClick={() => inlineImgRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EDF4EF] border border-[#1E5631]/25 text-xs font-semibold text-[#1E5631] hover:bg-[#E1EFE4]"
                  >
                    <ImagePlus className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Upload &amp; Insert Image</span>
                  </button>
                </>
              )}
            </div>
            <textarea
              id="post-content"
              name="content"
              required
              rows={10}
              value={editing.content}
              onChange={(e) =>
                setEditing({ ...editing, content: e.target.value })
              }
              className="admin-input font-mono text-sm"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              id="post-published"
              name="published"
              type="checkbox"
              checked={editing.published}
              onChange={(e) =>
                setEditing({ ...editing, published: e.target.checked })
              }
              className="w-5 h-5 accent-[#C84B31] cursor-pointer"
            />
            <label
              htmlFor="post-published"
              className="text-sm font-semibold text-[#1C1917] cursor-pointer py-1"
            >
              Published on live website (uncheck to save as Draft)
            </label>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="neo-btn inline-flex items-center gap-2 bg-[#C84B31] hover:bg-[#B03E26] text-white px-6 py-2.5 rounded-full text-sm font-semibold min-h-[48px]"
          >
            <Save className="w-4 h-4" aria-hidden="true" />
            <span>{saving ? 'Saving…' : 'Save Article'}</span>
          </button>
        </form>
      )}

      <div className="space-y-3">
        {posts.map((post, idx) => (
          <div
            key={post.id || post.slug || idx}
            className="neo-card-static bg-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-bold text-sm sm:text-base text-[#1C1917]">
                  {post.title}
                </p>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                    post.published
                      ? 'bg-[#E4F1E7] border-[#1E5631]/25 text-[#1E5631]'
                      : 'bg-amber-50 border-amber-300 text-amber-900'
                  }`}
                >
                  {post.published ? 'Published' : 'Draft'}
                </span>
              </div>
              <p className="text-xs text-[#57534E]">
                {post.published_at} • {post.read_time} • <code>/blog/{post.slug}</code>
              </p>
              <p className="text-xs text-[#57534E]">{post.excerpt}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {post.published && (
                <a
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Preview ${post.title}`}
                  className="inline-flex items-center justify-center p-2 rounded-lg border border-[#1C1917]/20 bg-white hover:bg-[#F5F2EB] text-[#57534E] min-h-[40px] min-w-[40px]"
                >
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>
              )}
              <button
                type="button"
                disabled={!canEdit}
                onClick={() => setEditing(post)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#1C1917]/20 bg-[#FBF9F5] hover:bg-[#F5F2EB] text-xs font-semibold text-[#1C1917] disabled:opacity-50 min-h-[40px]"
              >
                <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Edit</span>
              </button>
              {post.id && (
                <button
                  type="button"
                  disabled={!canEdit}
                  onClick={() => handleDelete(post.id)}
                  aria-label={`Delete ${post.title}`}
                  className="inline-flex items-center justify-center p-2 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 disabled:opacity-50 min-h-[40px] min-w-[40px]"
                >
                  <Trash2 className="w-4 h-4" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
