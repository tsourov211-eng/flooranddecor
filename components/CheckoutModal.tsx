'use client';

import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Lock,
  CreditCard,
  Building,
  Store,
  Truck,
  ArrowRight,
  ShieldCheck,
  Check,
  Package,
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CheckoutModal() {
  const {
    items,
    totalCount,
    total,
    deliveryMethod,
    isCheckoutOpen,
    setIsCheckoutOpen,
    clearCart,
  } = useCart();

  const [step, setStep] = useState<'info' | 'payment' | 'success'>('info');
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'dummy.contact@example.com',
    phone: '+1 (555) 019-2834',
    address: '123 Dummy Street, Suite 400',
    city: 'Sample City',
    state: 'NY',
    zip: '10001',
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '08/28',
    cardCvv: '912',
    cardName: 'John Doe',
  });

  const [orderNumber, setOrderNumber] = useState('');

  if (!isCheckoutOpen) return null;

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedOrder = `FD-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrder);
    setStep('success');
    clearCart();
  };

  const closeAndReset = () => {
    setIsCheckoutOpen(false);
    setStep('info');
  };

  return (
    <div
      className="fixed inset-0 z-[2500] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={closeAndReset}
    >
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-[620px] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#111111] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Lock size={18} className="text-[#34c759]" />
            <h3 className="text-[16px] font-extrabold tracking-wide m-0 uppercase">
              Secure Checkout
            </h3>
          </div>
          <button
            onClick={closeAndReset}
            className="text-white/80 hover:text-white p-1"
            aria-label="Close checkout"
          >
            <X size={20} />
          </button>
        </div>

        {/* Progress Bar */}
        {step !== 'success' && (
          <div className="bg-[#fafafa] px-6 py-3 border-b border-[#eee] flex items-center justify-between text-[12px] font-bold">
            <span className={step === 'info' ? 'text-[#ed1c24]' : 'text-[#34c759]'}>
              1. Customer & {deliveryMethod === 'pickup' ? 'Pickup' : 'Shipping'}
            </span>
            <span className="text-[#ccc]">→</span>
            <span className={step === 'payment' ? 'text-[#ed1c24]' : 'text-[#888]'}>
              2. Payment & Confirmation
            </span>
          </div>
        )}

        {/* Body Content */}
        <div className="p-6">
          {step === 'info' && (
            <form onSubmit={handleInfoSubmit}>
              <h4 className="text-[16px] font-black uppercase text-[#111] mb-1">
                Customer & Delivery Information
              </h4>
              <p className="text-[13px] text-[#666] mb-4">
                {deliveryMethod === 'pickup'
                  ? 'Pickup ready at Main Distribution Store (123 Dummy Street, Sample City, NY 10001).'
                  : 'Freight liftgate delivery right to your driveway.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#333] mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full h-10 px-3 border border-[#ccc] rounded text-[13px] outline-none focus:border-[#111]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#333] mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full h-10 px-3 border border-[#ccc] rounded text-[13px] outline-none focus:border-[#111]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#333] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-10 px-3 border border-[#ccc] rounded text-[13px] outline-none focus:border-[#111]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#333] mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full h-10 px-3 border border-[#ccc] rounded text-[13px] outline-none focus:border-[#111]"
                  />
                </div>
              </div>

              {deliveryMethod === 'freight' && (
                <div className="mb-3">
                  <label className="block text-[11px] font-bold uppercase text-[#333] mb-1">
                    Delivery Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full h-10 px-3 border border-[#ccc] rounded text-[13px] outline-none focus:border-[#111] mb-2"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="City"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="h-10 px-3 border border-[#ccc] rounded text-[13px] outline-none focus:border-[#111]"
                    />
                    <input
                      type="text"
                      placeholder="State"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="h-10 px-3 border border-[#ccc] rounded text-[13px] outline-none focus:border-[#111]"
                    />
                    <input
                      type="text"
                      placeholder="ZIP"
                      required
                      value={formData.zip}
                      onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      className="h-10 px-3 border border-[#ccc] rounded text-[13px] outline-none focus:border-[#111]"
                    />
                  </div>
                </div>
              )}

              <div className="mt-5 pt-4 border-t border-[#eee] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex items-center justify-between sm:block">
                  <span className="text-[12px] text-[#666] block">Order Total:</span>
                  <strong className="text-[18px] text-[#ed1c24]">${total.toFixed(2)}</strong>
                </div>
                <button
                  type="submit"
                  className="bg-[#ed1c24] text-white px-6 h-11 rounded font-bold uppercase text-[13px] tracking-wider hover:bg-[#c41219] transition-colors flex items-center justify-center gap-2"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </form>
          )}

          {step === 'payment' && (
            <form onSubmit={handlePaymentSubmit}>
              <h4 className="text-[16px] font-black uppercase text-[#111] mb-1">
                Payment Details
              </h4>
              <p className="text-[13px] text-[#666] mb-4 flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-[#34c759]" />
                256-Bit SSL Encrypted & Protected.
              </p>

              <div className="bg-[#f9f9f9] p-4 rounded border border-[#e5e5e5] mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[13px] font-bold text-[#111] flex items-center gap-2">
                    <CreditCard size={18} className="text-[#ed1c24]" />
                    Credit or Debit Card
                  </span>
                  <div className="flex gap-1.5 text-[10px] font-extrabold text-[#777]">
                    <span className="bg-white border px-1.5 py-0.5 rounded">VISA</span>
                    <span className="bg-white border px-1.5 py-0.5 rounded">MC</span>
                    <span className="bg-white border px-1.5 py-0.5 rounded">AMEX</span>
                    <span className="bg-white border px-1.5 py-0.5 rounded">DISC</span>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="block text-[11px] font-bold uppercase text-[#333] mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.cardName}
                    onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                    className="w-full h-10 px-3 bg-white border border-[#ccc] rounded text-[13px] outline-none focus:border-[#111]"
                  />
                </div>

                <div className="mb-3">
                  <label className="block text-[11px] font-bold uppercase text-[#333] mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    className="w-full h-10 px-3 bg-white border border-[#ccc] rounded text-[13px] outline-none focus:border-[#111]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-[#333] mb-1">
                      Expiration (MM/YY)
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.cardExp}
                      onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                      className="w-full h-10 px-3 bg-white border border-[#ccc] rounded text-[13px] outline-none focus:border-[#111]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-[#333] mb-1">
                      CVV / Security Code
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.cardCvv}
                      onChange={(e) => setFormData({ ...formData, cardCvv: e.target.value })}
                      className="w-full h-10 px-3 bg-white border border-[#ccc] rounded text-[13px] outline-none focus:border-[#111]"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('info')}
                  className="text-[13px] text-[#555] hover:text-[#111] underline text-center sm:text-left py-1"
                >
                  ← Back to info
                </button>
                <button
                  type="submit"
                  className="bg-[#ed1c24] text-white px-6 h-12 rounded font-extrabold uppercase text-[14px] tracking-wider hover:bg-[#c41219] transition-colors shadow-md flex items-center justify-center"
                >
                  Pay & Place Order (${total.toFixed(2)})
                </button>
              </div>
            </form>
          )}

          {step === 'success' && (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-[#e8f5e9] text-[#2e7d32] flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={38} />
              </div>
              <h3 className="text-[22px] font-black uppercase text-[#111] mb-1">
                Thank You for Your Order!
              </h3>
              <p className="text-[14px] text-[#666] mb-4">
                Your order number is <strong className="text-[#111]">{orderNumber}</strong>.
              </p>

              <div className="bg-[#f9f9f9] border border-[#e5e5e5] rounded-lg p-4 text-left max-w-[440px] mx-auto text-[13px] text-[#444] mb-6">
                <div className="flex justify-between pb-2 border-b border-[#eee] mb-2 font-semibold">
                  <span>Fulfillment Method:</span>
                  <span className="text-[#ed1c24]">
                    {deliveryMethod === 'pickup' ? 'In-Store Pickup (Main Distribution Store)' : 'Driveway Freight Delivery'}
                  </span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#eee] mb-2">
                  <span>Customer Name:</span>
                  <strong>{formData.firstName} {formData.lastName}</strong>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#eee] mb-2">
                  <span>Confirmation Sent To:</span>
                  <strong>{formData.email}</strong>
                </div>
                <div className="flex justify-between text-[#2e7d32] font-bold">
                  <span>Status:</span>
                  <span>Payment Confirmed • Processing</span>
                </div>
              </div>

              <button
                type="button"
                onClick={closeAndReset}
                className="bg-[#111111] text-white px-8 py-3 rounded font-bold uppercase text-[13px] tracking-wider hover:bg-[#333] transition-colors"
              >
                Return to Home
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
