# Dichen's Homepage

一个轻量化、响应式的个人主页网站，支持暗黑/亮色主题切换、中英双语切换，包含个人简介、项目合集、经历时间轴、技术栈、联系方式等模块。纯前端静态站点，无后端依赖，可直接部署到 GitHub Pages。

站点内容基于 [Dichen33](https://github.com/Dichen33) 的 GitHub 资料维护。

## 目录

- [源码构成](#源码构成)
- [环境要求](#环境要求)
- [使用指南](#使用指南)
- [目录结构详解](#目录结构详解)
- [核心功能说明](#核心功能说明)
- [自定义配置](#自定义配置)
- [待补充内容](#待补充内容)

## 源码构成

本项目为纯前端静态网站，由 HTML 结构、CSS 样式、JavaScript 交互三部分组成。

### 1. 核心 HTML（index.html）

- 页面元信息（编码、视口、描述、标题）
- 主题初始化脚本（读取 localStorage，设置亮色/暗黑主题）
- 导航栏（终端风格 Logo、导航链接、语言切换、主题切换按钮）
- 核心板块（个人简介、项目、时间轴、技术栈）
- 页脚

### 2. CSS 样式（assets/css/style.css）

- 响应式布局（适配移动端/桌面端）
- 主题变量（`:root` 与 `[data-theme="dark"]` 两套）
- 组件样式（导航栏、头像、项目卡片、时间轴、技能徽章等）
- 动效样式（头像光晕、渐变文字、滚动渐显等）

### 3. JavaScript 交互

#### (1) 国际化（assets/js/i18n.js）

- 加载 `lang/<lang>.json` 语言包，按 `data-i18n` 属性替换页面文本
- 语言偏好存于 `localStorage.lang`，默认英文
- 加载完成后派发 `i18nLoaded` 事件，驱动内容渲染

#### (2) 核心交互（assets/js/main.js）

- 主题切换（切换 `data-theme`，同步 localStorage）
- 数据驱动的内容渲染，数据源为文件顶部的 4 个常量：
  - `PROJECTS`：项目卡片（封面图、中英文案 key、标签、外部链接）
  - `TIMELINE_EVENTS`：时间轴事件 key 列表（文案在语言包中）
  - `TECH_STACK`：技术栈分组与条目
  - `CONTACT_LINKS`：首屏联系方式按钮
- 滚动渐显动画、导航平滑滚动、响应式适配

### 4. 静态资源

- `assets/images/`：头像与项目封面图
- 第三方依赖：Font Awesome 6.4.0 图标库（bootcdn CDN 引入，离线环境下图标不显示）

## 环境要求

无需构建工具，满足以下任一条件即可运行：

- 现代浏览器（Chrome / Firefox / Safari / Edge 最新版）
- 静态文件服务器（Nginx、Live Server、Python `http.server` 等）
- GitHub Pages / Gitee Pages 等静态托管平台

## 使用指南

### 1. 本地运行

> ⚠️ 不要直接双击打开 `index.html`。页面文案由 `i18n.js` 通过 `fetch` 拉取 `lang/*.json`，
> 在 `file://` 协议下会被浏览器 CORS 策略拦截，导致页面只剩空骨架。

必须用 HTTP 服务运行：

```bash
# 方式1：Python 3
python -m http.server 8080

# 方式2：Node.js（需先安装：npm install -g http-server）
http-server -p 8080
```

然后访问 `http://localhost:8080`。

### 2. 部署上线

#### 方式1：GitHub Pages（本站当前采用）

本仓库已配置好自动部署，**不需要手动在 Settings 里选分支**：

1. 推送到 `master` 分支；
2. GitHub Actions 会自动执行 `.github/workflows/deploy.yml`
   （`upload-pages-artifact` 上传仓库根目录 → `deploy-pages` 发布）；
3. 等 Actions 跑完（约 1 分钟）后访问 `https://dichen33.github.io`。

> 仓库 Settings → Pages 的 Source 需保持为 **GitHub Actions**。
> 工作流用 `path: .` 上传整个根目录，`upload-pages-artifact` 会自动排除
> `.git` 与 `.github`，因此无需 `.nojekyll`。
> 本地预览：`npx serve .`（或任意静态服务器，注意 `.wasm` 需以 `application/wasm` 返回）。

#### 方式2：Nginx

```nginx
server {
    listen 80;
    server_name your-domain.com;          # 替换为你的域名
    root /path/to/Dichen33.github.io;     # 替换为源码路径
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 目录结构详解

```
Dichen33.github.io/
├── index.html                  # 网站入口（单页，锚点分板块）
├── assets/
│   ├── css/style.css           # 全局样式（主题、布局、组件）
│   ├── js/
│   │   ├── i18n.js             # 多语言加载与切换
│   │   └── main.js             # 数据定义 + 内容渲染 + 交互
│   └── images/
│       ├── Avatar.jpg          # 头像
│       ├── rc-wheelleg-cover.jpg
│       └── hti-ball-cover.jpg
├── lang/
│   ├── zh.json                 # 中文文案
│   └── en.json                 # 英文文案
├── playground/                 # 独立子应用：MuJoCo WASM 策略试玩区
│   ├── index.html
│   ├── assets/                 # 构建产物（JS / CSS / mujoco.wasm / onnxruntime wasm）
│   └── robot/
│       ├── wheelleg.xml        # 16DOF 轮足机器人 MuJoCo 模型
│       ├── meshes/*.wlm        # 量化压缩网格（17 个部件）
│       └── policies/           # model_6800.onnx（行走越障）/ model_84.onnx（高墙）
└── README.md
```

> `playground/` 是构建产物，**不要直接改这里**。源码与构建脚本在
> `.workbuddy/build/LainLab/playground/`，改动后执行 `npm run build` 再拷贝 `dist/` 覆盖。
> 细节见该目录下的 `README.md`。

## 核心功能说明

### 1. 主题切换

读取 `localStorage.theme`，无值时默认 `light`；点击导航栏太阳/月亮图标切换 `data-theme` 并同步存储。

### 2. 多语言切换

点击导航栏「中文 / English」按钮，`i18n.js` 会替换所有带 `data-i18n` 属性的元素文本，
并重新渲染 `main.js` 中的动态内容（通过 `i18nLoaded` 事件）。

### 3. 核心板块

- **Intro**：头像、渐变标题、三行简介、联系方式按钮
- **Projects**：项目卡片，含封面图、描述、技术标签与外部链接
- **Timeline**：经历时间轴，竖向节点
- **Tech Stack**：技术栈分组徽章

## 自定义配置

### 1. 修改个人信息

- 头像：替换 `assets/images/Avatar.jpg`
- 标题 / 简介：改 `lang/zh.json`、`lang/en.json` 中 `intro.title`、`intro.desc`
  （`intro.desc` 用 `<br>` 换行）
- 页脚版权：改两份语言包的 `footer.copyright`
- 站点标题与描述：改 `index.html` 的 `<title>`、`<meta name="description">` 和终端 Logo 文案

### 2. 新增 / 修改项目

1. 在语言包 `projects` 下加一组 `itemN`：`title` / `desc` / `tags`；
2. 在 `main.js` 的 `PROJECTS` 数组加一条，`titleKey` / `descKey` 填 `projects.itemN.title` / `.desc`；
3. 封面图放进 `assets/images/`，填到 `img` 字段；
   - 横图用默认 `object-fit: contain`（留白铺满）
   - 竖图加 `imageFit: 'cover'`（裁切铺满）
   - 不填 `img` 则自动渲染为纯文字卡片
4. `tags` 直接写字符串数组即可，会渲染成标签胶囊。

### 3. 新增 / 修改时间轴

在语言包 `timeline` 下加 `eventN`（`date` / `title` / `desc`），
再把 `main.js` 的 `TIMELINE_EVENTS` 数组补上 `'timeline.eventN'`。数组顺序即页面显示顺序。

### 4. 修改技术栈

改 `main.js` 的 `TECH_STACK`。`category` 填语言包 `skills` 下的 key，
`items` 里每项的 `icon` 是 Font Awesome 类名（先去图标库确认该类名存在）。

### 5. 自定义主题

改 `assets/css/style.css` 中 `:root`（亮色）与 `[data-theme="dark"]`（暗色）下的 CSS 变量。

### 6. 新增语言

在 `lang/` 下加语言包文件（如 `ja.json`，键结构需与其他语言包完全一致），
再在 `i18n.js` 中把该语言加入切换逻辑。

### 7. 调整默认语言

`assets/js/i18n.js` 中 `localStorage.getItem('lang') || 'en'`，把 `'en'` 改成 `'zh'` 即默认中文。

## 待补充内容

- [x] `playground/` 已替换为本人 16DOF 轮足机器人（RC_WheelLeg）试玩区：
      两个 ONNX 策略（`model_6800` 行走越障 / `model_84` 高墙）、53 维观测 / 16 维动作，
      接口对齐实机部署契约；机器人为 17 个量化压缩网格（40.45MB → 6.90MB）。
- [x] 电赛省级二等奖归属已核对：确为「2026 全国大学生电子设计竞赛（TI 杯）省赛」
      H 题车载平衡滚球运动控制系统，`timeline.event1` 文案保持原样。
- [x] `assets/images/` 下从上游站点带来的未引用封面图（19 张、约 14MB）已清理，
      仅保留实际引用的 `Avatar.jpg`、`hti-ball-cover.jpg`、`rc-wheelleg-cover.jpg`。
- [x] 站点默认语言维持英文（`assets/js/i18n.js` 中 `'en'`），按需求不做改动。
- [ ] 更多项目、实习 / 竞赛经历的时间轴节点待补充。
