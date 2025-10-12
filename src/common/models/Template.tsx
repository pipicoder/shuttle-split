export type Template = {
  name: string;
  id: number;
  billingType: number,
  rentalCost?: number,
  shuttleAmount?: number,
  shuttlePrice?: number,
  players?: Array<string>[]
  latestDate: string
}