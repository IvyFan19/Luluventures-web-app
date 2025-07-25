# Implementation Plan

- [x] 1. 移除现有认证系统
  - 删除 AuthContext 和 AuthProvider 组件
  - 移除自定义登录表单组件
  - 清理认证相关的 hooks 和工具函数
  - _Requirements: 6.1, 6.2_

- [x] 1.1 删除 AuthContext 相关文件
  - 删除 `src/context/AuthContext.tsx` 文件
  - 删除 `src/hooks/useAuth.ts` 文件
  - _Requirements: 6.1, 6.2_

- [x] 1.2 删除自定义登录组件
  - 删除 `src/components/LoginForm.tsx` 文件
  - 删除 `src/components/SignInModal.tsx` 文件
  - _Requirements: 1.1, 6.2_

- [x] 1.3 更新 App 组件移除 AuthProvider
  - 从 `src/App.tsx` 中移除 AuthProvider 包装
  - 移除相关的 import 语句
  - _Requirements: 6.1, 6.2_

- [ ] 2. 集成 Amplify Authenticator 基础功能
  - 在 App 组件中集成 Authenticator 组件
  - 配置基本的认证流程
  - 实现受保护内容的渲染
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [ ] 2.1 创建主题配置文件
  - 创建 `src/config/auth-theme.ts` 文件定义自定义主题
  - 配置颜色、字体和组件样式以匹配应用设计
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [ ] 2.2 在 App 组件中集成 Authenticator
  - 修改 `src/App.tsx` 使用 Authenticator 包装应用内容
  - 配置 formFields 和基本认证选项
  - 实现认证成功后的内容渲染
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [ ] 2.3 创建认证配置文件
  - 创建 `src/config/auth-config.ts` 定义表单字段和认证选项
  - 配置登录机制（email）和表单验证规则
  - _Requirements: 1.1, 1.2_

- [ ] 3. 配置社交登录功能
  - 在 Authenticator 中启用 Google 和 Apple 登录
  - 配置社交登录提供商设置
  - 测试社交登录流程
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [ ] 3.1 更新 AWS 配置支持社交登录
  - 修改 `src/aws-config.ts` 确保社交登录配置正确
  - 验证 OAuth 重定向 URL 配置
  - _Requirements: 3.1, 3.2, 3.3_

- [ ] 3.2 在 Authenticator 中配置社交提供商
  - 在认证配置中添加 Google 和 Apple 提供商
  - 配置社交登录按钮样式和行为
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [ ] 4. 更新使用认证状态的组件
  - 识别所有使用 useAuth hook 的组件
  - 替换为使用 useAuthenticator hook
  - 更新组件逻辑以适配新的认证状态结构
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [ ] 4.1 更新 Header 组件
  - 修改 `src/components/Header.tsx` 使用 useAuthenticator hook
  - 更新用户状态显示和登出功能
  - 移除对 SignInModal 的引用
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [ ] 4.2 更新其他需要认证状态的组件
  - 搜索并更新所有使用 useAuth 的组件
  - 替换认证状态检查逻辑
  - 确保组件正确响应认证状态变化
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [ ] 5. 实现密码重置功能
  - 确保 Authenticator 的忘记密码功能正常工作
  - 配置密码重置流程和验证
  - 测试密码重置邮件发送和处理
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [ ] 5.1 配置密码重置表单字段
  - 在认证配置中定义密码重置表单
  - 配置验证规则和错误消息
  - _Requirements: 2.1, 2.2, 2.3_

- [ ] 5.2 测试密码重置流程
  - 创建测试用例验证密码重置功能
  - 测试邮件发送和新密码设置流程
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [ ] 6. 完善主题和样式定制
  - 实现完整的主题配置以匹配应用设计
  - 添加响应式设计支持
  - 配置暗色模式支持（如需要）
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [ ] 6.1 完善主题配置
  - 扩展 `src/config/auth-theme.ts` 包含所有必要的样式定制
  - 配置按钮、输入框、错误消息等组件样式
  - _Requirements: 5.1, 5.2, 5.4_

- [ ] 6.2 实现响应式设计
  - 确保 Authenticator 在移动设备上正确显示
  - 测试不同屏幕尺寸下的用户体验
  - _Requirements: 5.2_

- [ ] 6.3 添加品牌定制
  - 在主题中添加应用 logo 和品牌颜色
  - 配置自定义文本和标签
  - _Requirements: 5.4_

- [ ] 7. 编写测试用例
  - 为新的认证流程编写单元测试
  - 创建集成测试验证认证功能
  - 编写 E2E 测试覆盖完整的用户流程
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 3.3, 3.4, 4.1, 4.2, 4.3, 4.4_

- [ ] 7.1 编写 App 组件测试
  - 创建 `src/__tests__/App.test.tsx` 测试 Authenticator 集成
  - 测试认证状态变化和内容渲染
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [ ] 7.2 编写认证流程集成测试
  - 创建测试文件验证登录、注册、密码重置流程
  - 使用 MSW 模拟 Cognito API 响应
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.2, 2.3, 2.4_

- [ ] 7.3 编写社交登录测试
  - 测试 Google 和 Apple 登录流程
  - 验证社交登录后的用户状态
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [ ] 7.4 更新现有测试
  - 修改或删除与旧认证系统相关的测试
  - 更新组件测试以使用新的认证状态
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [ ] 8. 清理和优化
  - 移除未使用的依赖和代码
  - 优化 bundle 大小
  - 更新文档和注释
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [ ] 8.1 清理未使用的依赖
  - 检查并移除不再需要的 npm 包
  - 更新 package.json 依赖列表
  - _Requirements: 6.2_

- [ ] 8.2 代码清理和优化
  - 移除未使用的 import 和变量
  - 优化组件渲染性能
  - 添加必要的代码注释
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [ ] 8.3 更新项目文档
  - 更新 README.md 中的认证相关说明
  - 添加新认证流程的使用指南
  - _Requirements: 6.4_