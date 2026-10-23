'use client';

import { useMemo, useState, useEffect } from 'react';
import {
  Filter,
  Heart,
  Search,
  ShoppingCart,
  Star,
  UserRound,
  X,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface ProductItem {
  id: number;
  name: string;
  category: string;
  price: number;
  unit: string;
  size: string;
  color: string;
  type: string;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
}

const allProducts: ProductItem[] = [
  // ==================== 1. TILE ====================
  {
    id: 101,
    name: 'Carrara White Matte Porcelain Tile',
    category: 'Tile',
    price: 1.19,
    unit: 'sq. ft.',
    size: '12 x 24',
    color: 'White',
    type: 'Marble Look',
    image: 'https://images.pexels.com/photos/7587862/pexels-photo-7587862.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.8,
    reviews: 128,
    badge: 'BEST SELLER',
  },
  {
    id: 102,
    name: 'Alaska Gray Porcelain Tile',
    category: 'Tile',
    price: 2.49,
    unit: 'sq. ft.',
    size: '24 x 24',
    color: 'Gray',
    type: 'Stone Look',
    image: 'https://images.pexels.com/photos/7045362/pexels-photo-7045362.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.7,
    reviews: 94,
    badge: 'NEW',
  },
  {
    id: 103,
    name: 'Arctic White Glossy Wall Subway Tile',
    category: 'Tile',
    price: 1.99,
    unit: 'sq. ft.',
    size: '4 x 12',
    color: 'White',
    type: 'Subway',
    image: 'https://images.pexels.com/photos/8134805/pexels-photo-8134805.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.9,
    reviews: 216,
  },
  {
    id: 104,
    name: 'Hudson Tangier Blue Porcelain Tile',
    category: 'Tile',
    price: 3.29,
    unit: 'sq. ft.',
    size: '8 x 8',
    color: 'Blue',
    type: 'Patterned',
    image: 'https://images.pexels.com/photos/36321311/pexels-photo-36321311.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.6,
    reviews: 71,
  },
  {
    id: 105,
    name: 'Calacatta Gold Polished Porcelain',
    category: 'Tile',
    price: 4.99,
    unit: 'sq. ft.',
    size: '24 x 48',
    color: 'White',
    type: 'Marble Look',
    image: 'https://images.pexels.com/photos/22589689/pexels-photo-22589689.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.8,
    reviews: 82,
  },
  {
    id: 106,
    name: 'Sage Green Ceramic Wall Subway Tile',
    category: 'Tile',
    price: 2.49,
    unit: 'sq. ft.',
    size: '3 x 12',
    color: 'Green',
    type: 'Subway',
    image: 'https://images.pexels.com/photos/6394530/pexels-photo-6394530.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.8,
    reviews: 106,
  },
  {
    id: 107,
    name: 'Ivory Hexagon Porcelain Mosaic Tile',
    category: 'Tile',
    price: 5.49,
    unit: 'sq. ft.',
    size: '2 x 2',
    color: 'Beige',
    type: 'Mosaic',
    image: 'https://images.pexels.com/photos/8082315/pexels-photo-8082315.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.7,
    reviews: 63,
  },
  {
    id: 108,
    name: 'Villa Artisan Blanc Glazed Ceramic',
    category: 'Tile',
    price: 2.19,
    unit: 'sq. ft.',
    size: '3 x 12',
    color: 'White',
    type: 'Subway',
    image: 'https://images.pexels.com/photos/3935350/pexels-photo-3935350.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.9,
    reviews: 154,
    badge: 'TRENDING',
  },

  // ==================== 2. STONE ====================
  {
    id: 201,
    name: 'Sahara Gold Polished Travertine Tile',
    category: 'Stone',
    price: 3.99,
    unit: 'sq. ft.',
    size: '18 x 18',
    color: 'Beige',
    type: 'Travertine',
    image: 'https://images.pexels.com/photos/7045362/pexels-photo-7045362.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.6,
    reviews: 52,
    badge: 'BEST SELLER',
  },
  {
    id: 202,
    name: 'Nero Marquina Polished Marble Tile',
    category: 'Stone',
    price: 3.49,
    unit: 'sq. ft.',
    size: '12 x 24',
    color: 'Black',
    type: 'Marble Look',
    image: 'https://images.pexels.com/photos/7587484/pexels-photo-7587484.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.7,
    reviews: 88,
  },
  {
    id: 203,
    name: 'Weathered Stone Gray Natural Ledger Panel',
    category: 'Stone',
    price: 2.79,
    unit: 'sq. ft.',
    size: '6 x 24',
    color: 'Gray',
    type: 'Natural Slate',
    image: 'https://images.pexels.com/photos/7587862/pexels-photo-7587862.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.5,
    reviews: 48,
  },
  {
    id: 204,
    name: 'Alaska Gray Polished Natural Marble',
    category: 'Stone',
    price: 3.89,
    unit: 'sq. ft.',
    size: '24 x 24',
    color: 'Gray',
    type: 'Natural Marble',
    image: 'https://images.pexels.com/photos/3935350/pexels-photo-3935350.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.8,
    reviews: 64,
    badge: 'NEW',
  },
  {
    id: 205,
    name: 'Silver Shadow Natural Slate Floor Tile',
    category: 'Stone',
    price: 3.29,
    unit: 'sq. ft.',
    size: '12 x 24',
    color: 'Gray',
    type: 'Slate',
    image: 'https://images.pexels.com/photos/7587862/pexels-photo-7587862.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.6,
    reviews: 39,
  },
  {
    id: 206,
    name: 'Crema Marfil Select Polished Marble Tile',
    category: 'Stone',
    price: 5.29,
    unit: 'sq. ft.',
    size: '12 x 12',
    color: 'Beige',
    type: 'Marble',
    image: 'https://images.pexels.com/photos/22589689/pexels-photo-22589689.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.9,
    reviews: 73,
    badge: 'PREMIUM',
  },
  {
    id: 207,
    name: 'Brazilian Black Honed Slate Tile',
    category: 'Stone',
    price: 3.19,
    unit: 'sq. ft.',
    size: '16 x 16',
    color: 'Black',
    type: 'Honed Slate',
    image: 'https://images.pexels.com/photos/7587484/pexels-photo-7587484.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.7,
    reviews: 58,
  },
  {
    id: 208,
    name: 'Carrara Venato Polished Italian Marble',
    category: 'Stone',
    price: 4.79,
    unit: 'sq. ft.',
    size: '12 x 24',
    color: 'White',
    type: 'Italian Marble',
    image: 'https://images.pexels.com/photos/3935350/pexels-photo-3935350.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.8,
    reviews: 91,
    badge: 'TRENDING',
  },

  // ==================== 3. WOOD ====================
  {
    id: 301,
    name: 'European Natural White Oak Engineered Hardwood',
    category: 'Wood',
    price: 4.49,
    unit: 'sq. ft.',
    size: '7.5 x 72',
    color: 'Natural',
    type: 'Engineered Oak',
    image: 'https://images.pexels.com/photos/276554/pexels-photo-276554.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.9,
    reviews: 142,
    badge: 'BEST SELLER',
  },
  {
    id: 302,
    name: 'Heritage Hickory Hand-Scraped Solid Hardwood',
    category: 'Wood',
    price: 5.29,
    unit: 'sq. ft.',
    size: '5 x 48',
    color: 'Brown',
    type: 'Solid Hickory',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.8,
    reviews: 87,
  },
  {
    id: 303,
    name: 'French Quarter Wirebrushed White Oak',
    category: 'Wood',
    price: 4.99,
    unit: 'sq. ft.',
    size: '7.5 x 75',
    color: 'Gray',
    type: 'Wirebrushed Oak',
    image: 'https://images.pexels.com/photos/6492403/pexels-photo-6492403.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.9,
    reviews: 114,
    badge: 'TRENDING',
  },
  {
    id: 304,
    name: 'Smoky Mountain Maple Smooth Engineered Wood',
    category: 'Wood',
    price: 3.99,
    unit: 'sq. ft.',
    size: '6.5 x 60',
    color: 'Brown',
    type: 'Engineered Maple',
    image: 'https://images.pexels.com/photos/276554/pexels-photo-276554.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.7,
    reviews: 65,
  },
  {
    id: 305,
    name: 'American Walnut Premium Dark Solid Hardwood',
    category: 'Wood',
    price: 6.19,
    unit: 'sq. ft.',
    size: '5 x 60',
    color: 'Dark Brown',
    type: 'Solid Walnut',
    image: 'https://images.pexels.com/photos/2082087/pexels-photo-2082087.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.9,
    reviews: 92,
    badge: 'LUXURY',
  },
  {
    id: 306,
    name: 'Nordic Birch Wide Plank Engineered Flooring',
    category: 'Wood',
    price: 4.29,
    unit: 'sq. ft.',
    size: '7 x 72',
    color: 'Beige',
    type: 'Engineered Birch',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.6,
    reviews: 58,
  },
  {
    id: 307,
    name: 'Brazilian Cherry Natural Exotic Hardwood',
    category: 'Wood',
    price: 5.79,
    unit: 'sq. ft.',
    size: '4 x 48',
    color: 'Brown',
    type: 'Exotic Solid',
    image: 'https://images.pexels.com/photos/2082087/pexels-photo-2082087.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.8,
    reviews: 79,
  },
  {
    id: 308,
    name: 'Weathered Coastal Gray Oak Distressed Planks',
    category: 'Wood',
    price: 3.89,
    unit: 'sq. ft.',
    size: '6 x 48',
    color: 'Gray',
    type: 'Distressed Oak',
    image: 'https://images.pexels.com/photos/6492403/pexels-photo-6492403.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.7,
    reviews: 68,
  },

  // ==================== 4. LAMINATE ====================
  {
    id: 401,
    name: 'AquaGuard Coastal Oak Water-Resistant Laminate',
    category: 'Laminate',
    price: 2.29,
    unit: 'sq. ft.',
    size: '8 x 48',
    color: 'Natural',
    type: 'Water-Resistant',
    image: 'https://images.pexels.com/photos/276554/pexels-photo-276554.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.8,
    reviews: 136,
    badge: 'BEST SELLER',
  },
  {
    id: 402,
    name: 'HydroShield Weathered Barnwood Waterproof Laminate',
    category: 'Laminate',
    price: 2.69,
    unit: 'sq. ft.',
    size: '7.5 x 50',
    color: 'Gray',
    type: 'Waterproof',
    image: 'https://images.pexels.com/photos/6492403/pexels-photo-6492403.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.7,
    reviews: 82,
    badge: 'NEW',
  },
  {
    id: 403,
    name: 'Pergo Outlast+ Antique Hickory Laminate Plank',
    category: 'Laminate',
    price: 2.99,
    unit: 'sq. ft.',
    size: '6 x 48',
    color: 'Brown',
    type: 'SpillProtect',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.9,
    reviews: 164,
  },
  {
    id: 404,
    name: 'Swiss Krono Geneva Elm Scratch-Resistant Flooring',
    category: 'Laminate',
    price: 1.89,
    unit: 'sq. ft.',
    size: '7.5 x 48',
    color: 'Beige',
    type: 'AC4 Commercial',
    image: 'https://images.pexels.com/photos/276554/pexels-photo-276554.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.6,
    reviews: 91,
  },
  {
    id: 405,
    name: 'Mohawk RevWood Select Vintage Chestnut Plank',
    category: 'Laminate',
    price: 2.79,
    unit: 'sq. ft.',
    size: '7 x 54',
    color: 'Brown',
    type: 'Waterproof Plank',
    image: 'https://images.pexels.com/photos/2082087/pexels-photo-2082087.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.8,
    reviews: 77,
    badge: 'TRENDING',
  },
  {
    id: 406,
    name: 'AquaShield Nordic Pine Water-Resistant Planks',
    category: 'Laminate',
    price: 2.19,
    unit: 'sq. ft.',
    size: '8 x 48',
    color: 'White',
    type: 'Water-Resistant',
    image: 'https://images.pexels.com/photos/6492403/pexels-photo-6492403.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.5,
    reviews: 54,
  },
  {
    id: 407,
    name: 'Ironclad Rustic Walnut Heavy-Duty Laminate',
    category: 'Laminate',
    price: 2.49,
    unit: 'sq. ft.',
    size: '7.5 x 48',
    color: 'Dark Brown',
    type: 'High Traffic',
    image: 'https://images.pexels.com/photos/2082087/pexels-photo-2082087.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.7,
    reviews: 62,
  },
  {
    id: 408,
    name: 'Glacier Mist Bleached Oak Rigid Laminate',
    category: 'Laminate',
    price: 2.39,
    unit: 'sq. ft.',
    size: '8 x 50',
    color: 'White',
    type: 'Water-Resistant',
    image: 'https://images.pexels.com/photos/276554/pexels-photo-276554.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.8,
    reviews: 89,
  },

  // ==================== 5. VINYL ====================
  {
    id: 501,
    name: 'NuCore Gunstock Walnut Rigid Core Luxury Vinyl',
    category: 'Vinyl',
    price: 2.79,
    unit: 'sq. ft.',
    size: '7 x 48',
    color: 'Brown',
    type: '100% Waterproof',
    image: 'https://images.pexels.com/photos/2082087/pexels-photo-2082087.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.9,
    reviews: 184,
    badge: 'BEST SELLER',
  },
  {
    id: 502,
    name: 'Duralux Performance Cascade White Oak Rigid Vinyl',
    category: 'Vinyl',
    price: 2.99,
    unit: 'sq. ft.',
    size: '8 x 60',
    color: 'Natural',
    type: 'Rigid Core LVP',
    image: 'https://images.pexels.com/photos/276554/pexels-photo-276554.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.8,
    reviews: 122,
    badge: 'TRENDING',
  },
  {
    id: 503,
    name: 'OptiMax Eco-Resilient Driftwood Vinyl Plank',
    category: 'Vinyl',
    price: 3.19,
    unit: 'sq. ft.',
    size: '7 x 48',
    color: 'Gray',
    type: 'Eco-Resilient',
    image: 'https://images.pexels.com/photos/6492403/pexels-photo-6492403.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.7,
    reviews: 79,
  },
  {
    id: 504,
    name: 'NuCore Basalt Gray 100% Waterproof LVP',
    category: 'Vinyl',
    price: 2.89,
    unit: 'sq. ft.',
    size: '7 x 48',
    color: 'Gray',
    type: 'Waterproof Core',
    image: 'https://images.pexels.com/photos/7045362/pexels-photo-7045362.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.8,
    reviews: 95,
    badge: 'NEW',
  },
  {
    id: 505,
    name: 'CoreLuxe Sandstone Oak Rigid Vinyl Flooring',
    category: 'Vinyl',
    price: 2.49,
    unit: 'sq. ft.',
    size: '6 x 36',
    color: 'Beige',
    type: 'Oak Look',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.6,
    reviews: 64,
  },
  {
    id: 506,
    name: 'Lifeproof Sterling Oak Luxury Vinyl Plank',
    category: 'Vinyl',
    price: 3.29,
    unit: 'sq. ft.',
    size: '8.7 x 48',
    color: 'Gray',
    type: 'Commercial Grade',
    image: 'https://images.pexels.com/photos/6492403/pexels-photo-6492403.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.9,
    reviews: 147,
  },
  {
    id: 507,
    name: 'Duralux Iron Gate Matte Stone Look Vinyl Tile',
    category: 'Vinyl',
    price: 2.69,
    unit: 'sq. ft.',
    size: '12 x 24',
    color: 'Gray',
    type: 'LVT Tile Look',
    image: 'https://images.pexels.com/photos/7587862/pexels-photo-7587862.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.7,
    reviews: 83,
  },
  {
    id: 508,
    name: 'NuCore Shiplap Pine Waterproof Rigid Plank',
    category: 'Vinyl',
    price: 2.59,
    unit: 'sq. ft.',
    size: '7 x 48',
    color: 'White',
    type: 'Rigid Core',
    image: 'https://images.pexels.com/photos/276554/pexels-photo-276554.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.8,
    reviews: 71,
  },

  // ==================== 6. FIXTURES ====================
  {
    id: 601,
    name: 'Modern Matte Black Freestanding Bathtub Faucet',
    category: 'Fixtures',
    price: 249.0,
    unit: 'each',
    size: '42 in. H',
    color: 'Black',
    type: 'Tub Filler',
    image: 'https://images.pexels.com/photos/8134805/pexels-photo-8134805.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.9,
    reviews: 64,
    badge: 'BEST SELLER',
  },
  {
    id: 602,
    name: 'Brisa 36 in. Single Sink Bath Vanity with Carrara Top',
    category: 'Fixtures',
    price: 699.0,
    unit: 'each',
    size: '36 x 22 in.',
    color: 'White',
    type: 'Bath Vanity',
    image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.8,
    reviews: 88,
    badge: 'NEW',
  },
  {
    id: 603,
    name: 'Kingston Brass Waterfall Vessel Sink Faucet',
    category: 'Fixtures',
    price: 129.0,
    unit: 'each',
    size: '12 in. H',
    color: 'Beige',
    type: 'Vessel Faucet',
    image: 'https://images.pexels.com/photos/8134805/pexels-photo-8134805.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.7,
    reviews: 42,
  },
  {
    id: 604,
    name: 'KOHLER Highline Classic Elongated Toilet Suite',
    category: 'Fixtures',
    price: 289.0,
    unit: 'each',
    size: 'Standard',
    color: 'White',
    type: 'Toilet',
    image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.8,
    reviews: 110,
  },
  {
    id: 605,
    name: 'Swiss Madison Frameless Glass Sliding Shower Door',
    category: 'Fixtures',
    price: 489.0,
    unit: 'each',
    size: '60 x 72 in.',
    color: 'Gray',
    type: 'Shower Door',
    image: 'https://images.pexels.com/photos/6585757/pexels-photo-6585757.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.9,
    reviews: 95,
    badge: 'TRENDING',
  },
  {
    id: 606,
    name: 'Kraus Undermount Single Bowl Stainless Kitchen Sink',
    category: 'Fixtures',
    price: 199.0,
    unit: 'each',
    size: '30 in. Bowl',
    color: 'Gray',
    type: 'Kitchen Sink',
    image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.8,
    reviews: 153,
  },
  {
    id: 607,
    name: 'Delta Trinsic Pull-Down Kitchen Faucet Matte Black',
    category: 'Fixtures',
    price: 279.0,
    unit: 'each',
    size: '16 in. H',
    color: 'Black',
    type: 'Kitchen Faucet',
    image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.9,
    reviews: 78,
  },
  {
    id: 608,
    name: 'Vigo Matte Stone Square Vessel Bathroom Sink',
    category: 'Fixtures',
    price: 149.0,
    unit: 'each',
    size: '16 x 16 in.',
    color: 'White',
    type: 'Vessel Sink',
    image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.7,
    reviews: 49,
  },

  // ==================== 7. INSTALLATION MATERIALS ====================
  {
    id: 701,
    name: 'MAPEI Ultraflex 1 Polymer-Modified Mortar 50 lb',
    category: 'Installation Materials',
    price: 18.99,
    unit: 'bag',
    size: '50 lb Bag',
    color: 'Gray',
    type: 'Mortar',
    image: 'https://images.pexels.com/photos/7587862/pexels-photo-7587862.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.9,
    reviews: 210,
    badge: 'BEST SELLER',
  },
  {
    id: 702,
    name: 'KeraColor S Siliconized Sanded Grout 25 lb White',
    category: 'Installation Materials',
    price: 16.49,
    unit: 'bag',
    size: '25 lb Bag',
    color: 'White',
    type: 'Grout',
    image: 'https://images.pexels.com/photos/8134805/pexels-photo-8134805.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.8,
    reviews: 145,
  },
  {
    id: 703,
    name: 'Schluter DITRA Uncoupling Waterproofing Membrane',
    category: 'Installation Materials',
    price: 99.0,
    unit: 'roll',
    size: '54 sq. ft.',
    color: 'Blue',
    type: 'Membrane',
    image: 'https://images.pexels.com/photos/7045362/pexels-photo-7045362.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.9,
    reviews: 188,
    badge: 'PRO CHOICE',
  },
  {
    id: 704,
    name: 'Rubi 1/16 in. Tile Leveling System Clips (300-Pack)',
    category: 'Installation Materials',
    price: 24.99,
    unit: 'pack',
    size: '300 Pcs',
    color: 'White',
    type: 'Leveling System',
    image: 'https://images.pexels.com/photos/36321311/pexels-photo-36321311.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.8,
    reviews: 94,
    badge: 'TRENDING',
  },
  {
    id: 705,
    name: 'QEP Stainless Steel Square-Notch Floor Trowel',
    category: 'Installation Materials',
    price: 12.99,
    unit: 'each',
    size: '1/2 x 1/2 in.',
    color: 'Gray',
    type: 'Tool',
    image: 'https://images.pexels.com/photos/7587862/pexels-photo-7587862.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.7,
    reviews: 62,
  },
  {
    id: 706,
    name: 'LATICRETE Hydro Ban Waterproofing Anti-Fracture',
    category: 'Installation Materials',
    price: 64.99,
    unit: 'gal',
    size: '1 Gal',
    color: 'Green',
    type: 'Waterproofing',
    image: 'https://images.pexels.com/photos/8134805/pexels-photo-8134805.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.9,
    reviews: 118,
  },
  {
    id: 707,
    name: 'Custom Building Products White Silicone Caulk',
    category: 'Installation Materials',
    price: 8.49,
    unit: 'tube',
    size: '10.1 oz',
    color: 'White',
    type: 'Sealant',
    image: 'https://images.pexels.com/photos/6394530/pexels-photo-6394530.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.8,
    reviews: 75,
  },
  {
    id: 708,
    name: 'Goldblatt Heavy-Duty Manual Tile Cutter 24 in.',
    category: 'Installation Materials',
    price: 79.99,
    unit: 'each',
    size: '24 in.',
    color: 'Gray',
    type: 'Tile Cutter',
    image: 'https://images.pexels.com/photos/7587862/pexels-photo-7587862.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.7,
    reviews: 83,
  },

  // ==================== 8. SHOP BY ROOM ====================
  {
    id: 801,
    name: 'Spa Retreat Master Bathroom Tile & Vanity Suite',
    category: 'Shop By Room',
    price: 3.49,
    unit: 'sq. ft.',
    size: 'Curated Room',
    color: 'White',
    type: 'Bathroom Suite',
    image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.9,
    reviews: 165,
    badge: 'BEST SELLER',
  },
  {
    id: 802,
    name: 'Gourmet Chef Kitchen Backsplash & Floor Ensemble',
    category: 'Shop By Room',
    price: 4.29,
    unit: 'sq. ft.',
    size: 'Curated Room',
    color: 'White',
    type: 'Kitchen Collection',
    image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.8,
    reviews: 132,
    badge: 'TRENDING',
  },
  {
    id: 803,
    name: 'Great Room Open Concept Natural Oak Hardwood',
    category: 'Shop By Room',
    price: 4.89,
    unit: 'sq. ft.',
    size: '7.5 x 72',
    color: 'Natural',
    type: 'Living Room',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.9,
    reviews: 98,
  },
  {
    id: 804,
    name: 'Modern Mudroom & Laundry Waterproof Stone Look',
    category: 'Shop By Room',
    price: 2.79,
    unit: 'sq. ft.',
    size: '12 x 24',
    color: 'Gray',
    type: 'Laundry & Mudroom',
    image: 'https://images.pexels.com/photos/7587862/pexels-photo-7587862.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.7,
    reviews: 73,
  },
  {
    id: 805,
    name: 'Outdoor Covered Patio Slip-Resistant Porcelain Paver',
    category: 'Shop By Room',
    price: 5.49,
    unit: 'sq. ft.',
    size: '24 x 24',
    color: 'Gray',
    type: 'Patio & Outdoor',
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.8,
    reviews: 64,
    badge: 'OUTDOOR',
  },
  {
    id: 806,
    name: 'Luxe Walkout Basement Waterproof Rigid Vinyl',
    category: 'Shop By Room',
    price: 2.89,
    unit: 'sq. ft.',
    size: '7 x 48',
    color: 'Brown',
    type: 'Basement Room',
    image: 'https://images.pexels.com/photos/2082087/pexels-photo-2082087.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.8,
    reviews: 86,
    badge: 'NEW',
  },
  {
    id: 807,
    name: 'Luxury Walk-In Shower Marble Wall & Hex Mosaic',
    category: 'Shop By Room',
    price: 4.99,
    unit: 'sq. ft.',
    size: 'Custom Shower',
    color: 'White',
    type: 'Shower Enclosure',
    image: 'https://images.pexels.com/photos/6585757/pexels-photo-6585757.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.9,
    reviews: 142,
  },
  {
    id: 808,
    name: 'Primary Bedroom Wirebrushed French White Oak',
    category: 'Shop By Room',
    price: 4.49,
    unit: 'sq. ft.',
    size: '7.5 x 72',
    color: 'Natural',
    type: 'Bedroom Suite',
    image: 'https://images.pexels.com/photos/276554/pexels-photo-276554.jpeg?auto=compress&cs=tinysrgb&w=900',
    rating: 4.8,
    reviews: 89,
  },
];

const categoryHeadings: Record<string, { eyebrow: string; title: string; subtitle: string }> = {
  Tile: {
    eyebrow: 'SHOP OUR SELECTION',
    title: 'Porcelain & Ceramic Tile',
    subtitle: 'From polished marble looks to handmade subway tiles, find the perfect wall & floor tile.',
  },
  Stone: {
    eyebrow: 'SHOP NATURAL STONE',
    title: 'Natural Stone & Slate',
    subtitle: 'Timeless marble, travertine, slate, and granite cut to architectural perfection.',
  },
  Wood: {
    eyebrow: 'SHOP HARDWOOD FLOORING',
    title: 'Solid & Engineered Hardwood',
    subtitle: 'Authentic European white oak, hickory, and maple crafted for enduring warmth and elegance.',
  },
  Laminate: {
    eyebrow: 'SHOP WATERPROOF LAMINATE',
    title: 'Waterproof Laminate Flooring',
    subtitle: 'Durable, scratch-resistant wood looks engineered with water-tight locking systems.',
  },
  Vinyl: {
    eyebrow: 'SHOP LUXURY VINYL PLANK',
    title: 'Rigid Core Luxury Vinyl (LVP)',
    subtitle: '100% waterproof luxury vinyl plank with attached acoustical underlayment.',
  },
  Fixtures: {
    eyebrow: 'SHOP KITCHEN & BATH FIXTURES',
    title: 'Bathroom & Kitchen Fixtures',
    subtitle: 'Designer vanities, freestanding faucets, vessel sinks, and modern shower doors.',
  },
  'Installation Materials': {
    eyebrow: 'SHOP PRO INSTALLATION',
    title: 'Tile Installation & Setting Materials',
    subtitle: 'Professional-grade mortar, silicone grout, uncoupling membranes, and precision tools.',
  },
  'Shop By Room': {
    eyebrow: 'SHOP BY SPACE & ROOM',
    title: 'Curated Room Collections',
    subtitle: 'Expertly paired tiles, hardwood, and finishes tailored for bathrooms, kitchens, and patios.',
  },
};

const filterGroups = [
  { label: 'Shop By', options: ['Porcelain Tile', 'Ceramic Tile', 'Mosaic Tile'] },
  { label: 'Color', options: ['White', 'Gray', 'Beige', 'Blue', 'Green'] },
  { label: 'Look', options: ['Marble Look', 'Stone Look', 'Subway', 'Patterned', 'Mosaic'] },
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

export default function ProductsPage() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [sort, setSort] = useState('featured');
  const [selectedColor, setSelectedColor] = useState('All');
  const [saved, setSaved] = useState<number[]>([]);
  const { addToCart, totalCount, setIsCartOpen } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNavCategory, setActiveNavCategory] = useState('Tile');

  // Sync category from URL parameter on mount and when popstate triggers
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const syncCategoryFromUrl = () => {
        const params = new URLSearchParams(window.location.search);
        const cat = params.get('category');
        if (cat) {
          const matched = primaryNavCategories.find(
            (c) => c.name.toLowerCase() === cat.toLowerCase()
          );
          if (matched) {
            setActiveNavCategory(matched.name);
          }
        }
      };

      syncCategoryFromUrl();
      window.addEventListener('popstate', syncCategoryFromUrl);
      return () => window.removeEventListener('popstate', syncCategoryFromUrl);
    }
  }, []);

  const handleCategorySelect = (categoryName: string) => {
    setActiveNavCategory(categoryName);
    setSelectedColor('All');
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('category', categoryName);
      window.history.pushState({}, '', url.toString());
    }
  };

  const visibleProducts = useMemo(() => {
    // 1. Filter by category
    let list = allProducts.filter(
      (product) => product.category.toLowerCase() === activeNavCategory.toLowerCase()
    );
    if (list.length === 0) list = allProducts;

    // 2. Filter by color chip
    if (selectedColor !== 'All') {
      list = list.filter((product) => product.color.toLowerCase() === selectedColor.toLowerCase());
    }

    // 3. Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (product) =>
          product.name.toLowerCase().includes(q) ||
          product.type.toLowerCase().includes(q) ||
          product.color.toLowerCase().includes(q)
      );
    }

    // 4. Sort
    return [...list].sort((a, b) => {
      if (sort === 'price-low') return a.price - b.price;
      if (sort === 'price-high') return b.price - a.price;
      return b.rating - a.rating;
    });
  }, [activeNavCategory, selectedColor, searchQuery, sort]);

  const toggleSaved = (id: number) => {
    setSaved((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  const currentMeta = categoryHeadings[activeNavCategory] || {
    eyebrow: 'SHOP OUR SELECTION',
    title: `${activeNavCategory} Products`,
    subtitle: `Explore top-rated products in ${activeNavCategory}.`,
  };

  return (
    <main className="catalog-page min-h-screen bg-white">
      {/* 1. TOP ACCENT STRIPE & CLEAN MAIN HEADER */}
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
                placeholder={`Search in ${activeNavCategory}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search products"
              />
              <button className="search-clean-btn" aria-label="Submit search">
                <Search size={18} strokeWidth={2.2} />
              </button>
            </div>
          </div>

          {/* Header Action Items: Log In, My Projects, Cart */}
          <div className="header-actions-clean">
            <a href="/login" className="action-clean-item" aria-label="Log In">
              <UserRound size={26} strokeWidth={1.8} />
              <span>Log In</span>
            </a>

            <button
              className="action-clean-item"
              aria-label="My Projects"
              onClick={() => alert(`You have ${saved.length} items saved in My Projects.`)}
            >
              <Heart
                size={26}
                strokeWidth={1.8}
                fill={saved.length > 0 ? '#ed1c24' : 'none'}
                color={saved.length > 0 ? '#ed1c24' : 'currentColor'}
              />
              <span>My Projects</span>
            </button>

            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="action-clean-item"
              aria-label="View Cart"
            >
              <div className="cart-box-clean">
                <ShoppingCart size={26} strokeWidth={1.8} />
                <span className="cart-badge-black">{totalCount}</span>
              </div>
            </button>
          </div>
        </div>

        {/* 2. SIGNATURE RED NAVIGATION BAR WITH INTERACTIVE CATEGORIES */}
        <div className="primary-red-nav-bar">
          <nav className="primary-red-nav-inner">
            {primaryNavCategories.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleCategorySelect(item.name);
                }}
                className={`red-nav-item ${
                  activeNavCategory.toLowerCase() === item.name.toLowerCase() ? 'active' : ''
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* 3. CATALOG PRODUCTS SECTION - DYNAMIC FOR SELECTED CATEGORY */}
      <section className="catalog-products page-width !pt-8" id="products">
        <div className="catalog-section-heading product-heading !border-t-0 !pt-0">
          <div>
            <p className="catalog-eyebrow">{currentMeta.eyebrow}</p>
            <h2>{currentMeta.title}</h2>
            <span className="text-[#666] text-sm block mt-1">{visibleProducts.length} products available</span>
          </div>
          <div className="catalog-controls">
            <button className="filter-trigger" onClick={() => setFilterOpen(!filterOpen)}>
              <Filter size={16} /> Filters
            </button>
            <label>
              Sort by{' '}
              <select value={sort} onChange={(event) => setSort(event.target.value)}>
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </label>
          </div>
        </div>

        {/* Color Quick Filter Chips */}
        <div className="color-chips">
          <button
            className={selectedColor === 'All' ? 'active' : ''}
            onClick={() => setSelectedColor('All')}
          >
            All Colors
          </button>
          {['White', 'Gray', 'Beige', 'Blue', 'Green', 'Natural', 'Brown', 'Black'].map((color) => (
            <button
              key={color}
              className={selectedColor === color ? 'active' : ''}
              onClick={() => setSelectedColor(color)}
            >
              {color}
            </button>
          ))}
        </div>

        <div className="catalog-layout">
          {filterOpen && (
            <div
              className="filter-mobile-backdrop"
              onClick={() => setFilterOpen(false)}
              aria-label="Close filters"
            />
          )}
          <aside className={`filter-sidebar ${filterOpen ? 'filter-sidebar-open' : ''}`}>
            <div className="filter-header">
              <h3>Filters ({activeNavCategory})</h3>
              <button
                className="filter-close"
                onClick={() => setFilterOpen(false)}
                aria-label="Close filters"
              >
                <X size={18} />
              </button>
            </div>
            {filterGroups.map((group) => (
              <div className="filter-group" key={group.label}>
                <strong>{group.label}</strong>
                {group.options.map((option) => (
                  <label key={option}>
                    <input type="checkbox" /> <span>{option}</span>
                  </label>
                ))}
              </div>
            ))}
            <button
              className="clear-filters"
              onClick={() => {
                setSelectedColor('All');
                setSearchQuery('');
              }}
            >
              Clear all filters
            </button>
          </aside>

          {/* 4-Column Product Grid */}
          <div className="catalog-grid">
            {visibleProducts.map((product) => (
              <article className="catalog-card" key={product.id}>
                <div className="catalog-card-image">
                  <img src={product.image} alt={product.name} loading="lazy" />
                  {product.badge && <small>{product.badge}</small>}
                  <button
                    className="catalog-heart"
                    aria-label={`Save ${product.name}`}
                    onClick={() => toggleSaved(product.id)}
                  >
                    <Heart
                      size={18}
                      fill={saved.includes(product.id) ? '#ed1b2f' : 'none'}
                      color={saved.includes(product.id) ? '#ed1b2f' : 'currentColor'}
                    />
                  </button>
                </div>
                <div className="catalog-card-content">
                  <h3>{product.name}</h3>
                  <div className="catalog-rating">
                    <Star size={13} fill="currentColor" /> {product.rating}{' '}
                    <span>({product.reviews})</span>
                  </div>
                  <p className="catalog-price">
                    <strong>${product.price.toFixed(2)}</strong> / {product.unit}
                  </p>
                  <p className="catalog-meta">
                    {product.size} &nbsp;|&nbsp; {product.type}
                  </p>
                  <button
                    type="button"
                    className="catalog-add"
                    onClick={() =>
                      addToCart({
                        id: product.id,
                        name: product.name,
                        price: `$${product.price.toFixed(2)}`,
                        priceNumber: product.price,
                        size: product.size,
                        unit: product.unit,
                        image: product.image,
                        quantity: 1,
                      })
                    }
                  >
                    Add to cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SITE FOOTER */}
      <footer className="site-footer">
        <div className="footer-equity-bar">Bring It Home™</div>
        <div className="page-width">
          <div className="footer-main-grid">
            <div className="footer-signup-box">
              <h3>STAY INSPIRED!</h3>
              <p>Sign up for trends, events, new arrivals, and special promotions.</p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Subscribed!');
                }}
                className="newsletter-form"
              >
                <input type="email" placeholder="Email Address *" required />
                <button type="submit">Sign Me Up</button>
              </form>
            </div>
            <div className="footer-col">
              <h4>Customer Care</h4>
              <a href="/contact">Contact Us</a>
              <a href="/order-status">Check Order Status</a>
              <a href="/shipping">Shipping & Delivery</a>
              <a href="/returns">Returns & Refunds</a>
              <a href="/faq">Help Center & FAQ</a>
              <a href="/recalls">Product Recalls</a>
            </div>
            <div className="footer-col">
              <h4>About Us</h4>
              <a href="/story">Our Story</a>
              <a href="/careers">Careers</a>
              <a href="/investors">Investor Relations</a>
              <a href="/sustainability">Environmental Social Governance</a>
              <a href="/stores">Find a Store</a>
            </div>
            <div className="footer-col">
              <h4>Resources</h4>
              <a href="/products?category=Installation%20Materials">Installation Materials</a>
              <a href="/design-scheduler">Free Design Services</a>
              <a href="/vhtc">How-To DIY Videos</a>
              <a href="/visualizer">Floor Visualizer</a>
              <a href="/samples">Order Product Samples</a>
            </div>
            <div className="footer-col">
              <h4>For Pros & Credit</h4>
              <a href="/pro-premier">PRO Premier Rewards</a>
              <a href="/commercial">Commercial Sales</a>
              <a href="/trade-credit">Commercial Credit</a>
              <a href="/credit">Floor & Decor Credit Card</a>
            </div>
          </div>
          <div className="footer-bottom-bar">
            <span>© 2026 Floor and Decor Outlets of America, Inc. All Rights Reserved.</span>
            <div className="footer-legal-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Use</a>
              <a href="/accessibility">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
