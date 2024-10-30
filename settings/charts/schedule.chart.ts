import Qty from 'js-quantities'

const SCALES_CONFIG = {
  x: {
    display: true,
    stacked: true,
    ticks: {
      maxRotation: 90,
      minRotation: 45
    }
  },
  y: {
    reverse: true,
    min: 0,
    max: 1,
    ticks: {
      stepSize: 30
    },
    display: true,
    type: 'time',
    time: {
      unit: 'minute',
      tooltipFormat: 'HH:mm',
      displayFormats: {
        minute: 'HH:mm'
      }
    }
  }
}

const ANNOTATIONS_CONFIG = {
  drawTime: 'afterDatasetsDraw',
  annotations: {}
}

const CHART_CONFIG = {
  // responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: true, position: 'top' },
    tooltip: {
      enabled: true,

      callbacks: {
        title: (items: { label: string; dataset: { label: string } }[]) =>
          `${items[0].label} (${items[0].dataset.label})`,
        label: (ctx: { label: string; dataset: { label: string }; raw: number[] }) => {
          const label = []

          if (!Array.isArray(ctx.raw)) {
            return ctx.label
          }

          const timeDelta = ctx.raw[1] - ctx.raw[0]
          const duration = Qty(timeDelta, 'ms').to('h').scalar
          const hours = duration | 0
          const minutes = (duration - (duration | 0)) * 60
          const minutesStr = minutes < 10 ? `0${minutes}` : minutes

          label.push(`Czas trwania ${hours}:${minutesStr} h`)

          label.push(`Start: ${new Date(ctx.raw[0]).toLocaleTimeString().slice(0, -3)}`)
          label.push(`Koniec: ${new Date(ctx.raw[1]).toLocaleTimeString().slice(0, -3)}`)

          return label
        }
      }
    },
    annotation: ANNOTATIONS_CONFIG,
    datalabels: {
      display: true,
      color: (ctx: { dataset: { label: string } }) => (ctx.dataset.label === 'Finał' ? 'white' : 'black'),
      formatter: (value: number, ctx: { dataset: { label: string } }) => {
        if (!Array.isArray(value)) {
          return null
        }

        return ctx.dataset.label
      }
    }
  },
  scales: SCALES_CONFIG
}

export default CHART_CONFIG
export { ANNOTATIONS_CONFIG, SCALES_CONFIG }
