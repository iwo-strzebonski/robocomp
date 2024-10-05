import { BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip, TimeScale } from 'chart.js'
import 'chartjs-adapter-moment'
import annotationPlugin from 'chartjs-plugin-annotation'
import dataLabelsPlugin from 'chartjs-plugin-datalabels'

export default defineNuxtPlugin(() => {
  Chart.register(annotationPlugin, dataLabelsPlugin)
  Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, TimeScale)

  console.info(Chart.version)
  console.info(annotationPlugin.id)
})
