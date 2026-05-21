# 📱 一键安装敲敲乐到 iPhone

## ✅ 已完成的工作

- ✅ Xcode 项目已生成
- ✅ Xcode 已打开
- ✅ 你的 iPhone 已连接 (`My iPhone - iPhone 13 mini`)
- ✅ 你的 Apple ID 已识别 (`jinhaozheng@gmail.com`)

## 🎯 接下来只需 3 步（2 分钟）

### 步骤 1: 配置签名（30 秒）

1. **在 Xcode 中**，点击左侧导航器顶部的蓝色 **`app`** 图标

2. **在右侧面板**，确保选择了 **`TARGETS`** 下的 **`app`**

3. **点击顶部标签** **`Signing & Capabilities`**

4. **在 `Team` 下拉菜单中**：
   - 选择 **`jinhaozheng@gmail.com`** (你的个人团队)
   - 如果没有看到，点击 `Add an Account...` 并登录

5. **Bundle Identifier** 会自动更新为类似 `com.taptapjoy.jenkins3`

### 步骤 2: 选择你的 iPhone（10 秒）

1. **在 Xcode 顶部工具栏**，点击设备选择器

2. **选择你的 iPhone**（应该显示为 `My iPhone` 或 `iPhone 13 mini`）

### 步骤 3: 运行应用（1-2 分钟）

1. **点击 Xcode 顶部的绿色播放按钮 ▶️**
   - 或者按键盘快捷键 **`Cmd + R`**

2. **等待构建完成**：
   - Xcode 会编译项目（首次需要 1-2 分钟）
   - 然后自动安装到你的 iPhone

3. **首次安装需要信任开发者**：
   - 在 iPhone 上打开：**设置 > 通用 > VPN 与设备管理**
   - 找到 **`jinhaozheng@gmail.com`**
   - 点击 **`信任 "jinhaozheng@gmail.com"`**

## 🎉 完成！

应用安装成功后，你可以在 iPhone 上：
- 🐟 点击木鱼体验敲击
- 📊 查看统计数据
- 🛍️ 浏览商店解锁新物品
- ⚙️ 切换主题和语言
- 📱 感受震动反馈

## 🐛 遇到问题？

### 问题：提示需要信任开发者
**解决**：设置 > 通用 > VPN 与设备管理 > 信任你的 Apple ID

### 问题：构建失败
**解决**：
1. 确保选择了正确的 Team
2. 尝试 Product > Clean Build Folder (Cmd+Shift+K)
3. 重新运行

### 问题：找不到我的 iPhone
**解决**：
1. 确保 iPhone 已解锁并信任此 Mac
2. 重新插拔 USB 线
3. 在 Xcode > Window > Devices and Simulators 中检查设备

## 📞 需要帮助？

如果遇到问题，请告诉我具体的错误信息！

---

**预计总时间：2 分钟** ⏱️
