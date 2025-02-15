<h1 align="center">
  <p>
    <img src="./src/renderer/assets/logo.svg" width="94">
  </p>
    Electron Vite TS Starter

</h1>

Basic Electron starter template that uses Vite and TypeScript. Contains examples of how to communicate between renderer and main using preload.

## Development

```
yarn dev
```

Electron-vite is used for hot reloading etc.

## Distribute

```
yarn dist
```

Uses electron-builder. Configurations are made in `electron-builder.yml`.

## Directory structure
<pre>
┌── build           - icons etc used by electron-builder
├── dist            - distributions are placed here
├── src             - the source code
│   ├── main        - background process; creates the windows
│   ├── preload     - communication between renderer and main
│   └── renderer    - front end code
│       └── assets  - assets that are processed when building
├── resources       - static files accessable in main process
└── out             - transpiled javascript
</pre>