import React from 'react';
import { View, Text, StyleSheet, Modal, Pressable, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '@/store/useAppStore';
import { THEME_COLORS, INITIAL_ITEMS } from '@/constants';
import { useTranslation } from 'react-i18next';

interface ItemSelectorProps {
  visible: boolean;
  onClose: () => void;
}

const categoryColors: Record<string, string> = {
  traditional: '#8B4513',
  modern: '#4A5568',
  fun: '#E53E3E',
  achievement: '#D69E2E',
};

export const ItemSelector: React.FC<ItemSelectorProps> = ({ visible, onClose }) => {
  const { t } = useTranslation();
  const { currentItem, selectItem, progress, settings } = useAppStore();
  const theme = THEME_COLORS[settings.theme];

  const getCategoryLabel = (categoryId: string) => {
    const labels: Record<string, string> = {
      traditional: t('category.traditional'),
      modern: t('category.modern'),
      fun: t('category.fun'),
      achievement: t('category.achievement'),
    };
    return labels[categoryId] || categoryId;
  };

  const isUnlocked = (itemId: string) => progress.unlockedItems.includes(itemId);

  const handleSelectItem = (item: typeof INITIAL_ITEMS[0]) => {
    if (isUnlocked(item.id)) {
      selectItem(item);
      onClose();
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
        
        <View style={[styles.sheet, { backgroundColor: theme.card }]}>
          <View style={styles.handleContainer}>
            <View style={[styles.handle, { backgroundColor: theme.border }]} />
          </View>
          
          <Text style={[styles.title, { color: theme.text }]}>
            {t('shop.select_item')}
          </Text>
          
          <FlatList
            data={INITIAL_ITEMS}
            numColumns={3}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.gridContent}
            columnWrapperStyle={styles.gridRow}
            renderItem={({ item }) => {
              const unlocked = isUnlocked(item.id);
              const selected = currentItem.id === item.id;

              return (
                <Pressable
                  style={[
                    styles.itemCard,
                    { 
                      backgroundColor: unlocked ? theme.background : theme.border,
                      borderColor: selected ? item.iconColor : 'transparent',
                      borderWidth: selected ? 3 : 0,
                      opacity: unlocked ? 1 : 0.5,
                      shadowColor: unlocked ? item.iconColor : 'transparent',
                    }
                  ]}
                  onPress={() => handleSelectItem(item)}
                  disabled={!unlocked}
                >
                  <View style={[
                    styles.iconContainer,
                    { backgroundColor: theme.card }
                  ]}>
                    <View style={[
                      styles.iconGlow,
                      { backgroundColor: item.iconColor + '15' }
                    ]} />
                    <Ionicons 
                      name={item.iconName as any} 
                      size={32} 
                      color={item.iconColor} 
                    />
                    {!unlocked && (
                      <View style={styles.lockOverlay}>
                        <Ionicons name="lock-closed" size={18} color={theme.text} />
                      </View>
                    )}
                  </View>
                  
                  <Text 
                    numberOfLines={1}
                    style={[
                      styles.itemName, 
                      { color: unlocked ? theme.text : theme.text, opacity: unlocked ? 1 : 0.5 }
                    ]}
                  >
                    {t(item.name)}
                  </Text>
                  
                  <View style={[
                    styles.categoryBadge,
                    { backgroundColor: categoryColors[item.category] || theme.border }
                  ]}>
                    <Text style={styles.categoryText}>
                      {getCategoryLabel(item.category)}
                    </Text>
                  </View>
                  
                  {selected && (
                    <View style={styles.selectedIndicator}>
                      <Ionicons 
                        name="checkmark-circle" 
                        size={24} 
                        color={item.iconColor} 
                      />
                    </View>
                  )}
                </Pressable>
              );
            }}
          />
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
  sheet: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingBottom: 40,
    maxHeight: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  handleContainer: {
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 12,
  },
  handle: {
    width: 48,
    height: 5,
    borderRadius: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 20,
    letterSpacing: 0.3,
  },
  gridContent: {
    paddingHorizontal: 12,
    paddingBottom: 40,
  },
  gridRow: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  itemCard: {
    flex: 1,
    aspectRatio: 0.95,
    borderRadius: 20,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  iconGlow: {
    position: 'absolute',
    inset: 0,
    borderRadius: 32,
  },
  lockOverlay: {
    position: 'absolute',
    inset: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 32,
  },
  itemName: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
    width: '100%',
    letterSpacing: 0.2,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  selectedIndicator: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
