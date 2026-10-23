'use client';

import React, { useState } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingCart,
  ArrowRight,
  Tag,
  CheckCircle2,
  Store,
  Truck,
  ShieldCheck,
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
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
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    toast,
  } = useCart();

  const [inputCode, setInputCode] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim()) {
      const ok = applyPromo(inputCode);
      if (ok) setInputCode('');
    }
  };

  return (
    <>
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-6 right-6 z-[3000] bg-[#111111] text-white px-5 py-3.5 rounded shadow-2xl flex items-center gap-3 border-l-4 border-[#ed1c24] text-[13px] font-medium transition-all">
          <CheckCircle2 size={18} className="text-[#34c759]" />
          <span>{toast}</span>
        </div>
      )}

      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2100] transition-opacity"
        onClick={() => setIsCartOpen(false)}
        aria-label="Close cart"
      />

      {/* Slide-out Drawer Panel */}
      <div
        className="fixed top-0 right-0 h-full w-full max-w-[460px] bg-white z-[2200] shadow-2xl flex flex-col transition-transform duration-300 ease-out"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#e5e5e5] bg-[#fafafa]">
          <div className="flex items-center gap-2">
            <ShoppingCart size={22} className="text-[#ed1c24]" />
            <h2 className="text-[17px] font-bold text-[#111] tracking-tight m-0">
              Your Shopping Cart ({totalCount})
            </h2>
          </div>
          <button
            type="button"
            className="p-1.5 rounded-full hover:bg-[#e8e8e8] text-[#555] transition-colors"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Store Pickup Notice */}
        <div className="bg-[#f0f9f1] border-b border-[#d7ecd9] px-4 py-2.5 flex items-center gap-2.5 text-[12.5px] text-[#246b2b] font-medium">
          <Store size={16} className="text-[#246b2b] shrink-0" />
          <span>
            <strong>Free In-Store Pickup</strong> available at Main Store (Ready in 2 hours)!
          </span>
        </div>

        {/* Cart Items List / Body */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#eeeeee]">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="w-20 h-20 rounded-full bg-[#f4f4f4] flex items-center justify-center mb-4 text-[#aaa]">
                <ShoppingCart size={38} strokeWidth={1.5} />
              </div>
              <h3 className="text-[18px] font-extrabold text-[#111] mb-1">Your cart is empty</h3>
              <p className="text-[13px] text-[#666] max-w-[280px] mb-6">
                Discover exceptional tiles, hardwood, stone, and luxury vinyl for your makeover.
              </p>
              <a
                href="/products"
                onClick={() => setIsCartOpen(false)}
                className="bg-[#ed1c24] text-white px-6 py-3 rounded font-bold text-[13px] uppercase tracking-wider hover:bg-[#c41219] transition-colors inline-flex items-center gap-2"
              >
                <span>Browse Products</span>
                <ArrowRight size={15} />
              </a>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-3.5">
                  {/* Thumbnail */}
                  <div className="w-[72px] h-[72px] bg-[#f5f5f5] rounded border border-[#e5e5e5] overflow-hidden shrink-0">
                    <img
                      src={
                        item.image ||
                        'https://images.pexels.com/photos/7587862/pexels-photo-7587862.jpeg?auto=compress&cs=tinysrgb&w=300'
                      }
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-[13px] font-bold text-[#111] leading-snug line-clamp-2 m-0">
                        {item.name}
                      </h4>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#999] hover:text-[#ed1c24] p-1 transition-colors shrink-0"
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="text-[12px] text-[#666] mt-0.5">
                      {item.size && <span>{item.size} • </span>}
                      <span>${item.priceNumber.toFixed(2)} / {item.unit || 'sq. ft.'}</span>
                    </div>

                    {/* Stepper & Line Price */}
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center border border-[#d5d5d5] rounded bg-[#ffffff] h-7">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-full flex items-center justify-center text-[#555] hover:bg-[#f2f2f2] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="w-8 text-center text-[12px] font-bold text-[#111]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-full flex items-center justify-center text-[#555] hover:bg-[#f2f2f2] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <div className="text-[14px] font-black text-[#111]">
                        ${(item.priceNumber * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Calculations and Checkout */}
        {items.length > 0 && (
          <div className="border-t border-[#e2e2e2] bg-[#fafafa] p-5 shadow-inner">
            {/* Promo Code Box */}
            <div className="mb-4">
              {promoApplied ? (
                <div className="flex items-center justify-between bg-[#eef8f0] border border-[#bce2c2] p-2.5 rounded text-[12px] text-[#2e7d32] font-semibold">
                  <div className="flex items-center gap-2">
                    <Tag size={15} />
                    <span>Coupon &quot;{promoCode}&quot; Active</span>
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
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Promo code (try SAVE15)"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      className="w-full h-9 text-[12px] border border-[#ccc] rounded px-3 outline-none focus:border-[#111] uppercase"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#222] text-white px-3.5 h-9 rounded text-[11px] font-bold uppercase hover:bg-black transition-colors"
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

            {/* Delivery Method Selector */}
            <div className="grid grid-cols-2 gap-2 mb-4 text-[12px]">
              <button
                type="button"
                onClick={() => setDeliveryMethod('pickup')}
                className={`p-2.5 border rounded text-left flex flex-col gap-1 transition-all ${
                  deliveryMethod === 'pickup'
                    ? 'border-[#ed1c24] bg-white text-[#111] shadow-sm'
                    : 'border-[#ddd] bg-[#f5f5f5] text-[#666]'
                }`}
              >
                <span className="flex items-center gap-1.5 font-bold">
                  <Store size={14} className={deliveryMethod === 'pickup' ? 'text-[#ed1c24]' : ''} />
                  Store Pickup
                </span>
                <span className="text-[11px] text-[#34c759] font-bold">FREE</span>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryMethod('freight')}
                className={`p-2.5 border rounded text-left flex flex-col gap-1 transition-all ${
                  deliveryMethod === 'freight'
                    ? 'border-[#ed1c24] bg-white text-[#111] shadow-sm'
                    : 'border-[#ddd] bg-[#f5f5f5] text-[#666]'
                }`}
              >
                <span className="flex items-center gap-1.5 font-bold">
                  <Truck size={14} className={deliveryMethod === 'freight' ? 'text-[#ed1c24]' : ''} />
                  Freight Delivery
                </span>
                <span className="text-[11px]">
                  {promoCode === 'FREESHIP' ? (
                    <span className="text-[#34c759] font-bold">FREE</span>
                  ) : (
                    '$49.00'
                  )}
                </span>
              </button>
            </div>

            {/* Price Calculations */}
            <div className="flex flex-col gap-1.5 text-[13px] text-[#555] mb-4">
              <div className="flex justify-between">
                <span>Subtotal ({totalCount} items)</span>
                <span className="font-semibold text-[#111]">${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#2e7d32] font-semibold">
                  <span>Promo Savings ({promoCode})</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Sales Tax (7.5%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery / Pickup</span>
                <span>{deliveryFee === 0 ? <strong className="text-[#2e7d32]">FREE</strong> : `$${deliveryFee.toFixed(2)}`}</span>
              </div>
              <div className="border-t border-[#ddd] pt-2 mt-1 flex justify-between text-[16px] font-black text-[#111]">
                <span>Estimated Total</span>
                <span className="text-[#ed1c24]">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              type="button"
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
              className="w-full h-12 bg-[#ed1c24] text-white font-extrabold uppercase text-[14px] tracking-wider rounded hover:bg-[#c41219] transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={17} />
            </button>

            {/* Bottom Secondary Links */}
            <div className="flex justify-between items-center mt-3 text-[12px]">
              <a
                href="/cart"
                onClick={() => setIsCartOpen(false)}
                className="text-[#555] hover:text-[#111] underline font-medium"
              >
                View Full Cart Details
              </a>
              <button
                type="button"
                onClick={clearCart}
                className="text-[#999] hover:text-[#ed1c24] transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
