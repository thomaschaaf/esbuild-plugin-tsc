# esbuild-plugin-tsc

An esbuild plugin which uses tsc to compile typescript files.

## Basic Usage

1. Install this plugin in your project:

   ```sh
   npm install --save-dev esbuild-plugin-tsc typescript
   ```

2. Add this plugin to your esbuild build script:

   ```diff
   +const EsbuildPluginTsc = require('esbuild-plugin-tsc');
    ...
    esbuild.build({
      ...
      plugins: [
   +    EsbuildPluginTsc(),
      ],
    })
   ```

## Config

```typescript
EsbuildPluginTsc{
    // If empty, uses tsconfig.json
    tsconfigPath?: string,
    // If true, force compilation with tsc
    force?: boolean,
    // If true, enables tsx file support
    tsx?: boolean
})
```
