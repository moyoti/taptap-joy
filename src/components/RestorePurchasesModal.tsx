import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppStore } from '@/store/useAppStore';
import { THEME_COLORS } from '@/constants';
import { iapService } from '@/services/iapService';
import { PRODUCT_CONFIGS, IAP_PRODUCT_IDS } from '@/constants/iapProducts';

interface RestorePurchasesModalProps {
  visible: boolean;
  onClose: () => void;
}

export const RestorePurchasesModal: React.FC<RestorePurchasesModalProps> = ({
  visible,
  onClose,
}) => {
  const { t } = useTranslation();
  const { purchaseItem, settings } = useAppStore();
  const theme = THEME_COLORS[settings.theme];
  
  const [isRestoring, setIsRestoring] = useState(false);
  const [restoreResult, setRestoreResult] = useState<{
    success: boolean;
    message: string;
    items: string[];
  } | null>(null);

  const handleRestore = async () => {
    setIsRestoring(true);
    setRestoreResult(null);

    try {
      const purchases = await iapService.restorePurchases();
      
      if (purchases.length === 0) {
        setRestoreResult({
          success: false,
          message: t('iap.restore_no_purchases'),
          items: [],
        });
        return;
      }

      const unlockedItems: string[] = [];
      
      purchases.forEach((purchase) => {
        const productId = purchase.productId;
        const items = PRODUCT_CONFIGS.find((config) => config.id === productId)?.items || [];
        
        items.forEach((itemId) => {
          if (!unlockedItems.includes(itemId)) {
            unlockedItems.push(itemId);
            purchaseItem(itemId);
          }
        });
      });

      setRestoreResult({
        success: true,
        message: t('iap.restore_success', { count: unlockedItems.length }),
        items: unlockedItems,
      });
    } catch (error: any) {
      setRestoreResult({
        success: false,
        message: error.message || t('iap.restore_error'),
        items: [],
      });
    } finally {
      setIsRestoring(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        
        <View style={[styles.container, { backgroundColor: theme.card }]}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.text }]}>
              {t('iap.restore_purchases')}
            </Text>
            <Pressable onPress={onClose}>
              <Ionicons name="close" size={24} color={theme.text} />
            </Pressable>
          </View>

          <View style={styles.content}>
            <Ionicons
              name="refresh-outline"
              size={64}
              color={theme.primary}
              style={styles.icon}
            />
            
            <Text style={[styles.description, { color: theme.text, opacity: 0.7 }]}>
              {t('iap.restore_description')}
            </Text>

            {restoreResult && (
              <View
                style={[
                  styles.result,
                  {
                    backgroundColor: restoreResult.success
                      ? theme.primary + '15'
                      : theme.accent + '15',
                  },
                ]}
              >
                <Ionicons
                  name={restoreResult.success ? 'checkmark-circle' : 'alert-circle'}
                  size={24}
                  color={restoreResult.success ? theme.primary : theme.accent}
                />
                <Text
                  style={[
                    styles.resultText,
                    {
                      color: restoreResult.success ? theme.primary : theme.accent,
                    },
                  ]}
                >
                  {restoreResult.message}
                </Text>
              </View>
            )}

            {restoreResult?.success && restoreResult.items.length > 0 && (
              <View style={styles.itemsList}>
                <Text style={[styles.itemsTitle, { color: theme.text, opacity: 0.6 }]}>
                  {t('iap.restored_items')}
                </Text>
                <FlatList
                  data={restoreResult.items}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <View style={styles.itemRow}>
                      <Ionicons name="checkmark" size={16} color={theme.primary} />
                      <Text style={[styles.itemText, { color: theme.text }]}>
                        {t(`item.${item}.name`)}
                      </Text>
                    </View>
                  )}
                />
              </View>
            )}
          </View>

          <Pressable
            style={[
              styles.restoreButton,
              {
                backgroundColor: theme.primary,
                opacity: isRestoring ? 0.6 : 1,
              },
            ]}
            onPress={handleRestore}
            disabled={isRestoring}
          >
            {isRestoring ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <>
                <Ionicons name="refresh" size={20} color="#FFF" />
                <Text style={styles.restoreButtonText}>
                  {t('iap.restore_now')}
                </Text>
              </>
            )}
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  container: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingBottom: 40,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  icon: {
    marginBottom: 16,
  },
  description: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  result: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 16,
    width: '100%',
  },
  resultText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
  },
  itemsList: {
    width: '100%',
    marginTop: 8,
  },
  itemsTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 6,
  },
  itemText: {
    fontSize: 14,
  },
  restoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    margin: 20,
    paddingVertical: 16,
    borderRadius: 30,
  },
  restoreButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
