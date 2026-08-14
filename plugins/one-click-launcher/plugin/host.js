// ============================================================
//  One-Click Launcher — HOST half
//  Paste this entire file's content into cordis_define -> code.host
//  (see INSTALL.md for the full install steps)
// ============================================================
return {
  apply(ctx) {
    const fs = ctx.get('fs')
    const sandboxPolicy = ctx.get('sandboxPolicy')
    if (fs === undefined || sandboxPolicy === undefined) return

    // DeepSeekHarness.exe launcher, base64-embedded (compiled from launcher.cs,
    // it simply shell-opens start-dsh.bat next to itself in a console window).
    const EXE_B64 = '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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=='

    const batLines = [
      '@echo off',
      'setlocal',
      'title DeepSeek Harness',
      'cd /d "%~dp0"',
      '',
      'rem create DeepSeekHarness.exe on first run (PowerShell ships with every Windows)',
      'if exist "DeepSeekHarness.exe" goto haveexe',
      'powershell -NoProfile -ExecutionPolicy Bypass -Command "[IO.File]::WriteAllBytes(' + "'" + '%~dp0DeepSeekHarness.exe' + "'" + ',[Convert]::FromBase64String(' + "'" + "'" + '))"',
      ':haveexe',
      '',
      'where npm >nul 2>nul',
      'if errorlevel 1 goto nonpm',
      '',
      'rem auto-install dsh on first run so the launcher works in any fresh folder',
      'if exist "node_modules\\@deepseek-ai\\dsh" goto havedeps',
      'if not exist package.json echo {}> package.json',
      'echo First run: installing dsh, please wait (network required)...',
      'call npm install --no-audit --no-fund -D @deepseek-ai/dsh',
      'if errorlevel 1 goto npmfail',
      ':havedeps',
      '',
      'echo ============================================',
      'echo   DeepSeek Harness launcher',
      'echo   Keep this window open while using it.',
      'echo   Open the URL printed below in your browser.',
      'echo ============================================',
      'echo.',
      'call npm run dsh',
      'echo.',
      'echo Harness stopped.',
      'pause',
      'exit /b 0',
      '',
      ':nonpm',
      'echo [ERROR] npm not found on PATH. Install Node.js first: https://nodejs.org',
      'pause',
      'exit /b 1',
      '',
      ':npmfail',
      'echo [ERROR] npm install failed. Check your network and retry.',
      'pause',
      'exit /b 1',
    ]
    // splice the base64 into the powershell line, then join with CRLF
    batLines[7] = 'powershell -NoProfile -ExecutionPolicy Bypass -Command "[IO.File]::WriteAllBytes(' + "'" + '%~dp0DeepSeekHarness.exe' + "'" + ',[Convert]::FromBase64String(' + "'" + EXE_B64 + "'" + '))"'
    const BAT = batLines.join('\r\n') + '\r\n'

    const generate = async () => {
      const policy = sandboxPolicy.resolve()
      const root = policy.workspaceRoot || sandboxPolicy.workspaceRoot
      const target = await fs.resolve('start-dsh.bat', { cwd: root })
      const outcome = await fs.writeText(target, BAT, undefined, undefined, policy)
      return {
        ok: true,
        workspace: root,
        files: ['start-dsh.bat', 'DeepSeekHarness.exe'],
        note: 'DeepSeekHarness.exe is materialized by start-dsh.bat on its first run',
        version: outcome && outcome.version ? String(outcome.version) : undefined,
      }
    }

    const disposers = []
    disposers.push(harness.handle('launcher.install', async () => {
      try {
        return await generate()
      } catch (err) {
        const message = err && err.message ? err.message : String(err)
        return { ok: false, error: message }
      }
    }))

    // dynamic tools: defineTool requires { schema, render, presentationMeta? } in output;
    // the value-schema DSL marks required per-property and needs explicit additionalProperties
    const tool = harness.defineTool({
      name: 'install_one_click_launcher',
      description: 'Generate the one-click launcher files start-dsh.bat and DeepSeekHarness.exe into the session workspace so the harness can be started later by double-clicking them.',
      parameters: { type: 'object', properties: {} },
      output: {
        schema: {
          type: 'object',
          additionalProperties: false,
          properties: {
            ok: { type: 'boolean', required: true },
            workspace: { type: 'string' },
            message: { type: 'string', required: true },
          },
        },
        render(args, value) {
          return [{ type: 'text', text: value && value.message ? value.message : String(value) }]
        },
      },
      execute: async () => {
        const r = await generate()
        return r.ok
          ? { ok: true, workspace: r.workspace, message: 'Created ' + r.files.join(', ') + ' in ' + r.workspace + '. ' + r.note + '.' }
          : { ok: false, message: 'Failed: ' + r.error }
      },
    })
    disposers.push(harness.registerTool(ctx, tool))

    return () => {
      for (const d of disposers) {
        if (typeof d === 'function') d()
      }
    }
  },
}
