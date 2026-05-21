import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '@/store/useAppStore';
import { THEME_COLORS, INITIAL_ITEMS } from '@/constants';
import { TapItem } from '@/types';

interface ShopScreenProps {
  navigation: any;
}

export const ShopScreen: React.FC<ShopScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const { progress, purchaseItem, selectItem, settings } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const theme = THEME_COLORS[settings.theme];

  const categories = [
    { id: 'all', label: t('common.all') },
    { id: 'traditional', label: t('category.traditional') },
    { id: 'modern', label: t('category.modern') },
    { id: 'fun', label: t('category.fun') },
    { id: 'premium', label: t('category.premium') },
    { id: 'achievement', label: t('category.achievement') },
  ];

  const filteredItems =
    selectedCategory === 'all'
      ? INITIAL_ITEMS
      : INITIAL_ITEMS.filter((item) => item.category === selectedCategory);

  const handlePurchase = (item: TapItem) => {
    if (item.isUnlocked) {
      selectItem(item);
      Alert.alert(t('shop.owned'), `${t(item.name)} ${t('shop.owned')}`);
      return;
    }

    if (item.isPremium && item.price) {
      Alert.alert(
        t('shop.purchase_confirm', { name: item.name }),
        `$${item.price}`,
        [
          { text: t('common.cancel'), style: 'cancel' },
          {
            text: t('common.purchase'),
            onPress: () => {
              purchaseItem(item.id);
              Alert.alert(t('shop.purchase_success', { name: item.name }));
              selectItem(item);
            },
          },
        ]
      );
    } else if (item.unlockCondition) {
      Alert.alert(t('shop.locked'), item.unlockCondition);
    } else {
      selectItem(item);
    }
  };

  const renderItem = ({ item }: { item: TapItem }) => {
    const isUnlocked = progress.unlockedItems.includes(item.id) || item.isUnlocked;
    const isAchievement = item.category === 'achievement';

    return (
      <Pressable
        style={[
          styles.itemCard,
          { backgroundColor: theme.card, borderColor: theme.border },
          isUnlocked && styles.itemCardUnlocked,
        ]}
        onPress={() => handlePurchase(item)}
      >
        <View style={[styles.itemEmoji, { backgroundColor: theme.background }]}>
          <Ionicons name={item.iconName as any} size={36} color={item.iconColor || theme.primary} />
        </View>
        <Text style={[styles.itemName, { color: theme.text }]}>{t(item.name)}</Text>
        <Text style={[styles.itemDesc, { color: theme.text }]} numberOfLines={2}>
          {t(item.description)}
        </Text>
        <View style={styles.itemFooter}>
          {isUnlocked ? (
            <View style={[styles.badge, { backgroundColor: theme.primary }]}>
              <Ionicons name="checkmark" size={16} color="#FFF" />
              <Text style={styles.badgeText}>{t('shop.owned')}</Text>
            </View>
          ) : isAchievement ? (
            <View style={[styles.badge, { backgroundColor: theme.accent }]}>
              <Ionicons name="lock-closed" size={16} color="#FFF" />
              <Text style={styles.badgeText}>{t('shop.locked')}</Text>
            </View>
          ) : item.isPremium ? (
            <View style={[styles.badge, { backgroundColor: theme.secondary }]}>
              <Ionicons name="pricetag" size={16} color="#FFF" />
              <Text style={styles.badgeText}>${item.price}</Text>
            </View>
          ) : (
            <View style={[styles.badge, { backgroundColor: theme.primary }]}>
              <Text style={styles.badgeText}>{t('common.free')}</Text>
            </View>
          )}
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </Pressable>
        <Text style={[styles.title, { color: theme.text }]}>{t('shop.title')}</Text>
        <View style={styles.placeholder} />
      </View>

      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item: category }) => (
          <Pressable
            style={[
              styles.categoryButton,
              { backgroundColor: theme.card },
              selectedCategory === category.id && { backgroundColor: theme.primary },
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Text
              style={[
                styles.categoryText,
                { color: theme.text },
                selectedCategory === category.id && styles.categoryTextActive,
              ]}
            >
              {category.label}
            </Text>
          </Pressable>
        )}
        contentContainerStyle={styles.categoryList}
      />

      <FlatList
        data={filteredItems}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.itemList}
        columnWrapperStyle={styles.itemRow}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  placeholder: {
    width: 24,
  },
  categoryList: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  categoryText: {
    fontSize: 14,
  },
  categoryTextActive: {
    color: '#FFF',
    fontWeight: '600',
  },
  itemList: {
    padding: 12,
  },
  itemRow: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  itemCard: {
    width: '48%',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
  },
  itemCardUnlocked: {
    opacity: 0.7,
  },
  itemEmoji: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 8,
  },
  emoji: {
    fontSize: 32,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  itemDesc: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 8,
    height: 32,
  },
  itemFooter: {
    alignItems: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
});
