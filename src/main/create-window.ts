import { BrowserWindow, Menu } from "electron"
import path from "path"
import { format } from "url"
import { isDevEnvironment } from "."
import { Channel } from "../preload/api"

export function createRendererWindow() {
  const rendererWindow = new BrowserWindow({
    width: 1096,
    height: 700,
    //icon: appIcon,
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
    },
  })

  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
      {
        label: "File",
        submenu: [
          {
            label: "Send message to renderer",
            click: () => {
              rendererWindow.webContents.send(
                Channel.TOP_MENU_BUTTON,
                "Hello, renderer!"
              )
            },
          },
        ],
      },
    ])
  )

  if (isDevEnvironment && process.env["ELECTRON_RENDERER_URL"]) {
    rendererWindow.loadURL(process.env["ELECTRON_RENDERER_URL"])
  } else {
    rendererWindow.loadURL(
      format({
        pathname: path.join(__dirname, "../renderer/index.html"),
        protocol: "file",
        slashes: true,
      })
    )
  }

  rendererWindow.webContents.on("devtools-opened", () => rendererWindow.focus())

  return rendererWindow
}
