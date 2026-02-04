# CreatOK - AI 文字生成视频平台

基于 OpenAI Sora 2 的电商视频生成器，通过简单的文字描述即可生成高质量的产品展示视频。

## 📋 项目概述

**CreatOK** 是一个现代化的 AI 视频生成平台，专注于为电商用户提供快速、专业的产品视频制作服务。

### 核心功能

- ✅ **文字生成视频**：输入提示词，AI 自动生成产品展示视频
- ✅ **灵感广场**：浏览社区创作的优秀视频案例
- ✅ **创作同款**：一键复用成功案例的提示词和风格
- ✅ **视频参数配置**：支持多种比例、时长、清晰度选项
- ✅ **图片上传**：支持参考图片上传，提高生成质量

### 技术栈

- **前端框架**: Vue 3.5.24 (Composition API)
- **构建工具**: Vite 7.3.1
- **UI 组件库**: Element Plus 2.13.2
- **路由管理**: Vue Router 5.0.2
- **状态管理**: Pinia 3.0.4
- **HTTP 客户端**: Axios 1.13.4
- **开发语言**: JavaScript

### 部署信息

- **生产环境**: http://47.83.126.42:8080
- **Web 服务器**: Nginx 1.20.1
- **服务器系统**: Alibaba Cloud Linux 3

## 🚀 快速开始

### 环境要求

- Node.js 16+
- npm 或 yarn
- Git

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

访问 http://localhost:5173

### 构建生产版本

```bash
npm run build
```

构建产物在 `dist/` 目录

### 预览生产构建

```bash
npm run preview
```

## 📐 项目结构

```
creatok-web/
├── src/
│   ├── assets/              # 静态资源
│   │   ├── images/          # 图片资源
│   │   └── styles/          # 全局样式
│   ├── components/          # 公共组件
│   │   ├── common/          # 通用组件（Header等）
│   │   └── video/           # 视频相关组件
│   ├── views/               # 页面组件
│   │   ├── VideoDetail.vue  # 视频详情页
│   │   └── CreatePage.vue   # 创作界面
│   ├── router/              # 路由配置
│   │   └── index.js
│   ├── stores/              # Pinia 状态管理
│   │   └── video.js
│   ├── api/                 # API 接口层
│   │   └── video.js
│   ├── utils/               # 工具函数
│   │   └── helpers.js
│   ├── App.vue              # 根组件
│   └── main.js              # 入口文件
├── public/                  # 公共静态文件
├── dist/                    # 构建输出目录
├── package.json
├── vite.config.js           # Vite 配置
└── README.md
```

## 🔄 完整开发流程

### 标准开发流程（严格遵循）

```
功能开发 → Code Review → 本地测试 → Git 提交 → 部署到服务器
```

#### 1️⃣ 功能开发阶段

**工具**: Claude Code + Subagent-Driven Development

**步骤**:
1. 使用 `brainstorming` skill 进行需求分析和方案设计
2. 使用 `subagent-driven-development` 分步实现功能
3. 每完成一个子任务自动进行 Code Review

**示例**:
```bash
# 启动开发流程
1. 明确功能需求
2. 设计技术方案
3. 分配子任务
4. 逐个实现并审查
```

**质量标准**:
- 代码规范：ES6+ 标准，遵循 Vue 3 最佳实践
- 注释完整：关键逻辑添加中文注释
- 组件化：可复用逻辑抽取为独立组件

#### 2️⃣ Code Review 阶段

**自动审查机制**:
- ✅ 规范符合性审查（Spec Review）
- ✅ 代码质量审查（Code Quality Review）
- ✅ 安全性检查

**审查要点**:
- [ ] 功能完整性：是否实现了所有需求
- [ ] 代码质量：命名清晰、逻辑简洁
- [ ] 性能优化：避免不必要的重复渲染
- [ ] 安全性：无 XSS、SQL 注入等漏洞
- [ ] 可维护性：代码结构清晰，易于扩展

**审查工具**:
```javascript
// 使用 superpowers:code-reviewer skill
- 检查代码质量
- 识别潜在问题
- 提供改进建议
```

#### 3️⃣ 本地运行验证测试

**测试内容**:

**a) 功能测试**
```bash
# 启动开发服务器
npm run dev

# 使用 Playwright 自动化测试
- 页面加载测试
- 用户交互测试
- 路由跳转测试
- 表单提交测试
- 数据流测试
```

**b) 兼容性测试**
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari（可选）
- [ ] 移动端浏览器（可选）

**c) 性能测试**
```bash
# 构建生产版本
npm run build

# 检查构建产物大小
# dist/ 应该包含压缩后的资源
```

**d) 错误处理测试**
- [ ] 网络请求失败
- [ ] 表单验证
- [ ] 边界条件
- [ ] 用户输入异常

**测试检查清单**:
```markdown
✅ 页面正常加载，无控制台错误
✅ 所有按钮和链接可点击
✅ 表单验证正常工作
✅ 路由跳转正确
✅ 数据状态管理正常
✅ UI 响应式布局正常
✅ 无性能问题（卡顿、延迟）
```

#### 4️⃣ Git 提交阶段

**提交规范**:

```bash
# 1. 查看修改状态
git status

# 2. 添加修改的文件
git add .

# 3. 提交到本地仓库
git commit -m "feat: 简短描述

- 详细说明修改内容
- 列出主要变更点
- 关联 Issue 或任务编号

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# 4. 推送到远程仓库
git push origin master
```

**Commit Message 规范**:
- `feat:` 新功能
- `fix:` 修复 bug
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 重构
- `test:` 测试相关
- `chore:` 构建/工具变动

**示例**:
```bash
feat: 添加视频生成进度条功能

- 实现 0-100% 进度显示
- 添加进度状态文字提示
- 优化生成按钮交互体验

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

#### 5️⃣ 部署到服务器

**部署流程**:

```bash
# 1. 本地构建生产版本
npm run build

# 2. 上传到服务器
scp -r dist/* root@47.83.126.42:/var/www/creatok-web/

# 3. SSH 登录服务器
ssh root@47.83.126.42

# 4. 验证部署
curl http://localhost:8080
# 或使用浏览器访问 http://47.83.126.42:8080
```

**服务器信息**:
- 服务器 IP: `47.83.126.42`
- SSH 端口: `22`
- SSH 用户: `root`
- Web 端口: `8080`
- 网站目录: `/var/www/creatok-web`
- Web 服务器: `Nginx`

**一键部署脚本** (可选):
```bash
#!/bin/bash
# deploy.sh

echo "🚀 开始部署 CreatOK..."

# 1. 构建
echo "📦 构建生产版本..."
npm run build

# 2. 上传
echo "📤 上传到服务器..."
scp -r dist/* root@47.83.126.42:/var/www/creatok-web/

# 3. 验证
echo "✅ 验证部署..."
curl -s http://47.83.126.42:8080 > /dev/null
if [ $? -eq 0 ]; then
    echo "🎉 部署成功！"
    echo "🌐 访问: http://47.83.126.42:8080"
else
    echo "❌ 部署失败，请检查"
fi
```

## 📊 当前项目状态

### 已完成功能 ✅

- [x] 项目初始化（Vite + Vue 3）
- [x] UI 组件库集成（Element Plus）
- [x] 路由配置（Vue Router）
- [x] 状态管理（Pinia）
- [x] 全局样式系统（白色简约主题）
- [x] Header 导航栏组件
- [x] 视频详情页（VideoDetail.vue）
- [x] 创作界面（CreatePage.vue）
- [x] API 层封装（Mock 数据）
- [x] Pinia Store（视频状态管理）
- [x] 响应式布局设计
- [x] 部署到生产服务器

### 待开发功能 🚧

- [ ] 真实用户认证系统
- [ ] 接入 OpenAI Sora 2 API
- [ ] 视频预览功能
- [ ] 下载/分享视频
- [ ] 历史记录功能
- [ ] 支付系统
- [ ] 用户个人中心
- [ ] 移动端优化

## 🔧 开发指南

### 添加新功能流程

1. **需求分析**
   ```bash
   # 使用 brainstorming skill 分析需求
   ```

2. **设计方案**
   - 确定技术方案
   - 设计数据流
   - 规划组件结构

3. **实现功能**
   ```bash
   # 使用 subagent-driven-development
   # 自动实现 + code review
   ```

4. **本地测试**
   ```bash
   npm run dev
   # 使用 Playwright 自动化测试
   ```

5. **提交代码**
   ```bash
   git add .
   git commit -m "feat: 添加新功能"
   git push origin master
   ```

6. **部署上线**
   ```bash
   npm run build
   scp -r dist/* root@47.83.126.42:/var/www/creatok-web/
   ```

### 代码规范

**Vue 3 组件编写**:
```vue
<template>
  <div class="component-name">
    <!-- 模板内容 -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// 响应式数据
const data = ref('')

// 计算属性
const computedData = computed(() => {
  return data.value
})

// 生命周期
onMounted(() => {
  // 初始化逻辑
})

// 方法
const handleAction = () => {
  // 处理逻辑
}
</script>

<style scoped>
.component-name {
  /* 组件样式 */
}
</style>
```

**命名规范**:
- 组件文件：PascalCase（如 `VideoDetail.vue`）
- 工具函数：camelCase（如 `formatFileSize`）
- 常量：UPPER_SNAKE_CASE
- CSS 类名：kebab-case

### API 接口规范

```javascript
// api/video.js
export const videoApi = {
  // 获取视频详情
  getVideoDetail(id) {
    return request.get(`/videos/${id}`)
  },

  // 生成视频
  generateVideo(params) {
    return request.post('/videos/generate', params)
  }
}
```

## 🐛 常见问题

### Q: 如何添加新的路由？

在 `src/router/index.js` 中添加：

```javascript
{
  path: '/new-page',
  name: 'NewPage',
  component: () => import('@/views/NewPage.vue')
}
```

### Q: 如何修改主题颜色？

编辑 `src/assets/styles/global.css`，修改 CSS 变量：

```css
:root {
  --primary-color: #409EFF;  /* 修改为你的颜色 */
}
```

### Q: 如何部署到其他服务器？

1. 修改 `deploy.sh` 中的服务器地址
2. 配置目标服务器的 Nginx
3. 运行部署脚本

### Q: SSH 连接失败怎么办？

1. 检查 SSH KEY 是否已配置
2. 确认服务器 IP 和用户名正确
3. 检查网络连接
4. 联系服务器管理员

## 📞 技术支持

- **GitHub**: https://github.com/ZhanWeiKai/creatok-web
- **项目地址**: http://47.83.126.42:8080

## 📝 更新日志

### v0.1.0 (2026-02-04)
- ✅ 项目初始化
- ✅ 核心功能实现
- ✅ 部署到生产服务器

---

**开发者**: Claude Sonnet 4.5
**最后更新**: 2026-02-04
