import { IAPProduct, Purchase } from 'react-native-iap';

/**
 * IAP Product IDs - Must match App Store Connect and Google Play Console
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

  // Subscriptions (Auto-Renewable)
  PREMIUM_MONTHLY: 'cn.indieleague.taptapjoy.premium_monthly',
  PREMIUM_YEARLY: 'cn.indieleague.taptapjoy.premium_yearly',
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
};

/**
 * Subscription benefits
 */
export const SUBSCRIPTION_BENEFITS = [
  'Unlock all premium items',
  'Exclusive subscription items',
  'Ad-free experience',
  'Priority support',
  'Cancel anytime',
];
