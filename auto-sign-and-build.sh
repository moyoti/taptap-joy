#!/bin/bash

echo "🔧 自动配置签名并构建..."

cd /Users/jenkins3/Documents/dqh/muyu/taptap-joy/ios

# 获取当前登录的用户名作为 Team Name
USER_NAME=$(whoami)
BUNDLE_ID="com.taptapjoy.$USER_NAME"

echo "📱 Bundle ID: $BUNDLE_ID"
echo "👤 开发者：$USER_NAME"

# 修改项目配置，启用自动签名
/usr/libexec/PlistBuddy -c "Set :objects:$(plutil -extract objects.B5E9B7D92C5E4F8FA1B2C3D4E5F6G7H8 string app.xcodeproj/project.pbxproj 2>/dev/null | head -1 || echo 'B5E9B7D92C5E4F8FA1B2C3D4E5F6G7H8') :buildConfigurationList:buildSettings:CODE_SIGN_STYLE Automatic" app.xcodeproj/project.pbxproj 2>/dev/null || true

echo "🚀 开始构建..."

# 使用自动签名构建
xcodebuild \
  -workspace app.xcworkspace \
  -scheme app \
  -configuration Debug \
  -destination 'generic/platform=iOS' \
  -allowProvisioningUpdates \
  CODE_SIGN_STYLE=Automatic \
  PRODUCT_BUNDLE_IDENTIFIER="$BUNDLE_ID" \
  DEVELOPMENT_TEAM=A7845H8T2P \
  clean build | tee /tmp/build.log

if grep -q "BUILD SUCCEEDED" /tmp/build.log; then
    echo "✅ 构建成功！"
else
    echo "❌ 构建失败，请检查日志"
    tail -50 /tmp/build.log
fi
