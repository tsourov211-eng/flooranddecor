'use client';

import React, { useState } from 'react';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  Store,
  Truck,
  ShieldCheck,
  Tag,
  CheckCircle2,
  RefreshCw,
  Search,
  UserRound,
  Heart,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CartPage() {
  const {
    items,
    totalCount,
    subtotal,
    tax,
    deliveryFee,
    discount,
    total,
    promoCode,
    promoApplied,
    promoError,
    deliveryMethod,
    setDeliveryMethod,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyPromo,
    removePromo,
    setIsCheckoutOpen,
    setIsCartOpen,
  } = useCart();

  const [inputPromo, setInputPromo] = useState('');
  const [activeNavCategory, setActiveNavCategory] = useState('');

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPromo.trim()) {
      const ok = applyPromo(inputPromo);
      if (ok) setInputPromo('');
    }
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
    <div className="min-h-screen bg-[#fbfbfb] flex flex-col">
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
              <a
                key={item.name}
                href={item.href}
                className="red-nav-item"
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* 2. Main Cart Content */}
      <main className="flex-1 py-10">
        <div className="page-width">
          {/* Breadcrumb / Navigation helper */}
          <div className="mb-6 flex items-center justify-between">
            <a href="/products" className="text-[13px] text-[#666] hover:text-[#ed1c24] flex items-center gap-1.5 font-semibold">
              <ArrowLeft size={16} />
              <span>Continue Shopping</span>
            </a>
            {items.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="text-[12px] text-[#888] hover:text-[#ed1c24] transition-colors"
              >
                Clear All Items
              </button>
            )}
          </div>

          <h1 className="text-[28px] font-black uppercase text-[#111] mb-6">
            Shopping Cart <span className="text-[#777] font-semibold text-[20px]">({totalCount} items)</span>
          </h1>

          {items.length === 0 ? (
            <div className="bg-white rounded-lg border border-[#e5e5e5] p-12 text-center shadow-sm">
              <div className="w-20 h-20 rounded-full bg-[#f4f4f4] flex items-center justify-center mx-auto mb-4 text-[#aaa]">
                <ShoppingCart size={40} strokeWidth={1.5} />
              </div>
              <h2 className="text-[22px] font-extrabold text-[#111] mb-2">Your Shopping Cart is Empty</h2>
              <p className="text-[14px] text-[#666] max-w-[400px] mx-auto mb-6">
                You haven&apos;t added any products to your cart yet. Explore thousands of tiles, stones, and flooring in stock today.
              </p>
              <a
                href="/products"
                className="bg-[#ed1c24] text-white px-8 py-3.5 rounded font-extrabold uppercase text-[13px] tracking-wider hover:bg-[#c41219] transition-all inline-flex items-center gap-2 shadow-md"
              >
                <span>Shop All Products</span>
                <ArrowRight size={16} />
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Left 2 Columns: Items List & Fulfillment */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                {/* Free Store Pickup Banner */}
                <div className="bg-[#f0f9f1] border border-[#bfe3c5] rounded-lg p-4 flex items-center gap-3 text-[13px] text-[#246b2b]">
                  <Store size={20} className="shrink-0" />
                  <div>
                    <strong>Fast & Free In-Store Pickup:</strong> Ready in as little as 2 hours at the <strong>Main Store Location</strong>.
                  </div>
                </div>

                {/* Items Card */}
                <div className="bg-white rounded-lg border border-[#e5e5e5] shadow-sm divide-y divide-[#eee] overflow-hidden">
                  {items.map((item) => (
                    <div key={item.id} className="p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                      {/* Image */}
                      <div className="w-20 h-20 bg-[#f8f8f8] border border-[#e5e5e5] rounded overflow-hidden shrink-0">
                        <img
                          src={
                            item.image ||
                            'https://images.pexels.com/photos/7587862/pexels-photo-7587862.jpeg?auto=compress&cs=tinysrgb&w=300'
                          }
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[15px] font-bold text-[#111] leading-snug mb-1">
                          {item.name}
                        </h3>
                        <p className="text-[12px] text-[#666] m-0">
                          {item.size && <span>Size: {item.size} • </span>}
                          <span>${item.priceNumber.toFixed(2)} / {item.unit || 'sq. ft.'}</span>
                        </p>
                        <span className="inline-block mt-2 text-[11px] font-bold text-[#34c759] bg-[#e8f5e9] px-2 py-0.5 rounded">
                          In Stock for Pickup or Freight
                        </span>
                      </div>

                      {/* Stepper */}
                      <div className="flex items-center justify-between sm:justify-start gap-3 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#eee]">
                        <div className="flex items-center border border-[#ccc] rounded bg-white h-9">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-full flex items-center justify-center text-[#555] hover:bg-[#f2f2f2] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-10 text-center text-[13px] font-bold text-[#111]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-full flex items-center justify-center text-[#555] hover:bg-[#f2f2f2] transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        {/* Line Total */}
                        <div className="text-right sm:min-w-[90px]">
                          <strong className="text-[17px] font-black text-[#111] block">
                            ${(item.priceNumber * item.quantity).toFixed(2)}
                          </strong>
                        </div>

                        {/* Remove */}
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#999] hover:text-[#ed1c24] p-1.5 transition-colors ml-auto sm:ml-0"
                          title="Remove item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Preference Box */}
                <div className="bg-white rounded-lg border border-[#e5e5e5] p-5 shadow-sm">
                  <h3 className="text-[15px] font-black uppercase text-[#111] mb-3">
                    Choose Fulfillment Option
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label
                      className={`flex items-start gap-3 p-3.5 border rounded-lg cursor-pointer transition-all ${
                        deliveryMethod === 'pickup'
                          ? 'border-[#ed1c24] bg-[#fffbfb] shadow-sm'
                          : 'border-[#ddd] hover:border-[#aaa]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="deliveryMethod"
                        checked={deliveryMethod === 'pickup'}
                        onChange={() => setDeliveryMethod('pickup')}
                        className="mt-1 accent-[#ed1c24]"
                      />
                      <div>
                        <strong className="block text-[14px] text-[#111]">Free Store Pickup</strong>
                        <span className="text-[12px] text-[#666]">Floor & Decor Main Store & Hub</span>
                        <span className="block text-[11px] text-[#34c759] font-bold mt-1">Ready in 2 Hours • FREE</span>
                      </div>
                    </label>

                    <label
                      className={`flex items-start gap-3 p-3.5 border rounded-lg cursor-pointer transition-all ${
                        deliveryMethod === 'freight'
                          ? 'border-[#ed1c24] bg-[#fffbfb] shadow-sm'
                          : 'border-[#ddd] hover:border-[#aaa]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="deliveryMethod"
                        checked={deliveryMethod === 'freight'}
                        onChange={() => setDeliveryMethod('freight')}
                        className="mt-1 accent-[#ed1c24]"
                      />
                      <div>
                        <strong className="block text-[14px] text-[#111]">Driveway Freight Delivery</strong>
                        <span className="text-[12px] text-[#666]">Palletized delivery directly to your home</span>
                        <span className="block text-[11px] text-[#111] font-bold mt-1">
                          {promoCode === 'FREESHIP' ? (
                            <span className="text-[#34c759]">FREE (Coupon Applied)</span>
                          ) : (
                            '$49.00 flat rate'
                          )}
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column: Sticky Order Summary */}
              <div className="bg-white rounded-lg border border-[#e5e5e5] p-6 shadow-sm sticky top-6">
                <h2 className="text-[18px] font-black uppercase text-[#111] pb-3 border-b border-[#eee] mb-4">
                  Order Summary
                </h2>

                {/* Promo Box */}
                <div className="mb-5 pb-5 border-b border-[#eee]">
                  <label className="block text-[11px] font-bold uppercase text-[#555] mb-1.5">
                    Have a Promo Code?
                  </label>
                  {promoApplied ? (
                    <div className="flex items-center justify-between bg-[#edf7ee] border border-[#c3e6c8] p-2.5 rounded text-[12px] text-[#2e7d32] font-semibold">
                      <div className="flex items-center gap-1.5">
                        <Tag size={15} />
                        <span>Code &quot;{promoCode}&quot; Active (-15%)</span>
                      </div>
                      <button
                        type="button"
                        onClick={removePromo}
                        className="text-[#c41219] hover:underline font-bold text-[11px]"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyPromo} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter SAVE15"
                        value={inputPromo}
                        onChange={(e) => setInputPromo(e.target.value)}
                        className="flex-1 h-10 border border-[#ccc] rounded px-3 text-[13px] outline-none focus:border-[#111] uppercase font-semibold"
                      />
                      <button
                        type="submit"
                        className="bg-[#111] text-white px-4 h-10 rounded text-[12px] font-extrabold uppercase hover:bg-black transition-colors"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                  {promoError && (
                    <span className="text-[11px] text-[#ed1c24] mt-1 block font-medium">
                      {promoError}
                    </span>
                  )}
                </div>

                {/* Costs Breakdown */}
                <div className="flex flex-col gap-2.5 text-[14px] text-[#555] mb-5">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <strong className="text-[#111]">${subtotal.toFixed(2)}</strong>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[#2e7d32] font-bold">
                      <span>Promo Savings ({promoCode})</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Estimated Sales Tax (7.5%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fulfillment</span>
                    <span>
                      {deliveryFee === 0 ? (
                        <strong className="text-[#2e7d32]">FREE</strong>
                      ) : (
                        `$${deliveryFee.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  <div className="border-t border-[#ddd] pt-3 mt-2 flex justify-between text-[20px] font-black text-[#111]">
                    <span>Estimated Total</span>
                    <span className="text-[#ed1c24]">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  type="button"
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full h-12 bg-[#ed1c24] text-white font-extrabold uppercase text-[14px] tracking-wider rounded hover:bg-[#c41219] transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg mb-4"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={17} />
                </button>

                {/* Guarantees */}
                <div className="flex flex-col gap-2 pt-4 border-t border-[#eee] text-[12px] text-[#666]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-[#34c759]" />
                    <span>Safe & Secure 256-Bit SSL Checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RefreshCw size={16} className="text-[#ed1c24]" />
                    <span>90-Day Hassle-Free In-Store Returns</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* 3. Footer */}
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
