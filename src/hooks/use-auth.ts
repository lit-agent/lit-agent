import { getCsrfToken } from "next-auth/react"
import { useEffect, useState } from "react"

export const useCsrfToken = () => {
  const [token, setToken] = useState("")

  const initGetCsrfToken = async () => {
    const csrfToken = await getCsrfToken()
    console.log("[auth]: ", { csrfToken })
    if (csrfToken) setToken(csrfToken)
  }

  useEffect(() => {
    initGetCsrfToken()
  }, [])

  return token
}
