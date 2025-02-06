# vite-plugin-tailwindcss-prefix

[![NPM version](https://img.shields.io/npm/v/vite-plugin-tailwindcss-prefix?color=a1b858&label=)](https://www.npmjs.com/package/vite-plugin-tailwindcss-prefix)

`vite-plugin-tailwindcss-prefix` is a Vite plugin that helps you to get the prefix in runtime for `tailwindcss@4`.

## Install

```bash
pnpm add -D vite-plugin-tailwindcss-prefix
```

## Setup

```ts
// vite.config.ts
import { defineConfig } from "vite"
import tailwindcssPrefix from "vite-plugin-tailwindcss-prefix"

export default defineConfig({
  // it also supports resolve alias
  plugins: [tailwindcssPrefix({ entry: "entry-css-filepath" })],
})
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "types": ["vite-plugin-tailwindcss-prefix/client"]
  }
}
```

## Usage

```ts
import tailwindcssPrefix from "virtual:tailwindcss-prefix"
```

## Options

```ts
export interface Options {
  entry: string
}
```

## License

[MIT](./LICENSE)
