import { app, BrowserWindow, ipcMain, session } from "electron"
import { createRendererWindow } from "./create-window"
import { RendererRequestAPI } from "../preload/api"

export const isDevEnvironment = process.env.NODE_ENV === "development"

//#region lifecycle

let mainWindow: BrowserWindow | undefined
function initWindow() {
  mainWindow = createRendererWindow()
  mainWindow.on("closed", () => (mainWindow = undefined))
}

app.on("ready", async () => {
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": ["default-src 'self'; script-src 'self'; img-src 'self' data:"],
      },
    })
  })

  initWindow()

  if (isDevEnvironment) {
    mainWindow?.webContents.openDevTools()
  }
})

app.on("activate", () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (!mainWindow) {
    initWindow()
  }
})

//#endregion

//#region renderer communication

const rendererRequestHandlers: RendererRequestAPI = {
  isDevelopment: async () => isDevEnvironment,
}

ipcMain.handle("is-development", rendererRequestHandlers.isDevelopment)

//#endregion