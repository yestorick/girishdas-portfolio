'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Eye, EyeOff, AlertCircle, LogIn, ArrowLeft } from 'lucide-react';

export default function AdminAuthCard() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) {
        setErrorMsg(data.error || 'Authentication failed.');
      } else {
        setPassword('');
        router.refresh();
      }
    } catch {
      setErrorMsg('Network error while verifying password. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh bg-[#FBF9F5] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-5">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#57534E] hover:text-[#1C1917] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Back to portfolio</span>
        </Link>

        <section className="neo-card-static bg-white rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-[#EDF4EF] border border-[#292524] flex items-center justify-center shrink-0">
              <Lock className="w-4 h-4 text-[#1E5631]" aria-hidden="true" />
            </div>
            <div>
              <h1
                id="admin-signin-heading"
                className="text-xl font-extrabold text-[#1C1917] font-display"
              >
                Admin Sign In
              </h1>
              <p className="text-xs text-[#57534E]">
                Protected portfolio dashboard
              </p>
            </div>
          </div>

          <form
            method="post"
            onSubmit={handleSubmit}
            aria-labelledby="admin-signin-heading"
            className="space-y-4 mt-5"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <label
                  htmlFor="admin-password"
                  className="block text-sm font-semibold text-[#1C1917]"
                >
                  Password <span aria-hidden="true">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-pressed={showPassword}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#57534E] hover:text-[#1C1917] py-1 px-2 rounded"
                >
                  {showPassword ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Hide</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Show</span>
                    </>
                  )}
                </button>
              </div>
              <input
                id="admin-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                enterKeyHint="done"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                className="admin-input"
              />
            </div>

            {errorMsg && (
              <div
                role="alert"
                aria-live="polite"
                className="flex items-start gap-2 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-900"
              >
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="neo-btn w-full inline-flex items-center justify-center gap-2 bg-[#C84B31] hover:bg-[#B03E26] disabled:opacity-60 text-white px-6 py-3 rounded-full text-sm font-semibold min-h-[48px]"
            >
              <LogIn className="w-4 h-4" aria-hidden="true" />
              <span>{loading ? 'Verifying…' : 'Sign In'}</span>
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
