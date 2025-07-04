declare module 'xterm' {
  export class Terminal {
    constructor(options?: any)
    open(element: HTMLElement): void
    write(data: string): void
    onData(callback: (data: string) => void): void
    dispose(): void
    cols: number
    rows: number
    loadAddon(addon: any): void
  }
}

declare module '@xterm/addon-fit' {
  export class FitAddon {
    constructor()
    fit(): void
  }
}

declare module '@xterm/addon-web-links' {
  export class WebLinksAddon {
    constructor()
  }
}
