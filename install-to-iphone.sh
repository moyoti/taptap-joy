#!/bin/bash

# 敲敲乐 - 自动安装到 iPhone 脚本

echo "🚀 开始安装敲敲乐到 iPhone..."

cd /Users/jenkins3/Documents/dqh/muyu/taptap-joy/ios

# 设备 ID
DEVICE_ID="00008110-00186940269A401E"

# 构建项目
echo "📦 构建项目..."
xcodebuild \
  -workspace app.xcworkspace \
  -scheme app \
  -configuration Debug \
  -destination "id=$DEVICE_ID" \
  CODE_SIGN_IDENTITY="Apple Development" \
  DEVELOPMENT_TEAM="" \
  PROVISIONING_PROFILE="" \
  clean build

if [ $? -eq 0 ]; then
  echo "✅ 构建成功！"
  echo "📱 应用已安装到你的 iPhone"
else
  echo "❌ 构建失败"
  echo "请在 Xcode 中手动配置签名"
fi
