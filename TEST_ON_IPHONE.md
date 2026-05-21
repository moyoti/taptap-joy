# 📱 在 iPhone 上测试敲敲乐

## 🎯 快速开始（5 分钟）

### 方法一：Expo Go（推荐 - 最简单）

#### 步骤 1: 安装 Expo Go

在 iPhone 上打开 App Store，搜索并下载 **Expo Go** 应用。

或者直接点击这个链接：
👉 [在 App Store 中打开 Expo Go](https://apps.apple.com/app/expo-go/id982107779)

#### 步骤 2: 启动开发服务器

在终端运行：

```bash
cd /Users/jenkins3/Documents/dqh/muyu/taptap-joy
npm start
```

你会看到一个二维码出现在终端中。

#### 步骤 3: 扫描二维码

**方式 A: 使用相机 App**
1. 打开 iPhone 的相机 App
2. 对准终端中的二维码
3. 点击弹出的通知，选择 "在 Expo Go 中打开"

**方式 B: 使用 Expo Go App**
1. 打开 Expo Go App
2. 点击 "Scan QR Code"
3. 扫描二维码

#### 步骤 4: 开始测试

应用会自动加载，你现在可以：
- ✅ 点击木鱼进行敲击
- ✅ 感受震动反馈
- ✅ 查看计数器增加
- ✅ 切换到商店浏览其他物品
- ✅ 查看统计数据
- ✅ 更改设置（主题、语言等）

---

### 方法二：构建独立测试版（需要 Apple Developer 账号）

如果你有 Apple Developer 账号，可以构建独立的 IPA 文件。

#### 步骤 1: 安装 EAS CLI

```bash
npm install -g eas-cli
eas login
```

#### 步骤 2: 配置 EAS

```bash
eas build:configure
```

#### 步骤 3: 构建测试版

**内部测试（推荐）:**
```bash
eas build --platform ios --profile preview
```

**App Store 版本:**
```bash
eas build --platform ios --profile production
```

#### 步骤 4: 下载并安装

构建完成后，你会收到一个下载链接：
1. 在 iPhone 上打开链接
2. 下载 IPA 文件
3. 通过 TestFlight 安装

---

## 🎮 测试清单

### 核心功能
- [ ] 点击木鱼有敲击效果
- [ ] 木鱼有缩放动画
- [ ] 手机有震动反馈
- [ ] 今日计数器增加
- [ ] 累计计数器增加
- [ ] 连击系统工作（快速连续点击）

### 商店功能
- [ ] 可以进入商店页面
- [ ] 可以看到所有物品
- [ ] 可以切换分类筛选
- [ ] 免费物品可以解锁
- [ ] 付费物品显示价格

### 统计功能
- [ ] 可以进入统计页面
- [ ] 显示今日敲击次数
- [ ] 显示累计敲击次数
- [ ] 显示最爱物品
- [ ] 显示连击次数

### 设置功能
- [ ] 可以进入设置页面
- [ ] 可以切换语言（中文/英文/日文）
- [ ] 可以切换主题（禅意/赛博）
- [ ] 可以开关音效
- [ ] 可以开关震动
- [ ] 可以调节震动强度

### UI/UX
- [ ] 界面美观流畅
- [ ] 动画效果自然
- [ ] 文字清晰可读
- [ ] 按钮容易点击
- [ ] 没有明显卡顿

---

## 🐛 常见问题

### Q1: 扫描二维码没反应？
**解决**:
1. 确保手机和电脑在同一 WiFi 网络
2. 检查防火墙设置
3. 尝试使用 Expo Go App 内的扫码功能

### Q2: 加载失败？
**解决**:
1. 检查网络连接
2. 重启开发服务器：`npm start -- --clear`
3. 重新安装 Expo Go

### Q3: 没有震动反馈？
**解决**:
1. 检查 iPhone 是否开启震动（设置 > 声音与触感）
2. 在应用设置中确认震动已开启
3. 某些 iPhone 机型震动较弱是正常的

### Q4: 动画卡顿？
**解决**:
1. 重启 Expo Go App
2. 重启开发服务器
3. 检查手机存储空间

---

## 📊 性能指标

### 期望表现
- **启动时间**: < 3 秒
- **敲击响应**: < 100ms
- **动画帧率**: 60fps
- **内存占用**: < 200MB

### 如何检查
1. 在 Expo Go 中摇动手机
2. 选择 "Show Performance Monitor"
3. 查看 FPS 和内存使用

---

## 📝 反馈建议

测试完成后，请记录以下内容：

### 喜欢的地方
- 
- 
- 

### 需要改进的地方
- 
- 
- 

### 发现的 Bug
- 
- 
- 

### 新功能建议
- 
- 
- 

---

## 🔗 相关链接

- [Expo Go 官方文档](https://docs.expo.dev/get-started/expo-go/)
- [React Native 性能优化](https://reactnative.dev/docs/performance)
- [项目 README](./README.md)

---

**祝你测试愉快！** 🎉

如有问题，请随时联系开发团队。
