import { Audio } from 'expo-av';

const soundMap: Record<string, any> = {
  wooden_fish: require('../../assets/sounds/wooden_fish.wav'),
  gong: require('../../assets/sounds/gong.wav'),
  drum: require('../../assets/sounds/drum.wav'),
  jazz_drum: require('../../assets/sounds/jazz_drum.wav'),
  triangle: require('../../assets/sounds/triangle.wav'),
  mechanical_keyboard: require('../../assets/sounds/keyboard.wav'),
  mouse_click: require('../../assets/sounds/mouse.wav'),
  stapler: require('../../assets/sounds/stapler.wav'),
  spacebar: require('../../assets/sounds/spacebar.wav'),
  cat_head: require('../../assets/sounds/cat.wav'),
  watermelon: require('../../assets/sounds/watermelon.wav'),
  button: require('../../assets/sounds/button.wav'),
  bubble_wrap: require('../../assets/sounds/bubble.wav'),
  golden_fish: require('../../assets/sounds/golden_fish.wav'),
  cyber_fish: require('../../assets/sounds/cyber_fish.wav'),
  knob: require("../../assets/sounds/knob_click.wav"),
};

let initialized = false;

export async function initAudio() {
  if (initialized) return;
  await Audio.setAudioModeAsync({
    playsInSilentModeIOS: true,
    staysActiveInBackground: false,
    shouldDuckAndroid: true,
  });
  initialized = true;
}

export async function playItemSound(itemId: string) {
  if (!initialized) await initAudio();
  const source = soundMap[itemId];
  if (!source) return;
  try {
    const { sound } = await Audio.Sound.createAsync(source, {
      shouldPlay: true,
      volume: 0.7,
      isMuted: false,
    });
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && status.didJustFinish) {
        sound.unloadAsync().catch(() => {});
      }
    });
  } catch {
    // 音频失败不影响主体验
  }
}
