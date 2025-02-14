export interface RendererRequestAPI {
  isDevelopment: () => Promise<boolean>
}

export enum Channel {
  IS_DEVELOPMENT = "is-development",
  TOP_MENU_BUTTON = "top-menu-button",
}

export interface RequestAPI extends RendererRequestAPI {
  /**
   * Listen for messages from the main process
   * @param channel - The channel to listen on
   * @param callback - The callback to run when a message is received
   * @returns The API object (to enable chaining)
   */
  on: (channel: Channel, callback: (message?: string) => void) => RequestAPI
}