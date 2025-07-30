import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import timeConverter from '@/utils/timeConverter'

interface CountdownProps {
  countdownTime: number
  timeOver: (timeTaken: number) => void
  setTimeTaken: (time: number) => void
}

const Countdown: React.FC<CountdownProps> = ({
  countdownTime,
  timeOver,
  setTimeTaken,
}) => {
  const totalTime = countdownTime * 1000
  const [timerTime, setTimerTime] = useState<number>(totalTime)
  const { hours, minutes, seconds } = timeConverter(timerTime) ?? {
    hours: '00',
    minutes: '00',
    seconds: '00',
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = timerTime - 1000

      if (newTime >= 0) {
        setTimerTime(newTime)
      } else {
        clearInterval(timer)

        Swal.fire({
          icon: 'info',
          title: `Oops! Time's up.`,
          text: 'See how you did!',
          confirmButtonText: 'Check Results',
          timer: 5000,
          willClose: () => timeOver(totalTime - timerTime),
        })
      }
    }, 1000)

    return () => {
      clearInterval(timer)
      setTimeTaken(totalTime - timerTime + 1000)
    }
  }, [timerTime])

  return (
    <div className="flex items-center justify-end gap-3 text-lg font-semibold text-gray-700 dark:text-gray-200">
      <div className="relative group">
        <div className="px-4 py-2 rounded-md bg-white dark:bg-neutral-800 shadow hover:shadow-md transition">
          {hours}
        </div>
        <span className="absolute bottom-[-1.5rem] left-1/2 -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition">
          Hours
        </span>
      </div>

      <div className="relative group">
        <div className="px-4 py-2 rounded-md bg-white dark:bg-neutral-800 shadow hover:shadow-md transition">
          {minutes}
        </div>
        <span className="absolute bottom-[-1.5rem] left-1/2 -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition">
          Minutes
        </span>
      </div>

      <div className="relative group">
        <div className="px-4 py-2 rounded-md bg-white dark:bg-neutral-800 shadow hover:shadow-md transition">
          {seconds}
        </div>
        <span className="absolute bottom-[-1.5rem] left-1/2 -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition">
          Seconds
        </span>
      </div>
    </div>
  )
}

export default Countdown
