import { Channel, RequestAPI } from "../preload/api"
import logo from "./assets/logo.svg"

// typings for the preload api
declare global {
  const MAIN_PROCESS: RequestAPI
}

document.addEventListener("DOMContentLoaded", async function () {
  ;(document.getElementById("logo") as HTMLImageElement).src = logo

  MAIN_PROCESS.isDevelopment().then((isDevelopment) => {
    ;(
      document.getElementById("is-development-label") as HTMLParagraphElement
    ).textContent = `Environment: ${
      isDevelopment ? "Development" : "Production"
    }`
  })

  MAIN_PROCESS.on(Channel.TOP_MENU_BUTTON, (message) => {
    const label = document.createElement("p")
    label.textContent = message ?? "Top Menu Button Clicked"
    document.body.appendChild(label)
  })
})
