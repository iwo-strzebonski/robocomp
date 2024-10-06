import type { Schedule } from '~/server/api/schedule/index.get'

const getColorForScheduleType = (name: string): string => {
  if (name.startsWith('Walki')) {
    return '#7fb7df'
  }

  if (name.startsWith('Eliminacje')) {
    return '#7fb7df'
  }

  if (name.startsWith('Kalibracja')) {
    return '#7fb7df'
  }

  if (name.startsWith('Prezentacje')) {
    return '#7fb7df'
  }

  if (name.startsWith('Finał')) {
    return '#4295d0'
  }

  return '#000000'
}

export default function prepareDataForSchedule(
  scheduleName: 'robots' | 'events',
  data: Schedule[],
  labels: string[],
  keys: string[],
  scheduleTypes: string[]
) {
  const annotationData = data.filter((schedule) => !schedule.competition)

  const scheduleData = data.filter(
    (schedule) =>
      schedule.competition &&
      (scheduleName === 'robots' ? schedule.competition !== 'events' : schedule.competition === 'events')
  )

  const annotations = Object.fromEntries(
    annotationData.map((schedule) => {
      return [
        schedule.name,
        {
          type: 'box',
          xMin: -0.5,
          xMax: labels.length - 0.5,
          yMin: new Date(schedule.start_date).getTime(),
          yMax: new Date(schedule.end_date).getTime(),
          backgroundColor: '#404040',
          label: {
            display: true,
            content: schedule.name,
            color: 'white'
          }
        }
      ]
    })
  )

  const eventStartDate = annotationData.toSorted(
    (a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
  )[0].start_date
  const eventEndDate = annotationData.toSorted(
    (a, b) => new Date(b.end_date).getTime() - new Date(a.end_date).getTime()
  )[0].end_date

  if (!eventStartDate || !eventEndDate) {
    throw new Error('Failed to find ROBOCOMP start or end date')
  }

  const datasets = scheduleTypes.map((type) => ({
    label: type,
    backgroundColor: getColorForScheduleType(type),
    data: labels.map((label) => {
      const schedule = scheduleData.find((s) => s.name === `${type} ${label}`)

      return (schedule ? [new Date(schedule.start_date).getTime(), new Date(schedule.end_date).getTime()] : null) as
        | [number, number]
        | null
    })
  }))

  return {
    labels,
    annotations,
    datasets,
    eventStartDate: new Date(eventStartDate).getTime(),
    eventEndDate: new Date(eventEndDate).getTime()
  }
}
