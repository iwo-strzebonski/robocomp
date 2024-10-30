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
    legend: { display: true, position: 'right' },
    tooltip: {
      enabled: true,

      callbacks: {
        //   title: (items: { label: string; dataset: { label: string } }[]) =>
        //     `${items[0].label} (${items[0].dataset.label})`,
        label: (ctx: { formattedValue: string }) => ` Ilość robotów: ${ctx.formattedValue}`
      }
    },
    annotation: ANNOTATIONS_CONFIG,
    datalabels: {
      display: true
    }
  }
  // scales: SCALES_CONFIG
}

export default CHART_CONFIG
export { ANNOTATIONS_CONFIG, SCALES_CONFIG }
