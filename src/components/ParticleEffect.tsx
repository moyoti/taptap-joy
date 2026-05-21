import React, { useEffect } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface Particle {
  id: number;
  x: number;
  y: number;
  emoji: string;
  angle: number;
  velocity: number;
  scale: number;
}

interface ParticleEffectProps {
  trigger: number;
  x: number;
  y: number;
  type?: 'tap' | 'combo' | 'unlock' | 'achievement';
  onComplete?: () => void;
}

const EMOJIS = {
  tap: ['✨', '⭐', '💫'],
  combo: ['🔥', '⚡', '💥'],
  unlock: ['🎉', '🎊', '✨'],
  achievement: ['🏆', '🌟', '💎'],
};

export const ParticleEffect: React.FC<ParticleEffectProps> = ({
  trigger,
  x,
  y,
  type = 'tap',
  onComplete,
}) => {
  const particles = useSharedValue<Particle[]>([]);
  const opacity = useSharedValue(1);

  useEffect(() => {
    if (trigger) {
      createParticles();
    }
  }, [trigger]);

  const createParticles = () => {
    const particleEmojis = EMOJIS[type];
    const count = type === 'achievement' ? 30 : type === 'combo' ? 15 : 8;
    const newParticles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * 360;
      const velocity = type === 'achievement' ? 150 + Math.random() * 100 : 80 + Math.random() * 60;
      
      newParticles.push({
        id: Date.now() + i,
        x: 0,
        y: 0,
        emoji: particleEmojis[Math.floor(Math.random() * particleEmojis.length)],
        angle: (angle * Math.PI) / 180,
        velocity,
        scale: 0.5 + Math.random() * 0.5,
      });
    }

    particles.value = newParticles;
    opacity.value = 1;

    // Fade out after delay
    setTimeout(() => {
      opacity.value = withTiming(
        0,
        { duration: 500 },
        () => {
          runOnJS(onComplete?.)();
        }
      );
    }, type === 'achievement' ? 1500 : 800);
  };

  const getParticleStyle = (particle: Particle, index: number) => {
    return useAnimatedStyle(() => {
      const progress = Math.min(1, particles.value.length > 0 ? 1 : 0);
      const distance = particle.velocity * progress;
      const translateX = Math.cos(particle.angle) * distance;
      const translateY = Math.sin(particle.angle) * distance;

      return {
        position: 'absolute' as const,
        left: x,
        top: y,
        transform: [
          { translateX },
          { translateY },
          { scale: interpolate(progress, [0, 1], [particle.scale, 0]) },
        ],
        opacity: opacity.value,
      };
    });
  };

  return (
    <>
      {particles.value.map((particle, index) => (
        <Animated.View
          key={particle.id}
          style={[styles.particle, getParticleStyle(particle, index)]}
          pointerEvents="none"
        >
          <Ionicons name="sparkles" size={20} color="#FFD700" />
        </Animated.View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  particle: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
