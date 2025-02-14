import { ipcRenderer, contextBridge } from "electron"
import { Channel, RequestAPI } from "./api"

const requestHandlers: RequestAPI = {
  async isDevelopment() {
    return ipcRenderer.invoke(Channel.IS_DEVELOPMENT)
  },

  on: (channel, callback) => {
    ipcRenderer.on(channel, (_, message) => callback(message))
    return requestHandlers
  },
}

// expose the api to the renderer
contextBridge.exposeInMainWorld("MAIN_PROCESS", requestHandlers)
