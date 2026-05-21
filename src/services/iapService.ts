import { Platform } from 'react-native';
import * as IAP from 'react-native-iap';
import { IAP_PRODUCT_IDS, PRODUCT_TO_ITEM_MAP } from '@/constants/iapProducts';

const PRODUCT_IDS = Platform.select({
  ios: Object.values(IAP_PRODUCT_IDS),
  android: Object.values(IAP_PRODUCT_IDS),
});

class IAPService {
  private isInitialized = false;

  /**
   * Initialize IAP connection
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    try {
      await IAP.initConnection();
      this.isInitialized = true;
      console.log('[IAP] Connection initialized');
    } catch (error) {
      console.error('[IAP] Initialization error:', error);
      throw new Error('Failed to initialize IAP');
    }
  }

  /**
   * Get all available products (Non-Consumable only)
   */
  async getProducts(): Promise<IAP.Product[]> {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      const products = await IAP.getProducts({ skus: PRODUCT_IDS });
      console.log('[IAP] Products loaded:', products.length);
      return products;
    } catch (error) {
      console.error('[IAP] Error loading products:', error);
      return [];
    }
  }

  /**
   * Purchase a product (Non-Consumable)
   */
  async purchaseProduct(productId: string): Promise<IAP.ProductPurchase> {
    try {
      const purchase = await IAP.requestPurchase({
        sku: productId,
      });

      console.log('[IAP] Purchase successful:', productId);
      return purchase;
    } catch (error: any) {
      console.error('[IAP] Purchase error:', error.code, error.message);
      throw this.mapPurchaseError(error);
    }
  }

  /**
   * Restore purchases
   */
  async restorePurchases(): Promise<IAP.ProductPurchase[]> {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      const purchases = await IAP.getAvailablePurchases();
      console.log('[IAP] Restored purchases:', purchases.length);
      return purchases;
    } catch (error) {
      console.error('[IAP] Restore error:', error);
      return [];
    }
  }

  /**
   * Finish a transaction (acknowledge purchase)
   */
  async finishTransaction(purchase: IAP.ProductPurchase): Promise<void> {
    try {
      if (Platform.OS === 'android') {
        await IAP.acknowledgePurchase({
          token: purchase.transactionReceipt,
        });
      }
      console.log('[IAP] Transaction finished');
    } catch (error) {
      console.error('[IAP] Finish transaction error:', error);
    }
  }

  /**
   * Clear IAP cache
   */
  async clear(): Promise<void> {
    try {
      await IAP.clearProducts();
      console.log('[IAP] Cache cleared');
    } catch (error) {
      console.error('[IAP] Clear cache error:', error);
    }
  }

  /**
   * Disconnect IAP
   */
  async disconnect(): Promise<void> {
    try {
      await IAP.endConnection();
      this.isInitialized = false;
      console.log('[IAP] Connection closed');
    } catch (error) {
      console.error('[IAP] Disconnect error:', error);
    }
  }

  /**
   * Map IAP errors to user-friendly messages
   */
  private mapPurchaseError(error: any): Error {
    switch (error.code) {
      case 'E_USER_CANCELLED':
        return new Error('Purchase cancelled');
      case 'E_ALREADY_OWNED':
        return new Error('Already owned');
      case 'E_NOT_PREPARED':
        return new Error('IAP not initialized');
      case 'E_NETWORK_ERROR':
        return new Error('Network error, please try again');
      case 'E_SERVICE_ERROR':
        return new Error('Store service unavailable');
      default:
        return new Error(error.message || 'Purchase failed');
    }
  }
}

export const iapService = new IAPService();
export default iapService;
