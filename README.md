# 敲敲乐 TapTap Joy - 敲敲乐

一个跨平台的解压敲击应用，支持 Android 和 iOS。

## 🎯 功能特性

- **多种敲击物品**：木鱼、鼓、机械键盘、猫头等 15+ 种物品
- **真实震动反馈**：每次敲击都有对应的震动模式
- **精美 UI 界面**：新禅意风格设计，支持主题切换
- **成就系统**：10+ 个成就等待解锁
- **物品商店**：免费和付费物品，支持内购
- **统计分析**：追踪敲击次数、连击、最爱物品等
- **多语言支持**：中文、英文、日文
- **iOS 小组件**：快速查看统计和敲击（待实现）

## 🛠️ 技术栈

- **框架**: React Native + Expo (SDK 54)
- **语言**: TypeScript
- **状态管理**: Zustand
- **导航**: React Navigation
- **本地化**: i18next
- **动画**: react-native-reanimated
- **音效**: expo-av
- **震动**: expo-haptics
- **存储**: AsyncStorage

## 📁 项目结构

```
taptap-joy/
├── src/
│   ├── components/       # 可复用组件
│   │   ├── TapButton.tsx
│   │   └── StatsDisplay.tsx
│   ├── screens/          # 页面组件
│   │   ├── MainScreen.tsx
│   │   ├── ShopScreen.tsx
│   │   ├── StatsScreen.tsx
│   │   ├── SettingsScreen.tsx
│   │   └── AchievementsScreen.tsx
│   ├── navigation/       # 导航配置
│   │   └── AppNavigator.tsx
│   ├── store/            # 状态管理
│   │   └── useAppStore.ts
│   ├── types/            # TypeScript 类型
│   │   └── index.ts
│   ├── constants/        # 常量配置
│   │   └── index.ts
│   ├── i18n/             # 本地化
│   │   └── index.ts
│   ├── utils/            # 工具函数
│   │   └── share.ts
│   └── assets/           # 资源文件
│       ├── sounds/       # 音效文件
│       └── images/       # 图片文件
├── widgets/              # iOS 小组件
├── App.tsx               # 应用入口
└── package.json
```

## 🚀 快速开始

### 环境要求

- Node.js >= 18
- npm >= 9
- Expo CLI
- iOS: Xcode 15+
- Android: Android Studio

### 安装依赖

```bash
cd taptap-joy
npm install
```

### 运行项目

**iOS 模拟器:**
```bash
npm run ios
```

**Android 模拟器:**
```bash
npm run android
```

**真机调试:**
```bash
npm start
```
然后使用 Expo Go 应用扫描二维码。

### 构建生产版本

**iOS:**
```bash
eas build --platform ios
```

**Android:**
```bash
eas build --platform android
```

## 🎮 物品列表

### 免费物品
- 木鱼 🐟 - 经典功德声
- 铜锣 🥁 - 悠长回响
- 小鼓 🥁 - 轻快节奏
- 机械键盘 ⌨️ - 青轴咔嗒声
- 鼠标点击 🖱️ - 清脆点击
- 猫头 🐱 - 喵一声

### 付费物品 ($0.99 - $1.99)
- 爵士鼓 🥁 - 低沉有力
- 三角铁 🔺 - 清脆叮声
- 订书机 📎 - 咔嚓声
- 空格键 ␣ - 厚实砰声
- 西瓜 🍉 - 砰砰声
- 按钮 🔴 - 搞怪音效
- 泡泡纸 🫧 - 捏泡泡声

### 成就解锁
- 金色木鱼 🐟 - 累计敲击 10000 次
- 赛博木鱼 🤖 - 连续敲击 100 次

## 🏆 成就系统

1. 初次敲击 - 第一次敲击物品
2. 百次敲击 - 累计敲击 100 次
3. 千次敲击 - 累计敲击 1000 次
4. 万次敲击 - 累计敲击 10000 次（奖励：金色木鱼）
5. 连击高手 - 连续敲击 10 次
6. 连击大师 - 连续敲击 50 次
7. 连击传奇 - 连续敲击 100 次（奖励：赛博木鱼）
8. 收藏家 - 解锁所有物品
9. 持之以恒 - 连续 7 天敲击
10. 夜猫子 - 凌晨 1-5 点敲击

## 🎨 主题

### 新禅意风 (默认)
- 主色：檀木棕 #5D4037
- 辅助色：铜金色 #B8860B
- 背景：米白 #F5F1E8
- 强调色：朱砂红 #C41E3A

### 赛博风
- 主色：霓虹紫 #8B5CF6
- 辅助色：青色 #06B6D4
- 背景：深蓝黑 #0F172A
- 强调色：粉色 #EC4899

## 🌍 多语言支持

- 简体中文 (zh-CN)
- 英文 (en)
- 日文 (ja)

## 📱 iOS 小组件 (待实现)

计划支持 3 种尺寸的小组件：
- 小型：今日敲击次数 + 快速敲击
- 中型：统计图表 + 快速敲击
- 大型：完整统计 + 物品切换 + 敲击区

## 💰 变现策略

1. **付费物品**：单个物品 $0.99 - $2.99
2. **物品包**：$4.99（包含 5-8 个物品）
3. **订阅制**（可选）：
   - 月费 $2.99：解锁所有付费物品
   - 年费 $19.99：+ 专属限定物品

## 📝 待办事项

- [ ] 添加真实音效文件
- [ ] 实现 iOS 小组件
- [ ] 添加更多物品和成就
- [ ] 实现内购功能
- [ ] 添加社交分享功能
- [ ] 优化动画效果
- [ ] 添加背景白噪音选项
- [ ] 实现成就通知

## 📄 许可证

MIT

## 👥 贡献

欢迎贡献代码！请提交 Issue 或 Pull Request。
