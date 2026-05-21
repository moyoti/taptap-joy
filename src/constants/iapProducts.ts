import { IAPProduct, Purchase } from 'react-native-iap';

/**
 * IAP Product IDs - Must match App Store Connect and Google Play Console
 * All products are Non-Consumable (one-time purchase)
 */
export const IAP_PRODUCT_IDS = {
  // Individual Items (Non-Consumable)
  JAZZ_DRUM: 'cn.indieleague.taptapjoy.jazz_drum',
  TRIANGLE: 'cn.indieleague.taptapjoy.triangle',
  STAPLER: 'cn.indieleague.taptapjoy.stapler',
  SPACEBAR: 'cn.indieleague.taptapjoy.spacebar',
  WATERMELON: 'cn.indieleague.taptapjoy.watermelon',
  KNOB: 'cn.indieleague.taptapjoy.knob',
  BUBBLE_WRAP: 'cn.indieleague.taptapjoy.bubble_wrap',

  // Item Bundles (Non-Consumable)
  BUNDLE_MUSIC: 'cn.indieleague.taptapjoy.bundle_music',
  BUNDLE_OFFICE: 'cn.indieleague.taptapjoy.bundle_office',
  BUNDLE_FUN: 'cn.indieleague.taptapjoy.bundle_fun',
  
  // Complete Unlock (Non-Consumable)
  ALL_IN_ONE: 'cn.indieleague.taptapjoy.all_in_one',
} as const;

export type IAPProductId = (typeof IAP_PRODUCT_IDS)[keyof typeof IAP_PRODUCT_IDS];

/**
 * Map IAP product IDs to item IDs in the app
 */
export const PRODUCT_TO_ITEM_MAP: Record<string, string[]> = {
  [IAP_PRODUCT_IDS.JAZZ_DRUM]: ['jazz_drum'],
  [IAP_PRODUCT_IDS.TRIANGLE]: ['triangle'],
  [IAP_PRODUCT_IDS.STAPLER]: ['stapler'],
  [IAP_PRODUCT_IDS.SPACEBAR]: ['spacebar'],
  [IAP_PRODUCT_IDS.WATERMELON]: ['watermelon'],
  [IAP_PRODUCT_IDS.KNOB]: ['knob'],
  [IAP_PRODUCT_IDS.BUBBLE_WRAP]: ['bubble_wrap'],
  [IAP_PRODUCT_IDS.BUNDLE_MUSIC]: ['jazz_drum', 'triangle'],
  [IAP_PRODUCT_IDS.BUNDLE_OFFICE]: ['stapler', 'spacebar'],
  [IAP_PRODUCT_IDS.BUNDLE_FUN]: ['watermelon', 'knob', 'bubble_wrap'],
  [IAP_PRODUCT_IDS.ALL_IN_ONE]: [
    'jazz_drum', 'triangle', 'stapler', 'spacebar', 
    'watermelon', 'knob', 'bubble_wrap'
  ],
};

/**
 * Product type definitions
 */
export interface IAPProductConfig {
  id: IAPProductId;
  type: 'individual' | 'bundle' | 'all_in_one';
  price: number;
  items: string[];
  title: string;
  description: string;
}

export const PRODUCT_CONFIGS: IAPProductConfig[] = [
  // Individual Items
  {
    id: IAP_PRODUCT_IDS.JAZZ_DRUM,
    type: 'individual',
    price: 1.99,
    items: ['jazz_drum'],
    title: 'Jazz Drum',
    description: 'Professional deep drum sound',
  },
  {
    id: IAP_PRODUCT_IDS.TRIANGLE,
    type: 'individual',
    price: 0.99,
    items: ['triangle'],
    title: 'Triangle',
    description: 'Crisp and clear bell tone',
  },
  {
    id: IAP_PRODUCT_IDS.STAPLER,
    type: 'individual',
    price: 0.99,
    items: ['stapler'],
    title: 'Stapler',
    description: 'Satisfying click sound',
  },
  {
    id: IAP_PRODUCT_IDS.SPACEBAR,
    type: 'individual',
    price: 1.49,
    items: ['spacebar'],
    title: 'Spacebar',
    description: 'Thick and solid thud',
  },
  {
    id: IAP_PRODUCT_IDS.WATERMELON,
    type: 'individual',
    price: 1.99,
    items: ['watermelon'],
    title: 'Watermelon',
    description: 'Summer refreshing boom',
  },
  {
    id: IAP_PRODUCT_IDS.KNOB,
    type: 'individual',
    price: 0.99,
    items: ['knob'],
    title: 'Knob',
    description: 'Rotating click satisfaction',
  },
  {
    id: IAP_PRODUCT_IDS.BUBBLE_WRAP,
    type: 'individual',
    price: 1.49,
    items: ['bubble_wrap'],
    title: 'Bubble Wrap',
    description: 'Pop pop stress relief',
  },
  
  // Bundles (Save 30-40%)
  {
    id: IAP_PRODUCT_IDS.BUNDLE_MUSIC,
    type: 'bundle',
    price: 2.49,
    items: ['jazz_drum', 'triangle'],
    title: 'Music Bundle',
    description: 'Jazz Drum + Triangle (Save 20%)',
  },
  {
    id: IAP_PRODUCT_IDS.BUNDLE_OFFICE,
    type: 'bundle',
    price: 1.99,
    items: ['stapler', 'spacebar'],
    title: 'Office Bundle',
    description: 'Stapler + Spacebar (Save 30%)',
  },
  {
    id: IAP_PRODUCT_IDS.BUNDLE_FUN,
    type: 'bundle',
    price: 3.49,
    items: ['watermelon', 'knob', 'bubble_wrap'],
    title: 'Fun Bundle',
    description: 'Watermelon + Knob + Bubble Wrap (Save 35%)',
  },
  
  // All-in-One (Best Value)
  {
    id: IAP_PRODUCT_IDS.ALL_IN_ONE,
    type: 'all_in_one',
    price: 9.99,
    items: [
      'jazz_drum', 'triangle', 'stapler', 'spacebar',
      'watermelon', 'knob', 'bubble_wrap'
    ],
    title: 'Complete Unlock',
    description: 'Unlock all 7 premium items (Save 50%)',
  },
];
