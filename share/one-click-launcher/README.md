# ⚡ DeepSeek Harness 一键启动器(可分发版)

双击即可启动 DeepSeek Harness,不用记任何命令。本文件夹包含:

| 文件 | 说明 |
|---|---|
| `start-dsh.bat` | **主启动器**。双击启动;首次运行自动生成 exe 并自动安装 dsh 依赖 |
| `DeepSeekHarness.exe` | 同上的 exe 壳(双击无黑框闪烁,会打开控制台跑 bat) |
| `make-launcher.ps1` | 生成器:在任何 Windows 文件夹运行它,就地生成上面两个文件 |
| `plugin/` | DSH 插件源码(给 DSH 用户装"⚡ 启动器"侧边栏按钮用,见 `plugin/INSTALL.md`) |

---

## 方式一:直接用成品(推荐,不需要 DSH)

把 `start-dsh.bat`(和可选的 `DeepSeekHarness.exe`)复制到**任何文件夹**:

1. 双击 `start-dsh.bat`(或 exe)
2. **首次运行**会自动:创建 package.json → `npm install` dsh 依赖(需联网,等待 1~3 分钟)→ 生成 exe → 启动 Harness
3. 浏览器打开窗口中显示的地址(默认 `http://127.0.0.1:3080`)

之后每次双击即秒开。**使用期间保持窗口打开,关窗 = 关 Harness。**

## 方式二:用生成器

想在任何机器/文件夹自己生成启动器:

1. 把 `make-launcher.ps1` 复制到目标文件夹
2. 右键 → 使用 PowerShell 运行
3. 文件夹里出现 `start-dsh.bat` + `DeepSeekHarness.exe`,按方式一使用

## 方式三:装成 DSH 插件(要有侧边栏按钮)

目标机器已经跑着 DSH Web 界面的话,可以把 `plugin/` 里的代码装成插件,界面侧边栏底部出现 **⚡ 启动器** 按钮,点击即在工作区生成启动器。步骤见 `plugin/INSTALL.md`。

---

## 注意事项

- **仅限 Windows**:bat/exe 是 Windows 专用;macOS/Linux 请改用 `npx @deepseek-ai/dsh web`。
- **exe 依赖同目录的 bat**(exe 只是壳),两个文件要放在一起。
- 端口 3080 被占用时会报 `EADDRINUSE` —— 说明已有一个 Harness 实例在跑,先关掉旧窗口再启动。
- exe 未签名,SmartScreen 可能提示"未知发布者",点"仍要运行";嫌烦直接用 bat。
- 首次运行需要联网安装依赖(之后离线可用)。
- `npm run dsh` 需要 Node.js(npm);没有会提示安装:https://nodejs.org
