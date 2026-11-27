'use client';

import { useState, FormEvent } from 'react';
import { SiteProfile, RightNow } from '@/lib/types';
import MediaUploadField from './MediaUploadField';
import { ActionFeedback, adminUpsert } from './helpers';
import { Save, CheckCircle2, AlertCircle } from 'lucide-react';

interface ProfileEditorProps {
  initialProfile: SiteProfile;
  canEdit: boolean;
  onSaved: (next: SiteProfile) => void;
}

export function ProfileEditor({
  initialProfile,
  canEdit,
  onSaved,
}: ProfileEditorProps) {
  const [form, setForm] = useState<SiteProfile>(initialProfile);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<ActionFeedback | null>(null);

  const update = (key: keyof SiteProfile, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canEdit) return;
    setSaving(true);
    setFeedback(null);

    try {
      const res = await adminUpsert<SiteProfile>(
        'site_profile',
        form as unknown as Record<string, unknown>,
        form.id
      );

      if (res.error) {
        setFeedback({ type: 'err', text: res.error });
      } else if (res.data) {
        setForm(res.data);
        onSaved(res.data);
        setFeedback({ type: 'ok', text: 'Site profile saved cleanly.' });
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

  return (
    <form
      onSubmit={handleSubmit}
      aria-labelledby="profile-editor-heading"
      className="space-y-6"
    >
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h2
          id="profile-editor-heading"
          className="text-lg sm:text-xl font-bold text-[#1C1917] font-display"
        >
          Profile, Hero, Headings &amp; Footer Copy
        </h2>
        <button
          type="submit"
          disabled={!canEdit || saving}
          className="neo-btn inline-flex items-center gap-2 bg-[#C84B31] hover:bg-[#B03E26] disabled:opacity-50 text-white px-5 py-2.5 rounded-full text-sm font-semibold min-h-[48px]"
        >
          <Save className="w-4 h-4" aria-hidden="true" />
          <span>{saving ? 'Saving…' : 'Save Profile'}</span>
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

      <fieldset className="neo-card-static bg-white rounded-2xl p-5 sm:p-6 space-y-4">
        <legend className="text-sm font-bold uppercase tracking-wider text-[#1C1917] px-2">
          Identity &amp; Header Photo
        </legend>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="sp-name"
              className="block text-sm font-semibold text-[#1C1917] mb-1.5"
            >
              Full name <span aria-hidden="true">*</span>
            </label>
            <input
              id="sp-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              className="admin-input"
            />
          </div>

          <div>
            <label
              htmlFor="sp-nickname"
              className="block text-sm font-semibold text-[#1C1917] mb-1.5"
            >
              Nickname (shown on résumé &amp; copyright)
            </label>
            <input
              id="sp-nickname"
              name="nickname"
              type="text"
              value={form.nickname || ''}
              onChange={(e) => update('nickname', e.target.value)}
              className="admin-input"
            />
          </div>
        </div>

        <MediaUploadField
          id="sp-avatar-url"
          label="Header profile photo URL (round icon)"
          value={form.avatar_url || ''}
          onChange={(url) => update('avatar_url', url)}
          canUpload={canEdit}
          folder="avatars"
          helpText="Leave blank to show your initials cleanly inside the round header badge."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="sp-status-badge"
              className="block text-sm font-semibold text-[#1C1917] mb-1.5"
            >
              Availability pill in header
            </label>
            <input
              id="sp-status-badge"
              name="status_badge"
              type="text"
              value={form.status_badge}
              onChange={(e) => update('status_badge', e.target.value)}
              placeholder="Open to opportunities"
              className="admin-input"
            />
          </div>

          <div>
            <label
              htmlFor="sp-location"
              className="block text-sm font-semibold text-[#1C1917] mb-1.5"
            >
              Location (shown on résumé)
            </label>
            <input
              id="sp-location"
              name="location"
              type="text"
              value={form.location || ''}
              onChange={(e) => update('location', e.target.value)}
              placeholder="Kolkata, India"
              className="admin-input"
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="neo-card-static bg-white rounded-2xl p-5 sm:p-6 space-y-4">
        <legend className="text-sm font-bold uppercase tracking-wider text-[#1C1917] px-2">
          Hero Section &amp; Bio Summary
        </legend>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="sp-headline-intro"
              className="block text-sm font-semibold text-[#1C1917] mb-1.5"
            >
              Hero headline intro <span aria-hidden="true">*</span>
            </label>
            <input
              id="sp-headline-intro"
              name="headline_intro"
              type="text"
              required
              value={form.headline_intro}
              onChange={(e) => update('headline_intro', e.target.value)}
              className="admin-input"
            />
          </div>

          <div>
            <label
              htmlFor="sp-headline-highlight"
              className="block text-sm font-semibold text-[#1C1917] mb-1.5"
            >
              Role / headline subtitle
            </label>
            <input
              id="sp-headline-highlight"
              name="headline_highlight"
              type="text"
              value={form.headline_highlight}
              onChange={(e) => update('headline_highlight', e.target.value)}
              className="admin-input"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="sp-bio"
            className="block text-sm font-semibold text-[#1C1917] mb-1.5"
          >
            Bio / Résumé Summary <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="sp-bio"
            name="bio"
            required
            rows={4}
            value={form.bio}
            onChange={(e) => update('bio', e.target.value)}
            className="admin-input"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="sp-hero-primary"
              className="block text-sm font-semibold text-[#1C1917] mb-1.5"
            >
              Primary button label
            </label>
            <input
              id="sp-hero-primary"
              name="hero_primary_cta"
              type="text"
              value={form.hero_primary_cta || ''}
              onChange={(e) => update('hero_primary_cta', e.target.value)}
              className="admin-input"
            />
          </div>

          <div>
            <label
              htmlFor="sp-hero-secondary"
              className="block text-sm font-semibold text-[#1C1917] mb-1.5"
            >
              Secondary button label
            </label>
            <input
              id="sp-hero-secondary"
              name="hero_secondary_cta"
              type="text"
              value={form.hero_secondary_cta || ''}
              onChange={(e) => update('hero_secondary_cta', e.target.value)}
              className="admin-input"
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="neo-card-static bg-white rounded-2xl p-5 sm:p-6 space-y-4">
        <legend className="text-sm font-bold uppercase tracking-wider text-[#1C1917] px-2">
          Section Titles &amp; Footer Copy
        </legend>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="sp-exp-heading"
              className="block text-sm font-semibold text-[#1C1917] mb-1.5"
            >
              Experience section heading
            </label>
            <input
              id="sp-exp-heading"
              name="experience_heading"
              type="text"
              value={form.experience_heading || ''}
              onChange={(e) => update('experience_heading', e.target.value)}
              className="admin-input"
            />
          </div>

          <div>
            <label
              htmlFor="sp-stack-heading"
              className="block text-sm font-semibold text-[#1C1917] mb-1.5"
            >
              Stacks section heading
            </label>
            <input
              id="sp-stack-heading"
              name="stack_heading"
              type="text"
              value={form.stack_heading || ''}
              onChange={(e) => update('stack_heading', e.target.value)}
              className="admin-input"
            />
          </div>

          <div>
            <label
              htmlFor="sp-projects-heading"
              className="block text-sm font-semibold text-[#1C1917] mb-1.5"
            >
              Projects section heading
            </label>
            <input
              id="sp-projects-heading"
              name="projects_heading"
              type="text"
              value={form.projects_heading || ''}
              onChange={(e) => update('projects_heading', e.target.value)}
              className="admin-input"
            />
          </div>

          <div>
            <label
              htmlFor="sp-blog-heading"
              className="block text-sm font-semibold text-[#1C1917] mb-1.5"
            >
              Blog section heading
            </label>
            <input
              id="sp-blog-heading"
              name="blog_heading"
              type="text"
              value={form.blog_heading || ''}
              onChange={(e) => update('blog_heading', e.target.value)}
              className="admin-input"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="sp-projects-subtitle"
            className="block text-sm font-semibold text-[#1C1917] mb-1.5"
          >
            Projects section subtitle
          </label>
          <input
            id="sp-projects-subtitle"
            name="projects_subtitle"
            type="text"
            value={form.projects_subtitle || ''}
            onChange={(e) => update('projects_subtitle', e.target.value)}
            className="admin-input"
          />
        </div>

        <div>
          <label
            htmlFor="sp-blog-subtitle"
            className="block text-sm font-semibold text-[#1C1917] mb-1.5"
          >
            Blog page subtitle (/blog)
          </label>
          <input
            id="sp-blog-subtitle"
            name="blog_subtitle"
            type="text"
            value={form.blog_subtitle || ''}
            onChange={(e) => update('blog_subtitle', e.target.value)}
            className="admin-input"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="sp-footer-heading"
              className="block text-sm font-semibold text-[#1C1917] mb-1.5"
            >
              Footer heading
            </label>
            <input
              id="sp-footer-heading"
              name="footer_heading"
              type="text"
              value={form.footer_heading || ''}
              onChange={(e) => update('footer_heading', e.target.value)}
              className="admin-input"
            />
          </div>

          <div>
            <label
              htmlFor="sp-footer-tagline"
              className="block text-sm font-semibold text-[#1C1917] mb-1.5"
            >
              Footer tagline <span aria-hidden="true">*</span>
            </label>
            <input
              id="sp-footer-tagline"
              name="footer_tagline"
              type="text"
              required
              value={form.footer_tagline}
              onChange={(e) => update('footer_tagline', e.target.value)}
              className="admin-input"
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="neo-card-static bg-white rounded-2xl p-5 sm:p-6 space-y-4">
        <legend className="text-sm font-bold uppercase tracking-wider text-[#1C1917] px-2">
          Contact, Social Links &amp; Résumé
        </legend>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="sp-email"
              className="block text-sm font-semibold text-[#1C1917] mb-1.5"
            >
              Contact email <span aria-hidden="true">*</span>
            </label>
            <input
              id="sp-email"
              name="email"
              type="email"
              autoComplete="email"
              spellCheck={false}
              required
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              className="admin-input"
            />
          </div>

          <div>
            <label
              htmlFor="sp-phone"
              className="block text-sm font-semibold text-[#1C1917] mb-1.5"
            >
              Phone (shown on résumé)
            </label>
            <input
              id="sp-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={form.phone || ''}
              onChange={(e) => update('phone', e.target.value)}
              className="admin-input"
            />
          </div>

          <div>
            <label
              htmlFor="sp-website"
              className="block text-sm font-semibold text-[#1C1917] mb-1.5"
            >
              Portfolio URL
            </label>
            <input
              id="sp-website"
              name="website_url"
              type="url"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              value={form.website_url || ''}
              onChange={(e) => update('website_url', e.target.value)}
              className="admin-input"
            />
          </div>

          <div>
            <label
              htmlFor="sp-linkedin"
              className="block text-sm font-semibold text-[#1C1917] mb-1.5"
            >
              LinkedIn URL
            </label>
            <input
              id="sp-linkedin"
              name="linkedin_url"
              type="url"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              value={form.linkedin_url}
              onChange={(e) => update('linkedin_url', e.target.value)}
              className="admin-input"
            />
          </div>

          <div>
            <label
              htmlFor="sp-github"
              className="block text-sm font-semibold text-[#1C1917] mb-1.5"
            >
              GitHub URL
            </label>
            <input
              id="sp-github"
              name="github_url"
              type="url"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              value={form.github_url}
              onChange={(e) => update('github_url', e.target.value)}
              className="admin-input"
            />
          </div>

          <div>
            <label
              htmlFor="sp-twitter"
              className="block text-sm font-semibold text-[#1C1917] mb-1.5"
            >
              X / Twitter URL
            </label>
            <input
              id="sp-twitter"
              name="twitter_url"
              type="url"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              value={form.twitter_url}
              onChange={(e) => update('twitter_url', e.target.value)}
              className="admin-input"
            />
          </div>
        </div>

        <MediaUploadField
          id="sp-resume-url"
          label="External Résumé PDF URL (set to # to use built-in /resume page)"
          value={form.resume_url || '#'}
          onChange={(url) => update('resume_url', url)}
          canUpload={canEdit}
          folder="documents"
          accept=".pdf,application/pdf"
          placeholder="#"
          helpText="Keep '#' to route visitors to your live Supabase-powered /resume page."
        />
      </fieldset>
    </form>
  );
}

interface RightNowEditorProps {
  initialRightNow: RightNow;
  canEdit: boolean;
  onSaved: (next: RightNow) => void;
}

export function RightNowEditor({
  initialRightNow,
  canEdit,
  onSaved,
}: RightNowEditorProps) {
  const [form, setForm] = useState<RightNow>(initialRightNow);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<ActionFeedback | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canEdit) return;
    setSaving(true);
    setFeedback(null);

    try {
      const res = await adminUpsert<RightNow>(
        'right_now',
        form as unknown as Record<string, unknown>,
        form.id
      );
      if (res.error) {
        setFeedback({ type: 'err', text: res.error });
      } else if (res.data) {
        setForm(res.data);
        onSaved(res.data);
        setFeedback({ type: 'ok', text: 'Right Now card updated.' });
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

  return (
    <form
      onSubmit={handleSubmit}
      aria-labelledby="rn-editor-heading"
      className="neo-card-static bg-white rounded-2xl p-5 sm:p-6 space-y-5 max-w-3xl"
    >
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h2
          id="rn-editor-heading"
          className="text-lg sm:text-xl font-bold text-[#1C1917] font-display"
        >
          Right Now Status Card
        </h2>
        <button
          type="submit"
          disabled={!canEdit || saving}
          className="neo-btn inline-flex items-center gap-2 bg-[#C84B31] hover:bg-[#B03E26] disabled:opacity-50 text-white px-5 py-2.5 rounded-full text-sm font-semibold min-h-[48px]"
        >
          <Save className="w-4 h-4" aria-hidden="true" />
          <span>{saving ? 'Saving…' : 'Save Right Now'}</span>
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

      <div>
        <label
          htmlFor="rn-card-title"
          className="block text-sm font-semibold text-[#1C1917] mb-1.5"
        >
          Card heading
        </label>
        <input
          id="rn-card-title"
          name="card_title"
          type="text"
          value={form.card_title || 'Right now'}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, card_title: e.target.value }))
          }
          className="admin-input"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="rn-building-title"
            className="block text-sm font-semibold text-[#1C1917] mb-1.5"
          >
            Building (title) <span aria-hidden="true">*</span>
          </label>
          <input
            id="rn-building-title"
            name="building_title"
            type="text"
            required
            value={form.building_title}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, building_title: e.target.value }))
            }
            className="admin-input"
          />
        </div>

        <div>
          <label
            htmlFor="rn-based-in"
            className="block text-sm font-semibold text-[#1C1917] mb-1.5"
          >
            Based in <span aria-hidden="true">*</span>
          </label>
          <input
            id="rn-based-in"
            name="based_in"
            type="text"
            required
            value={form.based_in}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, based_in: e.target.value }))
            }
            className="admin-input"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="rn-building-desc"
          className="block text-sm font-semibold text-[#1C1917] mb-1.5"
        >
          Building (description) <span aria-hidden="true">*</span>
        </label>
        <input
          id="rn-building-desc"
          name="building_desc"
          type="text"
          required
          value={form.building_desc}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, building_desc: e.target.value }))
          }
          className="admin-input"
        />
      </div>

      <div>
        <label
          htmlFor="rn-learning"
          className="block text-sm font-semibold text-[#1C1917] mb-1.5"
        >
          Learning <span aria-hidden="true">*</span>
        </label>
        <input
          id="rn-learning"
          name="learning"
          type="text"
          required
          value={form.learning}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, learning: e.target.value }))
          }
          className="admin-input"
        />
      </div>

      <div>
        <label
          htmlFor="rn-current-projects"
          className="block text-sm font-semibold text-[#1C1917] mb-1.5"
        >
          Current projects
        </label>
        <input
          id="rn-current-projects"
          name="current_projects"
          type="text"
          value={form.current_projects || ''}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, current_projects: e.target.value }))
          }
          className="admin-input"
        />
      </div>
    </form>
  );
}
