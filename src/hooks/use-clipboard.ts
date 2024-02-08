import { useEffect } from "react"

export const useNavigatorPermissions = () => {
  useEffect(() => {
    navigator.permissions
      .query({ name: "clipboard-read", allowWithoutGesture: false })
      .then((res) => {
        console.log("[permissionStatus]: ", res.state)
      })
  })
}
