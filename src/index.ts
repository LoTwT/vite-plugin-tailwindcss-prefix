import type { Plugin } from "vite"
import { readFile } from "node:fs/promises"

export interface Options {
  entry: string
}

const TAILWINDCSS_PREFIX_RE = /@import\s+["'](.*?)["']\s+prefix\((.*?)\);/

function VitePluginTailwindCSSPrefix(options: Options): Plugin {
  const virtualModuleId = "virtual:tailwindcss-prefix"
  const resolvedVirtualModuleId = `\0${virtualModuleId}`

  let resolvedEntry = ""

  return {
    name: "vite-plugin-tailwindcss-prefix",
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    async load(id) {
      if (id === resolvedVirtualModuleId) {
        const entry = await this.resolve(options.entry)

        if (!entry) {
          throw new Error(`Cannot find entry file: ${options.entry}`)
        }

        this.addWatchFile(entry.id)
        resolvedEntry = entry.id

        const code = await readFile(entry.id, "utf-8")
        const matches = code.match(TAILWINDCSS_PREFIX_RE)

        if (!matches) return `export default ""`

        const prefix = matches[2]

        return `export default ${JSON.stringify(prefix)}`
      }
    },
    async handleHotUpdate({ file, server }) {
      if (file === resolvedEntry) {
        server.ws.send({
          type: "full-reload",
          path: "*",
        })
      }
    },
  }
}

export default VitePluginTailwindCSSPrefix
