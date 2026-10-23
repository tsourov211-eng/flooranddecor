'use client';

import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  User,
  Building2,
  HardHat,
  Briefcase,
} from 'lucide-react';

interface AuthPageProps {
  searchParams?: { tab?: string };
}

export default function AuthPage({ searchParams }: AuthPageProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(
    searchParams?.tab === 'register' ? 'register' : 'login'
  );
  const [accountType, setAccountType] = useState<'homeowner' | 'pro'>('homeowner');

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Register Form State
  const [regFirstName, setRegFirstName] = useState('');
  const [regLastName, setRegLastName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regCompanyName, setRegCompanyName] = useState('');
  const [regTrade, setRegTrade] = useState('Tile Installer');
  const [optInNews, setOptInNews] = useState(true);

  // Status & Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('tab') === 'register' || window.location.pathname.includes('/register')) {
        setActiveTab('register');
      }
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      showToast('Please enter both email and password.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast(`Welcome back, ${loginEmail}! Redirecting...`);
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    }, 700);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (regPassword !== regConfirmPassword) {
      showToast('Passwords do not match. Please check and try again.');
      return;
    }
    if (regPassword.length < 8) {
      showToast('Password must be at least 8 characters long.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast(`Account successfully created for ${regFirstName || 'Customer'}! Welcome to Floor & Decor.`);
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    }, 800);
  };

  return (
    <div className="auth-page-wrapper">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[2000] bg-[#111111] text-white px-5 py-3.5 rounded shadow-2xl flex items-center gap-3 border-l-4 border-[#ed1c24] text-[13px] font-medium transition-all">
          <CheckCircle2 size={18} className="text-[#34c759]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Accent Stripe */}
      <div className="site-top-accent" />

      {/* Simplified Auth Header */}
      <header className="auth-header-simplified">
        <div className="page-width auth-header-inner">
          <a href="/" className="brand-clean-link" aria-label="Floor & Decor Home">
            <img src="/logo.png" alt="Floor & Decor" className="brand-clean-logo" />
          </a>

          <a href="/" className="auth-back-link">
            <ArrowLeft size={16} />
            <span>Return to Shopping</span>
          </a>
        </div>
      </header>

      {/* Main Container */}
      <main className="auth-main-container">
        <div className="page-width">
          <div className="auth-card-wrapper">
            {/* Tabs Header */}
            <div className="auth-tabs-header">
              <button
                type="button"
                className={`auth-tab-btn ${activeTab === 'login' ? 'active' : ''}`}
                onClick={() => setActiveTab('login')}
              >
                <span>Sign In</span>
              </button>
              <button
                type="button"
                className={`auth-tab-btn ${activeTab === 'register' ? 'active' : ''}`}
                onClick={() => setActiveTab('register')}
              >
                <span>Create an Account</span>
              </button>
            </div>

            {/* Tab Body */}
            <div className="auth-content-body">
              {activeTab === 'login' ? (
                /* ================= SIGN IN TAB ================= */
                <div className="auth-split-layout">
                  {/* Left Column: Login Form */}
                  <div>
                    <h1 className="auth-form-title">Welcome Back</h1>
                    <p className="auth-form-subtitle">
                      Sign in to your Floor & Decor account to access your orders, saved projects, and exclusive savings.
                    </p>

                    <form onSubmit={handleLoginSubmit}>
                      <div className="auth-input-group">
                        <label className="auth-input-label" htmlFor="login-email">
                          Email Address *
                        </label>
                        <div className="auth-input-wrapper">
                          <input
                            id="login-email"
                            type="email"
                            required
                            placeholder="dummy.user@example.com"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            className="auth-input-field"
                            autoComplete="email"
                          />
                        </div>
                      </div>

                      <div className="auth-input-group">
                        <div className="flex justify-between items-center mb-1">
                          <label className="auth-input-label !mb-0" htmlFor="login-password">
                            Password *
                          </label>
                        </div>
                        <div className="auth-input-wrapper">
                          <input
                            id="login-password"
                            type={showLoginPassword ? 'text' : 'password'}
                            required
                            placeholder="Enter your password"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            className="auth-input-field pr-12"
                            autoComplete="current-password"
                          />
                          <button
                            type="button"
                            className="auth-password-toggle"
                            onClick={() => setShowLoginPassword(!showLoginPassword)}
                            aria-label={showLoginPassword ? 'Hide password' : 'Show password'}
                          >
                            {showLoginPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>

                      <div className="auth-checkbox-row">
                        <label className="auth-checkbox-label">
                          <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                          />
                          <span>Remember Me</span>
                        </label>

                        <a
                          href="#forgot-password"
                          className="auth-link-red"
                          onClick={(e) => {
                            e.preventDefault();
                            showToast('Password reset instructions sent to your email.');
                          }}
                        >
                          Forgot Password?
                        </a>
                      </div>

                      <button type="submit" className="auth-submit-btn" disabled={isSubmitting}>
                        {isSubmitting ? 'Signing In...' : 'Sign In'} <ArrowRight size={16} />
                      </button>

                      <div className="text-center mt-6 text-[13px] text-[#666]">
                        Don&apos;t have an account yet?{' '}
                        <button
                          type="button"
                          className="auth-link-red font-bold"
                          onClick={() => setActiveTab('register')}
                        >
                          Create one now
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Right Column: Account Benefits */}
                  <div className="auth-benefits-box">
                    <h3 className="auth-benefits-title">Account Holder Perks</h3>
                    <div className="auth-benefit-item">
                      <ShieldCheck size={20} />
                      <div>
                        <strong>Order Tracking & History</strong>
                        <p className="text-[12px] text-[#666] m-0">View past store and online purchases, receipts, and live freight delivery tracking.</p>
                      </div>
                    </div>
                    <div className="auth-benefit-item">
                      <CheckCircle2 size={20} />
                      <div>
                        <strong>Save to My Projects</strong>
                        <p className="text-[12px] text-[#666] m-0">Organize tile, wood, and fixtures room by room and order samples with 1-click.</p>
                      </div>
                    </div>
                    <div className="auth-benefit-item">
                      <CheckCircle2 size={20} />
                      <div>
                        <strong>Free Design Consultations</strong>
                        <p className="text-[12px] text-[#666] m-0">Book appointments with in-store design experts to plan your renovation layout.</p>
                      </div>
                    </div>
                    <div className="auth-benefit-item">
                      <HardHat size={20} />
                      <div>
                        <strong>PRO Premier Rewards</strong>
                        <p className="text-[12px] text-[#666] m-0">Contractors get volume tiered pricing, dedicated checkout, and free storage.</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* ================= CREATE ACCOUNT TAB ================= */
                <div>
                  <h1 className="auth-form-title">Create Your Account</h1>
                  <p className="auth-form-subtitle">
                    Select your account type below to get tailored pricing and personalized project tools.
                  </p>

                  <form onSubmit={handleRegisterSubmit}>
                    {/* Account Type Selector */}
                    <div className="auth-account-type-grid">
                      <div
                        className={`auth-account-type-card ${accountType === 'homeowner' ? 'selected' : ''}`}
                        onClick={() => setAccountType('homeowner')}
                      >
                        <div className="auth-account-type-title">
                          <span className="flex items-center gap-2">
                            <User size={18} className="text-[#ed1c24]" />
                            <span>Homeowner / Personal</span>
                          </span>
                          {accountType === 'homeowner' && <Check size={18} className="text-[#ed1c24]" />}
                        </div>
                        <p className="auth-account-type-desc">
                          For home DIYers, remodeling your bathroom, kitchen, or living spaces.
                        </p>
                      </div>

                      <div
                        className={`auth-account-type-card ${accountType === 'pro' ? 'selected' : ''}`}
                        onClick={() => setAccountType('pro')}
                      >
                        <div className="auth-account-type-title">
                          <span className="flex items-center gap-2">
                            <Briefcase size={18} className="text-[#ed1c24]" />
                            <span>PRO Premier / Trade</span>
                          </span>
                          {accountType === 'pro' && <Check size={18} className="text-[#ed1c24]" />}
                        </div>
                        <p className="auth-account-type-desc">
                          For installers, general contractors, remodelers, architects, and commercial designers.
                        </p>
                      </div>
                    </div>

                    {/* Name Fields */}
                    <div className="auth-form-grid">
                      <div className="auth-input-group">
                        <label className="auth-input-label" htmlFor="reg-first-name">
                          First Name *
                        </label>
                        <input
                          id="reg-first-name"
                          type="text"
                          required
                          placeholder="John"
                          value={regFirstName}
                          onChange={(e) => setRegFirstName(e.target.value)}
                          className="auth-input-field"
                        />
                      </div>

                      <div className="auth-input-group">
                        <label className="auth-input-label" htmlFor="reg-last-name">
                          Last Name *
                        </label>
                        <input
                          id="reg-last-name"
                          type="text"
                          required
                          placeholder="Doe"
                          value={regLastName}
                          onChange={(e) => setRegLastName(e.target.value)}
                          className="auth-input-field"
                        />
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="auth-form-grid">
                      <div className="auth-input-group">
                        <label className="auth-input-label" htmlFor="reg-email">
                          Email Address *
                        </label>
                        <input
                          id="reg-email"
                          type="email"
                          required
                          placeholder="dummy.user@example.com"
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          className="auth-input-field"
                          autoComplete="email"
                        />
                      </div>

                      <div className="auth-input-group">
                        <label className="auth-input-label" htmlFor="reg-phone">
                          Phone Number (Optional)
                        </label>
                        <input
                          id="reg-phone"
                          type="tel"
                          placeholder="+1 (555) 019-2834"
                          value={regPhone}
                          onChange={(e) => setRegPhone(e.target.value)}
                          className="auth-input-field"
                        />
                      </div>
                    </div>

                    {/* Pro specific fields */}
                    {accountType === 'pro' && (
                      <div className="auth-form-grid bg-[#f9f9f9] p-4 rounded border border-[#eaeaea] mb-5">
                        <div className="auth-input-group !mb-0">
                          <label className="auth-input-label" htmlFor="reg-company">
                            Company Name *
                          </label>
                          <input
                            id="reg-company"
                            type="text"
                            required
                            placeholder="Sample Construction Co."
                            value={regCompanyName}
                            onChange={(e) => setRegCompanyName(e.target.value)}
                            className="auth-input-field bg-white"
                          />
                        </div>

                        <div className="auth-input-group !mb-0">
                          <label className="auth-input-label" htmlFor="reg-trade">
                            Primary Trade *
                          </label>
                          <select
                            id="reg-trade"
                            value={regTrade}
                            onChange={(e) => setRegTrade(e.target.value)}
                            className="auth-input-field bg-white"
                          >
                            <option value="Tile Installer">Tile Installer</option>
                            <option value="Flooring Contractor">Flooring Contractor</option>
                            <option value="General Contractor">General Contractor</option>
                            <option value="Interior Designer">Interior Designer</option>
                            <option value="Property Manager">Property Manager</option>
                            <option value="Home Builder">Home Builder / Remodeler</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* Password & Confirm */}
                    <div className="auth-form-grid">
                      <div className="auth-input-group">
                        <label className="auth-input-label" htmlFor="reg-password">
                          Password (8+ characters) *
                        </label>
                        <div className="auth-input-wrapper">
                          <input
                            id="reg-password"
                            type={showRegPassword ? 'text' : 'password'}
                            required
                            placeholder="Create password"
                            value={regPassword}
                            onChange={(e) => setRegPassword(e.target.value)}
                            className="auth-input-field pr-12"
                            autoComplete="new-password"
                          />
                          <button
                            type="button"
                            className="auth-password-toggle"
                            onClick={() => setShowRegPassword(!showRegPassword)}
                            aria-label={showRegPassword ? 'Hide password' : 'Show password'}
                          >
                            {showRegPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>

                      <div className="auth-input-group">
                        <label className="auth-input-label" htmlFor="reg-confirm">
                          Confirm Password *
                        </label>
                        <div className="auth-input-wrapper">
                          <input
                            id="reg-confirm"
                            type={showRegPassword ? 'text' : 'password'}
                            required
                            placeholder="Repeat password"
                            value={regConfirmPassword}
                            onChange={(e) => setRegConfirmPassword(e.target.value)}
                            className="auth-input-field"
                            autoComplete="new-password"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Opt In Checkbox */}
                    <div className="auth-checkbox-row !justify-start gap-2 mb-6">
                      <label className="auth-checkbox-label">
                        <input
                          type="checkbox"
                          checked={optInNews}
                          onChange={(e) => setOptInNews(e.target.checked)}
                        />
                        <span>Send me exclusive Floor & Decor offers, design trends, and pro announcements.</span>
                      </label>
                    </div>

                    <button type="submit" className="auth-submit-btn" disabled={isSubmitting}>
                      {isSubmitting ? 'Creating Account...' : 'Create Account'} <ArrowRight size={16} />
                    </button>

                    <p className="text-center text-[12px] text-[#777] mt-4">
                      By creating an account, you agree to Floor & Decor&apos;s{' '}
                      <a href="/terms" className="underline">Terms of Use</a> and{' '}
                      <a href="/privacy" className="underline">Privacy Policy</a>.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Simplified Footer */}
      <footer className="border-t border-[#e5e5e5] bg-white py-6 text-center text-[12px] text-[#777]">
        <div className="page-width flex flex-col md:flex-row items-center justify-between gap-3">
          <span>© 2026 Floor and Decor Outlets of America, Inc. All Rights Reserved.</span>
          <div className="flex gap-4">
            <a href="/privacy" className="hover:underline">Privacy Policy</a>
            <a href="/terms" className="hover:underline">Terms of Use</a>
            <a href="/accessibility" className="hover:underline">Accessibility</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
