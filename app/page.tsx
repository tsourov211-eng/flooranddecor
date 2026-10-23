'use client';

import { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  Menu,
  MessageSquare,
  Phone,
  Search,
  ShoppingCart,
  Star,
  Store,
  UserRound,
  X,
  CheckCircle2,
  HelpCircle,
  Clock,
  MapPin,
  ExternalLink,
  ZoomIn,
} from 'lucide-react';
import { useCart } from '../context/CartContext';

// Amplience CDN Base & Authentic Assets from Floor & Decor live homepage
const AMPLIENCE_BASE = 'https://i8.amplience.net/i/flooranddecor';

const heroSlidesData = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/276554/pexels-photo-276554.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'European Natural Oak Engineered Hardwood Flooring',
    tag: 'Engineered Hardwood',
    title: 'European Natural Oak',
    href: '/products?category=wood',
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/3935350/pexels-photo-3935350.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'Luxury Polished Carrara Marble Bath Tile Suite',
    tag: 'Marble & Porcelain',
    title: 'Polished Carrara Marble',
    href: '/products?category=marble',
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'Gourmet Kitchen with Designer Tile Backsplash',
    tag: 'Kitchen & Backsplash',
    title: 'Designer Ceramic & Mosaics',
    href: '/products?category=backsplash',
  },
  {
    id: 4,
    image: 'https://images.pexels.com/photos/2082087/pexels-photo-2082087.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'Rich Dark Walnut Rigid Core Luxury Vinyl Plank',
    tag: '100% Waterproof',
    title: 'Rigid Core Luxury Vinyl',
    href: '/products?category=vinyl',
  },
  {
    id: 5,
    image: 'https://images.pexels.com/photos/6492403/pexels-photo-6492403.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'Modern Scandinavian Architectural Tile & Hardwood',
    tag: 'Architectural Stone',
    title: 'Scandinavian Stone & Tile',
    href: '/products?category=stone',
  },
];

const assets = {
  heroMain: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920',
  heroSide1: 'https://images.pexels.com/photos/8134805/pexels-photo-8134805.jpeg?auto=compress&cs=tinysrgb&w=1200',
  heroSide2: 'https://images.pexels.com/photos/7587862/pexels-photo-7587862.jpeg?auto=compress&cs=tinysrgb&w=1200',
  creditCardBanner: `${AMPLIENCE_BASE}/hp-credit-15-percent-in-store-desktop?w=1920&fmt=auto&qlt=default&v=090126031500`,
  noteworthyPorcelain: `${AMPLIENCE_BASE}/noteworthy-porcelain-10-26?w=600&fmt=auto&qlt=default`,
  noteworthyLaminate: `${AMPLIENCE_BASE}/noteworthy-waterproof-lam-10-26?w=600&fmt=auto&qlt=default`,
  noteworthyHardwood: `${AMPLIENCE_BASE}/noteworthy-engineered-harwood-10-26?w=600&fmt=auto&qlt=default`,
  wideDisplayHoliday: `${AMPLIENCE_BASE}/get-inspired-wide-display-10-26?w=1920&fmt=auto&qlt=default`,
  exploreCheckerboard: `${AMPLIENCE_BASE}/explore-checkerboard-10-26?w=400&fmt=auto&qlt=default`,
  exploreBrownFloors: `${AMPLIENCE_BASE}/explore-brown-floors-10-26?w=400&fmt=auto&qlt=default`,
  exploreFireplaces: `${AMPLIENCE_BASE}/explore-fireplaces-10-26?w=400&fmt=auto&qlt=default`,
  exploreSubwayTile: `${AMPLIENCE_BASE}/explore-subway-tile-10-26?w=400&fmt=auto&qlt=default`,
  rprpBanner: `${AMPLIENCE_BASE}/rprp-promo-banner-live-desktop?w=1360&fmt=auto&qlt=default`,
  visualizerBanner: `${AMPLIENCE_BASE}/hp-visualizer-banner-1360x85?w=1920&fmt=auto&qlt=default`,
  designServices: `${AMPLIENCE_BASE}/hp-design-services-2?w=400&fmt=auto&qlt=default`,
  creditServices: `${AMPLIENCE_BASE}/hp-consumer-credit-services-plcc-2?w=400&fmt=auto&qlt=default`,
  howToVideos: `${AMPLIENCE_BASE}/hp-how-to-videos-316x175?w=400&fmt=auto&qlt=default`,
  proServices: `${AMPLIENCE_BASE}/hp-pro-services-316x175?w=400&fmt=auto&qlt=default`,
  imeLogo: `${AMPLIENCE_BASE}/ime-logo?w=425&fmt=auto&qlt=default`,
  // Submenu thumbs
  thumbInspiration: `${AMPLIENCE_BASE}/sec-nav-inspiration-center-sm?w=225&fmt=auto&qlt=default`,
  thumbVisualizer: `${AMPLIENCE_BASE}/sec-nav-visualizer-sm?w=225&fmt=auto&qlt=default`,
  thumbBlog: `${AMPLIENCE_BASE}/sec-nav-blogs-sm?w=225&fmt=auto&qlt=default`,
  thumbVideos: `${AMPLIENCE_BASE}/sec-nav-videos-sm?w=225&fmt=auto&qlt=default`,
  thumbGalleries: `${AMPLIENCE_BASE}/sec-nav-galleries-sm?w=225&fmt=auto&qlt=default`,
  thumbCatalogs: `${AMPLIENCE_BASE}/sec-nav-catalogs-sm?w=225&fmt=auto&qlt=default`,
  thumbRprp: `${AMPLIENCE_BASE}/sec-nav-rprp-sm?w=225&fmt=auto&qlt=default`,
  thumbTrends: `${AMPLIENCE_BASE}/Trend1_RetroRhapsody?w=225&fmt=auto&qlt=default`,
};

const announcements = [
  {
    text: 'Sign up for texts and be entered to win a $5k Home Makeover Sweepstakes.',
    cta: 'Sign Up Now',
    href: '#newsletter',
  },
  {
    text: 'Holiday hosting? There is still time to get your space guest-ready.',
    cta: 'Schedule a Design Appointment',
    href: '/design-scheduler',
  },
  {
    text: 'Get 25% off Cabinets on qualifying purchases.',
    cta: 'Get Started',
    href: '/cabinets',
  },
];

const customerServiceLinks = [
  { label: 'Check Order Status', href: '/order-status' },
  { label: 'Customer Service FAQ', href: '/help-center' },
  { label: 'PRO Premier', href: '/pro-premier' },
  { label: 'Design Services', href: '/design-scheduler' },
  { label: 'Installation Services', href: '/installation' },
  { label: 'Credit Center', href: '/credit' },
  { label: 'Gift Cards', href: '/giftcards' },
  { label: 'Export Services', href: '/export' },
  { label: 'Contact Us', href: '/contact' },
];

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

const projectRoomsData = [
  {
    id: 'bathroom',
    name: 'Bathroom',
    image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=700',
    href: '/products?room=bathroom',
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=700',
    href: '/products?room=kitchen',
  },
  {
    id: 'backsplash',
    name: 'Backsplash',
    image: 'https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=700',
    href: '/products?category=backsplash',
  },
  {
    id: 'shower',
    name: 'Shower',
    image: 'https://images.pexels.com/photos/6585757/pexels-photo-6585757.jpeg?auto=compress&cs=tinysrgb&w=700',
    href: '/products?room=shower',
  },
  {
    id: 'living-room',
    name: 'Living Room',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=700',
    href: '/products?room=living-room',
  },
  {
    id: 'outdoor',
    name: 'Outdoor',
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=700',
    href: '/products?room=outdoor',
  },
];

const startExploringData = [
  {
    id: 101,
    brand: 'VILLA',
    name: 'Artisan Frost Ceramic Tile',
    price: '$0.99',
    unit: 'piece',
    size: 'Size: 3 x 12',
    hasSample: true,
    image: 'https://images.pexels.com/photos/129731/pexels-photo-129731.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 102,
    brand: 'VILLA',
    name: 'Artisan Oyster Ceramic Tile',
    price: '$1.49',
    unit: 'piece',
    size: 'Size: 3 x 12',
    hasSample: false,
    image: 'https://images.pexels.com/photos/3225528/pexels-photo-3225528.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 103,
    brand: 'CANVAS',
    name: 'La Belle Purity High Gloss Ceramic Tile',
    price: '$1.39',
    unit: 'piece',
    size: 'Size: 3 x 12',
    hasSample: true,
    image: 'https://images.pexels.com/photos/1030973/pexels-photo-1030973.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 104,
    brand: 'SAN GIORGIO',
    name: 'Belucci Bianca White 12 x 24 Matte Marble Look Floor and Wall Porcelain Tile',
    price: '$2.99',
    unit: 'sqft',
    size: 'Size: 12 x 24',
    hasSample: false,
    image: 'https://images.pexels.com/photos/7587862/pexels-photo-7587862.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 105,
    brand: 'VETTA ELEMENTS',
    name: 'Luxe Sand 12 X 12 Matte Ivory Porcelain Mosaic Tile',
    price: '$16.99',
    unit: 'piece',
    size: 'Size: 12 x 12',
    hasSample: true,
    image: 'https://images.pexels.com/photos/3616767/pexels-photo-3616767.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 106,
    brand: 'AVALON',
    name: 'Carrara White Polished Marble Tile 12x24 in.',
    price: '$4.99',
    unit: 'sq. ft.',
    size: 'Size: 12 x 24',
    hasSample: true,
    image: 'https://images.pexels.com/photos/7045362/pexels-photo-7045362.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 107,
    brand: 'VILLA',
    name: 'Artisan Sage Green Gloss Ceramic Subway Tile',
    price: '$3.19',
    unit: 'sq. ft.',
    size: 'Size: 3 x 12',
    hasSample: true,
    image: 'https://images.pexels.com/photos/36321311/pexels-photo-36321311.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

const trendingProductsData = [
  {
    id: 1,
    name: 'Carrara White Polished Marble Tile 12x24 in.',
    category: 'Tile',
    price: '$4.99',
    unit: 'sq. ft.',
    boxPrice: '$49.90 / box (10 sq. ft.)',
    rating: '4.9',
    reviews: 382,
    image: 'https://images.pexels.com/photos/7587862/pexels-photo-7587862.jpeg?auto=compress&cs=tinysrgb&w=700',
    badge: 'BEST SELLER',
  },
  {
    id: 2,
    name: 'NuCore Performance Weathered Oak Waterproof Vinyl Plank',
    category: 'Vinyl',
    price: '$2.49',
    unit: 'sq. ft.',
    boxPrice: '$53.28 / box (21.4 sq. ft.)',
    rating: '4.8',
    reviews: 512,
    image: 'https://images.pexels.com/photos/8082315/pexels-photo-8082315.jpeg?auto=compress&cs=tinysrgb&w=700',
    badge: 'TOP RATED',
  },
  {
    id: 3,
    name: 'Villa Artisan Sage Green Gloss Ceramic Subway Tile',
    category: 'Tile',
    price: '$3.19',
    unit: 'sq. ft.',
    boxPrice: '$38.28 / box (12 sq. ft.)',
    rating: '4.9',
    reviews: 247,
    image: 'https://images.pexels.com/photos/36321311/pexels-photo-36321311.jpeg?auto=compress&cs=tinysrgb&w=700',
    badge: 'TRENDING',
  },
  {
    id: 4,
    name: 'Eco Forest Natural White Oak Engineered Hardwood',
    category: 'Wood',
    price: '$3.79',
    unit: 'sq. ft.',
    boxPrice: '$75.80 / box (20 sq. ft.)',
    rating: '4.8',
    reviews: 189,
    image: 'https://images.pexels.com/photos/7587484/pexels-photo-7587484.jpeg?auto=compress&cs=tinysrgb&w=700',
    badge: 'NEW ARRIVAL',
  },
  {
    id: 5,
    name: 'Sahara Gold Polished Travertine Floor & Wall Tile',
    category: 'Stone',
    price: '$3.89',
    unit: 'sq. ft.',
    boxPrice: '$38.90 / box (10 sq. ft.)',
    rating: '4.7',
    reviews: 142,
    image: 'https://images.pexels.com/photos/7045362/pexels-photo-7045362.jpeg?auto=compress&cs=tinysrgb&w=700',
    badge: 'BEST VALUE',
  },
  {
    id: 6,
    name: 'Duralux Performance Waterproof Rigid Core Vinyl Plank',
    category: 'Vinyl',
    price: '$1.99',
    unit: 'sq. ft.',
    boxPrice: '$42.18 / box (21.2 sq. ft.)',
    rating: '4.7',
    reviews: 620,
    image: 'https://images.pexels.com/photos/6394530/pexels-photo-6394530.jpeg?auto=compress&cs=tinysrgb&w=700',
    badge: 'BEST SELLER',
  },
  {
    id: 7,
    name: 'Zellige Artisan Blanc Glazed Ceramic Wall Tile',
    category: 'Tile',
    price: '$2.79',
    unit: 'sq. ft.',
    boxPrice: '$33.48 / box (12 sq. ft.)',
    rating: '4.9',
    reviews: 310,
    image: 'https://images.pexels.com/photos/22589689/pexels-photo-22589689.jpeg?auto=compress&cs=tinysrgb&w=700',
    badge: 'DESIGNER PICK',
  },
  {
    id: 8,
    name: 'Casablanca Hexagon Matte White Porcelain Tile',
    category: 'Tile',
    price: '$2.99',
    unit: 'sq. ft.',
    boxPrice: '$29.90 / box (10 sq. ft.)',
    rating: '4.8',
    reviews: 205,
    image: 'https://images.pexels.com/photos/8134805/pexels-photo-8134805.jpeg?auto=compress&cs=tinysrgb&w=700',
    badge: 'TOP RATED',
  },
];

export default function Home() {
  // Announcement banner rotation
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [announcementVisible, setAnnouncementVisible] = useState(true);

  // Nav & Modals State
  const [customerServiceOpen, setCustomerServiceOpen] = useState(false);
  const [inspirationOpen, setInspirationOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Global Cart
  const { addToCart, totalCount, setIsCartOpen } = useCart();
  const [savedProductIds, setSavedProductIds] = useState<number[]>([1, 3]);

  // Trending filter
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');

  // Newsletter form
  const [newsletterData, setNewsletterData] = useState({ firstName: '', lastName: '', email: '', zip: '' });
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  // Chat widget
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<string[]>([
    'Hello! Welcome to Floor & Decor. How can our flooring specialists help you today?',
  ]);
  const [chatInput, setChatInput] = useState('');

  // Active Nav Category State
  const [activeNavCategory, setActiveNavCategory] = useState('Tile');

  // Hero Carousel State
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlidesData.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  // Project rooms carousel ref
  const projectRoomsRef = useRef<HTMLDivElement>(null);

  const scrollProjectRooms = (direction: 'left' | 'right') => {
    if (!projectRoomsRef.current) return;
    const cardWidth = 320;
    projectRoomsRef.current.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth',
    });
  };

  // Start exploring carousel ref & Quick View state
  const startExploringRef = useRef<HTMLDivElement>(null);
  const [quickViewTile, setQuickViewTile] = useState<(typeof startExploringData)[0] | null>(null);

  const scrollStartExploring = (direction: 'left' | 'right') => {
    if (!startExploringRef.current) return;
    const cardWidth = 280;
    startExploringRef.current.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth',
    });
  };

  // Auto-rotate announcement bar
  useEffect(() => {
    if (!announcementVisible) return;
    const interval = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [announcementVisible]);

  // Toast auto-clear
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleAddToCart = (product: (typeof trendingProductsData)[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      priceNumber: parseFloat(product.price.replace(/[^0-9.]/g, '')) || 0,
      unit: 'sq. ft.',
      image: product.image,
      quantity: 1,
    });
  };

  const toggleSaveProduct = (id: number, name: string) => {
    if (savedProductIds.includes(id)) {
      setSavedProductIds((prev) => prev.filter((item) => item !== id));
      showToast(`Removed "${name}" from My Projects`);
    } else {
      setSavedProductIds((prev) => [...prev, id]);
      showToast(`Saved "${name}" to My Projects!`);
    }
  };

  const handleChatSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userText = chatInput;
    setChatMessages((prev) => [...prev, userText]);
    setChatInput('');
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        'Thank you! A customer care representative is available to help. You can also call us directly at +1 (555) 019-2834 or email support@example.com.',
      ]);
    }, 800);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterData.email) return;
    setNewsletterSubmitted(true);
    showToast('Thank you for subscribing to Floor & Decor updates and sweepstakes!');
  };

  const filteredProducts =
    activeCategoryFilter === 'All'
      ? trendingProductsData
      : trendingProductsData.filter((p) => p.category === activeCategoryFilter);

  return (
    <div className="min-h-screen bg-white">
      {/* ------------------------------------------------------------------ */}
      {/* 1. TOP ACCENT STRIPE & CLEAN MAIN HEADER                           */}
      {/* ------------------------------------------------------------------ */}
      <div className="site-top-accent" />

      <header className="site-header">
        <div className="header-main-clean">
          {/* Brand Logo */}
          <a href="/" className="brand-clean-link" aria-label="Floor & Decor Home">
            <img src="/logo.png" alt="Floor & Decor" className="brand-clean-logo" />
          </a>

          {/* Centered Pill Search Input */}
          <div className="relative flex-1 max-w-[680px]">
            <div className="search-box-clean">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    window.location.href = `/products?q=${encodeURIComponent(searchQuery)}`;
                  }
                }}
                aria-label="Search products"
              />
              <button
                className="search-clean-btn"
                aria-label="Submit search"
                onClick={() => {
                  if (searchQuery.trim()) {
                    window.location.href = `/products?q=${encodeURIComponent(searchQuery)}`;
                  }
                }}
              >
                <Search size={18} strokeWidth={2.2} />
              </button>
            </div>

            {searchFocused && (
              <div
                className="search-suggestions-popover"
                style={{ top: 'calc(100% + 8px)', width: '100%' }}
                onMouseLeave={() => setSearchFocused(false)}
              >
                <div className="suggestions-title">Trending Searches</div>
                <div className="popular-chips">
                  {['Zellige Tile', 'White Oak LVP', 'Carrara Marble', 'Checkerboard Floor', 'Subway Tile', 'Waterproof Laminate'].map(
                    (term) => (
                      <button
                        key={term}
                        className="chip-btn"
                        onClick={() => {
                          setSearchQuery(term);
                          setSearchFocused(false);
                          window.location.href = `/products?q=${encodeURIComponent(term)}`;
                        }}
                      >
                        {term}
                      </button>
                    )
                  )}
                </div>
                <div className="flex justify-between items-center text-[12px] text-[#777] pt-2 border-t border-[#eee]">
                  <span>Press Enter to search catalog</span>
                  <button onClick={() => setSearchFocused(false)} className="text-[#ed1c24] font-semibold">
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Header Action Items on the Right: Log In, My Projects, Cart */}
          <div className="header-actions-clean">
            <a href="/login" className="action-clean-item" aria-label="Log In">
              <UserRound size={26} strokeWidth={1.8} />
              <span>Log In</span>
            </a>

            <button
              className="action-clean-item"
              aria-label="My Projects"
              onClick={() => showToast(`You have ${savedProductIds.length} items saved in My Projects.`)}
            >
              <Heart
                size={26}
                strokeWidth={1.8}
                fill={savedProductIds.length > 0 ? '#ed1c24' : 'none'}
                color={savedProductIds.length > 0 ? '#ed1c24' : 'currentColor'}
              />
              <span>My Projects</span>
            </button>

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

        {/* ------------------------------------------------------------------ */}
        {/* 2. SIGNATURE RED NAVIGATION BAR                                    */}
        {/* ------------------------------------------------------------------ */}
        <div className="primary-red-nav-bar">
          <nav className="primary-red-nav-inner">
            {primaryNavCategories.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`red-nav-item ${activeNavCategory === item.name ? 'active' : ''}`}
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* 3. HERO SECTION (INTERACTIVE IMAGE CAROUSEL WITH NEW IMAGES)        */}
      {/* ------------------------------------------------------------------ */}
      <section className="hero-section-clean">
        {/* Full-width Main Hero Carousel */}
        <div className="hero-carousel-container">
          {heroSlidesData.map((slide, index) => (
            <a
              key={slide.id}
              href={slide.href}
              className={`hero-slide-item ${index === currentHeroSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide.image})` }}
              aria-label={slide.alt}
            >
              <div className="hero-slide-center-content">
                <h2 className="hero-slide-title">{slide.title}</h2>
              </div>
            </a>
          ))}

          {/* Previous Arrow */}
          <button
            type="button"
            className="hero-carousel-arrow hero-carousel-prev"
            onClick={(e) => {
              e.preventDefault();
              setCurrentHeroSlide((prev) => (prev === 0 ? heroSlidesData.length - 1 : prev - 1));
            }}
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} strokeWidth={2.5} />
          </button>

          {/* Next Arrow */}
          <button
            type="button"
            className="hero-carousel-arrow hero-carousel-next"
            onClick={(e) => {
              e.preventDefault();
              setCurrentHeroSlide((prev) => (prev + 1) % heroSlidesData.length);
            }}
            aria-label="Next slide"
          >
            <ChevronRight size={24} strokeWidth={2.5} />
          </button>

          {/* Dot Indicators */}
          <div className="hero-carousel-dots">
            {heroSlidesData.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                className={`hero-carousel-dot ${index === currentHeroSlide ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentHeroSlide(index);
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* 2 Wide Side Cards Below Main Banner */}
        <div className="hero-bottom-grid">
          {/* Side Card 1: Modern Fixtures & Tile */}
          <a
            href="/products"
            className="hero-bottom-card block"
            style={{ backgroundImage: `url(${assets.heroSide1})` }}
            aria-label="Shop Bathroom Fixtures & Tile"
          />

          {/* Side Card 2: Architectural Stone & Fireplace */}
          <a
            href="/products"
            className="hero-bottom-card block"
            style={{ backgroundImage: `url(${assets.heroSide2})` }}
            aria-label="Shop Natural Stone & Fireplace"
          />
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 4. WHAT PROJECT ARE YOU WORKING ON? (ROOMS CAROUSEL)               */}
      {/* ------------------------------------------------------------------ */}
      <section className="project-rooms-section">
        <div className="project-rooms-header">
          <h2 className="project-rooms-title">WHAT PROJECT ARE YOU WORKING ON?</h2>
          <div className="project-rooms-red-bar" />
        </div>

        <div className="project-rooms-carousel-wrapper">
          <button
            type="button"
            className="project-rooms-nav-btn project-rooms-prev"
            onClick={() => scrollProjectRooms('left')}
            aria-label="Previous project rooms"
          >
            <ChevronLeft size={22} strokeWidth={2.8} />
          </button>

          <div className="project-rooms-track" ref={projectRoomsRef}>
            {projectRoomsData.map((room) => (
              <a
                key={room.id}
                href={room.href}
                className="project-room-card"
              >
                <div className="project-room-image-wrap">
                  <img src={room.image} alt={room.name} loading="lazy" />
                </div>
                <div className="project-room-caption">
                  <span className="project-room-name">{room.name}</span>
                  <span className="project-room-arrow">→</span>
                </div>
              </a>
            ))}
          </div>

          <button
            type="button"
            className="project-rooms-nav-btn project-rooms-next"
            onClick={() => scrollProjectRooms('right')}
            aria-label="Next project rooms"
          >
            <ChevronRight size={22} strokeWidth={2.8} />
          </button>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 5. START EXPLORING (PRODUCT CAROUSEL WITH INTERACTIVE HOVER)      */}
      {/* ------------------------------------------------------------------ */}
      <section className="start-exploring-section">
        <div className="start-exploring-header">
          <h2 className="start-exploring-title">START EXPLORING</h2>
          <div className="start-exploring-red-bar" />
        </div>

        <div className="exploring-carousel-wrapper">
          <button
            type="button"
            className="exploring-nav-btn exploring-prev"
            onClick={() => scrollStartExploring('left')}
            aria-label="Previous products"
          >
            <ChevronLeft size={22} strokeWidth={2.8} />
          </button>

          <div className="exploring-track" ref={startExploringRef}>
            {startExploringData.map((tile) => (
              <div key={tile.id} className="exploring-product-card">
                {/* Image Container */}
                <div className="exploring-image-container">
                  <img src={tile.image} alt={tile.name} loading="lazy" />

                  {/* Hover Action Bar: Add To My Projects | Quick View */}
                  <div className="exploring-hover-action-bar">
                    <button
                      type="button"
                      className="exploring-action-btn"
                      onClick={() => toggleSaveProduct(tile.id, tile.name)}
                    >
                      <Heart
                        size={14}
                        fill={savedProductIds.includes(tile.id) ? '#ed1c24' : 'none'}
                        color="#ed1c24"
                      />
                      <span className="underline-text">
                        {savedProductIds.includes(tile.id) ? 'Saved' : (
                          <>
                            <span className="hidden sm:inline">Add To </span>Projects
                          </>
                        )}
                      </span>
                    </button>

                    <button
                      type="button"
                      className="exploring-action-btn"
                      onClick={() => setQuickViewTile(tile)}
                    >
                      <span>
                        <span className="hidden sm:inline">Quick </span>View
                      </span>
                      <ZoomIn size={14} className="text-[#ed1c24]" />
                    </button>
                  </div>
                </div>

                {/* Card Info */}
                <div className="exploring-card-body">
                  <div className="exploring-card-top">
                    <span className="exploring-card-brand">{tile.brand}</span>
                    <a href="/products" className="exploring-card-title">
                      {tile.name}
                    </a>
                    <div className="exploring-card-pricing">
                      <span className="exploring-price-main">{tile.price}</span>
                      <span className="exploring-price-unit">/ {tile.unit}</span>
                    </div>
                    <span className="exploring-card-size">{tile.size}</span>
                  </div>

                  <div className="exploring-card-footer">
                    {tile.hasSample && (
                      <button
                        type="button"
                        className="exploring-add-sample-btn"
                        onClick={() => {
                          addToCart({
                            id: tile.id + 9000,
                            name: `${tile.name} (Sample)`,
                            price: '$1.00',
                            priceNumber: 1.00,
                            unit: 'sample',
                            image: tile.image,
                            quantity: 1,
                          });
                        }}
                      >
                        <span className="exploring-sample-icon">+</span>
                        <span className="exploring-sample-text">Add Sample</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="exploring-nav-btn exploring-next"
            onClick={() => scrollStartExploring('right')}
            aria-label="Next products"
          >
            <ChevronRight size={22} strokeWidth={2.8} />
          </button>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 6. CREDIT VIOLATOR PROMO BANNER (SIDE GAPS - NOT FULL SCREEN)      */}
      {/* ------------------------------------------------------------------ */}
      <section className="credit-violator-section">
        <div className="credit-violator-container">
          <a
            href="/credit"
            className="credit-violator-banner-link"
            aria-label="New Cardholders Receive 15% Off - Plus Zero Interest if paid in full within 6 Months"
          >
            <img
              src={assets.creditCardBanner}
              alt="New Cardholders Receive 15% Off - Plus Zero Interest if paid in full within 6 Months"
              className="credit-violator-banner-img"
            />
          </a>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 7. NOTEWORTHY: UNMATCHED SELECTION. UNBELIEVABLE PRICES.          */}
      {/* ------------------------------------------------------------------ */}
      <section className="page-width section-wrapper">
        <div className="section-header-block section-header-center">
          <span className="section-title-eyebrow">UNMATCHED SELECTION. UNBELIEVABLE PRICES.</span>
          <h2 className="section-main-title">Can’t-miss looks in tile, wood, stone and more</h2>
          <div className="section-red-rule" />
        </div>

        <div className="noteworthy-grid">
          {/* Card 1: Porcelain Tile */}
          <article className="noteworthy-card">
            <div className="noteworthy-image-container">
              <img src={assets.noteworthyPorcelain} alt="Porcelain Tile" />
              <div className="noteworthy-price-tag">
                <span className="price-tag-label">Starting at</span>
                <span className="price-tag-value">$1.19</span>
                <span className="price-tag-unit">/sqft</span>
              </div>
            </div>
            <div className="noteworthy-body">
              <h3>Porcelain Tile</h3>
              <p>Wallet-friendly prices for unbeatable durability, stain resistance, and gorgeous style in any room.</p>
              <a href="/products" className="noteworthy-btn">
                Shop Porcelain <ArrowRight size={14} />
              </a>
            </div>
          </article>

          {/* Card 2: Waterproof Laminate */}
          <article className="noteworthy-card">
            <div className="noteworthy-image-container">
              <img src={assets.noteworthyLaminate} alt="Waterproof Laminate" />
              <div className="noteworthy-price-tag">
                <span className="price-tag-label">Starting at</span>
                <span className="price-tag-value">$1.79</span>
                <span className="price-tag-unit">/sqft</span>
              </div>
            </div>
            <div className="noteworthy-body">
              <h3>Waterproof Laminate</h3>
              <p>Embrace genuine wood-based textures and superior scratch and water resistance for busy households.</p>
              <a href="/products" className="noteworthy-btn">
                Shop Laminate <ArrowRight size={14} />
              </a>
            </div>
          </article>

          {/* Card 3: Engineered Hardwood */}
          <article className="noteworthy-card">
            <div className="noteworthy-image-container">
              <img src={assets.noteworthyHardwood} alt="Engineered Hardwood" />
              <div className="noteworthy-price-tag">
                <span className="price-tag-label">Starting at</span>
                <span className="price-tag-value">$2.99</span>
                <span className="price-tag-unit">/sqft</span>
              </div>
            </div>
            <div className="noteworthy-body">
              <h3>Engineered Hardwood</h3>
              <p>Enjoy the authentic warmth and value of real hardwood engineered with added stability for every level.</p>
              <a href="/products" className="noteworthy-btn">
                Shop Hardwood <ArrowRight size={14} />
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 8. WIDE PROMOTIONAL BANNER (Holiday Countertops)                   */}
      {/* ------------------------------------------------------------------ */}
      <section className="page-width section-wrapper !pt-0">
        <div
          className="wide-display-banner"
          style={{ backgroundImage: `url(${assets.wideDisplayHoliday})` }}
        >
          <div className="wide-banner-content">
            <h3>Want new countertops by the holidays?</h3>
            <p>
              Transform your kitchen before your guests arrive! Measure deadline 11/6, final purchase by 11/27 for
              guaranteed holiday installation.
            </p>
            <a href="/countertops" className="wide-banner-btn">
              Explore Custom Countertops <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 9. MORE TO EXPLORE GRID                                            */}
      {/* ------------------------------------------------------------------ */}
      <section className="page-width section-wrapper !pt-4">
        <div className="section-header-block section-header-center">
          <span className="section-title-eyebrow">TRENDING STYLES</span>
          <h2 className="section-main-title">MORE TO EXPLORE</h2>
          <p className="section-subtitle">Popular choices to help you get started on your home makeover.</p>
          <div className="section-red-rule" />
        </div>

        <div className="explore-grid">
          <a href="/products" className="explore-card">
            <img src={assets.exploreCheckerboard} alt="Checkerboard Flooring" className="explore-card-img" />
            <div className="explore-card-title">
              <span>Checkerboard Patterns</span>
              <ArrowRight size={16} />
            </div>
          </a>

          <a href="/products" className="explore-card">
            <img src={assets.exploreBrownFloors} alt="Mid-Tone Brown Floors" className="explore-card-img" />
            <div className="explore-card-title">
              <span>Mid-Tone Brown Floors</span>
              <ArrowRight size={16} />
            </div>
          </a>

          <a href="/products" className="explore-card">
            <img src={assets.exploreFireplaces} alt="Fireplace Surrounds" className="explore-card-img" />
            <div className="explore-card-title">
              <span>Fireplace Surrounds</span>
              <ArrowRight size={16} />
            </div>
          </a>

          <a href="/products" className="explore-card">
            <img src={assets.exploreSubwayTile} alt="Subway Tile & Decoratives" className="explore-card-img" />
            <div className="explore-card-title">
              <span>Subway Tile & Accents</span>
              <ArrowRight size={16} />
            </div>
          </a>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 10. REAL PEOPLE, REAL PROJECTS ® SECTION                           */}
      {/* ------------------------------------------------------------------ */}
      <section className="rprp-section" id="rprp">
        <div className="page-width">
          <div className="section-header-block section-header-center">
            <span className="section-title-eyebrow">CUSTOMER INSPIRATION</span>
            <h2 className="section-main-title">REAL PEOPLE, REAL PROJECTS ®</h2>
            <p className="section-subtitle">Looking for inspiration? Check out real customer renovations across the country.</p>
            <div className="section-red-rule" />
          </div>

          <a href="/videos" className="rprp-banner-card block" style={{ backgroundImage: `url(${assets.rprpBanner})` }}>
            <div className="rprp-banner-overlay">
              <p>Go behind the scenes of the latest real customer projects!</p>
              <span>
                View Video Gallery <ArrowRight size={15} />
              </span>
            </div>
          </a>

          <div className="rprp-gallery-grid">
            <div className="rprp-project-item">
              <img
                src="https://images.pexels.com/photos/6394530/pexels-photo-6394530.jpeg?auto=compress&cs=tinysrgb&w=700"
                alt="Modern Farmhouse Kitchen"
              />
            </div>

            <div className="rprp-project-item">
              <img
                src="https://images.pexels.com/photos/8134805/pexels-photo-8134805.jpeg?auto=compress&cs=tinysrgb&w=700"
                alt="Primary Bath Spa Suite"
              />
            </div>

            <div className="rprp-project-item">
              <img
                src="https://images.pexels.com/photos/7587484/pexels-photo-7587484.jpeg?auto=compress&cs=tinysrgb&w=700"
                alt="Open Living Room Floor"
              />
            </div>

            <div className="rprp-project-item">
              <img
                src="https://images.pexels.com/photos/7045362/pexels-photo-7045362.jpeg?auto=compress&cs=tinysrgb&w=700"
                alt="Walk-in Mudroom & Entryway"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 11. TOP TRENDING PRODUCTS SHOWCASE                                 */}
      {/* ------------------------------------------------------------------ */}
      <section className="page-width products-showcase-section">
        <div className="section-header-block section-header-center">
          <span className="section-title-eyebrow">IN-STOCK & READY TO SHIP</span>
          <h2 className="section-main-title">Top Trending Flooring & Tile</h2>
          <p className="section-subtitle">Hand-picked by our top designers. High stock available at your local store.</p>
          <div className="section-red-rule" />
        </div>

        {/* Filter Pills */}
        <div className="filter-tabs-row">
          {['All', 'Tile', 'Vinyl', 'Wood', 'Stone'].map((cat) => (
            <button
              key={cat}
              className={`filter-tab-btn ${activeCategoryFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveCategoryFilter(cat)}
            >
              {cat === 'All' ? 'All Products' : cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="products-grid-container">
          {filteredProducts.map((product) => {
            const isSaved = savedProductIds.includes(product.id);
            return (
              <article className="store-product-card" key={product.id}>
                <div className="product-img-wrapper">
                  <img src={product.image} alt={product.name} />
                  <span className="product-badge-best">{product.badge}</span>
                  <button
                    className="product-fav-btn"
                    aria-label={`Save ${product.name}`}
                    onClick={() => toggleSaveProduct(product.id, product.name)}
                  >
                    <Heart
                      size={18}
                      fill={isSaved ? '#ed1c24' : 'none'}
                      color={isSaved ? '#ed1c24' : '#555555'}
                    />
                  </button>
                </div>

                <div className="product-content-area">
                  <h4>{product.name}</h4>

                  <div className="product-rating-stars">
                    <Star size={13} fill="currentColor" />
                    <strong>{product.rating}</strong>
                    <span>({product.reviews})</span>
                  </div>

                  <div className="product-price-row">
                    <span className="price-main-number">{product.price}</span>
                    <span className="price-main-unit">/ {product.unit}</span>
                  </div>

                  <div className="price-box-estimate">{product.boxPrice}</div>

                  <div className="stock-indicator-row">
                    <span className="stock-indicator-dot" />
                    <span>In Stock at Main Store</span>
                  </div>

                  <button
                    className="add-to-cart-action-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 12. WE'RE HERE TO HELP (Services)                                 */}
      {/* ------------------------------------------------------------------ */}
      <section className="page-width services-section">
        <div className="section-header-block section-header-center">
          <span className="section-title-eyebrow">EXPERT SUPPORT</span>
          <h2 className="section-main-title">We&apos;re Here to Help</h2>
          <p className="section-subtitle">
            Discover all the ways to get your product, including same day in-store pickup and free design consultation.
          </p>
          <div className="section-red-rule" />
        </div>

        {/* Visualizer Banner */}
        <a href="/visualizer" className="visualizer-card-banner block">
          <img src={assets.visualizerBanner} alt="Visualize it! Our products, your style. Get started." />
        </a>

        {/* 4 Service Cards */}
        <div className="services-cards-grid">
          <div className="service-box-card">
            <img src={assets.designServices} alt="Free Design Services" />
            <div className="service-box-content">
              <h4>Design Services</h4>
              <p>Our professional design experts can help bring your project vision to life, 100% free.</p>
              <a href="/design-scheduler">
                Schedule Now <ArrowRight size={13} />
              </a>
            </div>
          </div>

          <div className="service-box-card">
            <img src={assets.creditServices} alt="Credit Services" />
            <div className="service-box-content">
              <h4>Credit Services</h4>
              <p>Flexible financing plans that make even large renovation projects easy to budget.</p>
              <a href="/credit">
                Learn More <ArrowRight size={13} />
              </a>
            </div>
          </div>

          <div className="service-box-card">
            <img src={assets.howToVideos} alt="DIY Classes & Videos" />
            <div className="service-box-content">
              <h4>DIY Classes & Videos</h4>
              <p>Step-by-step masterclasses and video tutorials taught by real installation professionals.</p>
              <a href="/vhtc">
                Explore Classes <ArrowRight size={13} />
              </a>
            </div>
          </div>

          <div className="service-box-card">
            <img src={assets.proServices} alt="PRO Services" />
            <div className="service-box-content">
              <h4>PRO Services</h4>
              <p>Dedicated commercial specialists, volume pricing, job-site delivery, and pro loyalty rewards.</p>
              <a href="/pro-premier">
                Join Pro Premier <ArrowRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 13. INSTALLATION MADE EASY BANNER                                  */}
      {/* ------------------------------------------------------------------ */}
      <section className="page-width ime-banner-section">
        <div className="ime-banner-card">
          <div className="ime-left-content">
            <img src={assets.imeLogo} alt="Installation Made Easy" />
            <h3 className="ime-text-headline">
              Get certified professional help on your flooring installation.
            </h3>
          </div>
          <a href="/installation" className="ime-action-btn">
            Get Started
          </a>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 14. FLOATING CHAT WITH US WIDGET & DIALOG                          */}
      {/* ------------------------------------------------------------------ */}
      <button
        className="floating-chat-circle-red"
        onClick={() => setChatOpen(!chatOpen)}
        aria-label="Open Live Chat"
      >
        <MessageSquare size={22} fill="white" strokeWidth={0} />
      </button>

      {chatOpen && (
        <div className="fixed bottom-6 right-6 w-[360px] bg-white rounded-lg shadow-2xl border border-[#d5d5d5] z-[1200] overflow-hidden flex flex-col">
          <div className="bg-[#111111] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#34c759]" />
              <strong className="text-[14px]">Floor & Decor Live Assist</strong>
            </div>
            <button onClick={() => setChatOpen(false)} className="text-white hover:opacity-80">
              <X size={18} />
            </button>
          </div>
          <div className="p-4 h-[240px] overflow-y-auto flex flex-col gap-3 bg-[#f9f9f9]">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg text-[13px] leading-relaxed max-w-[85%] ${
                  i % 2 === 0
                    ? 'bg-white border border-[#e5e5e5] text-[#222] self-start'
                    : 'bg-[#ed1c24] text-white self-end'
                }`}
              >
                {msg}
              </div>
            ))}
          </div>
          <form onSubmit={handleChatSend} className="p-3 border-t border-[#e5e5e5] flex gap-2 bg-white">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-[#ccc] rounded px-3 py-2 text-[13px] outline-none focus:border-[#111]"
            />
            <button
              type="submit"
              className="bg-[#ed1c24] text-white px-3 py-2 rounded text-[12px] font-bold uppercase hover:bg-[#c41219]"
            >
              Send
            </button>
          </form>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 15. SITE FOOTER WITH EQUITY BAR & COMPREHENSIVE LINKS              */}
      {/* ------------------------------------------------------------------ */}
      <footer className="site-footer">
        {/* Equity Bar */}
        <div className="footer-equity-bar">Bring It Home™</div>

        <div className="page-width">
          <div className="footer-main-grid" id="newsletter">
            {/* Newsletter Column */}
            <div className="footer-signup-box">
              <h3>STAY INSPIRED!</h3>
              <p>Sign up for trends, events, new arrivals, and special promotions.</p>

              {newsletterSubmitted ? (
                <div className="bg-[#e8f5e9] text-[#2e7d32] p-4 rounded text-[13px] font-semibold flex items-center gap-2">
                  <CheckCircle2 size={18} /> You are signed up for exclusive Floor & Decor offers!
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="First Name *"
                      required
                      value={newsletterData.firstName}
                      onChange={(e) => setNewsletterData({ ...newsletterData, firstName: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="Last Name *"
                      required
                      value={newsletterData.lastName}
                      onChange={(e) => setNewsletterData({ ...newsletterData, lastName: e.target.value })}
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email Address *"
                    required
                    value={newsletterData.email}
                    onChange={(e) => setNewsletterData({ ...newsletterData, email: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="ZIP Code *"
                    required
                    value={newsletterData.zip}
                    onChange={(e) => setNewsletterData({ ...newsletterData, zip: e.target.value })}
                  />
                  <button type="submit">Sign Me Up</button>
                </form>
              )}
            </div>

            {/* Column 1: Customer Care */}
            <div className="footer-col">
              <h4>Customer Care</h4>
              <a href="/contact">Contact Us</a>
              <a href="/order-status">Check Order Status</a>
              <a href="/shipping">Shipping & Delivery</a>
              <a href="/returns">Returns & Refunds</a>
              <a href="/faq">Help Center & FAQ</a>
              <a href="/recalls">Product Recalls</a>
            </div>

            {/* Column 2: About Floor & Decor */}
            <div className="footer-col">
              <h4>About Us</h4>
              <a href="/story">Our Story</a>
              <a href="/careers">Careers</a>
              <a href="/investors">Investor Relations</a>
              <a href="/sustainability">Environmental Social Governance</a>
              <a href="/press">Press Room</a>
              <a href="/stores">Find a Store</a>
            </div>

            {/* Column 3: Resources */}
            <div className="footer-col">
              <h4>Resources</h4>
              <a href="/installation">Installation Materials</a>
              <a href="/design-scheduler">Free Design Services</a>
              <a href="/vhtc">How-To DIY Videos</a>
              <a href="/visualizer">Floor Visualizer</a>
              <a href="/blogs">Get Floored Blog</a>
              <a href="/samples">Order Product Samples</a>
            </div>

            {/* Column 4: For Pros & Credit */}
            <div className="footer-col">
              <h4>For Pros & Credit</h4>
              <a href="/pro-premier">PRO Premier Rewards</a>
              <a href="/commercial">Commercial Sales</a>
              <a href="/trade-credit">Commercial Credit</a>
              <a href="/credit">Floor & Decor Credit Card</a>
              <a href="/pay-bill">Pay Your Credit Card Bill</a>
              <a href="/military">Military Discount</a>
            </div>
          </div>

          {/* Legal / Copyright Bottom Bar */}
          <div className="footer-bottom-bar">
            <span>© 2026 Floor and Decor Outlets of America, Inc. All Rights Reserved.</span>
            <div className="footer-legal-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Use</a>
              <a href="/accessibility">Accessibility</a>
              <a href="/ca-privacy">CA Privacy Rights</a>
              <a href="/sitemap">Site Map</a>
            </div>
          </div>
        </div>
      </footer>


      {/* ------------------------------------------------------------------ */}


      {/* Quick View Modal */}
      {quickViewTile && (
        <div className="modal-overlay-backdrop" onClick={() => setQuickViewTile(null)}>
          <div
            className="bg-white rounded-lg shadow-2xl max-w-[620px] w-full p-6 relative flex flex-col sm:flex-row gap-6 mx-4 z-[1300]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setQuickViewTile(null)}
              className="absolute top-4 right-4 text-[#888] hover:text-[#111]"
              aria-label="Close Quick View"
            >
              <X size={20} />
            </button>
            <div className="w-full sm:w-[260px] aspect-square rounded overflow-hidden bg-[#fafafa] flex-shrink-0">
              <img src={quickViewTile.image} alt={quickViewTile.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-between flex-1">
              <div>
                <span className="text-[12px] font-bold text-[#777] uppercase tracking-wide block mb-1">
                  {quickViewTile.brand}
                </span>
                <h3 className="text-[17px] font-extrabold text-[#111] leading-snug mb-2">
                  {quickViewTile.name}
                </h3>
                <div className="mb-2">
                  <span className="text-[20px] font-extrabold text-[#111]">{quickViewTile.price}</span>
                  <span className="text-[13px] text-[#666] ml-1">/ {quickViewTile.unit}</span>
                </div>
                <p className="text-[13px] text-[#666] mb-3">{quickViewTile.size}</p>
                <p className="text-[13px] text-[#444] leading-relaxed">
                  In stock at your local store. Premium grade, suitable for floors, walls, and backsplashes.
                </p>
              </div>

              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-[#eee]">
                <button
                  onClick={() => {
                    handleAddToCart({
                      id: quickViewTile.id,
                      name: quickViewTile.name,
                      category: 'Tile',
                      price: quickViewTile.price,
                      unit: quickViewTile.unit,
                      boxPrice: `${quickViewTile.price} / box`,
                      rating: '4.9',
                      reviews: 120,
                      image: quickViewTile.image,
                      badge: 'EXPLORE',
                    });
                    setQuickViewTile(null);
                  }}
                  className="bg-[#ed1c24] text-white py-2.5 px-4 rounded font-bold text-[13px] uppercase hover:bg-[#c41219] transition-colors"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => {
                    toggleSaveProduct(quickViewTile.id, quickViewTile.name);
                  }}
                  className="border border-[#ccc] text-[#222] py-2 px-4 rounded font-semibold text-[13px] hover:bg-[#f9f9f9] transition-colors flex items-center justify-center gap-2"
                >
                  <Heart size={15} fill={savedProductIds.includes(quickViewTile.id) ? '#ed1c24' : 'none'} color="#ed1c24" />
                  {savedProductIds.includes(quickViewTile.id) ? 'Saved in My Projects' : 'Add to My Projects'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 18. NOTIFICATION TOAST                                              */}
      {/* ------------------------------------------------------------------ */}
      {toastMessage && (
        <div className="cart-toast-notification">
          <CheckCircle2 size={18} className="text-[#34c759]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
