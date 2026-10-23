'use client';

import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Search,
  UserRound,
  Heart,
  ShoppingCart,
  MessageSquare,
  HelpCircle,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function ContactPage() {
  const { totalCount, setIsCartOpen } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    orderNumber: '',
    subject: 'Order Inquiry',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        orderNumber: '',
        subject: 'Order Inquiry',
        message: '',
      });
    }, 1000);
  };

  const primaryNavCategories = [
    { name: 'Tile', href: '/products?category=Tile' },
    { name: 'Stone', href: '/products?category=Stone' },
    { name: 'Wood', href: '/products?category=Wood' },
    { name: 'Laminate', href: '/products?category=Laminate' },
    { name: 'Vinyl', href: '/products?category=Vinyl' },
    { name: 'Fixtures', href: '/products?category=Fixtures' },
    { name: 'Installation Materials', href: '/products?category=Installation%20Materials' },
    { name: 'Shop By Room', href: '/products?category=Shop%20By%20Room' },
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex flex-col">
      {/* 1. Header */}
      <div className="site-top-accent" />
      <header className="site-header">
        <div className="header-main-clean">
          <a href="/" className="brand-clean-link" aria-label="Floor & Decor Home">
            <img src="/logo.png" alt="Floor & Decor" className="brand-clean-logo" />
          </a>

          <div className="relative flex-1 max-w-[680px]">
            <div className="search-box-clean">
              <input type="text" placeholder="Search..." aria-label="Search products" />
              <button className="search-clean-btn" aria-label="Submit search">
                <Search size={18} strokeWidth={2.2} />
              </button>
            </div>
          </div>

          <div className="header-actions-clean">
            <a href="/login" className="action-clean-item" aria-label="Log In">
              <UserRound size={26} strokeWidth={1.8} />
              <span>Log In</span>
            </a>
            <a href="/" className="action-clean-item" aria-label="My Projects">
              <Heart size={26} strokeWidth={1.8} />
              <span>My Projects</span>
            </a>
            <button
              className="action-clean-item"
              aria-label="View Cart"
              onClick={() => setIsCartOpen(true)}
            >
              <div className="cart-box-clean">
                <ShoppingCart size={26} strokeWidth={1.8} />
                <span className="cart-badge-black">{totalCount}</span>
              </div>
            </button>
          </div>
        </div>

        <div className="primary-red-nav-bar">
          <nav className="primary-red-nav-inner">
            {primaryNavCategories.map((item) => (
              <a key={item.name} href={item.href} className="red-nav-item">
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-10">
        <div className="page-width">
          {/* Header Banner */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[12px] font-black uppercase tracking-widest text-[#ed1c24] block mb-2">
              WE ARE HERE TO HELP
            </span>
            <h1 className="text-[32px] sm:text-[38px] font-black text-[#111] uppercase tracking-tight mb-3">
              Contact Customer Care
            </h1>
            <p className="text-[15px] text-[#666] leading-relaxed">
              Have questions regarding orders, in-store pickup, product inquiries, or commercial trade accounts?
              Get in touch with our team using the dummy contact channels below.
            </p>
          </div>

          {/* Contact Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Card 1: Customer Phone */}
            <div className="bg-white p-6 rounded-xl border border-[#e5e5e5] shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#fff0f0] text-[#ed1c24] flex items-center justify-center mb-4">
                <Phone size={22} />
              </div>
              <h3 className="text-[16px] font-extrabold text-[#111] uppercase mb-1">Telephone Support</h3>
              <p className="text-[13px] text-[#666] mb-3">Toll-free customer assistance</p>
              <div className="mt-auto">
                <span className="block text-[16px] font-black text-[#111] mb-1">+1 (555) 019-2834</span>
                <span className="block text-[13px] font-semibold text-[#666]">PRO Desk: +1 (555) 019-5678</span>
              </div>
            </div>

            {/* Card 2: Email */}
            <div className="bg-white p-6 rounded-xl border border-[#e5e5e5] shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#fff0f0] text-[#ed1c24] flex items-center justify-center mb-4">
                <Mail size={22} />
              </div>
              <h3 className="text-[16px] font-extrabold text-[#111] uppercase mb-1">Email Care</h3>
              <p className="text-[13px] text-[#666] mb-3">We typically respond within 24 hours</p>
              <div className="mt-auto">
                <span className="block text-[15px] font-bold text-[#ed1c24] mb-1">support@example.com</span>
                <span className="block text-[13px] font-medium text-[#666]">prosupport@example.com</span>
              </div>
            </div>

            {/* Card 3: Location & Hours */}
            <div className="bg-white p-6 rounded-xl border border-[#e5e5e5] shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#fff0f0] text-[#ed1c24] flex items-center justify-center mb-4">
                <MapPin size={22} />
              </div>
              <h3 className="text-[16px] font-extrabold text-[#111] uppercase mb-1">Store & Distribution Hub</h3>
              <p className="text-[13px] text-[#666] mb-3">Main Customer Fulfillment Center</p>
              <div className="mt-auto">
                <span className="block text-[13.5px] font-bold text-[#111]">123 Dummy Boulevard, Suite 400</span>
                <span className="block text-[13px] text-[#666]">Sample City, NY 10001</span>
              </div>
            </div>
          </div>

          {/* Operating Hours Banner */}
          <div className="bg-white border border-[#e5e5e5] rounded-xl p-5 mb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#f4f4f4] text-[#333] flex items-center justify-center shrink-0">
                <Clock size={20} />
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-[#111]">Support Hours (EST)</h4>
                <p className="text-[12.5px] text-[#666]">
                  Monday – Saturday: 7:00 AM – 9:00 PM • Sunday: 10:00 AM – 6:00 PM
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[12px] font-bold text-[#2e7d32] bg-[#e8f5e9] px-3.5 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#2e7d32]" />
              Support Team Currently Online
            </div>
          </div>

          {/* Two-Column Form & Quick FAQ */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-[#e5e5e5] p-6 sm:p-8 shadow-sm">
              <h2 className="text-[20px] font-black uppercase text-[#111] mb-2 flex items-center gap-2">
                <MessageSquare size={20} className="text-[#ed1c24]" />
                Send Us a Message
              </h2>
              <p className="text-[13px] text-[#666] mb-6">
                Fill out the form below with your inquiry and our customer care team will get back to you promptly.
              </p>

              {isSubmitted ? (
                <div className="bg-[#e8f5e9] border border-[#c8e6c9] rounded-lg p-6 text-center text-[#2e7d32]">
                  <CheckCircle2 size={36} className="mx-auto mb-2 text-[#2e7d32]" />
                  <h3 className="text-[16px] font-bold mb-1">Message Sent Successfully!</h3>
                  <p className="text-[13px] text-[#444]">
                    Thank you for reaching out. A dummy support ticket has been logged and our team will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 px-4 py-2 bg-[#2e7d32] text-white rounded font-bold text-[12px] uppercase tracking-wider"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-[#333] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full h-11 px-3.5 border border-[#ccc] rounded text-[13px] outline-none focus:border-[#111]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-[#333] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="dummy.contact@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full h-11 px-3.5 border border-[#ccc] rounded text-[13px] outline-none focus:border-[#111]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-[#333] mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 019-2834"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full h-11 px-3.5 border border-[#ccc] rounded text-[13px] outline-none focus:border-[#111]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-[#333] mb-1">
                        Order Number (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="FD-123456"
                        value={formData.orderNumber}
                        onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                        className="w-full h-11 px-3.5 border border-[#ccc] rounded text-[13px] outline-none focus:border-[#111]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-[#333] mb-1">
                      Inquiry Topic *
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full h-11 px-3.5 border border-[#ccc] rounded text-[13px] outline-none focus:border-[#111] bg-white"
                    >
                      <option value="Order Inquiry">Order Status & Fulfillment</option>
                      <option value="Store Pickup">Free In-Store Pickup Details</option>
                      <option value="Returns">Returns, Exchanges & Damaged Tile</option>
                      <option value="Pro Trade">Commercial & PRO Premier Desk</option>
                      <option value="Design">Free Design Appointment</option>
                      <option value="General">General Questions</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-[#333] mb-1">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Please write your inquiry details here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-3.5 border border-[#ccc] rounded text-[13px] outline-none focus:border-[#111]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 h-12 bg-[#ed1c24] hover:bg-[#c41219] text-white font-extrabold uppercase text-[13px] tracking-wider rounded transition-all flex items-center justify-center gap-2"
                  >
                    <span>Submit Message</span>
                    <Send size={15} />
                  </button>
                </form>
              )}
            </div>

            {/* Quick Assistance Help Card */}
            <div className="flex flex-col gap-6">
              <div className="bg-white rounded-xl border border-[#e5e5e5] p-6 shadow-sm">
                <h3 className="text-[16px] font-black uppercase text-[#111] mb-3 flex items-center gap-2">
                  <HelpCircle size={18} className="text-[#ed1c24]" />
                  Common Questions
                </h3>
                <div className="space-y-4 text-[13px] text-[#555]">
                  <div>
                    <strong className="block text-[#111] font-bold mb-1">How does In-Store Pickup work?</strong>
                    <p>Orders are processed and ready for curbside or customer pickup in as little as 2 hours at the main store.</p>
                  </div>
                  <div>
                    <strong className="block text-[#111] font-bold mb-1">What is the return policy?</strong>
                    <p>We provide a 90-day hassle-free return guarantee with valid proof of purchase.</p>
                  </div>
                  <div>
                    <strong className="block text-[#111] font-bold mb-1">Need trade contractor pricing?</strong>
                    <p>Contact our PRO Premier desk directly at +1 (555) 019-5678 or register for a PRO account.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="site-footer mt-16">
        <div className="footer-equity-bar">Bring It Home™</div>
        <div className="page-width">
          <div className="footer-bottom-bar !border-t-0">
            <span>© 2026 Floor and Decor Outlets of America, Inc. All Rights Reserved.</span>
            <div className="footer-legal-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Use</a>
              <a href="/accessibility">Accessibility</a>
              <a href="/sitemap">Site Map</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
