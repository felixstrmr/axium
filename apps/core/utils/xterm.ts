export async function loadXtermModules() {
  try {
    if (!document.querySelector('link[href*="xterm.min.css"]')) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://cdn.jsdelivr.net/npm/xterm@5.3.0/css/xterm.min.css'
      document.head.appendChild(link)
    }

    const [xtermModule, fitModule, webLinksModule] = await Promise.all([
      import('xterm').catch(() => null),
      import('@xterm/addon-fit').catch(() => null),
      import('@xterm/addon-web-links').catch(() => null),
    ])

    if (!xtermModule || !fitModule || !webLinksModule) {
      throw new Error('Failed to load one or more xterm modules')
    }

    const Terminal =
      xtermModule.Terminal ||
      xtermModule.default?.Terminal ||
      xtermModule.default
    const FitAddon =
      fitModule.FitAddon || fitModule.default?.FitAddon || fitModule.default
    const WebLinksAddon =
      webLinksModule.WebLinksAddon ||
      webLinksModule.default?.WebLinksAddon ||
      webLinksModule.default

    if (!Terminal || !FitAddon || !WebLinksAddon) {
      throw new Error('One or more xterm classes failed to load')
    }

    return { Terminal, FitAddon, WebLinksAddon }
  } catch (error) {
    console.error('Failed to load xterm modules:', error)
    throw error
  }
}
