import { Channel, RequestAPI } from "../preload/api"

// typings for the preload api
declare global {
  const MAIN_PROCESS: RequestAPI
}

document.addEventListener("DOMContentLoaded", async function () {
  MAIN_PROCESS.isDevelopment().then((isDevelopment) => {
    const label = document.getElementById("is-development-label")
    if (label) {
      label.textContent = `Environment: ${isDevelopment ? "Development" : "Production"}`
    }
  })

  MAIN_PROCESS.on(Channel.TOP_MENU_BUTTON, (message) => {
    const label = document.createElement("p")
    label.textContent = message ?? "Top Menu Button Clicked"
    document.body.appendChild(label)
  })
})
 