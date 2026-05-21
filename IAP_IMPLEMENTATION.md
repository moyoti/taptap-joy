# UI 动画增强和 IAP 内购集成实施指南

## ✅ 已完成的工作

### 1. UI 动画增强

#### 依赖安装
```bash
npx expo install react-native-reanimated react-native-gesture-handler react-native-svg @shopify/flash-list
```

#### 新增组件

**ParticleEffect.tsx** - 粒子效果组件
- 支持 4 种类型：tap, combo, unlock, achievement
- 从点击位置向外爆发粒子
- 自动淡出和清理
- 可配置粒子数量和动画时长

**AnimatedCounter.tsx** - 数字动画组件
- 平滑的数字增长动画
- 可配置动画时长和格式化函数
- 使用 Reanimated 的 useAnimatedProps

### 2. IAP 内购集成

#### 依赖安装
```bash
npm install react-native-iap
```

#### 配置文件

**app.json** - 添加 IAP 插件配置
```json
{
  "plugins": [
    "expo-font",
    "expo-localization",
    ["react-native-iap", {
      "ios": {
        "appleId": "YOUR_APPLE_ID",
        "bundleIdentifier": "cn.indieleague.taptapjoy"
      },
      "android": {
        "packageName": "com.woodenfish.taptapjoy"
      }
    }]
  ]
}
```

**src/constants/iapProducts.ts** - IAP 产品配置
- 7 个单品：jazz_drum, triangle, stapler, spacebar, watermelon, knob, bubble_wrap
- 3 个 Bundle：bundle_music, bundle_office, bundle_fun
- 2 个订阅：premium_monthly, premium_yearly
- 产品到物品的映射关系

**src/services/iapService.ts** - IAP 服务层
- initialize() - 初始化 IAP 连接
- getProducts() - 获取所有产品
- getSubscriptions() - 获取订阅
- purchaseProduct() - 购买产品
- purchaseSubscription() - 购买订阅
- restorePurchases() - 恢复购买
- finishTransaction() - 完成交易
- 错误处理和用户友好消息映射

**src/store/useAppStore.ts** - 状态管理更新
- 添加 iapState 状态
- initializeIAP() - 初始化 IAP
- purchaseItemWithIAP() - 使用 IAP 购买
- restorePurchases() - 恢复购买
- clearIAPError() - 清除错误

**src/types/index.ts** - 类型定义
- 添加 IAPState 接口

## 📋 待完成的工作

### 1. ShopScreen IAP 集成

需要修改 `src/screens/ShopScreen.tsx`:

```typescript
// 替换 mock purchase 逻辑
const handlePurchase = async (item: TapItem) => {
  if (item.isUnlocked) {
    selectItem(item);
    return;
  }

  if (item.isPremium && item.price) {
    try {
      // 调用 IAP 服务
      await iapService.purchaseProduct(productId);
      // 成功后解锁物品
      purchaseItem(item.id);
      // 显示成功提示
    } catch (error) {
      // 处理错误
    }
  }
};
```

### 2. 添加 RestorePurchasesModal 组件

创建 `src/components/RestorePurchasesModal.tsx`:
- 恢复购买按钮
- 显示恢复的物品列表
- 错误处理
- 成功确认

### 3. 在 SettingsScreen 添加恢复购买入口

在设置页面添加"恢复购买"按钮，打开 RestorePurchasesModal。

### 4. 完善 UI 动画

#### TapButton 增强
- 集成 ParticleEffect 组件
- 添加点击时的粒子爆发
- 根据 combo 数量调整粒子强度

#### StatsScreen 增强
- 使用 AnimatedCounter 替换静态数字
- 添加进度条动画
- 添加图表显示每日历史

#### ShopScreen 增强
- 添加卡片按压动画
- Premium 物品添加光晕效果
- 分类切换动画

#### AchievementsScreen 增强
- 成就解锁时触发 ParticleEffect
- 添加庆祝动画
- 解锁成就时震动反馈

### 5. 配置应用商店商品

#### iOS (App Store Connect)
1. 创建 7 个 Non-Consumable 产品
   - Product ID: cn.indieleague.taptapjoy.jazz_drum 等
   - 价格：$0.99 - $1.99
2. 创建 3 个 Bundle 产品
   - 价格：$4.99
3. 创建 2 个 Auto-Renewable Subscription
   - 价格：$2.99/月，$19.99/年

#### Android (Google Play Console)
1. 创建对应的 In-App Products
2. 配置 Subscription
3. 上传 APK 到 Internal Testing
4. 添加 License Test Accounts

### 6. 测试清单

#### IAP 测试
- [ ]  sandbox 环境购买测试
- [ ]  恢复购买测试
- [ ]  取消购买测试
- [ ]  网络错误处理
- [ ]  已拥有物品处理

#### UI 动画测试
- [ ]  粒子效果性能 (60fps)
- [ ]  数字动画流畅度
- [ ]  主题切换动画
- [ ]  不同屏幕尺寸适配

## 🚀 使用说明

### 初始化 IAP

在应用启动时调用：
```typescript
import { iapService } from '@/services/iapService';

// 在 App.tsx 或主界面
useEffect(() => {
  iapService.initialize();
  return () => iapService.disconnect();
}, []);
```

### 购买物品

```typescript
import { IAP_PRODUCT_IDS } from '@/constants/iapProducts';
import { iapService } from '@/services/iapService';

try {
  await iapService.purchaseProduct(IAP_PRODUCT_IDS.JAZZ_DRUM);
  // 购买成功，更新状态
} catch (error) {
  // 处理错误
}
```

### 恢复购买

```typescript
const purchases = await iapService.restorePurchases();
// 根据 purchases 更新 unlockedItems
```

## ⚠️ 注意事项

1. **产品 ID 必须匹配**: 代码中的产品 ID 必须与 App Store Connect 和 Google Play Console 中配置的完全一致

2. **测试环境**: 
   - iOS 使用 Sandbox 测试账号
   - Android 使用 License Test Accounts

3. **收据验证**: 生产环境建议添加服务端收据验证

4. **订阅管理**: 订阅需要在两个平台都配置好 Base Plans 和 Offers

## 📝 下一步

1. 完成 ShopScreen IAP 集成
2. 创建 RestorePurchasesModal
3. 完善所有 UI 动画
4. 配置应用商店商品
5. 进行完整测试
6. 提交应用审核

## 📚 参考文档

- [react-native-iap 官方文档](https://github.com/dooboolab-community/react-native-iap)
- [Expo IAP 配置](https://docs.expo.dev/versions/latest/sdk/iap/)
- [App Store Connect 指南](https://developer.apple.com/app-store-connect/)
- [Google Play 内购](https://developer.android.com/google/play/billing)
