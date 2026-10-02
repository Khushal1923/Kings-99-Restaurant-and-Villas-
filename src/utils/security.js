// Security & Cryptographic Utilities for King's 99 React Platform

// SHA-256 Hash using browser Web Crypto API
export async function hashPassword(plainText) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plainText);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Default Hash for 'kings99@admin'
export const DEFAULT_ADMIN_HASH = "b4fe98f121d120a169b5066fc038676d910ee2a7522f281e22709e32ff009228"; // sha256 of kings99@admin

// Brute-force protection & Lockout Tracker
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 2 * 60 * 1000; // 2 minutes

export function checkRateLimit() {
  const attempts = parseInt(localStorage.getItem('kings99_login_attempts') || '0', 10);
  const lockUntil = parseInt(localStorage.getItem('kings99_lock_until') || '0', 10);
  const now = Date.now();

  if (lockUntil > now) {
    const remainingSeconds = Math.ceil((lockUntil - now) / 1000);
    return {
      allowed: false,
      message: `Too many failed attempts. Admin portal is locked for security. Try again in ${remainingSeconds}s.`
    };
  }

  return { allowed: true, attemptsRemaining: MAX_ATTEMPTS - attempts };
}

export function recordFailedAttempt() {
  let attempts = parseInt(localStorage.getItem('kings99_login_attempts') || '0', 10) + 1;
  localStorage.setItem('kings99_login_attempts', attempts.toString());

  if (attempts >= MAX_ATTEMPTS) {
    const lockUntil = Date.now() + LOCKOUT_DURATION_MS;
    localStorage.setItem('kings99_lock_until', lockUntil.toString());
    localStorage.removeItem('kings99_login_attempts');
    return {
      locked: true,
      message: `Security Lock: 5 incorrect passcodes entered. Portal locked for 2 minutes.`
    };
  }

  return {
    locked: false,
    message: `Incorrect passcode. ${MAX_ATTEMPTS - attempts} attempt(s) remaining.`
  };
}

export function resetLoginAttempts() {
  localStorage.removeItem('kings99_login_attempts');
  localStorage.removeItem('kings99_lock_until');
}

// XSS Sanitizer for user-provided texts
export function sanitizeText(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
