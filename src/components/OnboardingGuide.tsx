import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  Dimensions,
  Animated,
  ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppStore } from '@/store/useAppStore';
import { THEME_COLORS } from '@/constants';

const { width, height } = Dimensions.get('window');

interface OnboardingSlide {
  icon: string;
  iconColor: string;
  title: string;
  description: string;
}

export const OnboardingGuide: React.FC = () => {
  const { t } = useTranslation();
  const { hasCompletedOnboarding, setOnboardingComplete, settings } = useAppStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  const theme = THEME_COLORS[settings.theme];

  const slides: OnboardingSlide[] = [
    {
      icon: 'hand-left',
      iconColor: THEME_COLORS.zen.primary,
      title: t('onboarding.welcome.title'),
      description: t('onboarding.welcome.description'),
    },
    {
      icon: 'musical-note',
      iconColor: THEME_COLORS.zen.secondary,
      title: t('onboarding.tap_sounds.title'),
      description: t('onboarding.tap_sounds.description'),
    },
    {
      icon: 'phone-portrait',
      iconColor: THEME_COLORS.zen.accent,
      title: t('onboarding.haptic_feedback.title'),
      description: t('onboarding.haptic_feedback.description'),
    },
    {
      icon: 'trophy',
      iconColor: THEME_COLORS.zen.primary,
      title: t('onboarding.achievements.title'),
      description: t('onboarding.achievements.description'),
    },
    {
      icon: 'cart',
      iconColor: THEME_COLORS.zen.secondary,
      title: t('onboarding.shop.title'),
      description: t('onboarding.shop.description'),
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      scrollViewRef.current?.scrollTo({
        x: width * (currentSlide + 1),
        animated: true,
      });
      setCurrentSlide(currentSlide + 1);
    } else {
      setOnboardingComplete();
    }
  };

  const handleSkip = () => {
    setOnboardingComplete();
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: false,
      listener: (event: any) => {
        const slideIndex = Math.round(
          event.nativeEvent.contentOffset.x / width
        );
        setCurrentSlide(slideIndex);
      },
    }
  );

  const renderSlide = (slide: OnboardingSlide, index: number) => (
    <View
      key={index}
      style={[
        styles.slide,
        { backgroundColor: theme.background },
        { width },
      ]}
    >
      <View style={styles.slideContent}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: slide.iconColor + '15' },
          ]}
        >
          <Ionicons name={slide.icon as any} size={80} color={slide.iconColor} />
        </View>
        <Text style={[styles.slideTitle, { color: theme.text }]}>
          {slide.title}
        </Text>
        <Text style={[styles.slideDescription, { color: theme.text, opacity: 0.7 }]}>
          {slide.description}
        </Text>
      </View>
    </View>
  );

  const renderPagination = () => (
    <View style={styles.pagination}>
      {slides.map((_, index) => {
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [8, 24, 8],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.4, 1, 0.4],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              { width: dotWidth, opacity, backgroundColor: theme.primary },
            ]}
          />
        );
      })}
    </View>
  );

  if (hasCompletedOnboarding) {
    return null;
  }

  return (
    <Modal visible={true} animationType="slide" statusBarTranslucent>
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.header}>
          <Pressable onPress={handleSkip} style={styles.skipButton}>
            <Text style={[styles.skipText, { color: theme.text, opacity: 0.6 }]}>
              {t('onboarding.skip')}
            </Text>
          </Pressable>
          <Text style={[styles.progressText, { color: theme.text, opacity: 0.6 }]}>
            {currentSlide + 1} / {slides.length}
          </Text>
        </View>

        <Animated.ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={styles.scrollViewContent}
        >
          {slides.map((slide, index) => renderSlide(slide, index))}
        </Animated.ScrollView>

        <View style={styles.footer}>
          {renderPagination()}
          <Pressable
            style={[
              styles.nextButton,
              { backgroundColor: theme.primary },
              currentSlide === slides.length - 1 && styles.getStartedButton,
            ]}
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>
              {currentSlide === slides.length - 1
                ? t('onboarding.get_started')
                : t('onboarding.next')}
            </Text>
            <Ionicons
              name={currentSlide === slides.length - 1 ? 'checkmark' : 'arrow-forward'}
              size={20}
              color="#FFF"
              style={styles.buttonIcon}
            />
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
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
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  skipButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  skipText: {
    fontSize: 16,
    fontWeight: '500',
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
  },
  scrollViewContent: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 60,
  },
  iconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  slideTitle: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: 0.3,
  },
  slideDescription: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 30,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    minWidth: 200,
  },
  getStartedButton: {
    backgroundColor: '#4CAF50',
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  buttonIcon: {
    marginLeft: 8,
  },
});
