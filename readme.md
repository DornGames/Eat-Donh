# Eat Donh · TonhTze Pac-Man
---

## About the Game

**Eat Donh (TonhTze Pac-Man)** is a complete arcade game built with HTML5 Canvas and vanilla JavaScript. It is a **HTML/CSS/JavaScript reset** of the classic Pac-Man concept, reimagined with the "𣿅国" (Donh) character "𣿅子" as the playable protagonist. Collect all the glowing dots (湩子) scattered across the grid, gobble up power dots (能量湩) to turn the tables on pursuing ghosts, and clear the board to win. All graphics are rendered using the Canvas 2D API, delivering a nostalgic arcade experience with smooth 60 FPS gameplay.

---

### Features

| Category | Features |
| :--- | :--- |
| 🎮 **Game States** | Playing → Game Over / Victory → Restart |
| 🟡 **Player System** | WASD / Arrow key movement (8-directional), mouth animation, directional facing, power-up speed boost |
| 🍬 **Dot System** | 50 regular dots (10 pts each) + 4 power dots (50 pts + 5s power mode) |
| 👻 **Ghost System** | 4 ghosts with unique colors (Red / Green / Blue / Magenta), bouncy AI, random direction changes, flee-when-scared behavior |
| ⚡ **Power-Up Mode** | Speed ×1.5, eat ghosts for 100 pts, ghosts turn blue and flee, 5-second duration (300 frames) |
| 💥 **Visual Effects** | Mouth opening/closing animation, ghost eye tracking, glowing power dots, grid background |
| 📊 **HUD** | Real-time score display, lives counter (3 lives) |
| 🕹️ **On-Screen Keyboard** | Visual WASD key display with active-state highlighting |
| 📱 **Touch Support** | On-screen keys respond to touch events for mobile play |
| 🏆 **Win Condition** | Collect all 50 dots + 4 power dots to win |

---

### Controls

| Key | Action |
| :--- | :--- |
| `W` / `↑` | Move up |
| `A` / `←` | Move left |
| `S` / `↓` | Move down |
| `D` / `→` | Move right |
| `Space` | Restart (after game over or victory) |
| On-screen buttons | Touch-friendly WASD controls (mobile devices) |

---

### Tech Stack

- **Language:** JavaScript (ES6+)
- **Graphics:** HTML5 Canvas 2D API
- **Layout:** HTML5 + CSS3 (Flexbox, media queries for responsive design)
- **Rendering:** `requestAnimationFrame` game loop, 60 FPS target
- **Input:** Keyboard events + touch events
- **Deployment:** Static HTML page, no build tools required

---

### Download & Play

> The game runs directly in your browser — no installation required!

You can play **Eat Donh (TonhTze Pac-Man)** at either of the following addresses:

- 🌐 **Official site:** [https://dornhub.eu.org/games/eat-donh](https://dornhub.eu.org/games/eat-donh)
- 🐙 **GitHub Pages:** [https://dorngames.github.io/Eat-Donh](https://dorngames.github.io/Eat-Donh)

1. Open either link in any modern browser.
2. The game loads instantly — no downloads, no plugins.
3. Use `WASD` or arrow keys to move. Press `Space` to restart after game over.

If you prefer to run it locally from source, see the next section.

---

### Build from Source

**Prerequisites:**
- A modern web browser (Chrome, Firefox, Edge, or Safari)
- A text editor (VS Code, Sublime Text, etc.)
- (Optional) A local web server for testing (e.g., VS Code Live Server, Python `http.server`)

**Steps:**

1. Clone this repository:
   ```bash
   git clone https://github.com/cgy22/Eat-Donh.git
   cd TonhTze-Pacman
   ```

2. Open `index.html` directly in your browser, or serve it with a local web server:
   ```bash
   python -m http.server 8000
   ```
   Then visit `http://localhost:8000`.

3. All assets are inline or loaded from the same directory — no build step needed.

**Project Structure:**
```
Eat-Donh/
├── index.html          # Main game page
├── style.css           # Game styles
├── game.js             # Game logic
└── README.md
```

---

### Team & Copyright

**Sub-Team:** DornGames  
**Copyright © 2023-2026 DornGames. All Rights Reserved.**

**Parent Team:** Dorn Hub  
**Copyright © 2021-2026 Dorn Hub. All Rights Reserved.**

---

### License

This project is licensed under the **MIT License** — a permissive license that allows you to freely use, modify, and distribute the software, provided that the original copyright notice is retained.

**Copyright © 2026 DornGames / Dorn Hub**

---

A toast with Prickly Pear juice!🍹  
DornGames & Dorn Hub

---

# 吃𣿅人 · 𣿅子吃豆人

---

## 关于游戏

**《吃𣿅人》** 是一款基于 HTML5 Canvas 和纯 JavaScript 开发的完整街机游戏。它是经典吃豆人概念的 **HTML/CSS/JavaScript 重置版**，以"𣿅国"角色"𣿅子"为主角重新演绎。收集散落在网格中的发光𣿅子，吃下能量𣿅反杀追逐的小怪，清空棋盘即可获胜。所有图形均使用 Canvas 2D API 渲染，带来流畅 60 FPS 的复古街机体验。

---

### 功能特性

| 类别 | 功能 |
| :--- | :--- |
| 🎮 **游戏状态** | 游戏进行 → 失败 / 胜利 → 重新开始 |
| 🟡 **玩家系统** | WASD / 方向键移动（八方向）、嘴巴开合动画、朝向跟随、能量湩加速 |
| 🍬 **湩子系统** | 50 个普通湩子（每个 10 分）+ 4 个能量湩（每个 50 分 + 5 秒能量模式） |
| 👻 **小怪系统** | 4 只小怪（红 / 绿 / 蓝 / 品红），弹跳 AI、随机转向、害怕时逃跑 |
| ⚡ **能量模式** | 速度 ×1.5、吃掉小怪得 100 分、小怪变蓝逃跑、持续 5 秒（300 帧） |
| 💥 **视觉效果** | 嘴巴开合动画、小怪眼睛跟随、能量湩发光、网格背景 |
| 📊 **HUD 界面** | 实时分数显示、生命值（3 条命） |
| 🕹️ **屏幕键盘** | 可视化 WASD 按键显示，按下时高亮 |
| 📱 **触摸支持** | 屏幕按键响应触摸事件，支持移动端游玩 |
| 🏆 **胜利条件** | 收集全部 50 个普通湩子 + 4 个能量湩即可获胜 |

---

### 操作说明

| 按键 | 功能 |
| :--- | :--- |
| `W` / `↑` | 向上移动 |
| `A` / `←` | 向左移动 |
| `S` / `↓` | 向下移动 |
| `D` / `→` | 向右移动 |
| `空格` | 重新开始（游戏结束或胜利后） |
| 屏幕按钮 | 触摸友好的 WASD 控制（移动设备） |

---

### 技术栈

- **编程语言：** JavaScript（ES6+）
- **图形渲染：** HTML5 Canvas 2D API
- **布局：** HTML5 + CSS3（Flexbox、媒体查询响应式设计）
- **渲染方式：** `requestAnimationFrame` 游戏循环，目标 60 FPS
- **输入方式：** 键盘事件 + 触摸事件
- **部署方式：** 静态 HTML 页面，无需构建工具

---

### 下载与运行

> 游戏直接在浏览器中运行 —— 无需安装！

您可以通过以下任一地址游玩 **《吃𣿅人》**：

- 🌐 **官方网站：** [https://dornhub.eu.org/games/eat-donh](https://dornhub.eu.org/games/eat-donh)
- 🐙 **GitHub Pages：** [https://dorngames.github.io/Eat-Donh](https://dorngames.github.io/Eat-Donh)

1. 用任意现代浏览器打开上面任一链接。
2. 游戏即刻加载 —— 无需下载、无需插件。
3. 使用 `WASD` 或方向键移动。游戏结束后按 `空格` 重新开始。

如果您想从源码在本地运行，请参阅下一节。

---

### 从源码构建

**前置条件：**
- 现代网页浏览器（Chrome、Firefox、Edge 或 Safari）
- 文本编辑器（VS Code、Sublime Text 等）
- （可选）本地测试用的 Web 服务器（如 VS Code Live Server、Python `http.server`）

**构建步骤：**

1. 克隆本仓库：
   ```bash
   git clone https://github.com/cgy22/Eat-Donh.git
   cd TonhTze-Pacman
   ```

2. 直接在浏览器中打开 `index.html`，或用本地 Web 服务器托管：
   ```bash
   python -m http.server 8000
   ```
   然后访问 `http://localhost:8000`。

3. 所有资源均为内联或从同目录加载，无需构建步骤。

**项目结构：**
```
Eat-Donh/
├── index.html          # 主游戏页面
├── style.css           # 游戏样式
├── game.js             # 游戏逻辑
└── README.md
```

---

### 团队与版权

**子团队：** DornGames  
**Copyright © 2023-2026 DornGames. All Rights Reserved.**

**母团队：** Dorn Hub  
**Copyright © 2021-2026 Dorn Hub. All Rights Reserved.**

---

### 许可证

本项目采用 **MIT 许可证** —— 一个宽松型许可证，允许您自由使用、修改和分发本软件，但需保留原始版权声明。

**Copyright © 2026 DornGames / Dorn Hub**

---

*最后更新：2026年10月13日*

---

敬上一杯刺梨汁！🍹  
DornGames & Dorn Hub

---
