tell application "Finder"
    activate
    display dialog "📱 敲敲乐 - 快速安装指南\n\n✅ Xcode 已打开\n✅ iPhone 已连接\n✅ Apple ID: 994308383@qq.com\n\n━━━━━━━━━━━━━━━━━━\n\n只需 3 步（1 分钟）：\n\n1️⃣ 点击左侧蓝色 app 图标\n2️⃣ 选择 Signing & Capabilities\n3️⃣ Team 选择 994308383@qq.com\n4️⃣ 点击运行 ▶️ (Cmd+R)\n\n━━━━━━━━━━━━━━━━━━\n\n🎉 应用将自动安装到你的 iPhone！" buttons {"查看详细指南", "开始安装"} default button "开始安装" with icon note
    set buttonPressed to button returned of result
    
    if buttonPressed is "查看详细指南" then
        tell application "System Events" to open POSIX file "/Users/jenkins3/Documents/dqh/muyu/taptap-joy/INSTALL_TO_IPHONE.md"
    end if
end tell

tell application "Xcode"
    activate
end tell
