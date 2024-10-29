export default interface Dataset {
  label?: string
  backgroundColor: string | string[]
  data: ([number, number] | number[] | null)[]
}
