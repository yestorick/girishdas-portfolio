'use client';

import { useState, FormEvent } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import { Experience, Education, TechStackGroup } from '@/lib/types';
import { ActionFeedback, parseCommaList } from './helpers';
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  CheckCircle2,
  AlertCircle,
  X,
} from 'lucide-react';

interface ExperienceAndEduEditorProps {
  experiences: Experience[];
  educationList: Education[];
  supabaseClient: SupabaseClient | null;
  canEdit: boolean;
  onExperiencesChange: (next: Experience[]) => void;
  onEducationChange: (next: Education[]) => void;
}

const EMPTY_EXP: Experience = {
  role: '',
  company: '',
  description: '',
  period: '',
  order_index: 1,
};

const EMPTY_EDU: Education = {
  degree: '',
  institution: '',
  period: '',
  description: '',
  order_index: 1,
};

export function ExperienceAndEduEditor({
  experiences,
  educationList,
  supabaseClient,
  canEdit,
  onExperiencesChange,
  onEducationChange,
}: ExperienceAndEduEditorProps) {
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [editingEdu, setEditingEdu] = useState<Education | null>(null);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<ActionFeedback | null>(null);

  const saveExperience = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!supabaseClient || !canEdit || !editingExp) return;
    setSaving(true);
    setFeedback(null);

    try {
      const payload = {
        role: editingExp.role.trim(),
        company: editingExp.company.trim(),
        description: editingExp.description.trim(),
        period: editingExp.period.trim(),
        order_index: Number(editingExp.order_index) || 0,
      };

      const { data, error } = editingExp.id
        ? await supabaseClient
            .from('experiences')
            .update(payload)
            .eq('id', editingExp.id)
            .select()
            .single()
        : await supabaseClient
            .from('experiences')
            .insert(payload)
            .select()
            .single();

      if (error) {
        setFeedback({ type: 'err', text: error.message });
      } else if (data) {
        const saved = data as Experience;
        const nextList = editingExp.id
          ? experiences.map((item) => (item.id === saved.id ? saved : item))
          : [...experiences.filter((item) => item.id), saved];
        nextList.sort((a, b) => a.order_index - b.order_index);
        onExperiencesChange(nextList);
        setEditingExp(null);
        setFeedback({ type: 'ok', text: 'Experience saved to Supabase.' });
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

  const deleteExperience = async (id?: string) => {
    if (!supabaseClient || !canEdit || !id) return;
    if (!window.confirm('Delete this experience entry?')) return;
    const { error } = await supabaseClient
      .from('experiences')
      .delete()
      .eq('id', id);
    if (error) {
      setFeedback({ type: 'err', text: error.message });
    } else {
      onExperiencesChange(experiences.filter((item) => item.id !== id));
      setFeedback({ type: 'ok', text: 'Experience deleted.' });
    }
  };

  const saveEducation = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!supabaseClient || !canEdit || !editingEdu) return;
    setSaving(true);
    setFeedback(null);

    try {
      const payload = {
        degree: editingEdu.degree.trim(),
        institution: editingEdu.institution.trim(),
        period: editingEdu.period.trim(),
        description: editingEdu.description.trim(),
        order_index: Number(editingEdu.order_index) || 0,
      };

      const { data, error } = editingEdu.id
        ? await supabaseClient
            .from('education')
            .update(payload)
            .eq('id', editingEdu.id)
            .select()
            .single()
        : await supabaseClient
            .from('education')
            .insert(payload)
            .select()
            .single();

      if (error) {
        setFeedback({ type: 'err', text: error.message });
      } else if (data) {
        const saved = data as Education;
        const nextList = editingEdu.id
          ? educationList.map((item) => (item.id === saved.id ? saved : item))
          : [...educationList.filter((item) => item.id), saved];
        nextList.sort((a, b) => a.order_index - b.order_index);
        onEducationChange(nextList);
        setEditingEdu(null);
        setFeedback({ type: 'ok', text: 'Education saved to Supabase.' });
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

  const deleteEducation = async (id?: string) => {
    if (!supabaseClient || !canEdit || !id) return;
    if (!window.confirm('Delete this education entry?')) return;
    const { error } = await supabaseClient
      .from('education')
      .delete()
      .eq('id', id);
    if (error) {
      setFeedback({ type: 'err', text: error.message });
    } else {
      onEducationChange(educationList.filter((item) => item.id !== id));
      setFeedback({ type: 'ok', text: 'Education deleted.' });
    }
  };

  return (
    <div className="space-y-8">
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

      {/* Experience Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h2 className="text-lg sm:text-xl font-bold text-[#1C1917] font-display">
            Experience Entries
          </h2>
          <button
            type="button"
            disabled={!canEdit}
            onClick={() =>
              setEditingExp({
                ...EMPTY_EXP,
                order_index: experiences.length + 1,
              })
            }
            className="neo-btn inline-flex items-center gap-1.5 bg-[#C84B31] hover:bg-[#B03E26] disabled:opacity-50 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-semibold min-h-[44px]"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            <span>Add Experience</span>
          </button>
        </div>

        {editingExp && (
          <form
            onSubmit={saveExperience}
            className="neo-card-static bg-[#FBF9F5] rounded-2xl p-5 space-y-4"
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-bold text-base text-[#1C1917]">
                {editingExp.id ? 'Edit Experience' : 'New Experience'}
              </h3>
              <button
                type="button"
                onClick={() => setEditingExp(null)}
                aria-label="Cancel editing experience"
                className="p-2 rounded-lg hover:bg-white text-[#57534E]"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="exp-role"
                  className="block text-sm font-semibold text-[#1C1917] mb-1.5"
                >
                  Role title <span aria-hidden="true">*</span>
                </label>
                <input
                  id="exp-role"
                  name="role"
                  type="text"
                  required
                  value={editingExp.role}
                  onChange={(e) =>
                    setEditingExp({ ...editingExp, role: e.target.value })
                  }
                  className="admin-input"
                />
              </div>

              <div>
                <label
                  htmlFor="exp-company"
                  className="block text-sm font-semibold text-[#1C1917] mb-1.5"
                >
                  Company / Client <span aria-hidden="true">*</span>
                </label>
                <input
                  id="exp-company"
                  name="company"
                  type="text"
                  required
                  value={editingExp.company}
                  onChange={(e) =>
                    setEditingExp({ ...editingExp, company: e.target.value })
                  }
                  className="admin-input"
                />
              </div>

              <div>
                <label
                  htmlFor="exp-period"
                  className="block text-sm font-semibold text-[#1C1917] mb-1.5"
                >
                  Period <span aria-hidden="true">*</span>
                </label>
                <input
                  id="exp-period"
                  name="period"
                  type="text"
                  required
                  placeholder="May 2025 - Present"
                  value={editingExp.period}
                  onChange={(e) =>
                    setEditingExp({ ...editingExp, period: e.target.value })
                  }
                  className="admin-input"
                />
              </div>

              <div>
                <label
                  htmlFor="exp-order"
                  className="block text-sm font-semibold text-[#1C1917] mb-1.5"
                >
                  Display order
                </label>
                <input
                  id="exp-order"
                  name="order_index"
                  type="text"
                  inputMode="numeric"
                  value={String(editingExp.order_index)}
                  onChange={(e) =>
                    setEditingExp({
                      ...editingExp,
                      order_index: parseInt(e.target.value || '0', 10) || 0,
                    })
                  }
                  className="admin-input"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="exp-desc"
                className="block text-sm font-semibold text-[#1C1917] mb-1.5"
              >
                Description <span aria-hidden="true">*</span>
              </label>
              <textarea
                id="exp-desc"
                name="description"
                required
                rows={3}
                value={editingExp.description}
                onChange={(e) =>
                  setEditingExp({ ...editingExp, description: e.target.value })
                }
                className="admin-input"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={saving}
                className="neo-btn inline-flex items-center gap-2 bg-[#C84B31] hover:bg-[#B03E26] text-white px-5 py-2.5 rounded-full text-sm font-semibold min-h-[48px]"
              >
                <Save className="w-4 h-4" aria-hidden="true" />
                <span>{saving ? 'Saving…' : 'Save Experience'}</span>
              </button>
            </div>
          </form>
        )}

        <div className="space-y-3">
          {experiences.map((exp, idx) => (
            <div
              key={exp.id || idx}
              className="neo-card-static bg-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1 min-w-0">
                <p className="font-bold text-sm sm:text-base text-[#1C1917]">
                  {exp.role}{' '}
                  <span className="font-normal text-[#78716C]">
                    (#{exp.order_index})
                  </span>
                </p>
                <p className="text-xs font-semibold text-[#A93B24]">
                  {exp.company} • {exp.period}
                </p>
                <p className="text-xs text-[#57534E]">{exp.description}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  disabled={!canEdit}
                  onClick={() => setEditingExp(exp)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#1C1917]/20 bg-[#FBF9F5] hover:bg-[#F5F2EB] text-xs font-semibold text-[#1C1917] disabled:opacity-50 min-h-[40px]"
                >
                  <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Edit</span>
                </button>
                {exp.id && (
                  <button
                    type="button"
                    disabled={!canEdit}
                    onClick={() => deleteExperience(exp.id)}
                    aria-label={`Delete ${exp.role}`}
                    className="inline-flex items-center justify-center p-2 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 disabled:opacity-50 min-h-[40px] min-w-[40px]"
                  >
                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section className="space-y-4 pt-6 border-t border-[#1C1917]/10">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#1C1917] font-display">
              Education &amp; Learning (Résumé Page)
            </h2>
            <p className="text-xs text-[#57534E]">
              Powers the Education &amp; Learning section on <code>/resume</code>.
            </p>
          </div>
          <button
            type="button"
            disabled={!canEdit}
            onClick={() =>
              setEditingEdu({
                ...EMPTY_EDU,
                order_index: educationList.length + 1,
              })
            }
            className="neo-btn inline-flex items-center gap-1.5 bg-white hover:bg-[#F5F2EB] disabled:opacity-50 text-[#1C1917] px-4 py-2 rounded-full text-xs sm:text-sm font-semibold min-h-[44px]"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            <span>Add Education</span>
          </button>
        </div>

        {editingEdu && (
          <form
            onSubmit={saveEducation}
            className="neo-card-static bg-[#FBF9F5] rounded-2xl p-5 space-y-4"
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-bold text-base text-[#1C1917]">
                {editingEdu.id ? 'Edit Education' : 'New Education'}
              </h3>
              <button
                type="button"
                onClick={() => setEditingEdu(null)}
                aria-label="Cancel editing education"
                className="p-2 rounded-lg hover:bg-white text-[#57534E]"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="edu-degree"
                  className="block text-sm font-semibold text-[#1C1917] mb-1.5"
                >
                  Degree / Program <span aria-hidden="true">*</span>
                </label>
                <input
                  id="edu-degree"
                  name="degree"
                  type="text"
                  required
                  value={editingEdu.degree}
                  onChange={(e) =>
                    setEditingEdu({ ...editingEdu, degree: e.target.value })
                  }
                  className="admin-input"
                />
              </div>

              <div>
                <label
                  htmlFor="edu-inst"
                  className="block text-sm font-semibold text-[#1C1917] mb-1.5"
                >
                  Institution <span aria-hidden="true">*</span>
                </label>
                <input
                  id="edu-inst"
                  name="institution"
                  type="text"
                  required
                  value={editingEdu.institution}
                  onChange={(e) =>
                    setEditingEdu({
                      ...editingEdu,
                      institution: e.target.value,
                    })
                  }
                  className="admin-input"
                />
              </div>

              <div>
                <label
                  htmlFor="edu-period"
                  className="block text-sm font-semibold text-[#1C1917] mb-1.5"
                >
                  Status / Period <span aria-hidden="true">*</span>
                </label>
                <input
                  id="edu-period"
                  name="period"
                  type="text"
                  required
                  value={editingEdu.period}
                  onChange={(e) =>
                    setEditingEdu({ ...editingEdu, period: e.target.value })
                  }
                  className="admin-input"
                />
              </div>

              <div>
                <label
                  htmlFor="edu-order"
                  className="block text-sm font-semibold text-[#1C1917] mb-1.5"
                >
                  Display order
                </label>
                <input
                  id="edu-order"
                  name="order_index"
                  type="text"
                  inputMode="numeric"
                  value={String(editingEdu.order_index)}
                  onChange={(e) =>
                    setEditingEdu({
                      ...editingEdu,
                      order_index: parseInt(e.target.value || '0', 10) || 0,
                    })
                  }
                  className="admin-input"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="edu-desc"
                className="block text-sm font-semibold text-[#1C1917] mb-1.5"
              >
                Description <span aria-hidden="true">*</span>
              </label>
              <textarea
                id="edu-desc"
                name="description"
                required
                rows={3}
                value={editingEdu.description}
                onChange={(e) =>
                  setEditingEdu({ ...editingEdu, description: e.target.value })
                }
                className="admin-input"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="neo-btn inline-flex items-center gap-2 bg-[#C84B31] hover:bg-[#B03E26] text-white px-5 py-2.5 rounded-full text-sm font-semibold min-h-[48px]"
            >
              <Save className="w-4 h-4" aria-hidden="true" />
              <span>{saving ? 'Saving…' : 'Save Education'}</span>
            </button>
          </form>
        )}

        <div className="space-y-3">
          {educationList.map((edu, idx) => (
            <div
              key={edu.id || idx}
              className="neo-card-static bg-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1 min-w-0">
                <p className="font-bold text-sm sm:text-base text-[#1C1917]">
                  {edu.degree}
                </p>
                <p className="text-xs font-medium text-[#57534E]">
                  {edu.institution} • {edu.period}
                </p>
                <p className="text-xs text-[#57534E]">{edu.description}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  disabled={!canEdit}
                  onClick={() => setEditingEdu(edu)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#1C1917]/20 bg-[#FBF9F5] hover:bg-[#F5F2EB] text-xs font-semibold text-[#1C1917] disabled:opacity-50 min-h-[40px]"
                >
                  <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Edit</span>
                </button>
                {edu.id && (
                  <button
                    type="button"
                    disabled={!canEdit}
                    onClick={() => deleteEducation(edu.id)}
                    aria-label={`Delete ${edu.degree}`}
                    className="inline-flex items-center justify-center p-2 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 disabled:opacity-50 min-h-[40px] min-w-[40px]"
                  >
                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

interface TechStackEditorProps {
  stackGroups: TechStackGroup[];
  supabaseClient: SupabaseClient | null;
  canEdit: boolean;
  onChange: (next: TechStackGroup[]) => void;
}

const STACK_COLORS = [
  { id: 'blue', label: 'Soft Blue' },
  { id: 'mint', label: 'Muted Sage' },
  { id: 'yellow', label: 'Warm Cream' },
  { id: 'purple', label: 'Soft Lavender' },
];

export function TechStackEditor({
  stackGroups,
  supabaseClient,
  canEdit,
  onChange,
}: TechStackEditorProps) {
  const [editing, setEditing] = useState<TechStackGroup | null>(null);
  const [skillsText, setSkillsText] = useState('');
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<ActionFeedback | null>(null);

  const openEditor = (group: TechStackGroup) => {
    setEditing(group);
    setSkillsText((group.skills || []).join(', '));
  };

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!supabaseClient || !canEdit || !editing) return;
    setSaving(true);
    setFeedback(null);

    try {
      const payload = {
        category: editing.category.trim(),
        color: editing.color || 'blue',
        skills: parseCommaList(skillsText),
        order_index: Number(editing.order_index) || 0,
      };

      const { data, error } = editing.id
        ? await supabaseClient
            .from('tech_stack')
            .update(payload)
            .eq('id', editing.id)
            .select()
            .single()
        : await supabaseClient
            .from('tech_stack')
            .insert(payload)
            .select()
            .single();

      if (error) {
        setFeedback({ type: 'err', text: error.message });
      } else if (data) {
        const saved = data as TechStackGroup;
        const nextList = editing.id
          ? stackGroups.map((g) => (g.id === saved.id ? saved : g))
          : [...stackGroups.filter((g) => g.id), saved];
        nextList.sort((a, b) => a.order_index - b.order_index);
        onChange(nextList);
        setEditing(null);
        setFeedback({ type: 'ok', text: 'Stack category saved to Supabase.' });
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
    if (!window.confirm('Delete this stack group?')) return;
    const { error } = await supabaseClient.from('tech_stack').delete().eq('id', id);
    if (error) {
      setFeedback({ type: 'err', text: error.message });
    } else {
      onChange(stackGroups.filter((g) => g.id !== id));
      setFeedback({ type: 'ok', text: 'Stack group deleted.' });
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h2 className="text-lg sm:text-xl font-bold text-[#1C1917] font-display">
          Tech &amp; Marketing Stacks
        </h2>
        <button
          type="button"
          disabled={!canEdit}
          onClick={() =>
            openEditor({
              category: '',
              color: 'blue',
              skills: [],
              order_index: stackGroups.length + 1,
            })
          }
          className="neo-btn inline-flex items-center gap-1.5 bg-[#C84B31] hover:bg-[#B03E26] disabled:opacity-50 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-semibold min-h-[44px]"
        >
          <Plus className="w-4 h-4" aria-hidden="true" />
          <span>Add Stack Category</span>
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
          className="neo-card-static bg-[#FBF9F5] rounded-2xl p-5 space-y-4"
        >
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-bold text-base text-[#1C1917]">
              {editing.id ? 'Edit Stack Category' : 'New Stack Category'}
            </h3>
            <button
              type="button"
              onClick={() => setEditing(null)}
              aria-label="Cancel editing stack category"
              className="p-2 rounded-lg hover:bg-white text-[#57534E]"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="stack-category"
                className="block text-sm font-semibold text-[#1C1917] mb-1.5"
              >
                Category name <span aria-hidden="true">*</span>
              </label>
              <input
                id="stack-category"
                name="category"
                type="text"
                required
                value={editing.category}
                onChange={(e) =>
                  setEditing({ ...editing, category: e.target.value })
                }
                className="admin-input"
              />
            </div>

            <div>
              <label
                htmlFor="stack-order"
                className="block text-sm font-semibold text-[#1C1917] mb-1.5"
              >
                Display order
              </label>
              <input
                id="stack-order"
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

          <fieldset className="space-y-2">
            <legend className="text-sm font-semibold text-[#1C1917]">
              Card tint
            </legend>
            <div className="flex flex-wrap gap-4 pt-1">
              {STACK_COLORS.map((c) => (
                <label
                  key={c.id}
                  className="inline-flex items-center gap-2 text-sm text-[#1C1917] cursor-pointer py-1"
                >
                  <input
                    type="radio"
                    name="stack_color"
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

          <div>
            <label
              htmlFor="stack-skills"
              className="block text-sm font-semibold text-[#1C1917] mb-1.5"
            >
              Skills (comma-separated) <span aria-hidden="true">*</span>
            </label>
            <textarea
              id="stack-skills"
              name="skills"
              required
              rows={2}
              value={skillsText}
              onChange={(e) => setSkillsText(e.target.value)}
              placeholder="Google Ads, Meta Ads, GA4, Google Tag Manager"
              className="admin-input"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="neo-btn inline-flex items-center gap-2 bg-[#C84B31] hover:bg-[#B03E26] text-white px-5 py-2.5 rounded-full text-sm font-semibold min-h-[48px]"
          >
            <Save className="w-4 h-4" aria-hidden="true" />
            <span>{saving ? 'Saving…' : 'Save Category'}</span>
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stackGroups.map((group, idx) => (
          <div
            key={group.id || idx}
            className="neo-card-static bg-white rounded-2xl p-4 sm:p-5 flex flex-col justify-between gap-3"
          >
            <div>
              <p className="font-bold text-sm sm:text-base text-[#1C1917]">
                {group.category}{' '}
                <span className="font-normal text-xs text-[#78716C]">
                  ({group.color} · #{group.order_index})
                </span>
              </p>
              <p className="text-xs text-[#57534E] mt-1.5">
                {(group.skills || []).join(', ')}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-[#1C1917]/10">
              <button
                type="button"
                disabled={!canEdit}
                onClick={() => openEditor(group)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#1C1917]/20 bg-[#FBF9F5] hover:bg-[#F5F2EB] text-xs font-semibold text-[#1C1917] disabled:opacity-50 min-h-[38px]"
              >
                <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Edit</span>
              </button>
              {group.id && (
                <button
                  type="button"
                  disabled={!canEdit}
                  onClick={() => handleDelete(group.id)}
                  aria-label={`Delete ${group.category}`}
                  className="inline-flex items-center justify-center p-2 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 disabled:opacity-50 min-h-[38px] min-w-[38px]"
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
