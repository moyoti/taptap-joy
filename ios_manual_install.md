# 手动安装 IPA 到 iPhone

由于 Expo 预构建遇到问题，我们将使用以下方案：

## 方案：使用 Xcode 直接构建和安装

### 步骤 1: 打开 Xcode
```bash
open ios/app.xcworkspace
```

### 步骤 2: 配置签名
1. 点击左侧蓝色 `app` 图标
2. 选择 `Signing & Capabilities`
3. Team 选择 `994308383@qq.com`
4. 如果没有，点击 `Add an Account` 并登录

### 步骤 3: 选择设备
- 在顶部选择你的 iPhone

### 步骤 4: 构建并安装
- 点击运行按钮 ▶️ 或按 `Cmd + R`

Xcode 会自动：
1. 编译应用
2. 签名
3. 安装到你的 iPhone

---

如果 Xcode 卡死，请：
1. 强制退出 Xcode: `killall Xcode`
2. 清理缓存：`rm -rf ~/Library/Developer/Xcode/DerivedData`
3. 重新打开项目
