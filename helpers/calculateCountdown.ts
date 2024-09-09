import { EVENT_DATE } from '~/settings/constants'

export default function calculateCountdown() {
  const delta = new Date(EVENT_DATE).getTime() - new Date().getTime()

  if (delta < 0) {
    return '00:00:00:00'
  }

  const days = Math.floor(delta / (1000 * 60 * 60 * 24))
  const hours = Math.floor((delta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((delta % (1000 * 60)) / 1000)
  const milliseconds = Math.floor(delta % 1000)

  const daysStr = String(days).padStart(2, '0')
  const hoursStr = String(hours).padStart(2, '0')
  const minutesStr = String(minutes).padStart(2, '0')
  const secondsStr = String(seconds).padStart(2, '0')
  const millisecondsStr = String(milliseconds).padStart(3, '0')

  if (days > 0) {
    return `${daysStr}:${hoursStr}:${minutesStr}:${secondsStr}`
  }

  return `${hoursStr}:${minutesStr}:${secondsStr}.${millisecondsStr}`
}
