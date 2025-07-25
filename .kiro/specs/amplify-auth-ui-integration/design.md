# Design Document

## Overview

本设计文档描述了如何将 AWS Amplify 的内置身份验证 UI 组件（@aws-amplify/ui-react）完全替换当前的自定义登录界面和 AuthContext。设计目标是简化认证架构，利用 Amplify UI 的内置功能提供更标准化和功能丰富的认证体验。

当前应用已经配置了 AWS Amplify 和 Cognito，我们将完全移除自定义的 AuthContext 和登录表单，直接使用 Amplify Authenticator 组件作为唯一的认证解决方案。

## Architecture

### 高层架构

```mermaid
graph TB
    A[App Component] --> B[@aws-amplify/ui-react Authenticator]
    B --> C[Protected Content]
    B --> D[useAuthenticator Hook]
    
    B --> E[Cognito User Pool]
    B --> F[Social Providers]
    
    G[Theme Configuration] --> B
    H[Custom Form Fields] --> B
    
    D --> I[Components needing auth state]
```

### 替换策略

1. **完全替换**: 移除现有的 AuthContext 和自定义登录组件
2. **直接集成**: 使用 Amplify Authenticator 作为唯一认证界面
3. **主题定制**: 自定义 Authenticator 主题以匹配应用设计
4. **Hook 使用**: 使用 useAuthenticator hook 获取认证状态

## Components and Interfaces

### 1. App 组件结构

直接使用 Amplify Authenticator 包装应用内容：

```typescript
interface AppProps {
  // 应用级别的 props
}

// 使用 Authenticator 包装整个应用
function App() {
  return (
    <Authenticator theme={customTheme} formFields={formFields}>
      {({ signOut, user }) => (
        <main>
          <AppContent user={user} signOut={signOut} />
        </main>
      )}
    </Authenticator>
  );
}
```

### 2. 主题配置接口

```typescript
interface CustomTheme {
  name: string;
  tokens: {
    colors: {
      brand: {
        primary: string;
        secondary: string;
      };
      background: {
        primary: string;
        secondary: string;
      };
    };
    components: {
      authenticator: {
        router: {
          boxShadow: string;
          borderWidth: string;
        };
      };
    };
  };
}
```

### 3. 认证状态管理

使用 useAuthenticator hook 替代自定义 AuthContext：

```typescript
// 在需要认证状态的组件中使用
const { user, signOut, authStatus } = useAuthenticator((context) => [
  context.user,
  context.signOut,
  context.authStatus
]);
```

## Data Models

### 认证状态模型

直接使用 Amplify 提供的认证状态：

```typescript
// 从 useAuthenticator 获取的状态
interface AuthenticatorState {
  authStatus: 'configuring' | 'authenticated' | 'unauthenticated';
  user: AuthUser | null;
  signOut: () => void;
  signIn: (input: SignInInput) => Promise<SignInOutput>;
}
```

### 配置模型

```typescript
interface AuthConfig {
  theme: CustomTheme;
  formFields: {
    signUp: FormField[];
    signIn: FormField[];
    forgotPassword: FormField[];
  };
  socialProviders: ('amazon' | 'apple' | 'facebook' | 'google')[];
  hideSignUp?: boolean;
  loginMechanisms: ('email' | 'phone_number' | 'username')[];
}
```

## Error Handling

### 错误处理策略

依赖 Amplify Authenticator 的内置错误处理：

1. **配置错误**: Authenticator 显示配置错误信息
2. **认证错误**: 显示内置的错误消息和重试选项
3. **网络错误**: 自动重试和错误提示
4. **验证错误**: 实时表单验证和错误显示

### 自定义错误处理

```typescript
// 可以通过 services 属性自定义错误处理
const services = {
  async handleSignIn(formData) {
    try {
      return await signIn(formData);
    } catch (error) {
      // 自定义错误处理逻辑
      throw error;
    }
  }
};
```

## Testing Strategy

### 单元测试

1. **App 组件测试**
   - Authenticator 渲染测试
   - 主题应用测试
   - 认证状态处理测试

2. **主题配置测试**
   - 自定义主题加载测试
   - 响应式设计测试
   - 组件样式测试

3. **Hook 使用测试**
   - useAuthenticator hook 测试
   - 认证状态变化测试
   - 组件重渲染测试

### 集成测试

1. **认证流程测试**
   - 邮箱登录流程
   - 社交登录流程
   - 注册流程
   - 密码重置流程

2. **组件集成测试**
   - 受保护组件访问测试
   - 认证状态传递测试
   - 登出流程测试

### E2E 测试

1. **完整认证流程**
   - 用户注册到登录完整流程
   - 社交登录流程
   - 密码重置流程
   - 登出流程

2. **跨浏览器测试**
   - Chrome, Firefox, Safari 兼容性
   - 移动端响应式测试

### 测试工具配置

- **单元测试**: Vitest + React Testing Library
- **集成测试**: Vitest + MSW (Mock Service Worker)
- **E2E 测试**: Playwright 或 Cypress
- **视觉回归测试**: Chromatic 或 Percy

## Implementation Phases

### Phase 1: 移除现有认证系统
- 删除 AuthContext 和 AuthProvider
- 移除自定义登录组件
- 清理相关的 hooks 和 utilities

### Phase 2: 集成 Amplify Authenticator
- 在 App 组件中集成 Authenticator
- 配置基本主题
- 设置表单字段

### Phase 3: 功能配置
- 配置社交登录提供商
- 自定义表单验证
- 设置认证流程选项

### Phase 4: 样式和测试
- 完善主题定制
- 添加响应式设计
- 编写测试用例

## Migration Strategy

### 替换步骤

1. **备份现有代码**: 保存当前认证相关代码作为参考
2. **移除依赖**: 删除现有的 AuthContext 和相关组件
3. **更新组件**: 修改使用认证状态的组件使用 useAuthenticator
4. **测试验证**: 确保所有认证功能正常工作

## Security Considerations

1. **内置安全**: 依赖 Amplify Authenticator 的内置安全功能
2. **会话管理**: Amplify 自动处理会话过期和刷新
3. **CSRF 保护**: 利用 Amplify 内置的 CSRF 保护
4. **输入验证**: 使用 Amplify UI 的内置验证和清理
5. **社交登录**: 安全的 OAuth 流程处理

## Performance Considerations

1. **Bundle 优化**: 监控 @aws-amplify/ui-react 对 bundle 大小的影响
2. **主题缓存**: 缓存主题配置减少重复计算
3. **组件优化**: 利用 Authenticator 的内置性能优化
4. **代码简化**: 移除自定义认证代码减少应用复杂度