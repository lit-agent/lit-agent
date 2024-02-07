import { useState } from "react"
import { useInterval } from "usehooks-ts"

export const useCountdown = ({
  startValue,
  interval = 1000,
  endValue = 0,
  step = -1,
}: {
  startValue
  endValue?: number
  step?: number
  interval?: number
}) => {
  const [count, setCount] = useState(startValue)
  const [ticking, setTicking] = useState(false)

  useInterval(
    () => {
      // 允许无限重置
      if (count <= endValue) setTicking(false)
      else setCount(count + step)
    },
    ticking ? interval : null,
  )

  const start = () => {
    if (count !== startValue) setCount(startValue)

    setTicking(true)
  }

  return { count, ticking, start }
}
