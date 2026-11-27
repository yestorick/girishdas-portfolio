'use client';

import { useRef, useState, ChangeEvent } from 'react';
import { adminUploadFile } from './helpers';
import { Upload, CheckCircle2, AlertCircle } from 'lucide-react';

interface MediaUploadFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (nextUrl: string) => void;
  canUpload: boolean;
  folder: 'avatars' | 'projects' | 'posts' | 'documents';
  accept?: string;
  placeholder?: string;
  helpText?: string;
}

export default function MediaUploadField({
  id,
  label,
  value,
  onChange,
  canUpload,
  folder,
  accept = 'image/*',
  placeholder = 'https://...',
  helpText,
}: MediaUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<{ type: 'ok' | 'err'; text: string } | null>(
    null
  );

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setStatus(null);
    try {
      const res = await adminUploadFile(file, folder);
      if (res.error || !res.url) {
        setStatus({
          type: 'err',
          text: res.error || 'Upload failed.',
        });
      } else {
        onChange(res.url);
        setStatus({ type: 'ok', text: 'Uploaded to Supabase Storage.' });
      }
    } catch (err) {
      setStatus({
        type: 'err',
        text: err instanceof Error ? err.message : 'Upload failed.',
      });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const helpId = `${id}-help`;

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-[#1C1917] mb-1.5"
      >
        {label}
      </label>

      <div className="flex flex-col sm:flex-row gap-2">
        <input
          id={id}
          name={id}
          type="text"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          aria-describedby={helpText ? helpId : undefined}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="admin-input flex-1"
        />

        {canUpload && (
          <>
            <input
              ref={fileInputRef}
              type="file"
              accept={accept}
              onChange={handleFileChange}
              className="sr-only"
              tabIndex={-1}
              aria-hidden="true"
            />
            <button
              type="button"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
              className="neo-btn inline-flex items-center justify-center gap-2 bg-[#F5F2EB] hover:bg-[#EBE6DB] text-[#1C1917] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold shrink-0 min-h-[48px] disabled:opacity-60"
            >
              <Upload className="w-4 h-4" aria-hidden="true" />
              <span>{uploading ? 'Uploading…' : 'Upload file'}</span>
            </button>
          </>
        )}
      </div>

      {helpText && (
        <p id={helpId} className="mt-1.5 text-xs text-[#57534E]">
          {helpText}
        </p>
      )}

      {status && (
        <p
          role="status"
          aria-live="polite"
          className={`mt-1.5 inline-flex items-center gap-1.5 text-xs font-medium ${
            status.type === 'ok' ? 'text-[#1E5631]' : 'text-red-700'
          }`}
        >
          {status.type === 'ok' ? (
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          ) : (
            <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          )}
          <span>{status.text}</span>
        </p>
      )}
    </div>
  );
}
