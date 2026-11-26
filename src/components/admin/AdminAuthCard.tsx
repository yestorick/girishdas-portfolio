'use client';

import { useState, FormEvent } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import { Lock, Eye, EyeOff, AlertCircle, LogIn } from 'lucide-react';

interface AdminAuthCardProps {
  supabaseClient: SupabaseClient;
  onSignedIn: () => void;
}

export default function AdminAuthCard({
  supabaseClient,
  onSignedIn,
}: AdminAuthCardProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    try {
      const { error } = await supabaseClient.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error) {
        setErrorMsg(error.message);
      } else {
        onSignedIn();
      }
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : 'Unable to sign in right now.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="neo-card-static bg-white rounded-2xl p-6 sm:p-8 max-w-xl">
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-8 h-8 rounded-lg bg-[#EDF4EF] border border-[#292524] flex items-center justify-center">
          <Lock className="w-4 h-4 text-[#1E5631]" aria-hidden="true" />
        </div>
        <h2
          id="admin-signin-heading"
          className="text-lg sm:text-xl font-bold text-[#1C1917] font-display"
        >
          Sign in to edit Supabase content
        </h2>
      </div>

      <p className="text-sm text-[#57534E] mb-5 leading-relaxed">
        Your Supabase Row Level Security allows public reading and restricts edits to authenticated users. Sign in with your Supabase Auth user below to edit every section from here, or edit directly in the Supabase Dashboard.
      </p>

      <form
        method="post"
        onSubmit={handleSubmit}
        aria-labelledby="admin-signin-heading"
        className="space-y-4"
      >
        <div>
          <label
            htmlFor="admin-email"
            className="block text-sm font-semibold text-[#1C1917] mb-1.5"
          >
            Email address <span aria-hidden="true">*</span>
          </label>
          <input
            id="admin-email"
            name="email"
            type="email"
            autoComplete="username"
            spellCheck={false}
            enterKeyHint="next"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errorMsg) setErrorMsg('');
            }}
            placeholder="hellorick73@gmail.com"
            className="admin-input"
          />
        </div>

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
                  <span>Show password</span>
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
          className="neo-btn inline-flex items-center justify-center gap-2 bg-[#C84B31] hover:bg-[#B03E26] disabled:opacity-60 text-white px-6 py-3 rounded-full text-sm font-semibold min-h-[48px]"
        >
          <LogIn className="w-4 h-4" aria-hidden="true" />
          <span>{loading ? 'Signing in…' : 'Sign In'}</span>
        </button>
      </form>

      <div className="mt-6 pt-5 border-t border-[#1C1917]/10 text-xs text-[#57534E] space-y-1.5">
        <p className="font-semibold text-[#1C1917]">First-time login setup:</p>
        <p>
          In your <strong>Supabase Dashboard → Authentication → Users</strong>, click{' '}
          <strong>Add user → Create new user</strong> with your email and a strong password, then sign in right here.
        </p>
      </div>
    </section>
  );
}
