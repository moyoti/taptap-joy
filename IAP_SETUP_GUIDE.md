# IAP 内购配置指南

## ✅ 产品类型

**所有产品均为一次性购买（Non-Consumable）**，无订阅内容。

### 单品（7 个）
| 产品 ID | 物品 | 价格 |
|--------|------|------|
| `cn.indieleague.taptapjoy.jazz_drum` | 爵士鼓 | $1.99 |
| `cn.indieleague.taptapjoy.triangle` | 三角铁 | $0.99 |
| `cn.indieleague.taptapjoy.stapler` | 订书机 | $0.99 |
| `cn.indieleague.taptapjoy.spacebar` | 空格键 | $1.49 |
| `cn.indieleague.taptapjoy.watermelon` | 西瓜 | $1.99 |
| `cn.indieleague.taptapjoy.knob` | 旋钮 | $0.99 |
| `cn.indieleague.taptapjoy.bubble_wrap` | 泡泡纸 | $1.49 |

### 优惠套装（3 个）
| 产品 ID | 包含物品 | 原价 | 套装价 | 节省 |
|--------|---------|------|--------|------|
| `cn.indieleague.taptapjoy.bundle_music` | 爵士鼓 + 三角铁 | $2.98 | $2.49 | 20% |
| `cn.indieleague.taptapjoy.bundle_office` | 订书机 + 空格键 | $2.48 | $1.99 | 30% |
| `cn.indieleague.taptapjoy.bundle_fun` | 西瓜 + 旋钮 + 泡泡纸 | $4.47 | $3.49 | 35% |

### 全部解锁（1 个）
| 产品 ID | 包含物品 | 原价 | 套装价 | 节省 |
|--------|---------|------|--------|------|
| `cn.indieleague.taptapjoy.all_in_one` | 全部 7 个付费物品 | $11.42 | $9.99 | 50% |

## 📱 应用商店配置

### iOS (App Store Connect)

1. **创建产品**：
   - 进入 App Store Connect → 你的 App → 功能 → App 内购买项目
   - 点击 "+" 创建新购买项目
   - 选择 **Non-Consumable**（非消耗型）

2. **配置每个产品**：
   - **Product ID**: 必须与代码完全一致（如 `cn.indieleague.taptapjoy.jazz_drum`）
   - **Reference Name**: 内部引用名（如 "Jazz Drum"）
   - **Price**: 设置对应价格
   - **Display Name**: 应用内显示名称
   - **Description**: 产品描述

3. **审核信息**：
   - 添加截图展示产品功能
   - 填写审核备注（如需要）

### Android (Google Play Console)

1. **创建产品**：
   - 进入 Google Play Console → 你的应用 → 获利 → 应用内商品
   - 点击 "创建商品"
   - 选择 **一次性商品**

2. **配置每个商品**：
   - **商品 ID**: 必须与代码完全一致
   - **默认语言**: 中文（简体）
   - **标题**: 商品名称
   - **描述**: 商品描述
   - **价格**: 设置对应价格

3. **上架状态**：
   - 确保所有商品状态为 "已上架"
   - 添加到对应的轨道（测试/生产）

## 💻 代码使用

### 购买单品

```typescript
import { IAP_PRODUCT_IDS } from '@/constants/iapProducts';
import { iapService } from '@/services/iapService';

// 购买单个物品
await iapService.purchaseProduct(IAP_PRODUCT_IDS.JAZZ_DRUM);
```

### 购买套装

```typescript
// 购买音乐套装
await iapService.purchaseProduct(IAP_PRODUCT_IDS.BUNDLE_MUSIC);

// 购买全部解锁
await iapService.purchaseProduct(IAP_PRODUCT_IDS.ALL_IN_ONE);
```

### 恢复购买

```typescript
// 恢复所有已购买的商品
const purchases = await iapService.restorePurchases();

// 根据购买记录解锁物品
purchases.forEach(purchase => {
  const items = PRODUCT_TO_ITEM_MAP[purchase.productId];
  if (items) {
    // 解锁对应物品
  }
});
```

## 🧪 测试

### iOS Sandbox 测试

1. 在 App Store Connect 创建 Sandbox 测试账号
2. 在设备上退出 App Store 账号
3. 运行应用，购买时会提示登录 Sandbox 账号
4. Sandbox 环境不会真实扣款

### Android 测试

1. 在 Google Play Console 添加 License Test Accounts
2. 上传 APK 到 Internal Testing 轨道
3. 使用测试账号购买，不会真实扣款
4. 可以在 "订单管理" 中退款和测试恢复

## ⚠️ 注意事项

1. **产品 ID 必须完全匹配**：代码、App Store Connect、Google Play Console 三者的产品 ID 必须完全一致

2. **Bundle 配置**：
   - iOS: 需要创建 Bundle ID 并在 App Store Connect 配置 Bundle 内容
   - Android: 需要创建 Subscription 或 Grouped Product

3. **价格区域**：记得在所有可售区域设置价格

4. **审核时间**：
   - 新 IAP 产品需要随应用版本一起提交审核
   - 价格变更不需要重新审核

5. **退款处理**：
   - 监听退款事件（生产环境建议接入服务端通知）
   - 用户退款后应移除对应物品

## 📊 商品映射关系

代码中的 `PRODUCT_TO_ITEM_MAP` 定义了产品 ID 到应用内物品的映射：

```typescript
export const PRODUCT_TO_ITEM_MAP: Record<string, string[]> = {
  'cn.indieleague.taptapjoy.jazz_drum': ['jazz_drum'],
  'cn.indieleague.taptapjoy.bundle_music': ['jazz_drum', 'triangle'],
  'cn.indieleague.taptapjoy.all_in_one': [
    'jazz_drum', 'triangle', 'stapler', 'spacebar',
    'watermelon', 'knob', 'bubble_wrap'
  ],
  // ...
};
```

购买成功后，根据这个映射解锁对应的应用内物品。

## 🔗 参考链接

- [react-native-iap 文档](https://github.com/dooboolab-community/react-native-iap)
- [App Store Connect 指南](https://developer.apple.com/app-store-connect/)
- [Google Play 内购](https://developer.android.com/google/play/billing)
