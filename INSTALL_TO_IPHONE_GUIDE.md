# 📱 安装到 iPhone 测试指南

## ⚠️ 重要提示

由于需要 Apple 开发者账号签名，推荐使用以下方法之一：

## 方法 1: 使用 Expo Go (最简单，推荐)

### 步骤:
1. **在 iPhone 上安装 Expo Go**
   - App Store 搜索 "Expo Go"
   - 下载安装

2. **扫描二维码**
   ```bash
   cd /Users/jenkins3/Documents/dqh/muyu/taptap-joy
   npx expo start
   ```
   - 终端会显示二维码
   - 用 iPhone 相机或 Expo Go 扫描

3. **在手机上运行**
   - 应用会自动加载
   - 可以测试所有功能（除了 IAP）

**优点**: 
- ✅ 无需开发者账号
- ✅ 无需签名配置
- ✅ 快速测试

**限制**:
- ⚠️ 无法测试 IAP 内购功能
- ⚠️ 需要连接同一 WiFi

---

## 方法 2: Xcode 直接运行 (需要开发者账号)

### 步骤:

1. **打开 Xcode 项目**
   ```bash
   cd /Users/jenkins3/Documents/dqh/muyu/taptap-joy
   open ios/app.xcworkspace
   ```

2. **配置签名**
   - 选择项目 → Signing & Capabilities
   - Team: 选择你的开发者账号
   - Bundle Identifier: `cn.indieleague.taptapjoy`

3. **连接 iPhone**
   - 用数据线连接
   - 信任电脑

4. **运行**
   - 选择你的设备
   - 点击 Run (▶️)

**优点**:
- ✅ 完整功能测试
- ✅ 可以测试 IAP（需要配置）

**要求**:
- Apple 开发者账号 ($99/年)
- 配置好的证书和描述文件

---

## 方法 3: 构建 IPA 安装 (需要签名)

### 使用 EAS Build:

```bash
# 安装 EAS CLI
npm install -g eas-cli

# 登录
eas login

# 配置
eas build:configure

# 构建
eas build --platform ios --profile preview
```

然后下载 IPA 并通过 Xcode 安装。

---

## 🎯 快速测试（推荐 Expo Go）

### 立即开始:

```bash
cd /Users/jenkins3/Documents/dqh/muyu/taptap-joy

# 启动开发服务器
npx expo start
```

然后用手机扫描二维码即可测试！

### 可测试功能:
- ✅ TapButton 粒子效果
- ✅ StatsScreen 数字动画  
- ✅ AchievementsScreen 粒子庆祝
- ✅ ShopScreen 界面（不含真实购买）
- ✅ 所有 UI 交互

### 不可测试:
- ❌ 真实 IAP 购买（需要签名）
- ❌ 恢复购买

---

## 📝 下一步

如果要测试完整 IAP 功能：

1. **获取开发者账号**
   - 加入 Apple Developer Program ($99/年)

2. **配置证书**
   - 在 App Store Connect 创建 App ID
   - 配置 In-App Purchase 能力
   - 创建产品和测试账号

3. **签名并构建**
   - 使用 Xcode 或 EAS Build
   - 安装到设备测试

---

## 💡 当前推荐

**先用 Expo Go 测试 UI 和动画功能！**

IAP 功能需要：
- 开发者账号
- App Store Connect 配置
- 产品创建
- Sandbox 测试账号

这些配置好后，再进行完整测试。

---

**现在运行**:
```bash
npx expo start
```

扫描二维码即可在手机上看到效果！🎉
