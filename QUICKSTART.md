# 🚀 Cyber Tap 快速启动指南

## 前置要求

确保已安装：
- Node.js >= 18
- npm >= 9
- Expo CLI (`npm install -g expo-cli`)
- iOS: Xcode 15+ (仅 macOS)
- Android: Android Studio

## 快速开始（5 分钟）

### 1️⃣ 进入项目目录
```bash
cd /Users/jenkins3/Documents/dqh/muyu/taptap-joy
```

### 2️⃣ 安装依赖
```bash
npm install
```

### 3️⃣ 启动开发服务器
```bash
npm start
```

会看到一个二维码，使用 Expo Go 应用扫描即可在真机上运行。

### 4️⃣ 或在模拟器运行

**iOS 模拟器（macOS）:**
```bash
npm run ios
```

**Android 模拟器:**
```bash
npm run android
```

## 📱 在真机上测试

### iOS (需要 iPhone)
1. 在 App Store 下载 "Expo Go" 应用
2. 运行 `npm start`
3. 用 Expo Go 扫描二维码
4. 应用会在 iPhone 上运行

### Android (需要 Android 手机)
1. 在 Google Play 下载 "Expo Go" 应用
2. 运行 `npm start`
3. 用 Expo Go 扫描二维码
4. 应用会在 Android 手机上运行

## 🎮 测试功能

### 核心功能
1. **敲击木鱼**
   - 点击屏幕中央的木鱼
   - 感受震动反馈
   - 查看计数器增加

2. **切换物品**
   - 点击底部导航的"商店"
   - 浏览所有物品
   - 点击免费物品解锁

3. **查看统计**
   - 点击底部导航的"统计"
   - 查看敲击数据

4. **更改设置**
   - 点击底部导航的"设置"
   - 切换主题（禅意/赛博）
   - 调整震动强度
   - 更改语言

### 测试清单
- [ ] 敲击有震动反馈
- [ ] 计数器正常增加
- [ ] 连击系统工作（2 秒内连续点击）
- [ ] 商店可以浏览物品
- [ ] 免费物品可以解锁
- [ ] 统计页面显示正确数据
- [ ] 主题切换正常
- [ ] 语言切换正常

## 🐛 常见问题

### 问题 1: "Cannot find module"
**解决**: 删除 node_modules 并重新安装
```bash
rm -rf node_modules
npm install
```

### 问题 2: "Metro bundler error"
**解决**: 清除缓存重启
```bash
npm start -- --clear
```

### 问题 3: iOS 构建失败
**解决**: 更新 CocoaPods
```bash
cd ios
pod install
cd ..
```

### 问题 4: Android 构建失败
**解决**: 清理 Gradle 缓存
```bash
cd android
./gradlew clean
cd ..
```

## 📝 下一步

### 添加音效文件
1. 准备 15 个 MP3 音效文件
2. 放入 `src/assets/sounds/` 目录
3. 文件名对应：
   - `wooden_fish.mp3`
   - `gong.mp3`
   - `drum.mp3`
   - `jazz_drum.mp3`
   - `triangle.mp3`
   - `keyboard.mp3`
   - `mouse.mp3`
   - `stapler.mp3`
   - `spacebar.mp3`
   - `cat.mp3`
   - `watermelon.mp3`
   - `button.mp3`
   - `bubble.mp3`
   - `golden_fish.mp3`
   - `cyber_fish.mp3`

### 修改音效播放代码
在 `src/store/useAppStore.ts` 的 `tap` 函数中添加：
```typescript
import { Audio } from 'expo-av';

// 在 tap 函数中
const sound = new Audio.Sound();
await sound.loadAsync(require(`@/assets/sounds/${state.currentItem.soundFile}`));
await sound.playAsync();
```

## 🎨 自定义

### 更改主题颜色
编辑 `src/constants/index.ts` 中的 `THEME_COLORS`：
```typescript
export const THEME_COLORS = {
  zen: {
    primary: '#5D4037',
    // ... 其他颜色
  },
  cyber: {
    primary: '#8B5CF6',
    // ... 其他颜色
  },
};
```

### 添加新物品
在 `src/constants/index.ts` 的 `INITIAL_ITEMS` 数组中添加：
```typescript
{
  id: 'new_item',
  name: '新物品',
  description: '描述',
  category: 'fun',
  soundFile: 'new_item.mp3',
  imageEmoji: '🎁',
  vibrationPattern: [30],
  isPremium: false,
  isUnlocked: true,
}
```

### 添加新语言
在 `src/i18n/index.ts` 的 `resources` 对象中添加：
```typescript
'ko': {
  translation: {
    // 韩语翻译
  }
}
```

## 📦 构建生产版本

### iOS
```bash
# 安装 EAS CLI
npm install -g eas-cli

# 登录 Expo 账号
eas login

# 配置 EAS
eas build:configure

# 构建
eas build --platform ios
```

### Android
```bash
# 构建 APK
eas build --platform android --profile preview

# 或构建 AAB (Google Play)
eas build --platform android --profile production
```

## 🎯 开发技巧

### 热重载
修改代码后自动刷新，无需重启应用。

### 调试
1. 摇动设备或按 `Cmd + D` (iOS) / `Cmd + M` (Android)
2. 选择 "Debug" 打开 Chrome DevTools

### 性能优化
- 使用 `React.memo` 优化组件
- 避免在渲染函数中创建新对象
- 使用 `useCallback` 缓存回调函数

## 📞 获取帮助

遇到问题？
1. 查看 [Expo 文档](https://docs.expo.dev/)
2. 查看 [React Native 文档](https://reactnative.dev/)
3. 查看项目 README.md
4. 查看 PROJECT_SUMMARY.md

---

**祝开发顺利！** 🎉
