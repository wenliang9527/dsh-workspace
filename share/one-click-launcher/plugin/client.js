// ============================================================
//  One-Click Launcher — CLIENT half
//  Paste this entire file's content into cordis_define -> code.client
//  (see INSTALL.md for the full install steps)
// ============================================================
return {
  apply(ctx) {
    const slots = ctx.get('slots')
    if (slots === undefined) return

    const LauncherButton = () => {
      const [state, setState] = React.useState({ idle: true, busy: false, ok: false, text: '' })
      const onClick = async () => {
        if (state.busy) return
        setState({ idle: false, busy: true, ok: false, text: '...' })
        try {
          const result = await host.call('launcher.install', {})
          if (result && result.ok) {
            setState({ idle: false, busy: false, ok: true, text: result.files.join(' + ') })
          } else {
            setState({ idle: false, busy: false, ok: false, text: result && result.error ? result.error : 'no response' })
          }
        } catch (err) {
          setState({ idle: false, busy: false, ok: false, text: String(err && err.message ? err.message : err) })
        }
      }
      const btn = React.createElement('button', {
        onClick,
        disabled: state.busy,
        title: 'Generate start-dsh.bat + DeepSeekHarness.exe into the workspace',
        style: {
          margin: '0 6px',
          padding: '4px 8px',
          cursor: 'pointer',
          fontSize: 12,
          whiteSpace: 'nowrap',
        },
      }, state.busy ? '...' : '⚡ 启动器')
      if (!state.idle) {
        const color = state.ok ? '#2e7d32' : '#c62828'
        const text = React.createElement('span', {
          style: { fontSize: 11, color, margin: '0 6px', maxWidth: 260, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
        }, state.busy ? 'generating...' : state.text)
        return React.createElement('div', { style: { display: 'flex', alignItems: 'center', minWidth: 0 } }, btn, text)
      }
      return btn
    }

    slots.inject('sidebar.footer.action', () => slots.register(
      { name: 'sidebar.footer.action', id: 'launcher-install', order: 100, label: () => '启动器' },
      () => React.createElement(LauncherButton),
    ))
  },
}
