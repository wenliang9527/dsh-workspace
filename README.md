# ⚡ dsh One-Click Launcher

双击即启动 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 的一键启动器(bat + exe)及其生成器、DSH 插件源码。

## 内容

| 路径 | 说明 |
|---|---|
| `share/one-click-launcher/start-dsh.bat` | 主启动器:双击启动 Harness;首次运行自动安装 dsh 依赖并生成 exe(便携版,可复制到任何文件夹) |
| `share/one-click-launcher/DeepSeekHarness.exe` | 同上的 exe 壳(双击无黑框闪烁) |
| `share/one-click-launcher/make-launcher.ps1` | 独立生成器:在任何 Windows 文件夹运行,就地生成 bat + exe |
| `share/one-click-launcher/plugin/` | DSH 动态插件源码(host/client),可装成侧边栏"⚡ 启动器"按钮 |
| `share/one-click-launcher/README.md` | 三种使用方式 + 注意事项 |
| `launcher.cs` | exe 壳的 C# 源码(用 csc 编译) |

## 快速使用

1. 把 `share/one-click-launcher/` 整个文件夹复制到目标机器(Windows)
2. 双击 `start-dsh.bat`(或 `DeepSeekHarness.exe`)
3. 首次运行自动 `npm install -D @deepseek-ai/dsh`(需联网),之后浏览器打开终端显示的地址(默认 `http://127.0.0.1:3080`)

> 使用期间保持终端窗口打开;关窗 = 关闭 Harness。

## 说明

- 仅限 Windows(bat/exe 为 Windows 专属)
- exe 是 bat 的壳,两者需放在同一目录;exe 未签名,SmartScreen 提示时点"仍要运行"
- 端口 3080 被占用时提示 `EADDRINUSE`,先关闭旧实例
- 需要 Node.js(npm):https://nodejs.org
