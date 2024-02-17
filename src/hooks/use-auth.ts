import { getCsrfToken } from "next-auth/react"
import { useEffect, useState } from "react"

export const useCsrfToken = () => {
  const [token, setToken] = useState("")

  useEffect(() => {
    getCsrfToken()
  }, [])
}