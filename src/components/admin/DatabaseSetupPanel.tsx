'use client';

import { useState } from 'react';
import { SupabaseDiagnostics } from '@/lib/types';
import {
  CheckCircle2,
  AlertTriangle,
  Copy,
  ExternalLink,
  Database,
  ShieldCheck,
} from 'lucide-react';

export interface AdminDiagnostics extends SupabaseDiagnostics {
  hasServiceRoleKey: boolean;
  hasSessionSecret: boolean;
}

interface DatabaseSetupPanelProps {
  diagnostics: AdminDiagnostics;
  migrationSql: string;
  schemaSql: string;
}

export default function DatabaseSetupPanel({
  diagnostics,
  migrationSql,
  schemaSql,
}: DatabaseSetupPanelProps) {
  const [copiedType, setCopiedType] = useState<'migration' | 'schema' | null>(
    null
  );

  const handleCopy = async (kind: 'migration' | 'schema', text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedType(kind);
      setTimeout(() => setCopiedType(null), 2500);
    } catch {
      // Clipboard fallback ignored
    }
  };

  return (
    <div className="space-y-6">
      {/* Live Diagnostics Summary */}
      <section className="neo-card-static bg-white rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2.5">
            <Database className="w-5 h-5 text-[#1C1917]" aria-hidden="true" />
            <h2 className="text-lg font-bold text-[#1C1917] font-display">
              Live Supabase Connection &amp; Server Write Status
            </h2>
          </div>
          <a
            href="https://supabase.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="neo-btn inline-flex items-center gap-1.5 bg-[#F9F3DF] hover:bg-[#F3E9C6] text-[#1C1917] px-4 py-2 text-xs font-semibold rounded-full"
          >
            <span>Open Supabase Dashboard</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div
            className={`rounded-xl border p-3.5 ${
              diagnostics.hasServiceRoleKey
                ? 'bg-[#EDF4EF] border-[#1E5631]/25 text-[#1C1917]'
                : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}
          >
            <div className="flex items-center justify-between font-bold mb-1">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                Server Write Key (<code>SUPABASE_SERVICE_ROLE_KEY</code>)
              </span>
              {diagnostics.hasServiceRoleKey ? (
                <CheckCircle2 className="w-4 h-4 text-[#1E5631]" aria-hidden="true" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-700" aria-hidden="true" />
              )}
            </div>
            <p>
              {diagnostics.hasServiceRoleKey
                ? 'Configured cleanly on the server. Saving & uploads enabled.'
                : 'Missing in Vercel Environment Variables. Add SUPABASE_SERVICE_ROLE_KEY (Server Secret) to enable saving & image uploads.'}
            </p>
          </div>

          <div
            className={`rounded-xl border p-3.5 ${
              diagnostics.hasSessionSecret
                ? 'bg-[#EDF4EF] border-[#1E5631]/25 text-[#1C1917]'
                : 'bg-[#F5F2EB] border-[#1C1917]/20 text-[#1C1917]'
            }`}
          >
            <div className="flex items-center justify-between font-bold mb-1">
              <span>
                Dedicated Cookie Signing Key (<code>ADMIN_SESSION_SECRET</code>)
              </span>
              <CheckCircle2
                className="w-4 h-4 text-[#1E5631]"
                aria-hidden="true"
              />
            </div>
            <p className="text-[#57534E]">
              {diagnostics.hasSessionSecret
                ? 'Dedicated random HMAC key active for HttpOnly cookies.'
                : 'Active (derived from server secrets). Add optional 32+ char ADMIN_SESSION_SECRET in Vercel for independent key rotation.'}
            </p>
          </div>
        </div>

        {diagnostics.migrationWarnings.length > 0 && (
          <div
            role="status"
            aria-live="polite"
            className="rounded-xl border border-amber-400 bg-amber-50 p-4 text-xs sm:text-sm text-amber-950 space-y-1.5"
          >
            <p className="font-bold inline-flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Action needed in Supabase SQL Editor:</span>
            </p>
            <ul className="list-disc list-inside space-y-1">
              {diagnostics.migrationWarnings.map((warn, i) => (
                <li key={i}>{warn}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {diagnostics.tables.map((t) => (
            <div
              key={t.table}
              className={`rounded-xl border p-3.5 text-xs ${
                t.ok
                  ? 'bg-[#EDF4EF] border-[#1E5631]/25 text-[#1C1917]'
                  : 'bg-[#F7ECE6] border-[#C84B31]/35 text-[#1C1917]'
              }`}
            >
              <div className="flex items-center justify-between gap-2 font-bold mb-1">
                <code>{t.table}</code>
                {t.ok ? (
                  <CheckCircle2
                    className="w-4 h-4 text-[#1E5631] shrink-0"
                    aria-hidden="true"
                  />
                ) : (
                  <AlertTriangle
                    className="w-4 h-4 text-[#C84B31] shrink-0"
                    aria-hidden="true"
                  />
                )}
              </div>
              <p className="text-[#57534E]">
                {t.ok
                  ? `${t.count ?? 0} row${t.count === 1 ? '' : 's'} live`
                  : t.error || 'Table unavailable'}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Non-destructive Update SQL */}
      <section className="neo-card-static bg-white rounded-2xl p-5 sm:p-6 space-y-3">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h3 className="text-base font-bold text-[#1C1917] font-display">
              Option A: Upgrade Existing Supabase DB (Keeps Your Data Safe)
            </h3>
            <p className="text-xs text-[#57534E]">
              Runs <code>supabase/migrations_update.sql</code> — adds new columns (including <code>projects.category</code>), <code>education</code> table, and <code>portfolio-media</code> bucket without wiping existing content.
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleCopy('migration', migrationSql)}
            className="neo-btn inline-flex items-center gap-1.5 bg-[#EDF4EF] hover:bg-[#DFF0E4] text-[#1E5631] px-4 py-2 rounded-full text-xs font-semibold min-h-[44px]"
          >
            {copiedType === 'migration' ? (
              <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
            ) : (
              <Copy className="w-3.5 h-3.5" aria-hidden="true" />
            )}
            <span>
              {copiedType === 'migration' ? 'Copied Migration SQL!' : 'Copy Migration SQL'}
            </span>
          </button>
        </div>

        <pre className="bg-[#18181B] text-stone-100 p-4 rounded-xl text-xs font-mono overflow-x-auto max-h-64">
          {migrationSql}
        </pre>
      </section>

      {/* Fresh Install Schema SQL */}
      <section className="neo-card-static bg-white rounded-2xl p-5 sm:p-6 space-y-3">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h3 className="text-base font-bold text-[#1C1917] font-display">
              Option B: Fresh Full Setup &amp; Seed Script
            </h3>
            <p className="text-xs text-[#57534E]">
              Runs <code>supabase/schema.sql</code> — creates all 7 tables from scratch and seeds your updated résumé, AI Creative projects, skills, and blog posts.
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleCopy('schema', schemaSql)}
            className="neo-btn inline-flex items-center gap-1.5 bg-[#F9F3DF] hover:bg-[#F3E9C6] text-[#1C1917] px-4 py-2 rounded-full text-xs font-semibold min-h-[44px]"
          >
            {copiedType === 'schema' ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-[#1E5631]" aria-hidden="true" />
            ) : (
              <Copy className="w-3.5 h-3.5" aria-hidden="true" />
            )}
            <span>
              {copiedType === 'schema' ? 'Copied Schema SQL!' : 'Copy Fresh Schema SQL'}
            </span>
          </button>
        </div>

        <pre className="bg-[#18181B] text-stone-100 p-4 rounded-xl text-xs font-mono overflow-x-auto max-h-64">
          {schemaSql}
        </pre>
      </section>
    </div>
  );
}
